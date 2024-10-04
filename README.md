# フロントエンドに関するクイズアプリ

フロントエンドに関する知識の実力試しができたらいいなと思って作ってみた。

## 開発期間

2024/08 ~ 2024/10

## URL

※まだデプロイしてない

## 使用技術

### フロントエンド

- React
- TypeScript
- Chakra UI
- Tailwind CSS

### バックエンド

- Node.js
- Express.js

### データベース

- MongoDB
- Firebase Firestore

### デプロイ 予定

- Firebase
- Vercel
- MongoDB Atlas

### その他

- 認証: Firebase Authentication
- 状態管理: React Context API

## 主な機能

1. **認証機能**
   - ユーザー登録
   - ログイン/ログアウト
2. **難易度選択**
   - Easy
   - Medium
   - Hard
3. **解説機能**
   - 各問題の詳細な解説
4. **プロフィール機能**
   - ユーザーの成績表示
5. **ランキング機能**
   - 総スコアランキング
   - 平均スコアランキング

## データベース構造

### MongoDB (問題データ)

コレクション: 'questions'

```json
{
  "_id": "ObjectId",
  "text": "String",
  "options": ["String", "String", "String", "String"],
  "correctAnswer": "Number",
  "difficulty": "String ('easy', 'medium', 'hard')",
  "explanation": "String"
}
```

コレクション: 'users'

```json
{
  "uid": "String",
  "name": "String",
  "email": "String",
  "totalScore": "Number",
  "totalGames": "Number",
  "averageScore": "Number"
}
```

## ディレクトリ
```
frontend-colosseum/
├── client/  
│ ├── public/
│ │ ├── index.html
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── page/
│ │ ├── hooks/
│ │ ├── lib/
│ │ ├── App.ts
│ │ ├── index.ts
│ │ └── firebase.ts
│ ├── package.json
│ ├── tailwind.config.js
│  
│
├── server/  
│ ├── src/
│ │ ├── models/
│ │ ├── scripts/
│ │ ├── db.ts
│ │ └── server.js  
│ ├── tsconfig.json
└── README.md
```

## 工夫点

### FireStore と MongoDB の併用　(それぞれの選定理由)
- MongoDB: 大量の問題データを効率的に管理・クエリ
- Firestore: リアルタイムでのユーザーデータ更新

### パフォーマンス最適化
- useCallbackの使用。難易度が変更された場合にのみ関数が再生成されるようにしたので、不要な再レンダリングを防ぐことができた。
- 質問のフェッチ時にキャッシュを無効化し、常に最新のデータを取得

### ユーザー体験の向上
- クイズの進行状態をローカルストレージに保存し、ページリロード時に復元できるようにした
- カスタムフックを使用した非同期処理の管理
- ローディング表示

### セキュリティ
- Firebase Authentication と連携した Protected Routes
- クライアントサイドでの入力バリデーション
- クイズ完了時にユーザーのスコアを更新する際、整合性を保つためにFirestoreのincrement関数を使用した

## 懸念点と改善点

### ランキング機能の最適化

現状: フロントエンド側で Firestore への複数クエリによるセキュリティ、パフォーマンス低下
改善案: サーバー側でnode-cron や agenda などのバックグラウンドジョブでランキング計算と定期更新を検討

## 今後の展望

### 機能拡張
- カテゴリ別クイズモードの追加
- 問題数の拡充
- ユーザー自身が問題を作れる機能

### 全体的なリファクタリング
- エラーハンドリングの改善
- アクセシビリティの改善
- パフォーマンスの最適化

### テストケースの追加

## 参考記事
