import { ProductRegistration } from "@/models/ProductRegistration";
import { Product } from "../models/Product";
/**
 * 演習 6-2 データアクセスとサービスを実装する
 * 商品リポジトリインターフェース
 */
export interface IProductRepository {
    /**
     * 指定したキーワードで商品を検索して取得する
     * @param keyword 検索キーワード
     * @returns 検索にヒットした商品のリスト（非同期）
     */
    searchKeyword(keyword: string): Promise<Product[]>;

    /**
     * 演習8-8 リポジトリとDTOインターフェイスを作成する
     * 商品の重複を検証する
     * @param name 検証する商品名
     */
    existsByName(name: string): Promise<void>;

    /**
     * 演習8-8 リポジトリとDTOインターフェイスを作成する
     * 商品を登録する
     * @param product 登録する商品
     * @returns 登録された商品（非同期）
     */
    register(product: ProductRegistration): Promise<Product>;
}