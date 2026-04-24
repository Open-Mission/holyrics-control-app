export type HealthStatus = {
  status: "ok";
};

export type HolyricsConfigSource = "env" | "local" | "none";

export type HolyricsConfigStatus = {
  configured: boolean;
  source: HolyricsConfigSource;
  baseUrl: string | null;
  tokenConfigured: boolean;
  tokenPreview: string | null;
};

export type SaveHolyricsConfigRequest = {
  baseUrl: string;
  token: string;
};

export type HolyricsConfigTestResult = {
  ok: boolean;
  version: string | null;
  permissions: string | null;
};
