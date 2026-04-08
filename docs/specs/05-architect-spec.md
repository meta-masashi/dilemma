# DILEMMA アーキテクチャ設計書

**バージョン**: 1.0.0
**作成日**: 2026-04-08
**担当**: 05-architect（SREアーキテクトエージェント）
**入力**: PROJECT.md v1.2.0 + pm-plan-v1.0.0.md
**ステータス**: 初版

---

## 1. ディレクトリ構造

```
dilemma/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # CI: lint → type-check → test → build
│       └── deploy.yml                # CD: migrate → Vercel deploy → verify → Slack通知
├── docs/
│   ├── adr/
│   │   ├── ADR-001-system-architecture.md
│   │   └── ADR-002-neon-better-auth.md
│   └── specs/
│       ├── 05-architect-spec.md      # 本ファイル
│       └── pm-plan-v1.0.0.md
├── public/
│   ├── fonts/                        # Noto Sans JP（セルフホスト）
│   └── images/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (auth)/                   # 認証ページグループ
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx
│   │   │   └── sign-up/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/              # 認証済みページグループ
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # ダッシュボード
│   │   │   ├── scenarios/
│   │   │   │   ├── page.tsx          # シナリオ選択
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # シミュレーション画面（3カラム）
│   │   │   ├── session/
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx      # セッション進行
│   │   │   │       ├── aar/
│   │   │   │       │   └── page.tsx  # AAR画面
│   │   │   │       └── timeline/
│   │   │   │           └── page.tsx  # タイムトラベル画面
│   │   │   ├── profile/
│   │   │   │   └── page.tsx          # プロフィール/設定
│   │   │   └── billing/
│   │   │       └── page.tsx          # 課金管理
│   │   ├── api/
│   │   │   ├── [...route]/
│   │   │   │   └── route.ts          # Hono v4 統合エントリポイント
│   │   │   ├── auth/
│   │   │   │   └── [...all]/
│   │   │   │       └── route.ts      # Better Auth ハンドラ
│   │   │   └── cron/
│   │   │       └── keepalive/
│   │   │           └── route.ts      # Neon keep-alive ping
│   │   ├── layout.tsx                # ルートレイアウト
│   │   ├── page.tsx                  # ランディングページ
│   │   └── globals.css               # Tailwind v4 グローバルCSS
│   ├── server/                       # サーバーサイドロジック
│   │   ├── api/                      # Hono APIルーター
│   │   │   ├── index.ts              # Honoアプリ定義
│   │   │   ├── routes/
│   │   │   │   ├── scenarios.ts      # /api/scenarios
│   │   │   │   ├── sessions.ts       # /api/sessions
│   │   │   │   ├── exercises.ts      # /api/exercises（RAG検索）
│   │   │   │   ├── debate.ts         # /api/debate（ディベート）
│   │   │   │   ├── inference.ts      # /api/inference（V7連携）
│   │   │   │   ├── aar.ts            # /api/aar
│   │   │   │   ├── timeline.ts       # /api/timeline
│   │   │   │   ├── whatif.ts         # /api/whatif
│   │   │   │   ├── billing.ts        # /api/billing（Stripe）
│   │   │   │   └── health.ts         # /api/health（ヘルスチェック）
│   │   │   └── middleware/
│   │   │       ├── auth.ts           # Better Auth JWT検証ミドルウェア
│   │   │       ├── rate-limit.ts     # レートリミット（プラン別）
│   │   │       ├── credit-guard.ts   # クレジット残高チェック
│   │   │       └── error-handler.ts  # 統一エラーハンドリング
│   │   ├── auth/
│   │   │   └── index.ts              # Better Auth設定
│   │   ├── db/
│   │   │   ├── index.ts              # Drizzle ORM接続（Neon Serverless Driver）
│   │   │   ├── schema/
│   │   │   │   ├── index.ts          # スキーマ一括エクスポート
│   │   │   │   ├── users.ts          # users, user_profiles
│   │   │   │   ├── auth.ts           # Better Auth テーブル
│   │   │   │   ├── scenarios.ts      # scenarios, scenario_sessions
│   │   │   │   ├── sessions.ts       # session_turns, prescribed_menus
│   │   │   │   ├── exercises.ts      # exercises（pgvector embedding列含む）
│   │   │   │   ├── aar.ts            # aar_records
│   │   │   │   ├── timeline.ts       # timeline_snapshots, whatif_comparisons
│   │   │   │   ├── progress.ts       # user_progress
│   │   │   │   └── billing.ts        # subscriptions, usage_tracking
│   │   │   └── migrations/           # Drizzle自動生成マイグレーション
│   │   ├── services/
│   │   │   ├── dilemma-wrapper.ts    # DILEMMAラッパーAPI（生活ノイズ→Z-score変換）
│   │   │   ├── v7-inference.ts       # V7推論エンジン呼び出し（Go→TSフォールバック）
│   │   │   ├── ts-fallback.ts        # TSフォールバック推論実装
│   │   │   ├── state-machine.ts      # 状態遷移管理（Day 1→Day 2→...→Week End）
│   │   │   ├── gemini.ts             # Gemini API クライアント
│   │   │   ├── llm-agents/
│   │   │   │   ├── index.ts          # エージェント共通インターフェース
│   │   │   │   ├── sc-coach.ts       # S&C AI エージェント
│   │   │   │   ├── at-trainer.ts     # AT AI エージェント
│   │   │   │   ├── client-ai.ts      # クライアントAI エージェント
│   │   │   │   └── mentor-ai.ts      # AIメンター エージェント
│   │   │   ├── llm-guard/
│   │   │   │   ├── sanitizer.ts      # 入力サニタイズ（Layer 1）
│   │   │   │   ├── harm-detector.ts  # 有害検出（Layer 2）
│   │   │   │   └── output-validator.ts # 出力検証（Layer 3）
│   │   │   ├── exercise-rag.ts       # pgvector RAG検索
│   │   │   └── stripe.ts             # Stripe決済サービス
│   │   └── lib/
│   │       ├── z-score.ts            # 生活ノイズ→Z-score変換ロジック
│   │       ├── radar-calc.ts         # レーダーチャートデータ計算
│   │       └── constants.ts          # 定数定義
│   ├── components/                   # React UIコンポーネント
│   │   ├── ui/                       # 汎用UIコンポーネント（ボタン、入力等）
│   │   ├── auth/                     # 認証関連コンポーネント
│   │   ├── dashboard/                # ダッシュボード
│   │   ├── scenario/                 # シナリオ選択
│   │   ├── simulation/               # シミュレーション画面
│   │   │   ├── client-panel.tsx      # 左カラム: クライアント情報+レーダー
│   │   │   ├── debate-chat.tsx       # 中央カラム: ディベートチャット
│   │   │   └── prescription-panel.tsx # 右カラム: メニュー処方
│   │   ├── chart/
│   │   │   ├── radar-chart.tsx       # レーダーチャート（Recharts）
│   │   │   └── comparison-chart.tsx  # 比較レーダーチャート（オーバーレイ）
│   │   ├── timeline/
│   │   │   └── time-travel-slider.tsx # タイムトラベルスライダー
│   │   └── aar/                      # AAR表示コンポーネント
│   ├── hooks/                        # カスタムReact Hooks
│   │   ├── use-auth.ts
│   │   ├── use-session.ts
│   │   ├── use-debate.ts
│   │   └── use-inference.ts
│   ├── stores/                       # Zustand ストア
│   │   ├── session-store.ts          # セッション状態
│   │   ├── debate-store.ts           # ディベート状態
│   │   └── prescription-store.ts     # 処方状態
│   ├── lib/                          # クライアントユーティリティ
│   │   ├── api-client.ts             # React Query + fetch wrapper
│   │   └── utils.ts
│   └── types/                        # 共通型定義
│       ├── scenario.ts
│       ├── session.ts
│       ├── exercise.ts
│       ├── inference.ts
│       └── billing.ts
├── pace-inference/                   # Git submodule: Go推論エンジン
│   └── (既存リポジトリ参照)
├── drizzle.config.ts                 # Drizzle ORM設定
├── next.config.ts                    # Next.js設定
├── tailwind.config.ts                # Tailwind CSS v4設定
├── tsconfig.json
├── vitest.config.ts                  # Vitest設定
├── playwright.config.ts             # Playwright設定
├── vercel.json                       # Vercel設定（Cron含む）
├── package.json
├── .env.example                      # 環境変数テンプレート
├── .gitignore
├── .gitmodules                       # pace-inference submodule
├── PROJECT.md
└── README.md
```

