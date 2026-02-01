import { Product, ProductExtra, ProductImage } from "@/types/product";

// 주문 내에 포함된 상품의 구조 (API 응답 기반)
export interface OrderProduct {
  _id: number;
  seller_id: number;
  name: string;
  image: ProductImage; // 배열이 아닌 단일 객체로 들어옴
  price: number;
  quantity: number;
  extra?: ProductExtra;
  seller?: {
    _id: number;
    name: string;
    image: string;
  };
  // API 응답에 따라 추가될 수 있는 필드
  size?: string | null;
  color?: string | null;
}

export interface Order {
  _id: number;
  user_id: number;
  products: OrderProduct[]; // 주문 상품 목록
  state: string;
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
  createdAt: string; // "2026.02.01 18:29:01"
  updatedAt: string;
}

export interface OrderListRes {
  ok: number;
  item: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// UI 렌더링을 위해 Flatten(평탄화)된 상품 타입
export interface FlattenedOrderProduct extends OrderProduct {
  orderId: number;
  displayDate: string; // 시간 제외 날짜
}
