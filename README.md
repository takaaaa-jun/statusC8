# Next.js + MySQL + Docker Starter

このプロジェクトは、Next.js, MySQL, Prisma, Docker, pnpm を使用したフルスタック開発テンプレートです。

## 構成
- **Frontend/Backend**: [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **Database**: MySQL 8.0
- **ORM**: [Prisma](https://www.prisma.io/)
- **Testing**: [Playwright](https://playwright.dev/)
- **Formatting**: [Prettier](https://prettier.io/)

## 開発の始め方

### 1. 準備
リポジトリをクローンした後、環境変数ファイルを作成します。

```powershell
copy .env.example .env
```

### 2. コンテナの起動
Docker を使用して、アプリケーションとデータベースを起動します。

```powershell
docker compose up
```

初回起動時には `pnpm install` が自動的に実行されます。
`http://localhost:3000` にアクセスして、Next.js の画面が表示されることを確認してください。

### 3. データベースのセットアップ
新しいモデルを定義したり、クローン直後の場合はマイグレーションを実行してテーブルを作成します。

```powershell
docker compose exec app npx prisma db push
```

### 4. 便利コマンド
- **コンテナの停止**: `docker compose down`
- **テストの実行**: `docker compose exec app npx playwright test`
- **Prisma Studio (GUIでDB確認)**: `docker compose exec app npx prisma studio`

## デプロイ
このプロジェクトは Vercel へのデプロイを想定しています。
`next.config.ts` で `output: "standalone"` が設定されているため、Docker イメージとしても軽量に動作します。
