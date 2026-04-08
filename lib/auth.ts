import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
/**
 * 演習 7-2 NextAuth.jsの導入と環境構築
 * NextAuthのオプション設定
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // 入力フォームの定義する(APIのキー名に合わせる)
      credentials: {
        usernameOrEmail: { label: "UsernameorEmail", type: "text" },
        password: { label: "Password", type: "password" }
      },

      // 認証ロジックの実装
      async authorize(credentials) {
        // バックエンドAPIへ認証リクエストを送信
        const res = await fetch("https://74.226.194.15/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            usernameOrEmail: credentials?.usernameOrEmail, // APIの仕様に合わせる
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const token = await res.json();

        // 認証成功(トークンが含まれている)ならユーザーオブジェクトを返す
        if (res.ok && token) {
          return token;
        }
        // 認証失敗
        return null;
      }
    })
  ],
  // ... (この後に callbacks の設定が続く)
  /**
   * 演習 7-3 取得したJWTをアプリケーション全体で利用可能にする
   */
  callbacks: {
    // トークンの保存処理 (authorizeの戻り値をJWTに書き込む)
    async jwt({ token, user }) {
      if (user) {
        // user(authorizeで返したデータ)をtokenオブジェクトにマージする
        return { ...token, ...user };
      }
      return token;
    },
    // セッションの公開処理 (JWTの内容をReactコンポーネントから参照可能にする)
    async session({ session, token }) {
      if (session.user) {
        // token(JWT)に保存されている情報をセッションのuserに詰め替える
        session.user = token as any;
      }
      return session;
    },
  },
};