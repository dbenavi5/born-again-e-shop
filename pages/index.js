import { Layout } from "../components/Layout";
import ProductItems from "../components/ProductItems";
import { products } from "../utils/data";

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3 laptop:grid-cols-4">
        {products.map((product) => (
          <ProductItems product={product} key={product.slug}></ProductItems>
        ))}
      </div>
    </Layout>
  );
}
