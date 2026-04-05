/**
 * 演習 6-2 モックを使ってInversifyJSを利用する
 * 商品リポジトリインターフェースの実装(モック)
 */
import { injectable } from "inversify";
import { IProductRepository } from "../interfaces/IProductRepository";
import { Product } from "../models/Product"; 

/**
 * 演習 6-2 モックを使ってInversifyJSを利用する
 * 商品リポジトリの実装(モック)
 */
@injectable()
export class MockProductRepository implements IProductRepository {
    
    // テスト用のダミーデータ（モックデータ）を準備
    private readonly mockProducts: Product[] = [
        {
            productUuid: "p-001",
            name: "高性能ノートPC",
            price: 150000,
            category: { categoryUuid: "c-001", name: "パソコン" },
            stock: { stockUuid: "s-001", stock: 15 }
        },
        {
            productUuid: "p-002",
            name: "ワイヤレスマウス",
            price: 3500,
            category: { categoryUuid: "c-002", name: "周辺機器" },
            stock: { stockUuid: "s-002", stock: 120 }
        },
        {
            productUuid: "p-003",
            name: "メカニカルキーボード",
            price: 12000,
            category: { categoryUuid: "c-002", name: "周辺機器" },
            stock: { stockUuid: "s-003", stock: 8 }
        }
    ];

    /**
     * 指定したキーワードで商品を検索して取得する
     * @param keyword 検索キーワード
     * @returns 検索にヒットした商品のリスト（非同期）
     */
    public async searchKeyword(keyword: string): Promise<Product[]> {
        // キーワードが空の場合は、全件を返す
        if (!keyword) {
            return this.mockProducts;
        }

        // キーワードが商品名(name)に含まれているものをフィルタリング
        const filteredProducts = this.mockProducts.filter(product =>
            product.name.includes(keyword)
        );

        // asyncメソッドなので、自動的にPromiseでラップされて返却されます
        return filteredProducts;
    }
}