---

## 2. Hono API 統合アーキテクチャ（Next.js内）

### エントリポイント

```typescript
// src/app/api/[...route]/route.ts
import { handle } from 'hono/vercel';
import { app } from '@/server/api';

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
```

### Honoアプリ定義

```typescript
// src/server/api/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { logger } from 'hono/logger';
import { zValidator } from '@hono/zod-validator';

import { authMiddleware } from './middleware/auth';
import { rateLimitMiddleware } from './middleware/rate-limit';
import { errorHandler } from './middleware/error-handler';

import { scenarioRoutes } from './routes/scenarios';
import { sessionRoutes } from './routes/sessions';
import { exerciseRoutes } from './routes/exercises';
import { debateRoutes } from './routes/debate';
import { inferenceRoutes } from './routes/inference';
import { aarRoutes } from './routes/aar';
import { timelineRoutes } from './routes/timeline';
import { whatifRoutes } from './routes/whatif';
import { billingRoutes } from './routes/billing';
import { healthRoutes } from './routes/health';

const app = new Hono().basePath('/api');

// グローバルミドルウェア
app.use('*', cors());
app.use('*', secureHeaders());
app.use('*', logger());
app.onError(errorHandler);

// ヘルスチェック（認証不要）
app.route('/health', healthRoutes);

// 認証必須ルート
app.use('/scenarios/*', authMiddleware);
app.use('/sessions/*', authMiddleware);
app.use('/exercises/*', authMiddleware);
app.use('/debate/*', authMiddleware);
app.use('/inference/*', authMiddleware);
app.use('/aar/*', authMiddleware);
app.use('/timeline/*', authMiddleware);
app.use('/whatif/*', authMiddleware);
app.use('/billing/*', authMiddleware);

// レートリミット（LLM関連ルート）
app.use('/debate/*', rateLimitMiddleware);
app.use('/aar/*', rateLimitMiddleware);

// ルート登録
app.route('/scenarios', scenarioRoutes);
app.route('/sessions', sessionRoutes);
app.route('/exercises', exerciseRoutes);
app.route('/debate', debateRoutes);
app.route('/inference', inferenceRoutes);
app.route('/aar', aarRoutes);
app.route('/timeline', timelineRoutes);
app.route('/whatif', whatifRoutes);
app.route('/billing', billingRoutes);

export { app };
export type AppType = typeof app;
```

