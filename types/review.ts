// 후기 작성자 요약 정보
export interface ReviewUser {
  _id: number;
  name: string;
  image?: string | null;
}

// 후기 추가 정보 (데이터마다 필드가 다르므로 모두 선택 사항으로 정의)
export interface ReviewExtra {
  title?: string;
  createdAt?: string;
  likeCount?: string | number;
  price?: string | number;
  reviewId?: string | number;
}

// 리뷰에 포함된 상품 요약 정보
export interface ReviewProduct {
  _id: number;
  image: { path: string; name: string } | null;
  name: string;
}

// 개별 후기 인터페이스
export interface Review {
  _id: number;
  rating: number; // 1 ~ 5
  content: string;
  extra?: ReviewExtra;
  user: ReviewUser;
  createdAt: string;
  product: ReviewProduct;
  user_id?: number;
  order_id?: number;
  product_id?: number;
  updatedAt?: string;
}
