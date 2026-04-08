import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-border-default px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-accent-500">DILEMMA</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="rounded-md border border-border-default px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-bg-hover"
          >
            ログイン
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md bg-accent-500 px-4 py-2 text-sm font-medium text-text-on-accent transition-colors hover:bg-accent-600"
          >
            無料で始める
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium tracking-wider text-accent-500">
            パーソナルトレーナーのフライトシミュレータ
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl">
            仮想のクライアントを壊し、
            <br />
            現実のクライアントを救え。
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-text-secondary">
            DILEMMAは、AT（怪我予防）とS&C（機能向上）の葛藤を
            <br className="hidden md:block" />
            V7推論エンジンで再現する臨床意思決定シミュレータです。
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/sign-up"
              className="rounded-md bg-accent-500 px-8 py-3 text-base font-semibold text-text-on-accent transition-colors hover:bg-accent-600"
            >
              無料でシミュレーションを始める
            </Link>
          </div>
          <p className="mt-4 text-sm text-text-tertiary">
            月3シナリオまで無料 — クレジットカード不要
          </p>
        </div>
      </main>

      <footer className="border-t border-border-default px-6 py-6 text-center text-sm text-text-tertiary">
        &copy; 2026 HACHI Inc. All rights reserved.
      </footer>
    </div>
  );
}
