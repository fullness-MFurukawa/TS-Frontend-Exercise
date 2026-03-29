/**
 * 演習 3-2 Rootレイアウトを作成する
 * Rootレイアウト（全ページ共通の枠組み）
 */

// app/layout.tsx
// グローバルなCSSを読み込む（Tailwind CSSなどを適用するため）
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// metadata はページのタイトルなどを設定するNext.jsの機能です（今回はそのまま使用します）
export const metadata = {
  title: "React & Next.js フロントエンド開発",
  description: "3-4. Next.jsの画面構成(App Router)",
};

// RootLayoutコンポーネント
// { children } に各ページ (page.tsx) の内容が自動的にはめ込まれます
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body className="flex flex-col min-h-screen">
        
        {/* === ここから：全ページ共通のヘッダー === */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">演習アプリケーション</h1>
            <nav className="mt-2 text-sm flex gap-4">
              <a href="/" className="hover:underline">ホーム</a>
              <a href="/ex3-2/about" className="hover:underline">アバウト</a>
              <a href="/ex3-2/profile/setting" className="hover:underline">設定</a>
              {/* 演習 3-3 データ受け渡しできるコンポーネントを作成する */}
              <a href="/ex3-3" className="hover:underline">商品一覧</a>
              {/* 演習 4-1 計算機を作成する(加算機能のみ) */}
              <a href="/ex4-1" className="hover:underline">計算機</a>
              {/* 演習 4-2 計算の種類をプルダウンで選択可能にする */}
              <a href="/ex4-2" className="hover:underline">計算機(プルダウン)</a>
            </nav>
          </div>
        </header>
        {/* === ここまで：ヘッダー === */}

        {/* === ここに各ページのコンテンツ (page.tsx) が入る === */}
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>

        {/* === ここから：全ページ共通のフッター === */}
        <footer className="bg-gray-800 text-white text-center p-3 text-sm">
          © 2026 Fullness, Inc. All rights reserved.
        </footer>
        {/* === ここまで：フッター === */}
      </body>
    </html>
  );
}