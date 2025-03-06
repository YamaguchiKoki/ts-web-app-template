# 初期設定

- package名を@templateからアプリ名に変更
- Clerk登録
- Neon DB作成
- ngrok作成(webhookでclerkのユーザー情報をDB登録する場合)

```bash
# Nodejs 22.12を使用
nvm use
```

# 開発用コマンド

```bash
# パッケージインストール
pnpm install

# 開発用サーバー起動
pnpm dev

# パッケージ追加
pnpm --filter <target> add <package>

# 内部パッケージ追加
pnpm --workspace add <internal-package>
```

# ビルド関連

```bash
# ビルド
pnpm build

# キャッシュクリア
pnpm clean
```

# データベース関連

```bash
# スキーマの変更を反映
pnpm db:push

# GUIでDB確認
pnpm db:studio
```
