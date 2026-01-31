import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

export async function getWishlist() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return { ok: 0, item: [] };

    const res = await fetch(`${API_URL}/bookmarks/product`, {
      headers: {
        "client-id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, item: [] };
  }
}
