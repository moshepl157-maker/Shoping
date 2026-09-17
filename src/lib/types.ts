export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  rating: number;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
