import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export function HomePage() {
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
        <p className="text-sm font-medium text-secondary-foreground">Status da base</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Nenhuma integração funcional foi ativada nesta etapa.
        </p>
        <Button className="mt-4 w-full sm:w-auto" variant="secondary">
          Pronto para configurar
        </Button>
      </div>
    </section>
  );
}