### ルート設計

| エンドポイント | メソッド | 機能 | ミドルウェア |
|--------------|---------|------|------------|
| `/api/health` | GET | ヘルスチェック + Neon接続確認 | なし |
| `/api/scenarios` | GET | シナリオ一覧（固定5本） | auth |
| `/api/scenarios/:id` | GET | シナリオ詳細 | auth |
| `/api/sessions` | POST | 新規セッション開始 | auth, creditGuard |
| `/api/sessions/:id` | GET | セッション状態取得 | auth, ownerGuard |
| `/api/sessions/:id/turns` | POST | ターン進行（メニュー処方確定） | auth, ownerGuard |
| `/api/exercises` | GET | エクササイズ検索（テキスト + フィルタ） | auth |
| `/api/exercises/search` | POST | セマンティック検索（pgvector RAG） | auth |
| `/api/debate/:sessionId` | POST | ディベートターン送信 | auth, ownerGuard, rateLimit |
| `/api/debate/:sessionId/stream` | GET | ストリーミングレスポンス（SSE） | auth, ownerGuard |
| `/api/inference/:sessionId` | POST | V7推論実行 | auth, ownerGuard |
| `/api/aar/:sessionId` | GET | AAR取得 | auth, ownerGuard |
| `/api/aar/:sessionId` | POST | AAR生成（AIメンター） | auth, ownerGuard, rateLimit |
| `/api/timeline/:sessionId` | GET | タイムラインスナップショット一覧 | auth, ownerGuard |
| `/api/whatif/:sessionId` | POST | What-Ifシミュレーション実行 | auth, ownerGuard, creditGuard |
| `/api/billing/credits` | GET | クレジット残高 | auth |
| `/api/billing/checkout` | POST | Stripeチェックアウトセッション作成 | auth |
| `/api/billing/webhook` | POST | Stripe Webhook受信 | Stripe署名検証 |

---

## 3. DILEMMAラッパーAPI → V7推論エンジン連携

### データフロー

