import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { ISearchProductService } from "@/interfaces/ISearchProductService";
import { Product } from "@/models/Product";
import { useState } from "react";

/**
 * 演習 6-2 モックを使ってInversifyJSを利用する
 * 商品検索のState(状態)と操作を提供するカスタムフック
 */
export const useSearchProduct = () => {
    // 状態（State）の定義
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // DIコンテナからユースケース（Service）を取得
    const searchService = container.get<ISearchProductService>(TYPES.ISearchProductService);

    // UIから呼び出される実行関数
    const search = async (keyword: string) => {
        setIsLoading(true);
        try {
            // Service（純粋なロジック）を呼び出してデータを取得
            const result = await searchService.execute(keyword);
            
            // 取得したデータをStateに保存（これにより画面が再描画される）
            setProducts(result);
        } catch (error) {
            console.error("検索中にエラーが発生しました", error);
        } finally {
            setIsLoading(false);
        }
    };

    // UI層に対して、State(データ)と関数を公開する
    return {
        products,
        isLoading,
        search
    };
};