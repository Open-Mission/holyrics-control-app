import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, KeyRound, PlugZap, Save, Search, ShieldCheck, TestTube2, XCircle } from "lucide-react";

import type {
  HolyricsConfigStatus,
  HolyricsConfigTestResult,
  SaveHolyricsConfigRequest
} from "@holyrics-control/shared";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

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

type PermissionGroup = {
  title: string;
  description: string;
  match: (permission: string) => boolean;
};

const permissionGroups: PermissionGroup[] = [
  {
    title: "Autenticacao e permissoes",
    description: "Token, metadados e verificacao de acesso.",
    match: (permission) => ["GetTokenInfo", "CheckPermissions"].includes(permission)
  },
  {
    title: "Musicas, letras e textos",
    description: "Biblioteca de musicas, letras, textos e versiculos.",
    match: (permission) => /(Lyrics|Song|Text|Verse)/.test(permission)
  },
  {
    title: "Midia e arquivos",
    description: "Audios, videos, imagens e execucao de arquivos.",
    match: (permission) => /(Audio|Video|Image|Media|File|Duration)/.test(permission)
  },
  {
    title: "Playlists",
    description: "Filas de musicas e midias usadas no culto.",
    match: (permission) => /(Playlist|NextSong|NextMedia|PreviousSong|PreviousMedia)/.test(permission)
  },
  {
    title: "Apresentacao",
    description: "Controle da apresentacao atual, slides, temas e fundos.",
    match: (permission) =>
      /(Presentation|Slide|F8|ActionNext|ActionPrevious|ActionGoTo|Background|Theme|Thumbnail|QuickPresentation)/.test(
        permission
      )
  },
  {
    title: "Avisos, mensagens e quiz",
    description: "Avisos, mensagens customizadas, countdown e quiz.",
    match: (permission) => /(Announcement|CustomMessage|Countdown|Quiz|Alert)/.test(permission)
  },
  {
    title: "Painel de comunicacao",
    description: "Timers, chamadas de atencao e textos do painel.",
    match: (permission) => /CommunicationPanel/.test(permission)
  },
  {
    title: "Display, wallpaper e presets",
    description: "Tela, wallpaper, traducoes, logos e modelos visuais.",
    match: (permission) =>
      /(Wallpaper|Display|Transition|Translation|Logo|Preset|StyledModel|ColorMap|Footer|Hue)/.test(permission)
  },
  {
    title: "Biblia e runtime",
    description: "Biblia, ambiente, sync, entrada e informacoes do sistema.",
    match: (permission) =>
      /(Bible|Runtime|Sync|InterfaceInput|Version|HolyricsPlan|APIServer|RealTimeSongKey|Bpm|DrawLots)/.test(
        permission
      )
  },
  {
    title: "Agenda, historico e equipes",
    description: "Agendas, historicos, grupos, membros, equipes e eventos.",
    match: (permission) =>
      /(Schedule|History|Histories|Group|Groups|Team|Teams|Member|Members|Role|Roles|Service|Services|Event|Events|Module)/.test(
        permission
      )
  },
  {
    title: "Automacoes, APIs e regras",
    description: "Scripts, APIs, favoritos, gatilhos, tarefas, MIDI e regras.",
    match: (permission) =>
      /(Favorite|Api|Apis|Script|ModuleAction|RunActions|Trigger|ScheduledTask|GlobalSettings|Midi|Rule)/.test(
        permission
      )
  },
  {
    title: "Itens e mutacoes",
    description: "Criacao, edicao e remocao de itens e alteracoes operacionais.",
    match: (permission) => /(CreateItem|EditItem|DeleteItem|AddSongs|RemoveSongs|SetCurrentSchedule)/.test(permission)
  }
];

function parsePermissions(permissions: string | null) {
  if (!permissions) {
    return [];
  }

  return [...new Set(permissions.split(",").map((permission) => permission.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function groupPermissions(permissions: string[]) {
  const remaining = new Set(permissions);
  const grouped = permissionGroups
    .map((group) => {
      const items = permissions.filter((permission) => remaining.has(permission) && group.match(permission));

      for (const item of items) {
        remaining.delete(item);
      }

      return {
        ...group,
        items
      };
    })
    .filter((group) => group.items.length > 0);

  if (remaining.size > 0) {
    grouped.push({
      title: "Outras permissoes",
      description: "Acoes retornadas pelo Holyrics sem grupo conhecido nesta interface.",
      match: () => false,
      items: [...remaining].sort((a, b) => a.localeCompare(b))
    });
  }

  return grouped;
}

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
  const [permissionsOpen, setPermissionsOpen] = useState(false);
  const [permissionSearch, setPermissionSearch] = useState("");

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
      setPermissionsOpen(Boolean(result.permissions));
      setMessage("Conexao com o Holyrics validada.");
    } catch (error) {
      setTestState("error");
      setMessage(error instanceof Error ? error.message : "Falha ao testar conexao.");
    }
  }

  const configuredLabel = status.configured ? "Configurado" : "Pendente";
  const sourceLabel =
    status.source === "env" ? "Variaveis de ambiente" : status.source === "local" ? "Arquivo local" : "Sem fonte";
  const permissions = useMemo(() => parsePermissions(testResult?.permissions ?? null), [testResult?.permissions]);
  const filteredPermissions = useMemo(() => {
    const query = permissionSearch.trim().toLowerCase();

    if (!query) {
      return permissions;
    }

    return permissions.filter((permission) => permission.toLowerCase().includes(query));
  }, [permissionSearch, permissions]);
  const groupedPermissions = useMemo(() => groupPermissions(filteredPermissions), [filteredPermissions]);

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
          <div className="rounded-md border bg-secondary p-3 text-sm text-secondary-foreground">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-secondary-foreground">
                  Holyrics {testResult.version ?? "sem versao informada"}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {permissions.length > 0
                    ? `${permissions.length} permissoes retornadas pelo token.`
                    : "O Holyrics nao retornou permissoes para este token."}
                </p>
              </div>
              <Button
                className="gap-2"
                disabled={permissions.length === 0}
                onClick={() => setPermissionsOpen(true)}
                type="button"
                variant="outline"
              >
                <ShieldCheck className="size-4" />
                Ver permissoes
              </Button>
            </div>
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

      <Sheet open={permissionsOpen} onOpenChange={setPermissionsOpen}>
        <SheetContent>
          <SheetHeader>
            <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <KeyRound className="size-5" />
            </div>
            <SheetTitle>Permissoes do Holyrics</SheetTitle>
            <SheetDescription>
              {permissions.length} permissoes retornadas por este token
              {testResult?.version ? ` no Holyrics ${testResult.version}` : ""}.
            </SheetDescription>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-5 pb-5">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="h-11 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Buscar permissao"
                value={permissionSearch}
                onChange={(event) => setPermissionSearch(event.target.value)}
              />
            </label>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
              {groupedPermissions.length > 0 ? (
                groupedPermissions.map((group) => (
                  <section key={group.title} className="rounded-lg border bg-card p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-card-foreground">{group.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{group.description}</p>
                      </div>
                      <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                        {group.items.length}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((permission) => (
                        <span
                          key={permission}
                          className="rounded-md border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  Nenhuma permissao encontrada para a busca.
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
