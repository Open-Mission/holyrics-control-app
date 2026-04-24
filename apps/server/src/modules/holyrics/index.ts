import type { FastifyPluginAsync } from "fastify";

import type {
  HolyricsConfigTestResult,
  SaveHolyricsConfigRequest
} from "@holyrics-control/shared";

import {
  getHolyricsConfigStatus,
  resolveHolyricsConfig,
  saveLocalHolyricsConfig
} from "./config.js";

type HolyricsTokenInfoResponse = {
  status?: unknown;
  data?: {
    version?: unknown;
    permissions?: unknown;
  };
  error?: unknown;
};

function isSaveConfigRequest(body: unknown): body is SaveHolyricsConfigRequest {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const request = body as Partial<SaveHolyricsConfigRequest>;

  return typeof request.baseUrl === "string" && typeof request.token === "string";
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Erro inesperado.";
}

async function testHolyricsConfig(): Promise<HolyricsConfigTestResult> {
  const resolvedConfig = await resolveHolyricsConfig();

  if (!resolvedConfig.config) {
    throw new Error("Configure a URL e o token do Holyrics antes de testar a conexao.");
  }

  const requestUrl = new URL(`${resolvedConfig.config.baseUrl}/api/GetTokenInfo`);
  requestUrl.searchParams.set("token", resolvedConfig.config.token);

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: "{}"
  });

  if (!response.ok) {
    throw new Error(`Holyrics respondeu com HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as HolyricsTokenInfoResponse;

  if (payload.status !== "ok") {
    throw new Error("Holyrics recusou a configuracao informada.");
  }

  return {
    ok: true,
    version: typeof payload.data?.version === "string" ? payload.data.version : null,
    permissions: typeof payload.data?.permissions === "string" ? payload.data.permissions : null
  };
}

export const holyricsRoutes: FastifyPluginAsync = async (app) => {
  app.get("/config", async () => {
    return getHolyricsConfigStatus();
  });

  app.put("/config", async (request, reply) => {
    if (!isSaveConfigRequest(request.body)) {
      return reply.code(400).send({ error: "Informe baseUrl e token." });
    }

    try {
      await saveLocalHolyricsConfig(request.body);
      return getHolyricsConfigStatus();
    } catch (error) {
      return reply.code(400).send({ error: errorMessage(error) });
    }
  });

  app.post("/config/test", async (_request, reply) => {
    try {
      return await testHolyricsConfig();
    } catch (error) {
      const statusCode = errorMessage(error).startsWith("Configure") ? 409 : 502;
      return reply.code(statusCode).send({ error: errorMessage(error) });
    }
  });
};
