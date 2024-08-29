const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/quizapp";
const client = new MongoClient(uri);

async function initDatabase() {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("questions");

    // 問題
    const questions = [
      {
        difficulty: "easy",
        text: "HTMLで見出しを作成するタグはどれですか？",
        options: ["<head>", "<title>", "<h1>", "<div>"],
        correctAnswer: 2,
      },
      {
        difficulty: "easy",
        text: "CSSで文字の色を指定するプロパティはどれですか？",
        options: ["color", "background-color", "font-size", "text-align"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "JavaScriptで変数を宣言するキーワードはどれですか？",
        options: ["let", "var", "const", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "easy",
        text: "<a>タグで使用する属性で、リンク先のURLを指定するものは？",
        options: ["href", "src", "link", "target"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "HTMLでフォームを作成するタグはどれですか？",
        options: ["<form>", "<input>", "<textarea>", "<select>"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "CSSで余白を指定するプロパティはどれですか？",
        options: ["padding", "margin", "border", "outline"],
        correctAnswer: 1,
      },
      {
        difficulty: "easy",
        text: "JavaScriptで配列の要素数を取得する方法は？",
        options: [".length", ".size", ".count", ".elements"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "HTMLで画像を表示するために使うタグは？",
        options: ["<img>", "<src>", "<picture>", "<image>"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "CSSで要素を中央揃えにするプロパティはどれですか？",
        options: [
          "align-items",
          "justify-content",
          "text-align",
          "center-align",
        ],
        correctAnswer: 2,
      },
      {
        difficulty: "easy",
        text: "JavaScriptで関数を定義する方法はどれですか？",
        options: ["function", "def", "func", "method"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "HTMLでリストを作成するためのタグはどれですか？",
        options: ["<ul>", "<li>", "<ol>", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "easy",
        text: "CSSで背景画像を指定するプロパティはどれですか？",
        options: [
          "background-image",
          "background-color",
          "background",
          "image-src",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "JavaScriptで文字列を結合するために使う演算子はどれですか？",
        options: ["+", "-", "*", "&"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "HTMLでテーブルを作成するタグはどれですか？",
        options: ["<table>", "<tr>", "<td>", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "easy",
        text: "CSSでボックスの影を付けるプロパティはどれですか？",
        options: [
          "box-shadow",
          "text-shadow",
          "border-shadow",
          "outline-shadow",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "JavaScriptでオブジェクトのプロパティにアクセスする方法は？",
        options: [".", ":", "-", "*"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "HTMLでドキュメントの言語を指定するために使用する属性はどれですか？",
        options: ["lang", "language", "xml:lang", "locale"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "CSSでテキストの太さを指定するプロパティはどれですか？",
        options: ["font-weight", "font-style", "font-size", "font-thickness"],
        correctAnswer: 0,
      },
      {
        difficulty: "easy",
        text: "JavaScriptで条件分岐を行うための構文はどれですか？",
        options: ["if", "switch", "else", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "easy",
        text: "HTMLでページのメタ情報を定義するタグはどれですか？",
        options: ["<meta>", "<title>", "<header>", "<footer>"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "TypeScriptで型を宣言するためのキーワードはどれですか？",
        options: ["type", "interface", "declare", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "medium",
        text: "Reactコンポーネントで状態を管理するためのフックはどれですか？",
        options: ["useState", "useEffect", "useRef", "useContext"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Vue.jsで双方向データバインディングを実現するディレクティブはどれですか？",
        options: ["v-bind", "v-model", "v-for", "v-if"],
        correctAnswer: 1,
      },
      {
        difficulty: "medium",
        text: "TypeScriptでユニオン型を定義する方法は？",
        options: ["|", "&", "||", "&&"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Reactでコンポーネントがマウントされたときに実行されるメソッドはどれですか？",
        options: [
          "componentDidMount",
          "componentWillUnmount",
          "componentDidUpdate",
          "componentWillUpdate",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Vue.jsでコンポーネント間でデータをやり取りするために使用するのはどれですか？",
        options: ["props", "data", "methods", "computed"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "TypeScriptでジェネリクスを定義する方法は？",
        options: ["<T>", "[T]", "{T}", "(T)"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Reactでコンポーネントを条件付きでレンダリングする方法はどれですか？",
        options: ["if", "switch", "ternary operator", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "medium",
        text: "Vue.jsで算出プロパティを定義するオプションはどれですか？",
        options: ["computed", "methods", "watch", "data"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "TypeScriptで非同期関数を定義するためのキーワードはどれですか？",
        options: ["async", "await", "defer", "promise"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Reactでフラグメントを使用するための記述はどれですか？",
        options: ["<Fragment>", "<>", "<React.Fragment>", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "medium",
        text: "Vue.jsでコンポーネントライフサイクルフックはどれですか？",
        options: ["beforeMount", "mounted", "beforeUpdate", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "medium",
        text: "TypeScriptでクラスを定義するためのキーワードはどれですか？",
        options: ["class", "interface", "object", "type"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Reactでのクラスコンポーネントで状態を管理するプロパティは？",
        options: ["this.state", "this.props", "this.context", "this.store"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "TypeScriptで型を宣言するためのキーワードはどれですか？",
        options: ["type", "interface", "declare", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "medium",
        text: "Reactコンポーネントで状態を管理するためのフックはどれですか？",
        options: ["useState", "useEffect", "useRef", "useContext"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Vue.jsで双方向データバインディングを実現するディレクティブはどれですか？",
        options: ["v-bind", "v-model", "v-for", "v-if"],
        correctAnswer: 1,
      },
      {
        difficulty: "medium",
        text: "TypeScriptでユニオン型を定義する方法は？",
        options: ["|", "&", "||", "&&"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Reactでコンポーネントがマウントされたときに実行されるメソッドはどれですか？",
        options: [
          "componentDidMount",
          "componentWillUnmount",
          "componentDidUpdate",
          "componentWillUpdate",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Vue.jsでコンポーネント間でデータをやり取りするために使用するのはどれですか？",
        options: ["props", "data", "methods", "computed"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "TypeScriptでジェネリクスを定義する方法は？",
        options: ["<T>", "[T]", "{T}", "(T)"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Reactでコンポーネントを条件付きでレンダリングする方法はどれですか？",
        options: ["if", "switch", "ternary operator", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "medium",
        text: "Vue.jsで算出プロパティを定義するオプションはどれですか？",
        options: ["computed", "methods", "watch", "data"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "TypeScriptで非同期関数を定義するためのキーワードはどれですか？",
        options: ["async", "await", "defer", "promise"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Reactでフラグメントを使用するための記述はどれですか？",
        options: ["<Fragment>", "<>", "<React.Fragment>", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "medium",
        text: "Vue.jsでコンポーネントライフサイクルフックはどれですか？",
        options: ["beforeMount", "mounted", "beforeUpdate", "以上すべて"],
        correctAnswer: 3,
      },
      {
        difficulty: "medium",
        text: "TypeScriptでクラスを定義するためのキーワードはどれですか？",
        options: ["class", "interface", "object", "type"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Reactでのクラスコンポーネントで状態を管理するプロパティは？",
        options: ["this.state", "this.props", "this.context", "this.store"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Vue.jsでv-forディレクティブを使用する際、推奨されるキーを設定する属性はどれですか？",
        options: [":key", ":id", ":value", ":name"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "TypeScriptで関数の戻り値の型を指定するにはどれを使用しますか？",
        options: [":", "=>", "<>", "{}"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Reactで再レンダリングを防ぐために使うフックはどれですか？",
        options: ["useMemo", "useEffect", "useState", "useContext"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "Vue.jsで親から子コンポーネントにイベントを伝播するための方法はどれですか？",
        options: ["$emit", "$on", "$broadcast", "$dispatch"],
        correctAnswer: 0,
      },
      {
        difficulty: "medium",
        text: "TypeScriptでタプル型を定義するための構文はどれですか？",
        options: [
          "[number, string]",
          "(number, string)",
          "{number, string}",
          "<number, string>",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "フロントエンドでパフォーマンスを最適化するために、画像の読み込みを遅延させる方法はどれですか？",
        options: ["Lazy Loading", "Eager Loading", "Prefetching", "Inlining"],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "JavaScriptで大きな配列を効率的に操作するために推奨される方法はどれですか？",
        options: ["map", "forEach", "for loop", "reduce"],
        correctAnswer: 2,
      },
      {
        difficulty: "hard",
        text: "Reactアプリケーションで再レンダリングを最小限に抑えるための最適化手法はどれですか？",
        options: ["React.memo", "useEffect", "useState", "Context API"],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "CSSでアニメーションを効率的に処理するために、使用するべきプロパティはどれですか？",
        options: ["transform", "margin", "padding", "border"],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "フロントエンドでWebパフォーマンスを監視するためのツールはどれですか？",
        options: ["Lighthouse", "Webpack", "Babel", "ESLint"],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "フロントエンドで不要なリソースを削減するために、使用するべき技術はどれですか？",
        options: ["Tree Shaking", "Code Splitting", "Caching", "Minification"],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "Webページの初期ロード時間を短縮するために、最も効果的な手法はどれですか？",
        options: ["Code Splitting", "Lazy Loading", "Prefetching", "Inlining"],
        correctAnswer: 3,
      },
      {
        difficulty: "hard",
        text: "JavaScriptのメモリリークを防ぐために、重要なのはどれですか？",
        options: [
          "不要な参照をクリアする",
          "関数を使い回す",
          "キャッシュを増やす",
          "DOM操作を減らす",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "Reactでコンポーネントのリソースを解放するために使用するフックはどれですか？",
        options: ["useEffect", "useLayoutEffect", "useCallback", "useRef"],
        correctAnswer: 1,
      },
      {
        difficulty: "hard",
        text: "CSSで大量のデータをスクロールする際に最適化を行うために使用する技術はどれですか？",
        options: [
          "Virtual Scrolling",
          "Infinite Scroll",
          "Pagination",
          "Lazy Loading",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "JavaScriptのプロミスチェーンでエラーハンドリングを行う方法はどれですか？",
        options: ["catch", "then", "finally", "try"],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "Reactでパフォーマンスを測定するためのツールはどれですか？",
        options: [
          "React Profiler",
          "React DevTools",
          "Redux DevTools",
          "Lighthouse",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "CSSで描画パフォーマンスに悪影響を及ぼすのはどれですか？",
        options: ["box-shadow", "background-color", "border-radius", "color"],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "フロントエンドアプリケーションで不要なリソースの読み込みを防ぐための技術はどれですか？",
        options: [
          "Lazy Loading",
          "Code Splitting",
          "Prefetching",
          "Tree Shaking",
        ],
        correctAnswer: 3,
      },
      {
        difficulty: "hard",
        text: "JavaScriptでイベントのデバウンスを行う目的はどれですか？",
        options: [
          "処理の頻度を制限する",
          "イベントをキャンセルする",
          "イベントを遅延させる",
          "イベントを無効化する",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "フロントエンドでアセットの圧縮を行う理由はどれですか？",
        options: [
          "ページの読み込み速度を向上させるため",
          "デバッグを容易にするため",
          "セキュリティを強化するため",
          "バージョン管理を行うため",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "JavaScriptでメモリ管理を行うために重要な概念はどれですか？",
        options: [
          "ガベージコレクション",
          "キャッシュ管理",
          "プロミスチェーン",
          "スコープチェーン",
        ],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "Reactでコンポーネントが再レンダリングされるのを防ぐために使用するのはどれですか？",
        options: ["React.memo", "useEffect", "useState", "useContext"],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "JavaScriptで非同期処理のパフォーマンスを向上させる方法はどれですか？",
        options: ["Promise.all", "async/await", "setTimeout", "try/catch"],
        correctAnswer: 0,
      },
      {
        difficulty: "hard",
        text: "CSSでアニメーションのパフォーマンスを最適化するために推奨される方法はどれですか？",
        options: [
          "will-change",
          "animation-fill-mode",
          "transition",
          "keyframes",
        ],
        correctAnswer: 0,
      },
      // ... 他の問題を追加 (各難易度100問ずつ)
    ];

    await collection.insertMany(questions);
    console.log("Database initialized with sample questions");
  } catch (error) {
    console.log("Error initializing database:", error);
  } finally {
    await client.close();
  }
}

initDatabase();
