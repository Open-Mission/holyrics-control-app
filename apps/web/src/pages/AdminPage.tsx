import { PageHeader } from "@/components/PageHeader";

export function AdminPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Admin"
        description="Área preparada para administração e recursos operacionais futuros."
      />
      <div className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
        Módulo ainda não implementado.
      </div>
    </section>
  );
}
