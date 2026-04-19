import type { NextConfig } from "next";
// アナライザーをインポート
import withBundleAnalyzer from "@next/bundle-analyzer";
/**
 * 演習8-1 APIプロキシ(BFF)の設定を追加する
 * Next.js プロジェクトの設定ファイル
 * ブラウザのセキュリティ制限（CORS）を回避し、フロントエンドから
 * 安全にバックエンドAPIを呼び出すための中継ルールを定義
 */
const nextConfig: NextConfig = {
  /* config options here */

  async rewrites() {
    return [
      {
        /**
         * ユーザー管理API用のプロキシ設定
         * source: フロントエンド側で呼び出すURL（相対パス）
         * destination: 実際にデータを取得しに行くAzure上のバックエンドURL
         * * ※画面（/api/users/register）とのURL衝突を避けるため
         * API専用の入り口として「/proxy-api/」を冠しています。
         */
        source: '/proxy-api/users/:path*',
        destination: 'http://74.226.194.15/api/users/:path*',
      },
      {
        /**
         * 商品管理API用のプロキシ設定
         * source: フロントエンド側で呼び出すURL
         * destination: Azure上の商品管理APIエンドポイント
         */
        source: '/proxy-api/products/:path*',
        destination: 'http://74.226.194.15/api/products/:path*',
      },
    ]
  },
};

// アナライザーの設定（環境変数 ANALYZE が 'true' の時だけ有効化）
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
// 既存の設定をアナライザーでラップしてエクスポート
export default withAnalyzer(nextConfig);
// 削除するか、コメントにする
// export default nextConfig;
