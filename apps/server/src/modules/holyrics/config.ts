import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import type {
  HolyricsConfigSource,
  HolyricsConfigStatus,
  SaveHolyricsConfigRequest
} from "@holyrics-control/shared";

export type HolyricsConfig = {
  baseUrl: string;
  token: string;
};

export type ResolveHolyricsConfigOptions = {
  env?: NodeJS.ProcessEnv;
  configPath?: string;
};

export type ResolvedHolyricsConfig = {
  source: HolyricsConfigSource;
  config: HolyricsConfig | null;
};

const DEFAULT_CONFIG_FILE = ".holyrics-config.json";

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

export function getHolyricsConfigFilePath(env: NodeJS.ProcessEnv = process.env) {
  return resolve(env.HOLYRICS_CONFIG_FILE ?? DEFAULT_CONFIG_FILE);
}

export function normalizeHolyricsBaseUrl(baseUrl: string) {
  const trimmed = baseUrl.trim();

  if (!trimmed) {
    throw new Error("URL do Holyrics e obrigatoria.");
  }

  const parsed = new URL(trimmed);

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("URL do Holyrics deve usar http ou https.");
  }

  return parsed.toString().replace(/\/$/, "");
}

export function normalizeHolyricsToken(token: string) {
  const trimmed = token.trim();

  if (!trimmed) {
    throw new Error("Token do Holyrics e obrigatorio.");
  }

  return trimmed;
}

export function normalizeHolyricsConfig(input: SaveHolyricsConfigRequest): HolyricsConfig {
  return {
    baseUrl: normalizeHolyricsBaseUrl(input.baseUrl),
    token: normalizeHolyricsToken(input.token)
  };
}

export function maskHolyricsToken(token: string) {
  if (token.length <= 4) {
    return "*".repeat(token.length);
  }

  return `${token.slice(0, 2)}*******${token.slice(-2)}`;
}

async function readLocalHolyricsConfig(configPath: string): Promise<HolyricsConfig | null> {
  try {
    const raw = JSON.parse(await readFile(configPath, "utf8")) as Partial<HolyricsConfig>;

    if (typeof raw.baseUrl !== "string" || typeof raw.token !== "string") {
      return null;
    }

    return normalizeHolyricsConfig({
      baseUrl: raw.baseUrl,
      token: raw.token
    });
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export async function resolveHolyricsConfig(
  options: ResolveHolyricsConfigOptions = {}
): Promise<ResolvedHolyricsConfig> {
  const env = options.env ?? process.env;
  const configPath = options.configPath ?? getHolyricsConfigFilePath(env);

  if (env.HOLYRICS_BASE_URL && env.HOLYRICS_TOKEN) {
    return {
      source: "env",
      config: normalizeHolyricsConfig({
        baseUrl: env.HOLYRICS_BASE_URL,
        token: env.HOLYRICS_TOKEN
      })
    };
  }

  const localConfig = await readLocalHolyricsConfig(configPath);

  if (localConfig) {
    return {
      source: "local",
      config: localConfig
    };
  }

  return {
    source: "none",
    config: null
  };
}

export async function getHolyricsConfigStatus(
  options: ResolveHolyricsConfigOptions = {}
): Promise<HolyricsConfigStatus> {
  const resolvedConfig = await resolveHolyricsConfig(options);

  return {
    configured: resolvedConfig.config !== null,
    source: resolvedConfig.source,
    baseUrl: resolvedConfig.config?.baseUrl ?? null,
    tokenConfigured: Boolean(resolvedConfig.config?.token),
    tokenPreview: resolvedConfig.config?.token ? maskHolyricsToken(resolvedConfig.config.token) : null
  };
}

export async function saveLocalHolyricsConfig(
  input: SaveHolyricsConfigRequest,
  options: ResolveHolyricsConfigOptions = {}
) {
  const env = options.env ?? process.env;
  const configPath = options.configPath ?? getHolyricsConfigFilePath(env);
  const config = normalizeHolyricsConfig(input);

  await mkdir(dirname(configPath), { recursive: true });
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");

  return config;
}
