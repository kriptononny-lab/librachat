export default function Loading() {
  return (
    <div className="container-site py-20 animate-pulse">
      <div className="space-y-4 max-w-2xl mx-auto">
        <div
          className="h-10 rounded-lg"
          style={{ background: "var(--color-neutral-100)" }}
        />
        <div
          className="h-6 rounded-lg w-3/4"
          style={{ background: "var(--color-neutral-100)" }}
        />
        <div
          className="h-6 rounded-lg w-1/2"
          style={{ background: "var(--color-neutral-100)" }}
        />
      </div>
    </div>
  );
}
