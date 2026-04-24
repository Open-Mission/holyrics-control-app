import { PageHeader } from "@/components/PageHeader";

export function SettingsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Ajustes"
        description="Configurações locais serão adicionadas quando a integração for definida."
      />
      <div className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
        Módulo ainda não implementado.
      </div>
    </section>
  );
}
