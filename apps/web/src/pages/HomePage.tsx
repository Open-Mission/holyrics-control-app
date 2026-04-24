import { useEffect, useState } from "react";
import { CheckCircle2, Settings, XCircle } from "lucide-react";

import type { HolyricsConfigStatus } from "@holyrics-control/shared";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const emptyStatus: HolyricsConfigStatus = {
  configured: false,
  source: "none",
  baseUrl: null,
  tokenConfigured: false,
  tokenPreview: null
};

export function HomePage() {
  const [status, setStatus] = useState<HolyricsConfigStatus>(emptyStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/holyrics/config")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao carregar status.");
        }

        return response.json() as Promise<HolyricsConfigStatus>;
      })
      .then((nextStatus) => {
        if (!active) {
          return;
        }

        setStatus(nextStatus);
        setLoading(false);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setStatus(emptyStatus);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="flex flex-1 flex-col gap-6">
      <PageHeader
        title="Holyrics Control"
        description="Base inicial para controle local do Holyrics em cultos, ensaios e operações da igreja."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-card-foreground">Ambiente local</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Preparado para rodar no computador da igreja e ser acessado por dispositivos na rede.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-card-foreground">Evolução por módulos</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Estrutura pronta para futuras áreas de apresentação, músicas, mídia e Bíblia.
          </p>
        </div>
      </div>

      <div className="mt-auto rounded-lg border bg-secondary p-4">
        <div className="flex items-center gap-2">
          {status.configured ? (
            <CheckCircle2 className="size-5 text-emerald-600" />
          ) : (
            <XCircle className="size-5 text-destructive" />
          )}
          <p className="text-sm font-medium text-secondary-foreground">Integracao Holyrics</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {loading
            ? "Verificando configuracao local..."
            : status.configured
              ? `Conectada via ${status.source === "env" ? "variaveis de ambiente" : "arquivo local"} em ${status.baseUrl}.`
              : "Informe a URL e o token do Holyrics para ativar a integracao."}
        </p>
        <Button asChild className="mt-4 w-full gap-2 sm:w-auto" variant="secondary">
          <a href="/settings">
            <Settings className="size-4" />
            {status.configured ? "Ver ajustes" : "Configurar agora"}
          </a>
        </Button>
      </div>
    </section>
  );
}
