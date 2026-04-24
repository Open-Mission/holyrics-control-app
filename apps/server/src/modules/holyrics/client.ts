import { resolveHolyricsConfig, type ResolvedHolyricsConfig } from "./config.js";

type HolyricsActionResponse<T> = {
  status?: unknown;
  data?: T;
  error?: unknown;
};

export type ExecuteHolyricsActionOptions = {
  fetcher?: typeof fetch;
  configResolver?: () => Promise<ResolvedHolyricsConfig>;
};

function errorMessage(error: unknown) {
  if (typeof error === "string" && error.trim()) {
    return error;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Erro inesperado do Holyrics.";
}

export async function executeHolyricsAction<T = unknown>(
  action: string,
  body: Record<string, unknown> = {},
  options: ExecuteHolyricsActionOptions = {}
): Promise<T> {
  const resolvedConfig = await (options.configResolver ?? resolveHolyricsConfig)();

  if (!resolvedConfig.config) {
    throw new Error("Configure a URL e o token do Holyrics antes de acessar a playlist.");
  }

  const requestUrl = new URL(`${resolvedConfig.config.baseUrl}/api/${action}`);
  requestUrl.searchParams.set("token", resolvedConfig.config.token);

  const response = await (options.fetcher ?? fetch)(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Holyrics respondeu com HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as HolyricsActionResponse<T>;

  if (payload.status !== "ok") {
    throw new Error(errorMessage(payload.error));
  }

  return payload.data as T;
}