```
ユーザー操作
  │
  ▼
[1] メニュー処方確定
  │  POST /api/sessions/:id/turns
  │  body: { exercises: [...], sets: [...], reps: [...] }
  │
  ▼
[2] 生活ノイズ取得
  │  scenario.athlete_profile_json + 当日ランダム変動
  │  例: { sleep_hours: 5, alcohol_units: 3, desk_hours: 10, stress_level: 7 }
  │
  ▼
[3] Z-score変換（src/server/lib/z-score.ts）
  │  各生活ノイズ値を標準化
  │  sleep_z = (sleep_hours - μ_sleep) / σ_sleep
  │  alcohol_z = (alcohol_units - μ_alcohol) / σ_alcohol
  │  → composite_noise_z = Σ(weight_i * z_i)
  │
  ▼
[4] V7入力パラメータ構築（src/server/services/dilemma-wrapper.ts）
  │  {
  │    athlete_profile: { age, weight, height, fitness_level, ... },
  │    exercises: [{ id, name, sets, reps, load_kg, rest_sec }],
  │    noise_z_scores: { sleep_z, alcohol_z, desk_z, stress_z, composite_z },
  │    current_state: { day, accumulated_load, fatigue_index, ... },
  │    injury_history: [{ type, severity, days_since }]
  │  }
  │
  ▼
[5] V7推論エンジン呼び出し（src/server/services/v7-inference.ts）
  │  ┌─ Primary: Go pace-inference HTTP POST (8ms target)
  │  │   URL: ${PACE_INFERENCE_URL}/v7/predict
  │  │   Timeout: 5000ms
  │  └─ Fallback: TS実装（Go障害時）
  │      src/server/services/ts-fallback.ts
  │      ※同一アルゴリズムのTypeScript移植版
  │
  ▼
[6] V7出力
  │  {
  │    risk_scores: { lower_back: 0.72, knee: 0.15, shoulder: 0.08 },
  │    adaptation: { strength: +3, endurance: +1, flexibility: -2, ... },
  │    injury_event: null | { type: "disc_herniation", severity: "critical" },
  │    radar_data: { strength: 65, endurance: 45, flexibility: 30, ... },
  │    next_state: { day: 2, accumulated_load: 85, fatigue_index: 0.6, ... }
  │  }
  │
  ▼
[7] 状態遷移更新（src/server/services/state-machine.ts）
  │  session_turns に記録
  │  timeline_snapshots にスナップショット保存
  │  current_state を next_state で更新
  │
  ▼
[8] レスポンス返却
    {
      turn_number: 2,
      radar_data: { ... },
      injury_event: null | { ... },
      is_game_over: false,
      next_day_context: { ... }
    }
```

### V7推論呼び出しの耐障害設計

```typescript
// src/server/services/v7-inference.ts
export async function callV7Inference(input: V7Input): Promise<V7Output> {
  try {
    // Primary: Go推論エンジン
    const response = await fetch(`${env.PACE_INFERENCE_URL}/v7/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(5000), // 5秒タイムアウト
    });

    if (!response.ok) throw new Error(`V7 returned ${response.status}`);
    return await response.json();
  } catch (error) {
    // Fallback: TypeScript実装
    if (env.PACE_INFERENCE_TS_FALLBACK === 'true') {
      console.warn('[V7] Go inference failed, falling back to TS', error);
      return tsFallbackPredict(input);
    }
    throw error;
  }
}
```

### 状態遷移マシン

```typescript
// src/server/services/state-machine.ts

type SessionState = {
  day: number;                  // 現在の日数（1-based）
  accumulated_load: number;     // 累積負荷
  fatigue_index: number;        // 疲労指数 (0-1)
  injury_risk: Record<string, number>; // 部位別リスク
  radar: RadarData;             // レーダーチャートデータ
  status: 'active' | 'game_over' | 'completed';
};

// ゲームオーバー条件
const GAME_OVER_THRESHOLDS = {
  disc_herniation: 'critical',     // 腰椎ヘルニア
  meniscus_tear: 'critical',       // 半月板損傷
  acl_rupture: 'critical',         // ACL断裂
  impingement: 'severe',           // インピンジメント（重度）
};
```

---

## 4. Drizzle ORMスキーマ設計

### DB接続

```typescript
// src/server/db/index.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
```

### スキーマ概要（@06-data-engineer が詳細実装）

```typescript
// src/server/db/schema/users.ts
import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('user_role', [
  'student', 'pro_user', 'educator', 'team_admin', 'system_admin'
]);

