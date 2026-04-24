import { useEffect, useState } from "react";
import { CheckCircle2, PlugZap, Save, TestTube2, XCircle } from "lucide-react";

import type {
  HolyricsConfigStatus,
  HolyricsConfigTestResult,
  SaveHolyricsConfigRequest
} from "@holyrics-control/shared";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

type RequestState = "idle" | "loading" | "success" | "error";

type ApiError = {
  error?: string;
};

const emptyStatus: HolyricsConfigStatus = {
  configured: false,
  source: "none",
  baseUrl: null,
  tokenConfigured: false,
  tokenPreview: null
};

async function readApiError(response: Response) {
  try {
    const payload = (await response.json()) as ApiError;
    return payload.error ?? "Nao foi possivel concluir a operacao.";
  } catch {
    return "Nao foi possivel concluir a operacao.";
  }
}

async function fetchHolyricsConfig() {
  const response = await fetch("/api/holyrics/config");

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as HolyricsConfigStatus;
}

async function saveHolyricsConfig(input: SaveHolyricsConfigRequest) {
  const response = await fetch("/api/holyrics/config", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as HolyricsConfigStatus;
}

async function testHolyricsConfig() {
  const response = await fetch("/api/holyrics/config/test", {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as HolyricsConfigTestResult;
}

export function SettingsPage() {
  const [status, setStatus] = useState<HolyricsConfigStatus>(emptyStatus);
  const [baseUrl, setBaseUrl] = useState("");
  const [token, setToken] = useState("");
  const [loadState, setLoadState] = useState<RequestState>("loading");
  const [saveState, setSaveState] = useState<RequestState>("idle");
  const [testState, setTestState] = useState<RequestState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<HolyricsConfigTestResult | null>(null);

  useEffect(() => {
    let active = true;

    fetchHolyricsConfig()
      .then((nextStatus) => {
        if (!active) {
          return;
        }

        setStatus(nextStatus);
        setBaseUrl(nextStatus.baseUrl ?? "");
        setLoadState("success");
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }

        setMessage(error instanceof Error ? error.message : "Falha ao carregar configuracao.");
        setLoadState("error");
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState("loading");
    setMessage(null);
    setTestResult(null);

    try {
      const nextStatus = await saveHolyricsConfig({ baseUrl, token });
      setStatus(nextStatus);
      setBaseUrl(nextStatus.baseUrl ?? baseUrl.trim());
      setToken("");
      setSaveState("success");
      setMessage(
        nextStatus.source === "env"
          ? "Configuracao local salva, mas as variaveis de ambiente continuam como fonte ativa."
          : "Configuracao do Holyrics salva."
      );
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "Falha ao salvar configuracao.");
    }
  }

  async function handleTest() {
    setTestState("loading");
    setMessage(null);
    setTestResult(null);

    try {
      const result = await testHolyricsConfig();
      setTestResult(result);
      setTestState("success");
      setMessage("Conexao com o Holyrics validada.");
    } catch (error) {
      setTestState("error");
      setMessage(error instanceof Error ? error.message : "Falha ao testar conexao.");
    }
  }

  const configuredLabel = status.configured ? "Configurado" : "Pendente";
  const sourceLabel =
    status.source === "env" ? "Variaveis de ambiente" : status.source === "local" ? "Arquivo local" : "Sem fonte";

  return (
    <section className="space-y-6">
      <PageHeader
        title="Ajustes"
        description="Configure a conexao local com o Holyrics sem expor o token no navegador."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
          <div className="mt-3 flex items-center gap-2">
            {status.configured ? (
              <CheckCircle2 className="size-5 text-emerald-600" />
            ) : (
              <XCircle className="size-5 text-destructive" />
            )}
            <p className="text-sm font-medium text-card-foreground">{configuredLabel}</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Fonte ativa</p>
          <p className="mt-3 text-sm font-medium text-card-foreground">{sourceLabel}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Token</p>
          <p className="mt-3 text-sm font-medium text-card-foreground">
            {status.tokenPreview ?? "Nao configurado"}
          </p>
        </div>
      </div>

      <form className="space-y-4 rounded-lg border bg-card p-5 shadow-sm" onSubmit={handleSave}>
        <div className="flex items-center gap-2">
          <PlugZap className="size-5 text-primary" />
          <h2 className="text-base font-semibold text-card-foreground">Conexao Holyrics</h2>
        </div>

        {loadState === "loading" ? (
          <p className="text-sm text-muted-foreground">Carregando configuracao...</p>
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-medium text-card-foreground">URL do Holyrics</span>
          <input
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            inputMode="url"
            placeholder="http://localhost:8091"
            value={baseUrl}
            onChange={(event) => setBaseUrl(event.target.value)}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-card-foreground">Token de acesso</span>
          <input
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder={status.tokenConfigured ? "Informe um novo token para substituir" : "Cole o token do Holyrics"}
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
          />
        </label>

        {message ? (
          <div
            className={`rounded-md border px-3 py-2 text-sm ${
              saveState === "error" || testState === "error" || loadState === "error"
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-primary/20 bg-primary/10 text-foreground"
            }`}
          >
            {message}
          </div>
        ) : null}

        {testResult ? (
          <div className="rounded-md border bg-secondary px-3 py-2 text-sm text-secondary-foreground">
            Holyrics {testResult.version ?? "sem versao informada"}
            {testResult.permissions ? ` - permissoes: ${testResult.permissions}` : ""}
          </div>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="gap-2" disabled={saveState === "loading"} type="submit">
            <Save className="size-4" />
            {saveState === "loading" ? "Salvando..." : "Salvar configuracao"}
          </Button>
          <Button
            className="gap-2"
            disabled={!status.configured || testState === "loading"}
            onClick={handleTest}
            type="button"
            variant="secondary"
          >
            <TestTube2 className="size-4" />
            {testState === "loading" ? "Testando..." : "Testar conexao"}
          </Button>
        </div>

        {status.source === "env" ? (
          <p className="text-xs leading-5 text-muted-foreground">
            As variaveis de ambiente tem prioridade sobre a configuracao salva pela interface.
          </p>
        ) : null}
      </form>
    </section>
  );
}
