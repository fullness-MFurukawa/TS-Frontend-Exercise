/**
 * 演習 6-2 モックを使ってInversifyJSを利用する
 * DIコンテナ用の識別子(Symbol)定義
 */
export const TYPES = {
    // インフラストラクチャ層
    IProductRepository: Symbol.for("IProductRepository"),
    
    // サービス（ユースケース）層
    ISearchProductService: Symbol.for("ISearchProductService")
};