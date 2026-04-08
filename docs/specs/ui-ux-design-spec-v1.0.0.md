# DILEMMA UI/UX デザイン仕様書

**バージョン**: 1.0.0
**作成日**: 2026-04-08
**担当**: 02-ui-ux（UI/UXデザイナーエージェント）
**入力**: PROJECT.md v1.2.0 + pm-plan-v1.0.0.md
**最上位視覚源泉**: `/DESIGN.md` v1.0.0
**ステータス**: CEO承認待ち

---

## 1. デザイントークン定義（tailwind.config.ts 向け）

DESIGN.md Section 2-3 から派生。Tailwind CSS v4 の CSS-first 設定方式に対応。

```css
/* app/globals.css — Tailwind v4 CSS-first テーマ定義 */
/* Light/Dark dual theme: CSS変数ベース、darkMode: 'class' */

@layer base {
  :root {
    /* Background Hierarchy — Light Mode */
    --bg-primary:  #FAFBFC;
    --bg-elevated: #FFFFFF;
    --bg-surface:  #F3F4F6;
    --bg-hover:    #E5E7EB;
    --bg-active:   #D1D5DB;
    /* Text — Light Mode */
    --text-primary:   #1F2328;
    --text-secondary: #656D76;
    --text-tertiary:  #8C959F;
    --text-on-accent: #FFFFFF;
    /* Semantic — Light Mode */
    --success:       #1A7F37;
    --success-muted: rgba(26,127,55,0.10);
    --warning:       #9A6700;
    --warning-muted: rgba(154,103,0,0.10);
    --danger:        #CF222E;
    --danger-muted:  rgba(207,34,46,0.10);
    --info:          #0969DA;
    --info-muted:    rgba(9,105,218,0.10);
    /* Radar — Light Mode */
    --radar-current:      #FC4C02;
    --radar-current-fill: rgba(252,76,2,0.15);
    --radar-target:       #656D76;
    --radar-danger:       #CF222E;
    --radar-axis:         #D0D7DE;
    --radar-label:        #656D76;
    /* Border — Light Mode */
    --border-default: #D0D7DE;
    --border-muted:   #E5E7EB;
    --border-accent:  #FC4C02;
    /* Shadow — Light Mode */
    --shadow-card: 0 1px 3px rgba(0,0,0,0.08);
    --shadow-elevated: 0 4px 12px rgba(0,0,0,0.10);
    --shadow-overlay: 0 8px 24px rgba(0,0,0,0.12);
  }

  .dark {
    /* Background Hierarchy — Dark Mode */
    --bg-primary:  #0D1117;
    --bg-elevated: #161B22;
    --bg-surface:  #1C2128;
    --bg-hover:    #21262D;
    --bg-active:   #282E36;
    /* Text — Dark Mode */
    --text-primary:   #E6EDF3;
    --text-secondary: #8B949E;
    --text-tertiary:  #6E7681;
    --text-on-accent: #FFFFFF;
    /* Semantic — Dark Mode */
    --success:       #2EA043;
    --success-muted: rgba(46,160,67,0.15);
    --warning:       #D29922;
    --warning-muted: rgba(210,153,34,0.15);
    --danger:        #F85149;
    --danger-muted:  rgba(248,81,73,0.15);
    --info:          #58A6FF;
    --info-muted:    rgba(88,166,255,0.15);
    /* Radar — Dark Mode */
    --radar-current:      #FC4C02;
    --radar-current-fill: rgba(252,76,2,0.20);
    --radar-target:       #8B949E;
    --radar-danger:       #F85149;
    --radar-axis:         #30363D;
    --radar-label:        #8B949E;
    /* Border — Dark Mode */
    --border-default: #30363D;
    --border-muted:   #21262D;
    --border-accent:  #FC4C02;
    /* Shadow — Dark Mode (luminance stepping, minimal shadows) */
    --shadow-card: none;
    --shadow-elevated: none;
    --shadow-overlay: 0 8px 24px rgba(0,0,0,0.4);
  }
}
```

