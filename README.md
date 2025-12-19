# FF14 Astrologian Fortune

FF14占星術士カードを使った占いSPAサイト

## 概要

ファイナルファンタジーXIV（FF14）の占星術士ジョブで使用される6枚のカードをモチーフにした、日替わり占いサイトです。

- 1日1回カードを引いて運勢を占える
- 結果はローカルストレージに保存され、同じ日に再訪問しても確認可能
- SNSシェア機能

### カード一覧

| カード | 神 | 属性 |
|--------|-----|------|
| アーゼマの均衡 | アーゼマ | 太陽・情熱・正義・均衡 |
| ハルオーネの槍 | ハルオーネ | 氷・戦争・勇猛 |
| オシュオンの矢 | オシュオン | 山・海・風・旅人・狩人 |
| 世界樹の幹 | ノフィカ | 土・豊穣・時間 |
| ビエルゴの塔 | ビエルゴ | 建築・工芸・彗星・破壊・雷 |
| サリャクの水瓶 | サリャク | 水・河川・知力 |

## 技術スタック

- [SvelteKit](https://svelte.dev/docs/kit) - フレームワーク
- [Svelte 5](https://svelte.dev/) - UIライブラリ
- [TailwindCSS 4](https://tailwindcss.com/) - CSSフレームワーク
- [DaisyUI 5](https://daisyui.com/) - UIコンポーネント
- [TypeScript](https://www.typescriptlang.org/) - 型システム
- [Biome](https://biomejs.dev/) - リンター・フォーマッター
- [Vite](https://vite.dev/) - ビルドツール

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ブラウザで自動的に開く場合
npm run dev -- --open
```

## スクリプト

```bash
npm run dev       # 開発サーバー起動
npm run build     # プロダクションビルド
npm run preview   # ビルド結果のプレビュー
npm run check     # 型チェック
npm run format    # コードフォーマット
npm run generate  # 運勢データ生成
```

## ディレクトリ構成

```
src/
├── lib/
│   ├── components/    # Svelteコンポーネント
│   ├── data/          # カードデータ
│   ├── services/      # ビジネスロジック
│   └── types/         # TypeScript型定義
├── routes/            # SvelteKitルート
└── app.css            # グローバルスタイル
static/
└── images/cards/      # カード画像
```

## ライセンス

MIT License - 詳細は [LICENSE](./LICENSE) を参照

## 注意事項

本サイトはファンメイドの非公式コンテンツです。FINAL FANTASY XIV (C) SQUARE ENIX CO., LTD.
