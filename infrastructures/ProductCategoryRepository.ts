import { IProductCategoryRepository } from "@/interfaces/IProductCategoryRepository";
import { ProductCategory } from "@/models/ProductCategory";
import { injectable } from "inversify";
import { getSession } from "next-auth/react";
/**
 * 演習8-9 リポジトリの実装を作成する
 */
@injectable()
export class ProductCategoryRepository implements IProductCategoryRepository {
    /**
     * すべての商品カテゴリを取得する
     * @returns すべての商品カテゴリのリスト（非同期）
     */
    async findAll(): Promise<ProductCategory[]> {
        const session = await getSession();
        const token = (session as any)?.user?.token;
        const response = await fetch("/proxy-api/products/register/categories", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("商品カテゴリの取得に失敗しました。");
        }
        return await response.json();
    }
    /**
     * 指定したIDの商品カテゴリを取得する
     * @param id 商品カテゴリId(UUId)
     * @returns 商品カテゴリ（非同期）
     */
    async findById(id: string): Promise<ProductCategory> {
        const session = await getSession();
        const token = (session as any)?.user?.token;
        const response = await fetch(`/proxy-api/products/register/categories/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("商品カテゴリ詳細の取得に失敗しました。");
        }
        return await response.json();
    }
}