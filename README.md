# 新アプリ作成チェックリスト（目標：30分以内）

## STEP 1：フォルダをコピー（2分）

```
template-base/ をコピー → app4-[アプリ名]/ にリネーム
```

## STEP 2：依存パッケージをインストール（3分）

```bash
cd app4-[アプリ名]
npm install
npm run dev  # localhost:3000 で起動確認
```

## STEP 3：「使い方」パネルの内容を書き換え（3分）

### src/messages/ja.ts・en.ts の howToSteps を編集

```ts
howToSteps: [
  { title: 'STEP 1：〇〇してください', desc: '詳しい説明をここに書きます。' },
  { title: 'STEP 2：〇〇してください', desc: '詳しい説明をここに書きます。' },
  { title: 'STEP 3：〇〇してください', desc: '詳しい説明をここに書きます。' },
],
howToNote: '注意事項があればここに（不要なら空文字 "" に）',
```

**「使い方」機能の仕様：**
- PCブラウザ：右上「使い方」ボタン → 右側パネルがスライドイン、アプリを操作しながら確認可能
- スマホ：右上「使い方」ボタン → 別タブで `/how-to` ページが開く

---

## STEP 4：アプリ名・メタ情報を書き換え（5分）

### src/messages/ja.ts
- `appName` → 日本語アプリ名
- `tagline` → 日本語キャッチコピー
- アプリ固有のテキストを追加

### src/messages/en.ts
- `appName` → 英語アプリ名
- `tagline` → 英語キャッチコピー
- アプリ固有の英語テキストを追加

### src/app/layout.tsx
- `metadata.title` → アプリ名 | 無料ツール
- `metadata.description` → SEO説明文（日英ハイブリッド推奨）

### src/components/Header.tsx
- `import { Wrench }` → アプリに合ったアイコンに変更
  - 例: `FileText`（書類）、`Calculator`（計算）、`Hash`（ハッシュタグ）

### src/app/privacy/page.tsx・terms/page.tsx・legal/page.tsx
- ファイル上部の `APP_NAME_JA` / `APP_NAME_EN` を書き換え

## STEP 5：メイン機能を実装（15分）

### src/app/page.tsx を編集
- 入力フォーム → ロジック → 結果表示の3ブロック構成
- `useI18n()` から `{ t, lang }` を取得して日英切替に対応
- 印刷不要な要素には `no-print` クラスを付与

## STEP 6：動作確認（5分）

- [ ] localhost:3000 でアプリが動く
- [ ] 言語切替（JA/EN）が動く
- [ ] 初回アクセス時にCookieバナーが表示される
- [ ] フッターの法的ページ3つが開く
- [ ] /privacy、/terms、/legal が日英両対応で表示される

## STEP 7：Vercelにデプロイ（5分）

```bash
# Vercel CLI でデプロイ
npx vercel --prod
```

または Vercel ダッシュボードから GitHub リポジトリと連携してデプロイ

---

## ファイル構成

```
src/
├── app/
│   ├── layout.tsx        ← タイトル・メタ情報（要書き換え）
│   ├── page.tsx          ← メイン機能（要実装）
│   ├── globals.css
│   ├── privacy/page.tsx  ← アプリ名のみ書き換え
│   ├── terms/page.tsx    ← アプリ名のみ書き換え
│   └── legal/page.tsx    ← アプリ名のみ書き換え
├── components/
│   ├── Header.tsx        ← アイコン変更のみ
│   ├── Footer.tsx        ← 変更不要
│   └── CookieBanner.tsx  ← 変更不要
├── lib/
│   └── i18n.tsx          ← 変更不要
└── messages/
    ├── ja.ts             ← アプリ固有テキスト追加
    └── en.ts             ← アプリ固有テキスト追加（英語）
```

---

## 収益化ロードマップ

### フェーズ一覧

| フェーズ | 発動条件 | 実装内容 | あなたの作業 |
|---|---|---|---|
| Phase 0（今） | なし | AdSense申請・ドメイン統合 | ドメイン取得のみ |
| Phase 1 | AdSense審査通過後 | AdSenseスクリプトをlayout.tsxに追加 | なし（Claudeが実装） |
| Phase 2 | **任意のアプリが月間100ユーザー到達** | Stripe + Supabase Authで有料機能を有効化 | 「○○が100ユーザー超えた」と一言 |
| Phase 3 | 月間収益¥20,000超（有料ユーザー約40人） | Supabase Pro移行・Vercel Pro検討 | なし（Claudeが判断・提案） |

### Phase 2 自動有料化のしくみ

**template-baseにはSupabase Auth + Stripeの基盤が最初から組み込まれている（休眠状態）。**

```
新アプリ作成時：有料機能は存在するが非表示（無料モードで起動）
       ↓
Google Analyticsが月間100ユーザーを検知
       ↓
あなたが「app○○を有料化して」とClaudeに一言
       ↓
Claudeが約2時間で対応（価格設定・機能ゲート有効化・テスト・デプロイ）
       ↓
あなたの追加作業：ゼロ
```

### 課金方式の判断基準

| 利用パターン | 向いている方式 | 金額 |
|---|---|---|
| 毎日〜毎週使う ＋ データが貯まる | **サブスク** | ¥480/月 |
| 1〜数回で完結 ＋ APIコストなし | **買い切り** | ¥980〜¥1,980 |
| 両方の要素あり | **両方提供** | 買い切り＝ライト、サブスク＝ヘビー |

### アプリ別・有料機能設計

| アプリ | 無料 | 買い切り（¥980） | サブスク（¥480/月） |
|---|---|---|---|
| 請求書 | 基本3種・印刷 | プレミアムデザイン5種・ロゴ入り | クラウド保存・顧客台帳 |
| シフト | 5名以下・単月 | Excel/PDF出力（¥1,980） | 無制限スタッフ・過去履歴・前月コピー |
| ハッシュタグ | 10個/回・基本カテゴリ | なし | 無制限・お気に入り保存・AI生成 |

### 損益分岐点

```
Supabase Pro（¥4,000/月）の損益分岐：有料ユーザー9人
Vercel Pro（¥2,500/月）の損益分岐：有料ユーザー14人

→ 有料ユーザー20人で月収 ¥9,600 − インフラ ¥6,500 = 純利益 ¥3,100/月
→ 有料ユーザー50人で月収 ¥24,000 − インフラ ¥6,500 = 純利益 ¥17,500/月
```
