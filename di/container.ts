import { IProductRepository } from "@/interfaces/IProductRepository";
import { ISearchProductService } from "@/interfaces/ISearchProductService";
import { Container } from "inversify";
import { TYPES } from "./types";
import { MockProductRepository } from "@/infrastructures/MockProductRepository";
import { SearchProductService } from "@/services/SearchProductService";

/**
 * 演習 6-2 モックを使ってInversifyJSを利用する
 * DIコンテナの初期化と依存関係の登録
 */
const container = new Container();
// ---------------------------------------------------------
// バインディング（登録）設定
// ---------------------------------------------------------
// リポジトリの登録(モック版を紐付ける)
container.bind<IProductRepository>(TYPES.IProductRepository).to(MockProductRepository);
// サービス(ユースケース)の登録
container.bind<ISearchProductService>(TYPES.ISearchProductService).to(SearchProductService);

export { container };