export const planEnum = pgEnum('user_plan', ['free', 'credit', 'education']);

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull().unique(), // Better Auth user.id参照
  displayName: text('display_name'),
  affiliation: text('affiliation'),
  experienceYears: integer('experience_years'),
  specialty: text('specialty'),
  role: roleEnum('role').default('student'),
  plan: planEnum('plan').default('free'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// src/server/db/schema/exercises.ts（pgvector列含む）
import { pgTable, uuid, text, integer, jsonb, vector } from 'drizzle-orm/pg-core';

export const exercises = pgTable('exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  nameJa: text('name_ja').notNull(),
  category: text('category').notNull(),
  targetMuscles: jsonb('target_muscles').notNull(),     // string[]
  contraindications: jsonb('contraindications').notNull(), // { lower_back: 1-5, knee: 1-5, shoulder: 1-5 }
  equipment: text('equipment').notNull(),
  intensityLevel: integer('intensity_level').notNull(),   // 1-10
  modificationOptions: jsonb('modification_options'),      // string[]
  evidenceLevel: text('evidence_level'),
  sourceReference: text('source_reference'),
  embedding: vector('embedding', { dimensions: 768 }),     // pgvector
  createdAt: timestamp('created_at').defaultNow(),
});
```

### Better Auth テーブル

Better Authは以下のテーブルをNeon内に自動作成する:

| テーブル | 用途 |
|---------|------|
| `user` | ユーザーアカウント（email, name, image, emailVerified） |
| `session` | アクティブセッション（token, expiresAt, userId） |
| `account` | OAuth/Credential アカウント連携 |
| `verification` | メール認証トークン |

### インデックス設計

```sql
-- パフォーマンスクリティカルなインデックス
CREATE INDEX idx_scenario_sessions_user_status ON scenario_sessions(user_id, status);
CREATE INDEX idx_session_turns_session_turn ON session_turns(session_id, turn_number);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_usage_tracking_user_month ON usage_tracking(user_id, month);
CREATE INDEX idx_exercises_category ON exercises(category);
CREATE INDEX idx_exercises_embedding ON exercises USING ivfflat (embedding vector_cosine_ops) WITH (lists = 20);
```

---

## 5. 認証フロー（Better Auth → JWT → Hono）

### フロー図

```
[クライアント]
    │
    ├── POST /api/auth/sign-up  ──→ Better Auth → Neon user テーブル作成
    │                                         → user_profiles テーブル初期化
    │                                         → JWT(session token) 発行
    │                                         ← Set-Cookie: better-auth.session_token=xxx
    │
    ├── POST /api/auth/sign-in  ──→ Better Auth → Neon session テーブル検証
    │                                         ← Set-Cookie: better-auth.session_token=xxx
    │
    └── GET /api/scenarios       ──→ Hono authMiddleware
                                       │
                                       ├── Cookie から session_token 取得
                                       ├── Better Auth API: getSession(headers)
                                       ├── session.user を Context に設定
                                       ├── ✅ → next()
                                       └── ❌ → 401 Unauthorized
```

### Better Auth設定

```typescript
// src/server/auth/index.ts
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: { enabled: true },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7日間
    updateAge: 60 * 60 * 24,      // 1日ごとに更新
  },
  user: {
    additionalFields: {
      role: { type: 'string', defaultValue: 'student' },
      plan: { type: 'string', defaultValue: 'free' },
    },
  },
});
```

### Honoミドルウェア

```typescript
// src/server/api/middleware/auth.ts
import { createMiddleware } from 'hono/factory';
import { auth } from '../../auth';

type AuthEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
};

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  c.set('user', session.user);
  c.set('session', session.session);
  await next();
});
```

---

## 6. LLMエージェント呼び出しアーキテクチャ（3層ガード）

### アーキテクチャ

```
ユーザー入力（ディベートメッセージ）
    │
    ▼
[Layer 1: 入力サニタイズ] ── src/server/services/llm-guard/sanitizer.ts
    │  - HTMLタグ除去
    │  - プロンプトインジェクション検出パターン
    │  - 文字数制限（最大1000文字）
    │  - 禁止キーワードフィルタ
    │  ❌ → 400 Bad Request
    │
    ▼
