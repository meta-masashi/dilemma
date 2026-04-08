# ADR-002: Neon PostgreSQL + Better Auth 採用（Supabase代替）

**ステータス**: 承認済み
**日付**: 2026-04-08
**決定者**: 05-architect

---

## 決定

Supabaseの代わりにNeon PostgreSQL Free + Better Auth（OSS）を採用する。

## 状況

- Supabase Free枠（2プロジェクト）はPACE + Oblaatで使用済み
- 3プロジェクト目は$25/月のProプランが必要
- DILEMMAのローンチまで完全無料（$0/月）の制約がある
- 認証・DB・RLSをSupabase以外で実現する必要がある

## 選択肢

### 案A: Neon PostgreSQL Free + Better Auth（採用）

- **DB**: Neon Free（0.5GB、コールドスタートあり、pgvector対応）
- **認証**: Better Auth（OSS、Neon直接テーブル、JWT発行）
- **RLS代替**: Drizzle ORM + Honoミドルウェアでアプリケーション層のアクセス制御
- **費用**: $0/月

### 案B: Supabase Pro（不採用）

- **費用**: $25/月（制約違反）
- **メリット**: RLS・Auth・Realtimeが統合済み

### 案C: Firebase + Auth0 Free（不採用）

- **不採用理由**: PostgreSQL非対応（pgvector使用不可）。Firestoreではリレーショナルクエリが困難
- **メリット**: Firebase AuthのFree枠は月50K MAU

## 結果

### Neon Free枠の制限と対策

| 制限 | 値 | 対策 |
|------|-----|------|
| ストレージ | 0.5 GB | PoC時点でデータ量計測。100ユーザー超でNeon Pro ($19/月) |
| コールドスタート | 非アクティブ5分後に1-2秒 | Vercel Cron（Free枠）で5分ごとにkeep-alive SELECT 1 |
| コンピュート | 月190時間 | Phase 1の100ユーザーでは十分 |
| ブランチング | 10ブランチ | dev / staging / prod で3つ使用 |

### Better Auth の特性

| 項目 | 内容 |
|------|------|
| テーブル | Neon内に直接作成（user, session, account, verification） |
| JWT | カスタムクレーム対応（role, plan を含められる） |
| RBAC | プラグインで role ベース制御 |
| ミドルウェア統合 | Hono用アダプタあり |
| リスク | OSSとして比較的新しい → E2Eテストで認証フローを網羅的にカバー |

### RLSの代替設計

Supabase RLSの代わりに、アプリケーション層で全アクセス制御を実装:

```typescript
// Honoミドルウェアでの認証・認可チェック
const authMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: 'Unauthorized' }, 401);
  c.set('user', session.user);
  c.set('session', session.session);
  await next();
});

// リソースアクセス時のオーナーチェック
const ownerGuard = (userId: string, resourceOwnerId: string) => {
  if (userId !== resourceOwnerId) throw new HTTPException(403);
};
```

### 影響を受けるエージェント
- @06-data-engineer: NeonへのDrizzle ORM接続設定、マイグレーション戦略
- @04-backend: Better Auth設定、Honoミドルウェア実装、アプリケーション層RLS
- @12-security: RLSがDB層ではなくアプリ層のため、セキュリティ監査での重点チェック対象
