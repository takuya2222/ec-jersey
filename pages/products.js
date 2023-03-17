import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: '商品1',
    price: 1000,
    description: '商品1の説明',
  },
  // 他の商品データ
];

export default function Products() {
  return (
    <div>
      <h1>商品一覧</h1>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
