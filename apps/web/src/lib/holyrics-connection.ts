import type {
  HealthStatus,
  HolyricsConfigStatus,
  HolyricsConfigTestResult
} from "@holyrics-control/shared";

type ApiError = {
  error?: string;
};

export type HolyricsConnectionStatus =
  | {
      state: "checking";
      message: "Verificando conexao";
      detail: "Consultando servidor local";
    }
  | {
      state: "server-offline";
      message: "Servidor offline";
      detail: string;
    }
  | {
      state: "not-configured";
      message: "Configurar Holyrics";
      detail: "URL e token ainda nao foram definidos";
    }
  | {
      state: "holyrics-offline";
      message: "Holyrics indisponivel";
      detail: string;
      baseUrl: string | null;
    }
  | {
      state: "connected";
      message: "Conectado";
      detail: string;
      baseUrl: string;
      version: string | null;
    };

export type HolyricsConnectionTone = "neutral" | "success" | "warning" | "danger";

export type HolyricsConnectionViewModel = {
  tone: HolyricsConnectionTone;
  label: string;
  detail: string;
  dotClassName: string;
};

const checkingStatus: HolyricsConnectionStatus = {
  state: "checking",
  message: "Verificando conexao",
  detail: "Consultando servidor local"
};

async function readApiError(response: Response) {
  try {
    const payload = (await response.json()) as ApiError;
    return payload.error ?? `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

async function readJsonResponse<T>(response: Response) {
  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as T;
}

function errorDetail(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function getInitialHolyricsConnectionStatus(): HolyricsConnectionStatus {
  return checkingStatus;
}

export async function fetchHolyricsConnectionStatus(
  fetcher: typeof fetch = fetch
): Promise<HolyricsConnectionStatus> {
  try {
    const healthResponse = await fetcher("/api/health");
    const health = await readJsonResponse<HealthStatus>(healthResponse);

    if (health.status !== "ok") {
      return {
        state: "server-offline",
        message: "Servidor offline",
        detail: "O servidor local nao confirmou o health check"
      };
    }
  } catch (error) {
    return {
      state: "server-offline",
      message: "Servidor offline",
      detail: errorDetail(error, "Nao foi possivel acessar /api/health")
    };
  }

  let config: HolyricsConfigStatus;

  try {
    const configResponse = await fetcher("/api/holyrics/config");
    config = await readJsonResponse<HolyricsConfigStatus>(configResponse);
  } catch (error) {
    return {
      state: "server-offline",
      message: "Servidor offline",
      detail: errorDetail(error, "Nao foi possivel ler /api/holyrics/config")
    };
  }

  if (!config.configured) {
    return {
      state: "not-configured",
      message: "Configurar Holyrics",
      detail: "URL e token ainda nao foram definidos"
    };
  }

  try {
    const testResponse = await fetcher("/api/holyrics/config/test", {
      method: "POST"
    });
    const result = await readJsonResponse<HolyricsConfigTestResult>(testResponse);

    return {
      state: "connected",
      message: "Conectado",
      detail: result.version ? `Holyrics ${result.version}` : "GetTokenInfo validado",
      baseUrl: config.baseUrl ?? "",
      version: result.version
    };
  } catch (error) {
    return {
      state: "holyrics-offline",
      message: "Holyrics indisponivel",
      detail: errorDetail(error, "GetTokenInfo nao respondeu com status ok"),
      baseUrl: config.baseUrl
    };
  }
}

export function getHolyricsConnectionViewModel(
  status: HolyricsConnectionStatus
): HolyricsConnectionViewModel {
  if (status.state === "connected") {
    return {
      tone: "success",
      label: status.message,
      detail: status.detail,
      dotClassName: "bg-emerald-500 shadow-[0_0_0_3px_rgb(16_185_129_/_0.16)]"
    };
  }

  if (status.state === "not-configured") {
    return {
      tone: "warning",
      label: status.message,
      detail: status.detail,
      dotClassName: "bg-amber-500 shadow-[0_0_0_3px_rgb(245_158_11_/_0.16)]"
    };
  }

  if (status.state === "server-offline" || status.state === "holyrics-offline") {
    return {
      tone: "danger",
      label: status.message,
      detail: status.detail,
      dotClassName: "bg-destructive shadow-[0_0_0_3px_rgb(220_38_38_/_0.14)]"
    };
  }

  return {
    tone: "neutral",
    label: status.message,
    detail: status.detail,
    dotClassName: "bg-muted-foreground/55"
  };
}
