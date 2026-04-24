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
import {
  getHolyricsMediaPlaylist,
  getHolyricsImagePresentation,
  getHolyricsSongDetail,
  goToPresentationIndex,
  getCurrentSlideNumber,
  presentMediaPlaylistItem,
  presentSong,
  stopPresentation
} from "../playlist/service.js";

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

function hasStringId(body: unknown): body is { id: string } {
  return typeof body === "object" && body !== null && typeof (body as { id?: unknown }).id === "string";
}

function isPresentSongRequest(body: unknown): body is { id: string; initialIndex?: number } {
  if (!hasStringId(body)) {
    return false;
  }

  const initialIndex = (body as { initialIndex?: unknown }).initialIndex;
  return (
    initialIndex === undefined ||
    (typeof initialIndex === "number" && Number.isInteger(initialIndex) && initialIndex >= 0)
  );
}

function isGoToIndexRequest(body: unknown): body is { index: number } {
  return (
    typeof body === "object" &&
    body !== null &&
    Number.isInteger((body as { index?: unknown }).index) &&
    Number((body as { index?: unknown }).index) >= 0
  );
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

  app.get("/media-playlist", async (_request, reply) => {
    try {
      return await getHolyricsMediaPlaylist();
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.get<{ Params: { id: string }; Querystring: { name?: string } }>("/songs/:id", async (request, reply) => {
    try {
      return await getHolyricsSongDetail(request.params.id, request.query.name);
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.post("/images/present-and-preview", async (request, reply) => {
    if (!hasStringId(request.body)) {
      return reply.code(400).send({ error: "Informe o ID do item da playlist." });
    }

    try {
      return await getHolyricsImagePresentation(request.body.id);
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.post("/media-playlist/present", async (request, reply) => {
    if (!hasStringId(request.body)) {
      return reply.code(400).send({ error: "Informe o ID do item da playlist." });
    }

    try {
      await presentMediaPlaylistItem(request.body.id);
      return { ok: true };
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.post("/songs/present", async (request, reply) => {
    if (!isPresentSongRequest(request.body)) {
      return reply.code(400).send({ error: "Informe o ID da musica e um indice inicial valido." });
    }

    try {
      await presentSong(request.body.id, request.body.initialIndex ?? 0);
      return { ok: true };
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.post("/presentation/goto-index", async (request, reply) => {
    if (!isGoToIndexRequest(request.body)) {
      return reply.code(400).send({ error: "Informe um indice de slide valido." });
    }

    try {
      await goToPresentationIndex(request.body.index);
      return { ok: true };
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.post("/presentation/stop", async (_request, reply) => {
    try {
      await stopPresentation();
      return { ok: true };
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });

  app.get("/presentation/current-slide", async (_request, reply) => {
    try {
      const slide = await getCurrentSlideNumber();
      return { slide };
    } catch (error) {
      return reply.code(502).send({ error: errorMessage(error) });
    }
  });
};
