import { BookmarkInfoRes, BookmarkListRes, ErrorRes } from "@/types/response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

/**
 * 내 북마크(관심상품) 목록 조회
 * @param {string} token - 로그인 토큰
 * @returns {Promise<BookmarkListRes | ErrorRes>} - 북마크 목록 응답 객체
 */
export async function getBookmarks(token: string): Promise<BookmarkListRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/product`, {
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "관심상품 목록 조회에 실패했습니다." };
  }
}

/**
 * 북마크(관심상품) 등록
 * @param {string} token - 로그인 토큰
 * @param {number} productId - 상품 id
 * @returns {Promise<BookmarkInfoRes | ErrorRes>} - 북마크 등록 응답 객체
 */
export async function addBookmark(
  token: string,
  productId: number,
): Promise<BookmarkInfoRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        target_id: productId,
      }),
    });
    if (res.status === 409) {
      return { ok: 0, message: "이미 등록된 관심상품입니다." };
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "관심상품 등록에 실패했습니다." };
  }
}

/**
 * 북마크(관심상품) 삭제
 * @param {string} token - 로그인 토큰
 * @param {number} bookmarkId - 북마크 id
 * @returns {Promise<{ ok: 1 } | ErrorRes>} - 삭제 응답 객체
 */
export async function removeBookmark(
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
    return { ok: 0, message: "관심상품 삭제에 실패했습니다." };
  }
}