[Layer 2: 有害検出] ── src/server/services/llm-guard/harm-detector.ts
    │  - Gemini Safety Settings（BLOCK_MEDIUM_AND_ABOVE）
    │  - カテゴリ別閾値:
    │    HARM_CATEGORY_HARASSMENT: BLOCK_MEDIUM_AND_ABOVE
    │    HARM_CATEGORY_HATE_SPEECH: BLOCK_MEDIUM_AND_ABOVE
    │    HARM_CATEGORY_SEXUALLY_EXPLICIT: BLOCK_LOW_AND_ABOVE
    │    HARM_CATEGORY_DANGEROUS_CONTENT: BLOCK_LOW_AND_ABOVE
    │  ❌ → 422 Content filtered
    │
    ▼
[Gemini 2.0 Flash API呼び出し]
    │  - システムプロンプト（エージェント固有）
    │  - 会話履歴（直近5ターンのみ送信）
    │  - max_output_tokens: 500
    │  - temperature: 0.7（S&C/AT AI）、0.9（クライアントAI）、0.3（メンターAI）
    │
    ▼
[Layer 3: 出力検証] ── src/server/services/llm-guard/output-validator.ts
    │  - 判定値の混入チェック（数値スコアを含む応答を拒否）
    │  - トークン数検証（500超過は切り捨て）
    │  - フォーマット検証（期待される応答構造）
    │  ❌ → 再生成（最大3回リトライ）→ 失敗時デフォルトレスポンス
    │
    ▼
レスポンス返却
```

### エージェント共通インターフェース

```typescript
// src/server/services/llm-agents/index.ts
export interface LLMAgent {
  role: 'sc_coach' | 'at_trainer' | 'client' | 'mentor';
  systemPrompt: string;
  temperature: number;
  maxOutputTokens: number;
  generate(context: AgentContext): Promise<AgentResponse>;
}

export interface AgentContext {
  sessionId: string;
  turnNumber: number;
  userMessage: string;
  conversationHistory: ConversationTurn[];
  scenarioContext: ScenarioContext;
  currentRadarData?: RadarData;
}

export interface AgentResponse {
  message: string;
  agentRole: string;
  tokenCount: number;
  filtered: boolean;
}
```

### レートリミット設計

```typescript
// src/server/api/middleware/rate-limit.ts
// インメモリ実装（Vercel Serverless: リクエスト間で状態共有なし）
// → Neon にrate_limit_logテーブルで永続化

const RATE_LIMITS = {
  free: { llmRequestsPerMinute: 10, scenariosPerMonth: 3 },
  credit: { llmRequestsPerMinute: 30, scenariosPerMonth: Infinity },
  education: { llmRequestsPerMinute: 30, scenariosPerMonth: Infinity },
};
```

---

## 7. CI/CD パイプライン

### CI（`.github/workflows/ci.yml`）

```
push/PR to main or develop
    │
    ▼
[1] lint-and-type-check
    │  npm run lint
    │  npm run type-check
    │
    ▼
[2] test-unit (needs: lint-and-type-check)
    │  npm run test:unit (Vitest)
    │
    ▼  ─── 並行 ───
    │                │
[3a] test-integration  [3b] test-e2e (Playwright)
    │                │
    ▼  ─── 合流 ───
    │
[4] build
    │  npm run build (Next.js)
    │
    ▼
    ✅ Green
```

### CD（`.github/workflows/deploy.yml`）

```
push to main (CI green後)
    │
    ▼
[1] migrate-database
    │  npm run db:migrate (Drizzle → Neon)
    │
    ▼
[2] deploy-vercel
    │  vercel --prod (amondnet/vercel-action)
    │
    ▼
[3] post-deploy-verify
    │  ├── Health check: GET /api/health (10回リトライ)
    │  ├── ✅ Slack通知 (成功)
    │  └── ❌ Slack通知 (失敗 + Actions URL)
