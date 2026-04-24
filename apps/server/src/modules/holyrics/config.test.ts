import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, test } from "node:test";

import {
  getHolyricsConfigStatus,
  resolveHolyricsConfig,
  saveLocalHolyricsConfig
} from "./config.js";

async function tempConfigPath() {
  const dir = await mkdtemp(join(tmpdir(), "holyrics-config-"));
  return join(dir, "config.json");
}

describe("Holyrics config", () => {
  test("uses complete environment config before local config", async () => {
    const configPath = await tempConfigPath();
    await saveLocalHolyricsConfig(
      { baseUrl: "http://local:8091", token: "local-token" },
      { configPath }
    );

    const resolved = await resolveHolyricsConfig({
      env: {
        HOLYRICS_BASE_URL: "http://env:8091/",
        HOLYRICS_TOKEN: "env-token"
      },
      configPath
    });

    assert.equal(resolved.source, "env");
    assert.equal(resolved.config?.baseUrl, "http://env:8091");
    assert.equal(resolved.config?.token, "env-token");
  });

  test("uses local config when environment config is missing", async () => {
    const configPath = await tempConfigPath();
    await saveLocalHolyricsConfig(
      { baseUrl: "http://127.0.0.1:8091/", token: "local-token" },
      { configPath }
    );

    const resolved = await resolveHolyricsConfig({
      env: {},
      configPath
    });

    assert.equal(resolved.source, "local");
    assert.equal(resolved.config?.baseUrl, "http://127.0.0.1:8091");
  });

  test("returns safe unconfigured status when no config exists", async () => {
    const status = await getHolyricsConfigStatus({
      env: {},
      configPath: await tempConfigPath()
    });

    assert.deepEqual(status, {
      configured: false,
      source: "none",
      baseUrl: null,
      tokenConfigured: false,
      tokenPreview: null
    });
  });

  test("rejects invalid URLs", async () => {
    await assert.rejects(
      () =>
        saveLocalHolyricsConfig(
          { baseUrl: "ftp://127.0.0.1:8091", token: "token" },
          { configPath: "/tmp/unused-holyrics-config.json" }
        ),
      /URL/
    );
  });

  test("saves normalized local config without losing the token", async () => {
    const configPath = await tempConfigPath();
    await saveLocalHolyricsConfig(
      { baseUrl: " http://127.0.0.1:8091/ ", token: "  secret-token  " },
      { configPath }
    );

    const rawFile = JSON.parse(await readFile(configPath, "utf8")) as {
      baseUrl: string;
      token: string;
    };
    const status = await getHolyricsConfigStatus({ env: {}, configPath });

    assert.equal(rawFile.baseUrl, "http://127.0.0.1:8091");
    assert.equal(rawFile.token, "secret-token");
    assert.equal(status.tokenPreview, "se*******en");
  });
});
