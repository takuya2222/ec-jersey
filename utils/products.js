export const products = [
  {
    id: 1,
    name: '商品1',
    price: 1000,
    description: '商品1の説明',
  },
  // 他の商品データ
];

// 商品IDを指定して、商品データを取得する関数
export function getProductById(id) {
  return products.find((product) => product.id === id);
}