```typescript
// designTokens（Tailwind config用。CSS変数を参照）
export const designTokens = {
  colors: {
    // CSS変数を参照（Light/Dark自動切替）
    bg: {
      primary:  'var(--bg-primary)',
      elevated: 'var(--bg-elevated)',
      surface:  'var(--bg-surface)',
      hover:    'var(--bg-hover)',
      active:   'var(--bg-active)',
    },
    text: {
      primary:   'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      tertiary:  'var(--text-tertiary)',
      onAccent:  'var(--text-on-accent)',
    },
    // Brand Accent (shared across themes)
    accent: {
      50:  '#FFF3EB',
      100: '#FFD9BF',
      200: '#FFB380',
      300: '#FF8C40',
      400: '#FC6B1F',
      500: '#FC4C02',
      600: '#D94000',
      700: '#B33500',
      800: '#802600',
      900: '#4D1700',
    },
    success:       'var(--success)',
    successMuted:  'var(--success-muted)',
    warning:       'var(--warning)',
    warningMuted:  'var(--warning-muted)',
    danger:        'var(--danger)',
    dangerMuted:   'var(--danger-muted)',
    info:          'var(--info)',
    infoMuted:     'var(--info-muted)',
    radar: {
      current:     'var(--radar-current)',
      currentFill: 'var(--radar-current-fill)',
      target:      'var(--radar-target)',
      danger:      'var(--radar-danger)',
      axis:        'var(--radar-axis)',
      label:       'var(--radar-label)',
    },
    border: {
      default: 'var(--border-default)',
      muted:   'var(--border-muted)',
      accent:  'var(--border-accent)',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Noto Sans JP', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
    },
    fontSize: {
      'display':    ['32px', { lineHeight: '1.25', letterSpacing: '-0.5px', fontWeight: '700' }],
      'heading-lg': ['24px', { lineHeight: '1.33', letterSpacing: '-0.3px', fontWeight: '700' }],
      'heading-md': ['20px', { lineHeight: '1.4',  letterSpacing: '-0.2px', fontWeight: '600' }],
      'heading-sm': ['16px', { lineHeight: '1.5',  letterSpacing: '0',      fontWeight: '600' }],
      'body-lg':    ['16px', { lineHeight: '1.75', letterSpacing: '0',      fontWeight: '400' }],
      'body-md':    ['14px', { lineHeight: '1.7',  letterSpacing: '0',      fontWeight: '400' }],
      'body-sm':    ['12px', { lineHeight: '1.6',  letterSpacing: '0',      fontWeight: '400' }],
      'label':      ['12px', { lineHeight: '1.0',  letterSpacing: '0.5px',  fontWeight: '500' }],
      'code':       ['13px', { lineHeight: '1.6',  letterSpacing: '0',      fontWeight: '400' }],
    },
  },
  borderRadius: {
    'sm':   '4px',
    'md':   '6px',   // Buttons, inputs
    'lg':   '8px',   // Cards
    'xl':   '12px',  // Modals, chat bubbles, pill badges
  },
  spacing: {
    '0':  '0px',
    '1':  '4px',
    '2':  '8px',
    '3':  '12px',
    '4':  '16px',
    '5':  '20px',
    '6':  '24px',
    '8':  '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
  },
} as const;
```

### Tailwind v4 CSS 変数定義（app/globals.css 用）

```css
@theme {
  /* Background */
  --color-bg-primary: #0D1117;
  --color-bg-elevated: #161B22;
  --color-bg-surface: #1C2128;
  --color-bg-hover: #21262D;
  --color-bg-active: #282E36;

  /* Text */
  --color-text-primary: #E6EDF3;
  --color-text-secondary: #8B949E;
  --color-text-tertiary: #6E7681;

  /* Accent */
  --color-accent-50: #FFF3EB;
  --color-accent-100: #FFD9BF;
  --color-accent-200: #FFB380;
  --color-accent-300: #FF8C40;
  --color-accent-400: #FC6B1F;
  --color-accent-500: #FC4C02;
  --color-accent-600: #D94000;
  --color-accent-700: #B33500;

  /* Semantic */
  --color-success: #2EA043;
  --color-warning: #D29922;
  --color-danger: #F85149;
  --color-info: #58A6FF;

  /* Border */
  --color-border-default: #30363D;
  --color-border-muted: #21262D;
  --color-border-accent: #FC4C02;

  /* Typography */
  --font-sans: 'Noto Sans JP', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
}
```

---

## 2. 画面一覧

| # | 画面名 | ルートパス | 主要コンポーネント | 認証要否 | 優先度 |
|---|--------|-----------|-------------------|---------|--------|
| 1 | ダッシュボード | /dashboard | SkillRadarChart, SessionHistoryList, ProgressStats, QuickStartCard | 要 | Must (Sprint 7) |
| 2 | シナリオ選択 | /scenarios | ScenarioCard(x5), DifficultyBadge, ClientProfilePreview, RoleSelector | 要 | Must (Sprint 3) |
| 3 | シミュレーション（メイン） | /sim/:sessionId | ThreeColumnLayout, ClientInfoPanel, RadarChart, DebateChat, PrescriptionPanel | 要 | Must (Sprint 5) |
| 4 | AAR（振り返り） | /sim/:sessionId/aar | CauseBreakdown, ComparisonRadarChart, EvidenceAccordion, MentorComment | 要 | Must (Sprint 5) |
| 5 | タイムトラベル | /sim/:sessionId/timeline | TimelineSlider, TimelineNode, WhatIfPanel, ComparisonRadarChart | 要 | Must (Sprint 6) |
| 6 | プロフィール/設定 | /settings | AccountForm, LearningStats, CreditBalance, PlanManagement | 要 | Must (Sprint 7) |
| 7 | サインアップ | /signup | SignupForm, SocialLoginButton | 不要 | Must (Sprint 1) |
| 8 | ログイン | /login | LoginForm, SocialLoginButton, ForgotPasswordLink | 不要 | Must (Sprint 1) |