```

### package.json scripts（@05-architect が定義）

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "test:unit": "vitest run",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

---

## 8. 環境変数管理

### ローカル開発

```
.env.example    → テンプレート（Git管理対象）
.env.local      → 実際の値（.gitignore対象、開発者ごと）
```

### Vercel環境変数

Vercel Dashboard → Settings → Environment Variables に以下を設定:

| 変数名 | Production | Preview | Development | 説明 |
|--------|:----------:|:-------:|:-----------:|------|
| `DATABASE_URL` | o | o | o | Neon接続文字列 |
| `BETTER_AUTH_SECRET` | o | o | o | 認証シークレット |
| `BETTER_AUTH_URL` | o | o | - | `https://dilemma.vercel.app` |
| `GEMINI_API_KEY` | o | o | o | Gemini API |
| `PACE_INFERENCE_URL` | o | - | - | Go推論エンジンURL |
| `PACE_INFERENCE_TS_FALLBACK` | o | o | o | TSフォールバック有効 |
| `STRIPE_SECRET_KEY` | o | o | o | Stripe秘密鍵 |
| `STRIPE_WEBHOOK_SECRET` | o | - | - | Stripe Webhook |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | o | o | o | Stripe公開鍵 |
| `NEXT_PUBLIC_APP_URL` | o | o | - | アプリURL |
| `NEXT_PUBLIC_SENTRY_DSN` | o | o | - | Sentry DSN |
| `SENTRY_AUTH_TOKEN` | o | - | - | ソースマップ用 |

### Neon コールドスタート対策

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/keepalive",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

```typescript
// src/app/api/cron/keepalive/route.ts
import { db } from '@/server/db';
import { sql } from 'drizzle-orm';

export async function GET(request: Request) {
  // Vercel Cron認証
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  await db.execute(sql`SELECT 1`);
  return new Response('OK', { status: 200 });
}
```

---

## 9. Vercel Free (Hobby) プランの制限と対策

| 制限 | 値 | DILEMMAでの対策 |
|------|-----|----------------|
| Serverless Function実行時間 | 10秒 | V7推論は5秒タイムアウト。LLMはストリーミング（SSE） |
| 帯域 | 100 GB/月 | Phase 1の100ユーザーでは十分 |
| ビルド時間 | 45分 | Next.js ISR活用で静的ページを最大化 |
| Cron Jobs | 2つ（1日1回 or 1時間1回） | keep-alive は `/5 * * * *`（5分ごと）→ Hobby制限に注意 ※1 |
| Edge Functions | 100万リクエスト/月 | Phase 1では十分 |

**※1 Vercel Hobby Cronの制限**: Hobbyプランでは`crons`の最小間隔が1日1回。
5分ごとのkeep-aliveは以下の代替案で対応:
- **案A**: Neonの`autosuspend_timeout`を最大値に設定（Free: 300秒固定、変更不可）
- **案B**: GitHub Actionsのschedule（`*/5 * * * *`）でcurlを叩く（publicリポジトリ: 無料）
- **案C**: 初回アクセス時のコールドスタート1-2秒を許容し、UXでローディング表示

→ **推奨: 案Bを採用**（GitHub Actionsで5分ごとにkeep-alive curl）

### GitHub Actions Keep-alive（追加ワークフロー）

```yaml
# .github/workflows/keepalive.yml
name: Neon Keep-alive

on:
  schedule:
    - cron: '*/5 * * * *'

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Neon via health endpoint
        run: curl -sf "${{ secrets.NEXT_PUBLIC_APP_URL }}/api/health" || true
```

---

## 10. 自律連鎖トリガー

アーキテクチャ・インフラ基盤の設計が完了しました。
以下のエージェントを並行して呼び出します。

```
@06-data-engineer:
  - Drizzle ORMスキーマの詳細実装（src/server/db/schema/）
  - Neon接続設定（Serverless Driver）
  - pgvector拡張のセットアップ
  - マイグレーション初期化
  - インデックス設計の実装
  - エクササイズDBシードデータ設計

@04-backend:
  - Hono APIエンドポイントの実装開始
  - Better Auth設定・統合
  - 認証ミドルウェア実装
  - DILEMMAラッパーAPI実装
  - V7推論エンジン連携サービス

@02-ui-ux:
  - デザイントークン定義（ダークモード基調）
  - 画面一覧・コンポーネント仕様書
  - 3カラムレイアウト仕様
  - レーダーチャート・タイムトラベルスライダーのUX仕様

共通の環境変数テンプレートは .env.example に記載済みです。
```

---

## 変更履歴

| 日付 | バージョン | 変更内容 |
|------|-----------|---------|
| 2026-04-08 | 1.0.0 | 初版作成。PROJECT.md v1.2.0 + pm-plan-v1.0.0.md からアーキテクチャ設計書を生成 |
