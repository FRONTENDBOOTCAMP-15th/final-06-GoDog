import type { User } from "@/types/user";
import type { Review } from "@/types/review";
import type { Product } from "@/types/product";
import type { Post } from "@/types/post";
import type { Order } from "@/types/order";
import type { Bookmark } from "@/types/bookmark";
import type { Cart, CartCost } from "@/types/cart";
import type { FileInfo } from "@/types/file";
import type { CodeGroup } from "@/types/codes";
import type { SystemConfig } from "@/types/config";

// 회원 정보 상세 조회 결과 (단일 사용자)
export interface UserInfoRes {
  ok: 1;
  item: User;
}

// 회원 목록 조회 결과 (여러 사용자)
export interface UserListRes {
  ok: 1;
  item: User[];
}

// 로그인 성공 시 결과
export interface LoginRes {
  ok: 1;
  item: User & {
    token: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

// 공통 에러 타입 (예시 유지)
export interface ServerValidationError {
  type: string;
  value: string;
  msg: string;
  location: string;
}

export interface ErrorRes {
  ok: 0;
  message: string;
  errors?: {
    [fieldName: string]: ServerValidationError;
  };
}

// 후기 목록 조회 결과 타입
export interface ReviewListRes {
  ok: 1;
  item: Review[];
}

// 후기 상세 조회 결과 타입 (단일 항목)
export interface ReviewInfoRes {
  ok: 1;
  item: Review;
}

// 상품 목록 조회 결과
export interface ProductListRes {
  ok: 1;
  item: Product[];
}

// 상품 상세 조회 결과
export interface ProductInfoRes {
  ok: 1;
  item: Product;
}

// 게시물 목록 조회 결과 타입
export interface PostListRes {
  ok: 1;
  item: Post[];
}

// 게시물 상세 조회 결과 타입
export interface PostInfoRes {
  ok: 1;
  item: Post;
}

// 주문 목록 조회 결과
export interface OrderListRes {
  ok: 1;
  item: Order[];
}

// 주문 상세 조회 결과
export interface OrderInfoRes {
  ok: 1;
  item: Order;
}

// 즐겨찾기 목록 조회 결과
export interface BookmarkListRes {
  ok: 1;
  item: Bookmark[];
}

// 즐겨찾기 상세/등록 결과
export interface BookmarkInfoRes {
  ok: 1;
  item: Bookmark;
}

// 장바구니 목록 조회 결과
export interface CartListRes {
  ok: 1;
  item: Cart[];
}

// 장바구니 아이템 추가/수정 결과
export interface CartItemRes {
  ok: 1;
  item: Cart;
}

// 파일 업로드 결과 타입 (단일 또는 다중)
export interface FileUploadRes {
  ok: 1;
  item: FileInfo[];
}

// 코드 목록 조회 결과 (여러 그룹을 가져올 때)
export interface CodeListRes {
  ok: 1;
  item: CodeGroup[];
}

// 특정 코드 그룹 조회 결과 (예: 카테고리만 가져올 때)
export interface CodeInfoRes {
  ok: 1;
  item: CodeGroup;
}

// 설정 목록 조회 결과
export interface ConfigListRes {
  ok: 1;
  item: SystemConfig[];
}

// 특정 설정 조회 결과 (예: 배송비 정보만 필요할 때)
export interface ConfigInfoRes {
  ok: 1;
  item: SystemConfig;
}
