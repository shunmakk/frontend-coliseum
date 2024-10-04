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
   - 全体ランキング
   - 週間ランキング

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
│ │ ├── User.js
│ │ ├── User.js
│ │ ├── User.js
│ │ ├── User.js
│ │ ├── User.js
│ │ ├── User.js
│ │ └── Quiz.js  
│ ├── tsconfig.json
└── README.md

## 工夫点

### FireStore と MongoDB の併用

- MongoDB: 大量の問題データを効率的に管理・クエリ
- Firestore: リアルタイムでのユーザーデータ更新とセキュアなアクセス制御

### パフォーマンス最適化

- コンポーネントの遅延ロード
- React.memo を使用した不要な再レンダリングの防止
- useMemo フックによる計算コストの高い処理の最適化

### ユーザー体験の向上

- カスタムフックを使用した非同期処理の管理
- ローディング表示
- エラーバウンダリによる安定したエラーハンドリング

### セキュリティ強化

- Firebase Authentication と連携した Protected Routes
- クライアントサイドでの入力バリデーション

## 懸念点と改善点

### ランキング機能の最適化

現状: フロントエンド側で Firestore への複数クエリによるパフォーマンス低下の可能性
改善案: node-cron や agenda などのバックグラウンドジョブでランキング計算と定期更新

## 今後の展望

### 機能拡張

- カテゴリ別クイズモードの追加
- 問題数の拡充
- ユーザー自身が問題を作れる機能

## 参考記事
