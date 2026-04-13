import { IProductRepository } from "@/interfaces/IProductRepository";
import { Product } from "@/models/Product";
import { injectable } from "inversify";
import { getSession } from "next-auth/react";

/**
 * 演習8-7 バックエンドにアクセスするリポジトリを実装して切り替える
 * バックエンドAPIと通信を行い、商品データを取得します。
 */
@injectable()
export class ProductRepository implements IProductRepository {
    /**
     * 指定したキーワードで商品を検索する
     * @param keyword 検索キーワード
     * @returns 検索結果の商品リスト
     */
    public async searchKeyword(keyword: string): Promise<Product[]> {
        // NextAuthのセッションからアクセストークンを取得
        const session = await getSession();
        const token = (session as any)?.user?.token;

        // 検索クエリパラメータの構築
        const params = new URLSearchParams({ keyword: keyword });

        // API呼び出し(next.config.tsで設定したプロキシ経由)
        const response = await fetch(`/proxy-api/products/search?${params.toString()}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        // ステータスコードに応じたエラーハンドリング
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            // バックエンドで設定した "message" (検索キーワードを入力してください。等) があればそれを投げる
            if (errorData.message) {
                throw new Error(errorData.message);
            }
            // それ以外のエラーへの対応
            if (errorData.errors) {
                const messages = Object.values(errorData.errors).flat().join("\n");
                throw new Error(messages);
            }
            throw new Error(`検索に失敗しました (Status: ${response.status})`);
        }

        // 成功時は商品リスト(JSON)をパースして返却
        const products: Product[] = await response.json();
        return products;
    }
}