import { HolyricsConnectionIndicator } from "@/components/HolyricsConnectionIndicator";
import { PageHeader } from "@/components/PageHeader";

const MOBILE_REFRESH_INTERVAL_MS = 60_000;

export function ServicePage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Culto"
        description="Espaço reservado para os controles do culto nas próximas etapas."
      />
      <HolyricsConnectionIndicator refreshIntervalMs={MOBILE_REFRESH_INTERVAL_MS} variant="mini" />
      <div className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
        Módulo ainda não implementado.
      </div>
    </section>
  );
}
