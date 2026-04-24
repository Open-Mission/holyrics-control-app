import { PageHeader } from "@/components/PageHeader";

export function VideosPage() {
  return (
    <div className="flex min-h-[calc(100dvh-160px)] flex-col gap-6">
      <PageHeader title="Vídeos" description="Gerenciamento de vídeos do Holyrics" />
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 text-center shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-2xl font-bold tracking-tight">
            Nenhum vídeo encontrado
          </h3>
          <p className="text-sm text-muted-foreground">
            A integração com a API do Holyrics para vídeos será implementada em breve.
          </p>
        </div>
      </div>
    </div>
  );
}
