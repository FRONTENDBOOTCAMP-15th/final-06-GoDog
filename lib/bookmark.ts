// lib/bookmark.ts
import { BookmarkListRes, ResDate } from "@/types/response";
import { EmptyRes } from "@/types/response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

interface GetWishlistOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
}

export async function getWishlist(
  token: string,
  options?: GetWishlistOptions,
): Promise<ResDate<BookmarkListRes>> {
  try {
    const params = new URLSearchParams();

    if (options) {
      const { page, limit, sort } = options;
      if (page !== undefined) params.append("page", String(page));
      if (limit !== undefined) params.append("limit", String(limit));
      if (sort) params.append("sort", JSON.stringify(sort));
    }

    const res = await fetch(`${API_URL}/bookmarks/product?${params.toString()}`, {
      method: "GET",
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    console.log(`${API_URL}/bookmarks/product?${params.toString()}`);
    const data = await res.json();
    console.log(data, "데이터");
    return data;
  } catch (error) {
    console.error("getWishlist 에러:", error);
    return { ok: 0, message: "조회에 실패했습니다." };
  }
}

export async function deleteWishlist(
  token: string,
  bookmarkId: number,
): Promise<ResDate<EmptyRes>> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/${bookmarkId}`, {
      method: "DELETE",
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error("삭제 에러:", error);
    return { ok: 0, message: "삭제 도중 오류가 발생했습니다." };
  }
}
