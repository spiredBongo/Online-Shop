export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="relative overflow-hidden">
      <div className="halo pointer-events-none absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 animate-drift" />
      <div className="relative py-14">
        {eyebrow && (
          <p className="animate-rise text-sm font-medium text-primary">
            {eyebrow}
          </p>
        )}
        <h1
          className="animate-rise mt-2 font-heading text-4xl font-semibold tracking-tight text-balance"
          style={{ animationDelay: "60ms" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="animate-rise mt-4 max-w-2xl text-pretty text-muted-foreground"
            style={{ animationDelay: "120ms" }}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
