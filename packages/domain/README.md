# 使用ライブラリ

- [Effect]
- [Schema]
- [Zod]

# テスト

```bash
pnpm test
```
- ユースケースは関数単位で作成する
- 依存サービスが増えてきて部分適用によるDIが辛くなってきたらLayerを使ったDIに変更する(https://effect.website/docs/requirements-management/layers/)
- スキーマは一旦Effectのものを使わずにzodで実装する
