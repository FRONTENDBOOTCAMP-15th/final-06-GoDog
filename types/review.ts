export interface ReviewUser {
  _id: number;
  name: string;
  image?: string | null;
}

export interface ReviewExtra {
  title?: string;
  createdAt?: string;
  likeCount?: string | number;
  price?: string | number;
  reviewId?: string | number;
  image?: string;
}

export interface Review {
  _id: number;
  user_id: number;
  user: ReviewUser;
  order_id: number;
  product_id: number;
  rating: number;
  content: string;
  extra?: ReviewExtra;
  createdAt: string;
  updatedAt?: string;
}
