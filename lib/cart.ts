import { CartItemRes, CartListRes, ErrorRes } from "@/types/response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

/**
 * 장바구니 목록 조회
 */
export async function getCarts(token: string): Promise<CartListRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "장바구니 조회에 실패했습니다." };
  }
}

/**
 * 장바구니에 상품 추가
 */
export async function addToCart(
  token: string,
  productId: number,
  quantity: number,
  purchaseType: "oneTime" | "subscribe",
  deliveryCycle?: "2w" | "4w",
): Promise<CartItemRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity,
        color: purchaseType, // "oneTime" | "subscribe" 구매 타입
        ...(deliveryCycle ? { size: deliveryCycle } : {}),
      }), // true면 2w or 4w를 {size: "2w"} 스프레드 펼쳐서 조건부 추가, undefined는 1회 구매
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "장바구니 추가에 실패했습니다." };
  }
}
// 정기 구독 결과 { "product_id": 123, "quantity": 2, "color": "subscribe", "size": "2w" }
// 1회 구독 결과 { "product_id": 123, "quantity": 2, "color": "oneTime" }

/**
 * 장바구니 아이템 삭제
 */
export async function removeFromCart(token: string, cartId: number): Promise<{ ok: 1 } | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/carts/${cartId}`, {
      method: "DELETE",
      headers: {
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "장바구니 삭제에 실패했습니다." };
  }
}
