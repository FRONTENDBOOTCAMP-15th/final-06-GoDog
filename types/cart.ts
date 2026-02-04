// 개별 장바구니 아이템 인터페이스
export interface Cart {
  _id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  color?: "oneTime" | "subscribe";
  size?: "2w" | "4w";
  product?: {
    _id: number;
    name: string;
    price: number;
    image?: { path: string; name: string };
    mainImages?: { path: string; name: string }[];
    extra?: {
      weight?: number;
    };
  };
  createdAt: string;
  updatedAt: string;
}
