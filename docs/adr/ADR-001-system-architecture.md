# ADR-001: DILEMMA システムアーキテクチャ

**ステータス**: 承認済み
**日付**: 2026-04-08
**決定者**: 05-architect

---

## 決定

DILEMMA（パーソナルトレーナー向け臨床意思決定シミュレータ）のシステムアーキテクチャとして、
Next.js 15 (App Router) + Hono v4 API統合 + Neon PostgreSQL + Better Auth + Go推論エンジン連携の構成を採用する。

## 状況

- Pace-platform内の1機能としてDILEMMAを構築する必要がある
- Supabase Free枠はPACE + Oblaatで使用済み（3プロジェクト目は$25/月）
- ローンチまで完全無料（$0/月）の制約
- V7推論エンジン（Go製 pace-inference）との連携が必須
- LLM出力を判定値に使用禁止（RULES.md §6-6）
- 100ユーザー同時接続をPhase 1で対応

## 選択肢

### 案A: Next.js + Hono統合 + Neon + Better Auth（採用）

- Hono v4をNext.js内に統合（`app/api/[...route]/route.ts`）
- Neon PostgreSQL Free + Drizzle ORM
- Better Auth（OSS）で認証
- Vercel Hobby（Free）でデプロイ

### 案B: Next.js + Supabase（不採用）

- 不採用理由: Supabase Free枠が使い切られており、$25/月のコストが発生
- メリット: RLS・認証が標準搭載
- デメリット: コスト制約違反

### 案C: Next.js + tRPC + PlanetScale（不採用）

- 不採用理由: PlanetScaleはpgvector非対応。RAG検索にpgvectorが必須
- メリット: TypeScript End-to-End型安全性
- デメリット: ベクトル検索にセカンダリDB（Pinecone等）が必要でコスト増

## 結果

### メリット
- 完全無料でMVPまで到達可能
- Hono v4はEdge Runtime対応でVercel Hobbyプランと相性良好
- Drizzle ORMのマイグレーション管理でスキーマ変更の追跡が容易
- Better AuthはNeonに直接テーブル作成でき、追加コストゼロ
- pgvectorでエクササイズDBのセマンティック検索が実現

### デメリット
- Neon Free枠のコールドスタート（非アクティブ5分後に1-2秒遅延）→ keep-alive pingで対策
- Better Authは比較的新しいOSSで、Supabase Authほどの実績がない → テストで担保
- Vercel Hobbyプランの制限（Serverless Function実行時間10秒、帯域100GB/月）→ Phase 1では十分

### 影響を受けるエージェント
- @06-data-engineer: Drizzle ORMスキーマ設計、Neon接続設定
- @04-backend: Hono APIエンドポイント実装、Better Auth統合
- @03-frontend: Next.js 15 App Router、RSC活用
- @07-ml-engineer: Gemini API統合、pgvector RAG

## レイヤー分離方針

```
┌─────────────────────────────────────────────────────────┐
│  フロントエンド（Vercel Edge Network）                      │
│  Next.js 15 App Router + RSC + Tailwind v4 + Framer     │
│  → SSR / ISR / 静的アセット配信                            │
├─────────────────────────────────────────────────────────┤
│  API層（Vercel Serverless Functions）                      │
│  Hono v4（app/api/[...route]/route.ts 統合）               │
│  → 認証検証 / Zodバリデーション / Rate Limit / CORS         │
├─────────────────────────────────────────────────────────┤
│  DILEMMAラッパーAPI（Hono内ルート）                          │
│  → 生活ノイズ→Z-score変換 / 状態遷移管理 / セッション制御      │
├─────────────────────────────────────────────────────────┤
│  推論層（外部サービス / 同一Vercel内TSフォールバック）           │
│  Go pace-inference: 8ms/6.1MB リアルタイム推論               │
│  TSフォールバック: Go障害時の代替計算                          │
├─────────────────────────────────────────────────────────┤
│  AI層（外部API）                                           │
│  Gemini 2.0 Flash Free Tier                               │
│  → 3層ガード: サニタイズ → 有害検出 → 出力検証                │
│  → セリフ生成のみ（判定値生成禁止）                           │
├─────────────────────────────────────────────────────────┤
│  データ層（Neon PostgreSQL Free）                           │
│  Drizzle ORM + pgvector                                   │
│  → スキーママイグレーション / アプリケーション層RLS              │
│  → エクササイズDB RAG検索                                    │
├─────────────────────────────────────────────────────────┤
│  課金層（Stripe）                                          │
│  → クレジット購入 / Webhook / 冪等性 / 使用量追跡             │
├─────────────────────────────────────────────────────────┤
│  監視層                                                    │
│  Sentry Free（5Kイベント/月） + Vercel Analytics             │
│  → 構造化ログ / PIIマスキング / Web Vitals                   │
└─────────────────────────────────────────────────────────┘
```
