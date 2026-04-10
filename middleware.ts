import withAuth from "next-auth/middleware";

/**
 * 演習 7-6 ミドルウェアを実装する
 * 商品管理系のすべてのページをガード対象とする
 */
// ミドルウェアの処理と、未ログイン時のリダイレクト先を指定
export default withAuth({
  pages: {
    signIn: "/api/auth/login", // ログイン画面のパスを指定
  },
});

export const config = {
  matcher: ["/api/products/:path*"],
};