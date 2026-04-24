type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="space-y-2 py-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Holyrics Control
      </p>
      <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">{title}</h1>
      {description ? (
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
