import type { User } from "@/types/user";
import type { Review } from "@/types/review";
import type { Product } from "@/types/product";
import type { Post } from "@/types/post";
import type { Order } from "@/types/order";
import type { Bookmark } from "@/types/bookmark";
import type { Cart } from "@/types/cart";
import type { FileInfo } from "@/types/file";
import type { CodeGroup } from "@/types/codes";
import type { SystemConfig } from "@/types/config";

// 회원 정보 상세 조회 결과 (단일 사용자)
export interface UserInfoRes {
  ok: number;
  item: User;
}

// 회원 목록 조회 결과 (여러 사용자)
export interface UserListRes {
  ok: number;
  item: User[];
}

// 로그인 성공 시 결과
export interface LoginRes {
  ok: number;
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
  ok: number;
  message: string;
  errors?: {
    [fieldName: string]: ServerValidationError;
  };
}

// 후기 목록 조회 결과 타입
export interface ReviewListRes {
  ok: number;
  item: Review[];
}

// 후기 상세 조회 결과 타입 (단일 항목)
export interface ReviewInfoRes {
  ok: number;
  item: Review;
}

// 상품 목록 조회 결과
export interface ProductListRes {
  ok: number;
  item: Product[];
}

// 상품 상세 조회 결과
export interface ProductInfoRes {
  ok: number;
  item: Product;
}

// 게시물 목록 조회 결과 타입
export interface PostListRes {
  ok: number;
  item: Post[];
}

// 게시물 상세 조회 결과 타입
export interface PostInfoRes {
  ok: number;
  item: Post;
}

// 주문 목록 조회 결과
export interface OrderListRes {
  ok: number;
  item: Order[];
}

// 주문 상세 조회 결과
export interface OrderInfoRes {
  ok: number;
  item: Order;
}

// 즐겨찾기 목록 조회 결과
export interface BookmarkListRes {
  ok: number;
  item: Bookmark[];
}

// 즐겨찾기 상세/등록 결과
export interface BookmarkInfoRes {
  ok: number;
  item: Bookmark;
}

// 장바구니 목록 조회 결과
export interface CartListRes {
  ok: number;
  item: Cart[];
}

// 장바구니 아이템 추가/수정 결과
export interface CartItemRes {
  ok: number;
  item: Cart;
}

// 파일 업로드 결과 타입 (단일 또는 다중)
export interface FileUploadRes {
  ok: number;
  item: FileInfo[];
}

// 코드 목록 조회 결과 (여러 그룹을 가져올 때)
export interface CodeListRes {
  ok: number;
  item: CodeGroup[];
}

// 특정 코드 그룹 조회 결과 (예: 카테고리만 가져올 때)
export interface CodeInfoRes {
  ok: number;
  item: CodeGroup;
}

// 설정 목록 조회 결과
export interface ConfigListRes {
  ok: number;
  item: SystemConfig[];
}

// 특정 설정 조회 결과 (예: 배송비 정보만 필요할 때)
export interface ConfigInfoRes {
  ok: number;
  item: SystemConfig;
}
