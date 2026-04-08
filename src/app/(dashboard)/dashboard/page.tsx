export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-text-primary">
        ダッシュボード
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border-default bg-bg-elevated p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="text-sm text-text-secondary">完了シナリオ</p>
          <p className="mt-1 text-3xl font-bold text-text-primary">0</p>
        </div>
        <div className="rounded-lg border border-border-default bg-bg-elevated p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="text-sm text-text-secondary">成功率</p>
          <p className="mt-1 text-3xl font-bold text-success">—</p>
        </div>
        <div className="rounded-lg border border-border-default bg-bg-elevated p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="text-sm text-text-secondary">残りクレジット</p>
          <p className="mt-1 text-3xl font-bold text-accent-500">3</p>
          <p className="mt-1 text-xs text-text-tertiary">無料枠（月3シナリオ）</p>
        </div>
      </div>
    </div>
  );
}
