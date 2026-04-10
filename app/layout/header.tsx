/**
 * 演習 5-5 ナビゲーションメニューで新しい共通ページを作成する
 * メニューのヘッダー
 */
"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
/**
 * 演習 7-5 ログアウト機能を実装する
 * インポートを変更する
 */
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  
  /**
   * 演習 7-4 ログアウトUIを作成し、ログイン可能にする
   * 追加
   */
  // 追加: セッションの認証状態(status)のみを取得
  const { status } = useSession();

  return (
    <header className="border-b border-green-200 bg-green-100 p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        
        <h1 className="text-xl font-bold text-green-900">
          <Link href="/">商品管理システム</Link>
        </h1>

        <NavigationMenu>
          {/* 💡 項目が増えたため、スマホなどの狭い画面でも綺麗に折り返せるよう flex-wrap をこっそり付けておくと安全です */}
          <NavigationMenuList className="flex flex-wrap justify-end">
            
            {/* 追加：💡 ログイン中のみステータスを表示 */}
            {status === "authenticated" && (
              <span className="text-sm font-bold text-green-800 bg-green-200 px-3 py-1 rounded-full">
                ログイン中
              </span>
            )}

            {/* メニュー1：ログイン */}
            {/* 追加：未ログイン時のみ「ログイン」を表示 */}
            {status === "unauthenticated" && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-green-900 bg-transparent hover:bg-green-200`}>
                  <Link href="/api/auth/login">ログイン</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}  
            {/* メニュー2：ログアウト */}
            {/* 追加：ログイン中のみ[ログアウト]を表示 */}
            {status === "authenticated" && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-green-900 bg-transparent hover:bg-green-200`}>
                  {/* Buttonに変更して、signOut()関数を呼び出す */}
                  <button onClick={() => signOut()}>ログアウト</button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
            {/* メニュー3：ユーザー登録 */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-green-900 bg-transparent hover:bg-green-200`}>
                <Link href="/api/users/register">ユーザー登録</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* メニュー4：商品キーワード検索 */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-green-900 bg-transparent hover:bg-green-200`}>
                <Link href="/api/products/search">商品キーワード検索</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* メニュー4：商品登録 */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-green-900 bg-transparent hover:bg-green-200`}>
                <Link href="/api/products/register">商品登録</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* メニュー5：商品変更 */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-green-900 bg-transparent hover:bg-green-200`}>
                <Link href="/api/products/update">商品変更</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}