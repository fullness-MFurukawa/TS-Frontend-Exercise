"use client";

import { SessionProvider } from "next-auth/react";
/**
 * 演習 7-4 ログインUIを作成し、ログイン可能にする
 * NextAuthのSessionProviderでアプリ全体をラップするプロバイダコンポーネント
 */
export const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};