### 画面遷移フロー

```
/login → /dashboard (認証後のデフォルト)
/dashboard → /scenarios (「シミュレーション開始」ボタン)
/scenarios → /sim/:sessionId (シナリオ選択 + 役割選択後)
/sim/:sessionId → /sim/:sessionId/aar (シミュレーション完了後、自動遷移)
/sim/:sessionId/aar → /sim/:sessionId/timeline (「タイムトラベルで検証する」ボタン)
/sim/:sessionId/timeline → /sim/:sessionId (What-If再実行 → シミュレーション再開)
/sim/:sessionId/timeline → /dashboard (「ダッシュボードに戻る」)
```

---

## 3. 画面別ワイヤーフレーム指示

### 3.1 ダッシュボード（/dashboard）

```
┌─────────────────────────────────────────────────────┐
│ Sidebar (240px)  │  Main Content                     │
│                  │                                    │
│ [Logo]           │  ┌──────────────────────────────┐ │
│ Dashboard ●      │  │ Welcome, {name}              │ │
│ Scenarios        │  │ 今月: {n}/3 シナリオ完了      │ │
│ Settings         │  └──────────────────────────────┘ │
│                  │                                    │
│                  │  ┌─────────┐ ┌─────────┐ ┌─────┐ │
│                  │  │ 総セッシ │ │ 平均スコ │ │ 完走 │ │
│                  │  │ ョン数   │ │ ア       │ │ 率   │ │
│                  │  └─────────┘ └─────────┘ └─────┘ │
│                  │                                    │
│ ───────────      │  ┌──────────────┐ ┌────────────┐ │
│ Credit: {n}      │  │ Skill Radar  │ │ Quick Start│ │
│ Plan: Free       │  │ Chart        │ │ [Start]    │ │
│                  │  │ (6-axis)     │ │            │ │
│                  │  └──────────────┘ └────────────┘ │
│                  │                                    │
│                  │  ┌──────────────────────────────┐ │
│                  │  │ Session History (Table/List) │ │
│                  │  │ Date | Scenario | Score | ... │ │
│                  │  └──────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**レイアウト仕様**:
- Sidebar: 固定240px、bg-primary (#0D1117)
- Stats Cards: 3カラム grid、bg-elevated (#161B22)、border-default
- Skill Radar: Recharts RadarChart、最大幅400px、bg-elevated カード内
- Session History: テーブル形式、ページネーション（10件/ページ）

### 3.2 シナリオ選択（/scenarios）

```
┌─────────────────────────────────────────────────────┐
│ Sidebar │  Main Content                              │
│         │                                             │
│         │  ┌─────────────────────────────────────┐   │
│         │  │ シナリオを選択してください             │   │
│         │  │ 5つの固定シナリオから1つを選んで…     │   │
│         │  └─────────────────────────────────────┘   │
│         │                                             │
│         │  ┌───────┐ ┌───────┐ ┌───────┐           │
│         │  │ Desk  │ │ Post- │ │ Middle│           │
│         │  │ Worker│ │ Natal │ │ Aged  │           │
│         │  │ [Easy]│ │[Norm] │ │[Hard] │           │
│         │  │ 35M   │ │ 32F   │ │ 50M   │           │
│         │  │ 腰部▲ │ │ 腰部▲ │ │ 膝▲   │           │
│         │  └───────┘ └───────┘ └───────┘           │
│         │  ┌───────┐ ┌───────┐                      │
│         │  │ OL    │ │Student│                      │
│         │  │[Norm] │ │[Hard] │                      │
│         │  │ 28F   │ │ 20M   │                      │
│         │  │ 肩▲   │ │ 膝▲   │                      │
│         │  └───────┘ └───────┘                      │
│         │                                             │
│         │  ── Selected Scenario Preview ──           │
│         │  ┌─────────────────────────────────────┐   │
│         │  │ Client Profile (Expandable)          │   │
│         │  │ Name | Age | Goal | History | Noise  │   │
│         │  │                                       │   │
│         │  │ [AT役で開始]  [S&C役で開始]           │   │
│         │  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**シナリオカード仕様**:
- サイズ: min-width 240px、max-width 320px
- bg-elevated、border-default、hover 時 border-accent (50% opacity)
- 上部にクライアントのアイコン（イニシャルアバター、bg-surface）
- DifficultyBadge: 右上に配置（Easy=success / Normal=info / Hard=warning / Extreme=danger）
- 破綻部位アイコン: 腰部/膝/肩のシンプルなアイコン + danger色
- 選択状態: border-accent (#FC4C02) + 左に2pxの太いアクセントバー

**役割選択**:
- 2つのボタン: 「AT役で開始」(secondary style) / 「S&C役で開始」(secondary style)
- 選択済み: primary style に切り替わる
- 選択後「シミュレーション開始」primary ボタンが活性化

### 3.3 シミュレーション画面（/sim/:sessionId）

```
┌──────────────────────────────────────────────────────────────┐
│ TopBar: Session Info | Turn {n}/8 | Timer | [一時停止] [終了] │
├──────────────┬─────────────────────┬─────────────────────────┤
│ Left (320px) │ Center (fluid)      │ Right (360px)           │
│              │                     │                         │
│ Client Info  │ Debate Chat         │ Prescription Panel      │
│ ┌──────────┐│                     │                         │
│ │ Avatar   ││ [AT AI] ─────────  │ [Search Exercises]      │
│ │ 佐藤太郎 ││ 「このクライアント │ ┌─────────────────────┐ │
│ │ 35歳 男性││  には...」         │ │ Filter: 部位/機材   │ │
│ └──────────┘│                     │ └─────────────────────┘ │
│              │ [You] ──────────── │                         │
│ Goal:        │ 「今日は...」      │ ┌─────────────────────┐ │
│ ダイエット   │                     │ │ Exercise Card       │ │
│              │ [Client AI] ─────  │ │ - Deadlift          │ │
│ Today's Noise│ 「でも来月の      │ │ - 3x8 @60%          │ │
│ 睡眠: 5h    │  結婚式が...」     │ │ [+ Add to Menu]     │ │
│ 飲酒: あり  │                     │ └─────────────────────┘ │
│              │                     │                         │
│ ┌──────────┐│ ┌─────────────────┐ │ ── Today's Menu ──     │
│ │ Radar    ││ │ Input Area      │ │ 1. Deadlift 3x8       │
│ │ Chart    ││ │ [Send]          │ │ 2. Plank 3x30s        │
│ │ (6-axis) ││ └─────────────────┘ │ 3. ...                 │
│ └──────────┘│                     │ [メニュー確定 →]       │
├──────────────┴─────────────────────┴─────────────────────────┤
│ Status Bar: Credit残高 | 推定消費トークン | Turn進行バー       │
└──────────────────────────────────────────────────────────────┘
```

**3カラムレイアウト仕様**:
- TopBar: 高さ48px、bg-elevated、fixed top
- Left Panel: 幅320px、固定、独立スクロール、bg-primary
- Center Panel: fluid（最小幅400px）、独立スクロール、bg-primary
- Right Panel: 幅360px、固定、独立スクロール、bg-primary
- パネル間境界: 1px solid border-muted (#21262D)
- Status Bar: 高さ36px、bg-elevated、fixed bottom

**ディベートチャット仕様**:
- チャットバブル: DESIGN.md Section 4 の Chat Bubble 仕様に準拠
- 各AIの識別: アイコン + 名前ラベル + 役割バッジ
  - S&C AI: accent (#FC4C02) テーマ、ダンベルアイコン
  - AT AI: success (#2EA043) テーマ、シールドアイコン
  - Client AI: warning (#D29922) テーマ、人物アイコン
- ストリーミング表示: テキストが1文字ずつ表示（Framer Motion fade-in）
- 入力エリア: 高さ可変 textarea、最大3行、bg-elevated、border-default

**メニュー処方パネル仕様**:
- 検索バー: Input コンポーネント、虫眼鏡アイコン
- フィルタ: 部位（multi-select）、機材（multi-select）、負荷レベル（range slider）
- エクササイズカード: bg-elevated、target_muscles タグ表示、intensity_scale バー
- 選択済みメニュー: ドラッグ&ドロップで順序変更、各項目にセット数/レップ数入力
- 「メニュー確定」: primary ボタン、全選択が完了するまで disabled

### 3.4 AAR画面（/sim/:sessionId/aar）

```
┌──────────────────────────────────────────────────────┐
│ Sidebar │  Main Content (max-width: 800px, centered)  │
│         │                                              │
│         │  ┌──────────────────────────────────────┐   │
│         │  │ After Action Review                  │   │
│         │  │ シナリオ: デスクワーカー男性           │   │
│         │  │ 結果: ⚠ 腰部リスク上昇               │   │
│         │  └──────────────────────────────────────┘   │
│         │                                              │
│         │  ┌────────────────┐ ┌──────────────────┐   │
│         │  │ Before Radar   │ │ After Radar      │   │
│         │  │ (処方前)       │ │ (処方後)         │   │
│         │  └────────────────┘ └──────────────────┘   │
│         │                                              │
│         │  ── Cause Breakdown ──                      │
│         │  ┌──────────────────────────────────────┐   │
│         │  │ [Mentor AI Icon]                     │   │
│         │  │ 「あなたの処方したデッドリフト       │   │
│         │  │  3x8@80% は、このクライアントの      │   │
│         │  │  腸腰筋硬化(Z-score: -1.8)を        │   │
│         │  │  考慮すると...」                     │   │
│         │  │                                      │   │
│         │  │ ▶ 原因1: 腸腰筋硬化 × 高負荷       │   │
│         │  │   [展開: 詳細 + エビデンスリンク]    │   │
│         │  │ ▶ 原因2: 睡眠不足による回復阻害     │   │
│         │  │   [展開: 詳細 + エビデンスリンク]    │   │
│         │  └──────────────────────────────────────┘   │
│         │                                              │
│         │  [タイムトラベルで検証する →] [Dashboard]    │
└──────────────────────────────────────────────────────┘
```

**Cause Breakdown 仕様**:
- メンターAI: info (#58A6FF) テーマ、書籍アイコン
- 各原因: Accordion コンポーネント、クリックで展開
- エビデンスリンク: 外部リンクアイコン + 論文タイトル（body-sm、info色）
- 比較レーダーチャート: 処方前（gray破線）と処方後（accent塗り）を重ねて表示

### 3.5 タイムトラベル画面（/sim/:sessionId/timeline）

```
┌──────────────────────────────────────────────────────┐
│ Sidebar │  Main Content                               │
│         │                                              │
│         │  ┌──────────────────────────────────────┐   │
│         │  │ Timeline Slider (80px height)         │   │
│         │  │                                       │   │
│         │  │  ●───●───●───●───◉───●───●───●       │   │
│         │  │  T1  T2  T3  T4  T5  T6  T7  T8     │   │
│         │  │  🟢  🟢  🟡  🟢  🔴  🟡  🟢  🟢     │   │
│         │  │           ↑ 現在選択中                 │   │
│         │  └──────────────────────────────────────┘   │
│         │                                              │
│         │  ┌────────────────┐ ┌──────────────────┐   │
│         │  │ Original       │ │ What-If          │   │
│         │  │ Radar Chart    │ │ Radar Chart      │   │
│         │  │ (この時点の    │ │ (修正後の予測)   │   │
│         │  │  実際の結果)   │ │                  │   │
│         │  └────────────────┘ └──────────────────┘   │
│         │                                              │
│         │  ── Turn {n} の詳細 ──                      │
│         │  ┌──────────────────────────────────────┐   │
│         │  │ 処方内容: Deadlift 3x8 @80%         │   │
│         │  │ 生活ノイズ: 睡眠5h, 飲酒あり        │   │
│         │  │ 結果: 腰部リスク +15%                │   │
│         │  │                                      │   │
│         │  │ [メニューを修正して再実行 →]         │   │
│         │  └──────────────────────────────────────┘   │
│         │                                              │
│         │  [ダッシュボードに戻る]                      │
└──────────────────────────────────────────────────────┘
```

**タイムラインスライダー仕様**:
- 水平配置、bg-elevated カード内、高さ80px
- トラック: 高さ2px、bg #30363D
- ノード: 直径16px（default）、20px（hover/active）
  - 緑 (#2EA043): 良い結果（リスク低下 or 維持）
  - 黄 (#D29922): 警告（リスク軽度上昇）
  - 赤 (#F85149): 怪我発生 or 重大リスク上昇
- 選択中ノード: 24px + 3px ring (ノード色の40% opacity)
- ドラッグ操作: cursor grab → grabbing、ノード間スナップ
- ラベル: ノード下に "T1", "T2" ... (body-sm, text-secondary)
- Framer Motion: ノード選択時にレーダーチャートが300ms ease-outで遷移

**What-If 比較ビュー**:
- 2カラム: Original（左）vs What-If（右）
- 各レーダーチャート: 同一スケール、Framer Motionで値変化をアニメーション
- 差分表示: 各軸の数値差をテキストで表示（+/-、色分け: 改善=success, 悪化=danger）

### 3.6 プロフィール/設定（/settings）

```
┌──────────────────────────────────────────────────────┐
│ Sidebar │  Main Content (max-width: 640px, centered)  │
│         │                                              │
│         │  ── アカウント情報 ──                        │
│         │  ┌──────────────────────────────────────┐   │
│         │  │ Avatar | Name | Email                │   │
│         │  │ [保存]                                │   │
│         │  └──────────────────────────────────────┘   │
│         │                                              │
│         │  ── 学習統計 ──                              │
│         │  ┌──────────────────────────────────────┐   │
│         │  │ 総セッション数: 12                   │   │
│         │  │ 完走率: 83%                          │   │
│         │  │ 平均スコア: 72/100                   │   │
│         │  │ What-If利用率: 58%                   │   │
│         │  └──────────────────────────────────────┘   │
│         │                                              │
│         │  ── クレジット残高 ──                        │
│         │  ┌──────────────────────────────────────┐   │
│         │  │ 残高: 15 Credits                     │   │
│         │  │ 今月の無料枠: 1/3 残り               │   │
│         │  │ [クレジットを購入]                    │   │
│         │  └──────────────────────────────────────┘   │
│         │                                              │
│         │  ── プラン管理 ──                            │
│         │  ┌──────────────────────────────────────┐   │
│         │  │ 現在のプラン: Free                   │   │
│         │  │ [プランを変更]                        │   │
│         │  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

---

## 4. コンポーネント仕様

### 4.1 Button

| プロパティ | 値 |
|-----------|-----|
| Variants | primary / secondary / ghost / danger / success |
| Sizes | sm (h-8, px-3, text-13) / md (h-10, px-4, text-14) / lg (h-12, px-6, text-16) |
| States | default / hover / active / disabled / loading / focus-visible |
| Border Radius | 6px (全サイズ共通) |
| Transition | all 150ms ease |
| Disabled | opacity 0.5, cursor not-allowed |
| Loading | SpinnerIcon replaces children, same dimensions |
| Focus-visible | 2px solid #FC4C02, offset 2px |
| a11y | aria-label 必須（アイコンのみボタン）、role="button" |

### 4.2 Card

| プロパティ | 値 |
|-----------|-----|
| Background | bg-elevated (#161B22) |
| Border | 1px solid border-default (#30363D) |
| Border Radius | 8px |
| Padding | 20px (default) / 16px (compact) |
| Elevation | luminance stepping のみ（shadow なし） |
| Interactive hover | border-color → accent-500 at 50% opacity |

### 4.3 RadarChart（レーダーチャート）

| プロパティ | 値 |
|-----------|-----|
| ライブラリ | Recharts RadarChart |
| 軸数 | 6 (Strength, Endurance, Flexibility, Stability, Recovery, Mental) |
| 軸ラベル | 日本語表示: 筋力, 持久力, 柔軟性, 安定性, 回復度, メンタル |
| 軸ラベルフォント | body-sm (12px), text-secondary (#8B949E) |
| 現在値 | stroke: #FC4C02, fill: rgba(252,76,2,0.20), strokeWidth: 2 |
| 目標値 | stroke: #8B949E, strokeDasharray: "5 5", fill: none |
| 危険閾値 | stroke: #F85149, strokeDasharray: "3 3", fill: none |
| グリッド | stroke: #30363D, 5段階同心多角形 |
| アニメーション | Framer Motion: 値変化時に300ms ease-out で polygon 頂点を遷移 |
| サイズ | 最大400x400px、レスポンシブ（コンテナに合わせて縮小） |
| 比較モード | 2つのデータセットを重ねて表示（AAR/What-If用） |

### 4.4 TimelineSlider（タイムラインスライダー）

| プロパティ | 値 |
|-----------|-----|
| 方向 | 水平（lg+）/ 垂直（sm） |
| トラック | height: 2px, bg: #30363D |
| ノードサイズ | 16px (default) / 20px (hover) / 24px (active) |
| ノード色 | success (#2EA043) / warning (#D29922) / danger (#F85149) |
| アクティブノード | 3px ring, ノード色 40% opacity |
| スナップ | ノード間スナップ（ドラッグ中は自由移動、リリースで最寄りノードに吸着） |
| ラベル | ノード下に "T1"-"T8", body-sm, text-secondary |
| コネクタ | 2px solid #30363D, ノード間を接続 |
| ドラッグ | cursor: grab → grabbing |
| アニメーション | ノード選択→レーダーチャート更新: 300ms ease-out |
| a11y | role="slider", aria-valuemin/max/now, キーボード矢印キーで移動 |

### 4.5 DebateChat（ディベートチャット）

| プロパティ | 値 |
|-----------|-----|
| レイアウト | 縦スクロールチャット、最新メッセージは下 |
| バブル最大幅 | 80% of container |
| バブル Border Radius | 12px (4px on sender corner) |
| バブルパディング | 12px 16px |
| ユーザーメッセージ | bg-elevated, border-default, 右寄せ |
| S&C AI | bg: rgba(252,76,2,0.08), border: rgba(252,76,2,0.2), 左寄せ |
| AT AI | bg: rgba(46,160,67,0.08), border: rgba(46,160,67,0.2), 左寄せ |
| Client AI | bg: rgba(210,153,34,0.08), border: rgba(210,153,34,0.2), 左寄せ |
| Mentor AI | bg: rgba(88,166,255,0.08), border: rgba(88,166,255,0.2), 左寄せ |
| アバター | 32px circle, 各AIのテーマカラー背景 + イニシャル or アイコン |
| ストリーミング | テキスト1文字ずつ fade-in (Framer Motion) |
| 入力エリア | textarea, 1-3行可変高, bg-elevated, border-default |
| 送信ボタン | primary style, 右下固定、Enter で送信 (Shift+Enter で改行) |
| a11y | role="log", aria-live="polite" for new messages |

### 4.6 ScenarioCard（シナリオカード）

| プロパティ | 値 |
|-----------|-----|
| サイズ | min-w: 240px, max-w: 320px, h: auto |
| Background | bg-elevated (#161B22) |
| Border | 1px solid border-default, hover → border-accent 50% |
| 選択状態 | border-accent + 左2px accent bar |
| アバター | 48px circle, bg-surface, イニシャル |
| DifficultyBadge | 右上、pill badge (border-radius: 12px) |
| 破綻部位 | 人体シルエットアイコン + 該当部位 danger 色ハイライト |
| Content | name, age, gender, goal (body-md) / 破綻パターン概要 (body-sm, text-secondary) |

### 4.7 CauseBreakdown（原因分析）

| プロパティ | 値 |
|-----------|-----|
| コンテナ | bg-elevated, border-default, border-radius: 8px |
| メンターコメント | info (#58A6FF) テーマ、左にアバター、body-lg テキスト |
| 原因リスト | Accordion 形式、chevron アイコンで展開/折りたたみ |
| 原因タイトル | heading-sm, text-primary |
| 原因詳細 | body-md, text-secondary |
| エビデンスリンク | external-link アイコン + 論文タイトル, info色, body-sm |
| アニメーション | Accordion 展開: height auto, 200ms ease-out (Framer Motion) |

### 4.8 ExerciseCard（エクササイズカード）

| プロパティ | 値 |
|-----------|-----|
| Background | bg-elevated |
| Border | 1px solid border-default |
| Border Radius | 8px |
| Content | 種目名 (heading-sm), target_muscles (Badge群), intensity bar (accent gradient) |
| 禁忌警告 | danger-muted 背景 + danger テキスト（該当する場合のみ表示） |
| Add ボタン | ghost style, "+ メニューに追加" |
| 選択済み | border-accent, チェックマークオーバーレイ |

---

## 5. アクセシビリティ（WCAG 2.1 AA 準拠）チェックリスト

- [ ] コントラスト比: text-primary on bg-primary = 13.2:1 (AAA), text-secondary on bg-primary = 5.0:1 (AA)
- [ ] コントラスト比: text-on-accent on accent-500 = 3.6:1 (AA Large Text) → ボタンは16px/600w以上を保証
- [ ] キーボード操作: Tab で全インタラクティブ要素にアクセス可能
- [ ] focus-visible: 2px solid #FC4C02, offset 2px — 全フォーカス可能要素に適用
- [ ] alt テキスト: 全 `<img>` タグに意味のある alt 属性
- [ ] レーダーチャート: sr-only テキストで各軸の数値を提供
- [ ] タイムラインスライダー: role="slider", aria-valuemin/max/now, キーボード矢印キー対応
- [ ] チャットログ: role="log", aria-live="polite"
- [ ] 見出し階層: h1 > h2 > h3 を正しく維持（各ページに h1 は1つのみ）
- [ ] タッチターゲット: モバイル（<1024px）で最小44x44px
- [ ] 色だけに頼らない: タイムラインノードは色+形状（テキストラベル併記）で状態を示す
- [ ] モーション軽減: `prefers-reduced-motion` でアニメーションを無効化するオプション
- [ ] フォーム: 全入力フィールドに `<label>` 要素を関連付け、エラーメッセージは aria-describedby で接続

---

## 6. レスポンシブデザイン要件

### ブレークポイントと挙動定義

| ブレークポイント | 幅 | 主要変更点 |
|---------------|-----|-----------|
| sm | 640px | モバイルベースライン。全画面シングルカラム。サイドバー非表示（ハンバーガーメニュー）。ボトムタブバーで主要ナビゲーション |
| md | 768px | タブレット。ダッシュボードは2カラムグリッド。サイドバーはオーバーレイ表示（アイコンのみ64px → ホバーで展開） |
| lg | 1024px | デスクトップ。サイドバー常時表示240px。シミュレーション3カラムレイアウト有効化。タイムライン水平表示 |
| xl | 1280px | ワイドデスクトップ。コンテンツ最大幅。ダッシュボード3カラムグリッド |
| 2xl | 1440px | 最大コンテナ幅。中央寄せ配置 |

### レイアウト折り畳みルール

**シミュレーション 3カラム → タブ切替 (< lg)**:
```
lg+:  [ClientInfo | Debate | Prescription] ← 3カラム並列
<lg:  [Tab: Client] [Tab: Debate] [Tab: Rx] ← タブで切替
      各パネルがfull-width表示
      レーダーチャートはClient Infoタブの上部に配置
```

**ダッシュボード グリッド**:
```
xl+:  3カラム grid
md-lg: 2カラム grid
<md:  シングルカラム stack
```

**タイムライン**:
```
lg+:  水平スライダー、ノードラベル常時表示
md-lg: 水平スライダー、ノードのみ（ラベルはタップで表示）
<sm:  垂直タイムライン
```

**ナビゲーション**:
```
lg+:  固定サイドバー 240px
md:   折りたたみサイドバー（アイコン64px、ホバーで展開）
<md:  非表示、ハンバーガーメニュー + ボトムタブバー（4項目: Dashboard, Scenarios, Sim, Settings）
```

### タイポグラフィスケーリング

| トークン | sm | md | lg+ |
|---------|----|----|-----|
| display | 24px | 28px | 32px |
| heading-lg | 20px | 22px | 24px |
| heading-md | 18px | 19px | 20px |
| body-lg | 15px | 16px | 16px |
| body-md | 14px | 14px | 14px |

### モバイルファースト CSS 記述方針

```
基本: sm 向けスタイル（デフォルト）
md:   タブレット以上の拡張
lg:   デスクトップ以上の拡張
xl:   ワイドデスクトップ拡張
```

全てのスタイルはモバイルベースで記述し、`md:` / `lg:` / `xl:` プレフィックスで段階的に拡張する。

---

## 7. Framer Motion アニメーション仕様

| 対象 | トリガー | Duration | Easing | 詳細 |
|------|---------|----------|--------|------|
| レーダーチャート値遷移 | データ更新 | 300ms | ease-out | polygon 頂点座標の補間 |
| チャットバブル出現 | 新メッセージ | 200ms | ease-out | opacity 0→1, translateY 8→0 |
| ストリーミングテキスト | AI応答 | 30ms/char | linear | 1文字ずつ fade-in |
| モーダル出現 | 開く | 200ms | ease-out | opacity 0→1, scale 0.95→1.0 |
| モーダル消失 | 閉じる | 150ms | ease-in | opacity 1→0, scale 1.0→0.95 |
| Accordion 展開 | クリック | 200ms | ease-out | height 0→auto |
| タイムラインノード選択 | クリック/ドラッグ | 150ms | ease-out | scale 1.0→1.5 (active node) |
| ページ遷移 | ルート変更 | 200ms | ease-out | opacity + translateX |
| カードホバー | mouseenter | 150ms | ease | border-color transition |

全アニメーションに `prefers-reduced-motion: reduce` 対応を実装すること。

---

## 8. awesome-design-md リファレンス選定結果

| 参考企業 | 採用要素 | DILEMMA への統合方法 |
|---------|---------|---------------------|
| **Claude** (AI) | Warmth in professional context, reading-optimized typography | メンターAIのコメント表示に温かみのあるタイポグラフィ。body text の line-height 1.75 (Claude 準拠) |
| **Linear** (SaaS) | Dark-mode-native, luminance stepping, Inter typography, minimal shadow | 全体のダークモード設計、elevation を shadow ではなく bg 色変化で表現、8px grid |
| **Stripe** (Payment) | Dense data + generous chrome, professional precision, conservative radius | 3カラムシミュレーション画面のデータ密度設計。border-radius 4-8px。clinical data の表示精度 |

---

## 9. 下流エージェントへの引き渡し事項

### @03-frontend への指示

以下の仕様書一式を渡してフロントエンド実装を開始してください:

1. **DESIGN.md** (プロジェクトルート): 最上位視覚源泉。9セクション構造
2. **本仕様書** (docs/specs/ui-ux-design-spec-v1.0.0.md): 画面別詳細仕様
3. **デザイントークン**: Section 1 の TypeScript 定義 → tailwind.config.ts + globals.css へ反映
4. **画面一覧**: Section 2 のルーティング定義
5. **コンポーネント仕様**: Section 4 の全8コンポーネント
6. **アクセシビリティ**: Section 5 のチェックリスト
7. **レスポンシブ**: Section 6 のブレークポイント定義

### 実装優先順位（Sprint 順序に準拠）

1. Sprint 1: デザイントークン反映 + 基本レイアウト（Sidebar + ナビゲーション）+ 認証画面
2. Sprint 3: シナリオ選択画面（ScenarioCard, DifficultyBadge, RoleSelector）
3. Sprint 4: ディベートチャットUI（DebateChat, ChatBubble）
4. Sprint 5: RadarChart + AAR画面 + シミュレーション3カラム統合
5. Sprint 6: TimelineSlider + 比較レーダーチャート
6. Sprint 7: ダッシュボード + プロフィール/設定

---

## 変更履歴

| 日付 | バージョン | 変更内容 |
|------|-----------|---------|
| 2026-04-08 | 1.0.0 | 初版作成。DESIGN.md v1.0.0 から派生。6画面+認証2画面、8コンポーネント、レスポンシブ設計、アニメーション仕様を定義 |
