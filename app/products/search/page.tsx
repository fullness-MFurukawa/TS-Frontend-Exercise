import { ProductSearch } from "@/components/products/serach/ProductSearch";

/**
 * 商品キーワード検索ページ
 * URL: /products/search
 */
export default function ProductSearchPage() {
  return (
    <main className="container mx-auto py-8">
      {/* 先ほど作成したUIコンポーネントを呼び出す */}
      <ProductSearch />
    </main>
  );
}