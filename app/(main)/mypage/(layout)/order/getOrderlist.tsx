// app/(main)/mypage/orders/getOrderlist.ts
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

export async function getOrderlist(page = 1, limit = 10) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return { ok: 0, item: [], pagination: { totalPages: 0 } };

    const res = await fetch(`${API_URL}/orders?page=${page}&limit=${limit}`, {
      headers: {
        "client-id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("주문 내역 조회 에러:", error);
    return { ok: 0, item: [], pagination: { totalPages: 0 } };
  }
}