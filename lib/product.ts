import {
  ErrorRes,
  ProductListRes,
  ProductInfoRes,
  ReviewListRes,
  BookmarkListRes,
  ResDate,
  BookmarkInfoRes,
} from "@/types/response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

interface GetProductsOptions {
  minPrice?: number;
  maxPrice?: number;
  minShippingFees?: number;
  maxShippingFees?: number;
  keyword?: string;
  seller_id?: number;
  custom?: Record<string, unknown>;
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  showSoldOut?: boolean;
}

/**
 * 상품 목록 조회
 * @param {GetProductsOptions} [options] - 조회 옵션
 * @param {number} [options.minPrice] - 최저 가격 (기본값: 0)
 * @param {number} [options.maxPrice] - 최고 가격 (기본값: 99999999999)
 * @param {number} [options.minShippingFees] - 최저 배송비 (기본값: 0)
 * @param {number} [options.maxShippingFees] - 최고 배송비 (기본값: 99999999999)
 * @param {string} [options.keyword] - 상품명 검색어
 * @param {number} [options.seller_id] - 판매자 id
 * @param {Record<string, unknown>} [options.custom] - custom 검색 조건 (MongoDB 쿼리)
 * @param {number} [options.page] - 페이지 번호
 * @param {number} [options.limit] - 한 페이지당 항목 수 (미지정시 최대 100개)
 * @param {Record<string, 1 | -1>} [options.sort] - 정렬 조건 (예: { price: -1 })
 * @param {boolean} [options.showSoldOut] - 매진 상품 포함 여부
 * @returns {Promise<ResDate<ProductListRes>>} - 상품 목록 응답 객체
 * @example
 * // 전체 조회
 * getProducts();
 *
 * // 가격 필터 + 정렬
 * getProducts({ minPrice: 10000, maxPrice: 50000, sort: { price: -1 } });
 *
 * // 신상품만 조회
 * getProducts({ custom: { 'extra.isNew': true }, limit: 10 });
 */
export async function getProducts(options?: GetProductsOptions): Promise<ResDate<ProductListRes>> {
  try {
    const params = new URLSearchParams();

    if (options) {
      const {
        minPrice,
        maxPrice,
        minShippingFees,
        maxShippingFees,
        keyword,
        seller_id,
        custom,
        page,
        limit,
        sort,
        showSoldOut,
      } = options;

      if (minPrice !== undefined) params.append("minPrice", String(minPrice));
      if (maxPrice !== undefined) params.append("maxPrice", String(maxPrice));
      if (minShippingFees !== undefined) params.append("minShippingFees", String(minShippingFees));
      if (maxShippingFees !== undefined) params.append("maxShippingFees", String(maxShippingFees));
      if (keyword) params.append("keyword", keyword);
      if (seller_id !== undefined) params.append("seller_id", String(seller_id));
      if (custom) params.append("custom", JSON.stringify(custom));
      if (page !== undefined) params.append("page", String(page));
      if (limit !== undefined) params.append("limit", String(limit));
      if (sort) params.append("sort", JSON.stringify(sort));
      if (showSoldOut !== undefined) params.append("showSoldOut", String(showSoldOut));
    }

    const queryString = params.toString();
    const url = queryString ? `${API_URL}/products?${queryString}` : `${API_URL}/products`;

    const res = await fetch(url, {
      headers: {
        "Client-Id": CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제로 상품 목록 조회에 실패했습니다." };
  }
}

/**
 * 특정 code 배열로 해당 상품들만 조회
 * @param codes - 조회할 상품 code 배열
 */
export async function getProductsByCodes(codes: string[]) {
  try {
    const customQuery = JSON.stringify({
      "extra.code": { $in: codes },
      "extra.type": "사료",
    });

    const params = new URLSearchParams();
    params.set("custom", customQuery);

    const response = await fetch(`${API_URL}/products?${params.toString()}`, {
      headers: {
        "Client-Id": CLIENT_ID,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API 에러:", data);
      throw new Error("상품 조회 실패");
    }

    return { ok: true, item: data.item };
  } catch (error) {
    console.error("getProductsByCodes 에러:", error);
    return { ok: false, item: null };
  }
}

/**
 * 상품 상세 조회
 * @param {number} productId - 상품 id
 * @returns {Promise<ProductInfoRes | ErrorRes>} - 상품 상세 응답 객체
 */
export async function getProduct(productId: number): Promise<ProductInfoRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`, {
      headers: {
        "Client-Id": CLIENT_ID,
      },
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "상품 정보를 불러오는데 실패했습니다." };
  }
}

/**
 * 리뷰 도움돼요 북마크 목록 조회
 * @param {string} token - 로그인 토큰
 * @returns {Promise<BookmarkListRes | ErrorRes>} - 북마크 목록 응답 객체
 */
export async function getReplyBookmarks(token: string): Promise<BookmarkListRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/post`, {
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "도움돼요 목록 조회에 실패했습니다." };
  }
}

/**
 * 리뷰 도움돼요 등록 POST
 * @param {string} token - 로그인 토큰
 * @param {number} replyId - 리뷰(댓글) id
 * @returns {Promise<BookmarkInfoRes | ErrorRes>} - 북마크 등록 응답 객체
 */
export async function addReplyBookmark(
  token: string,
  replyId: number,
): Promise<BookmarkInfoRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        target_id: replyId,
        type: "post",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("도움돼요 등록 실패:", res.status, JSON.stringify(data, null, 2));
      return { ok: 0, message: data.message || "도움돼요 등록에 실패했습니다." };
    }
    return data;
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "도움돼요 등록에 실패했습니다." };
  }
}

/**
 * 리뷰 도움돼요 해제 DELETE
 * @param {string} token - 로그인 토큰
 * @param {number} bookmarkId - 북마크 id
 * @returns {Promise<{ ok: 1 } | ErrorRes>} - 삭제 응답 객체
 */
export async function removeReplyBookmark(
  token: string,
  bookmarkId: number,
): Promise<{ ok: 1 } | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/${bookmarkId}`, {
      method: "DELETE",
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "도움돼요 해제에 실패했습니다." };
  }
}

/**
 * 리뷰의 extra.likeCount 업데이트 PATCH
 * @param {string} token - 로그인 토큰
 * @param {number} replyId - 리뷰(댓글) id
 * @param {number} likeCount - 새로운 likeCount 값
 */
export async function updateReplyLikeCount(
  token: string,
  replyId: number,
  likeCount: number,
  content: string,
): Promise<{ ok: 1 } | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/replies/${replyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        extra: { likeCount },
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("likeCount 업데이트 실패:", res.status, data);
    }
    return data;
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "likeCount 업데이트에 실패했습니다." };
  }
}

/**
 * 상세 리뷰 목록 조회
 * @param {string} productId - 상품 id
 * @returns {Promise<ReviewListRes | ErrorRes>} - 리뷰 목록 응답 객체
 */
export async function getReviews(productId: string): Promise<ReviewListRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/replies/products/${productId}`, {
      headers: {
        "Client-Id": CLIENT_ID,
      },
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "리뷰를 불러오는데 실패했습니다." };
  }
}
