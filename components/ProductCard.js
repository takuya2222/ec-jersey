import { useRouter } from "next/router";

export default function ProductCard({ product }) {
  const router = useRouter();

  const handlePurchase = () => {
    router.push(`/checkout/${product.id}`);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>¥{product.price}</p>
      <button onClick={handlePurchase}>購入</button>
    </div>
  );
}
