import { RefreshCcw, Server, Settings } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  fetchHolyricsConnectionStatus,
  getHolyricsConnectionViewModel,
  getInitialHolyricsConnectionStatus,
  type HolyricsConnectionStatus
} from "@/lib/holyrics-connection";

const REFRESH_INTERVAL_MS = 30_000;

function getConnectionSource(status: HolyricsConnectionStatus) {
  if (status.state === "connected" || status.state === "holyrics-offline") {
    return status.baseUrl?.trim() || "URL configurada";
  }

  return "API local";
}

export function HolyricsConnectionCard() {
  const [status, setStatus] = useState<HolyricsConnectionStatus>(() => getInitialHolyricsConnectionStatus());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const requestIdRef = useRef(0);
  const mountedRef = useRef(false);

  const viewModel = useMemo(() => getHolyricsConnectionViewModel(status), [status]);
  const source = useMemo(() => getConnectionSource(status), [status]);

  const refresh = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsRefreshing(true);

    try {
      const nextStatus = await fetchHolyricsConnectionStatus();

      if (mountedRef.current && requestId === requestIdRef.current) {
        setStatus(nextStatus);
      }
    } finally {
      if (mountedRef.current && requestId === requestIdRef.current) {
        setIsRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void refresh();

    const intervalId = window.setInterval(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);

    return () => {
      mountedRef.current = false;
      window.clearInterval(intervalId);
    };
  }, [refresh]);

  return (
    <div className="rounded-md border border-sidebar-border bg-sidebar-accent/35 px-3 py-2.5 text-sidebar-foreground">
      <div className="flex min-w-0 items-start gap-2">
        <span
          aria-hidden="true"
          className={`mt-1.5 size-2 shrink-0 rounded-full ${viewModel.dotClassName}`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <p className="min-w-0 flex-1 truncate text-xs font-medium leading-5">{viewModel.label}</p>
            {status.state === "not-configured" ? (
              <Button
                asChild
                className="-mr-1 size-7 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                size="icon-sm"
                title="Configuracoes"
                variant="ghost"
              >
                <Link aria-label="Abrir configuracoes" to="/settings">
                  <Settings aria-hidden="true" className="size-3.5" strokeWidth={2.2} />
                </Link>
              </Button>
            ) : null}
            <Button
              aria-label="Atualizar conexao"
              className="-mr-1 size-7 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              disabled={isRefreshing}
              onClick={() => {
                void refresh();
              }}
              size="icon-sm"
              title="Atualizar"
              type="button"
              variant="ghost"
            >
              <RefreshCcw
                aria-hidden="true"
                className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                strokeWidth={2.2}
              />
            </Button>
          </div>
          <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[11px] leading-4 text-sidebar-foreground/65">
            <Server aria-hidden="true" className="size-3 shrink-0" strokeWidth={2.2} />
            <span className="truncate">{source}</span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-sidebar-foreground/55">{viewModel.detail}</p>
        </div>
      </div>
    </div>
  );
}
