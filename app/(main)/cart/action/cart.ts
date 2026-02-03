"use server";

import { CartItemRes, CartListRes, ErrorRes } from "@/types/response";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";
const TEMP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNzcwMDEzNjk0LCJleHAiOjE3NzAxMDAwOTQsImlzcyI6IkZFQkMifQ.Cub-A4FlwuQ7MQ2XxIzz1kKF1cTfbXseO8PtTSaJQ2Y";

type ActionState = ErrorRes | null;

/**
 * 장바구니 목록 조회
 */

export async function getCartItems(): Promise<CartListRes | ErrorRes> {
  let res: Response;
  let data: CartListRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/carts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${TEMP_TOKEN}`,
      },
      cache: "no-store", // 항상 최신 데이터
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }

  // 만약 토큰이 만료되었거나 없을 경우 서버에서 준 에러 처리
  if (!res.ok) {
    console.error("GET/ carts 실패:", data);
  }

  return data;
}

/**
 * 장바구니 수량 수정
 */

export async function updateCartItem(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const cartId = formData.get("cartId");
  // const accessToken = formData.get('accessToken');

  const body = {
    quantity: Number(formData.get("quantity")),
  };

  let res: Response;
  let data: CartItemRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/carts/${cartId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${TEMP_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제로 수정에 실패했습니다." };
  }

  if (data.ok) {
    revalidatePath("/cart"); // 장바구니 페이지 갱신
    return null; // 성공
  } else {
    return data; // 에러 응답 객체 반환
  }
}

/**
 * 장바구니 상품 한건 삭제
 */

export async function deleteCartItem(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const cartId = formData.get("cartId");
  // const accessToken = formData.get('accessToken');

  let res: Response;
  let data: CartItemRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/carts/${cartId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${TEMP_TOKEN}`,
      },
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제로 삭제에 실패했습니다." };
  }

  if (data.ok) {
    revalidatePath("/cart"); // 장바구니 페이지 갱신
    return null; // 성공
  } else {
    return data; // 에러 응답 객체 반환
  }
}

/**
 * 장바구니 상품 여러 건 삭제
 */

export async function deleteCartItems(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const CartIdString = formData.get("cartIds");
  const cartIds = CartIdString ? JSON.parse(CartIdString as string) : [];

  const body = {
    carts: cartIds,
  };

  let res: Response;
  let data: CartItemRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/carts`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${TEMP_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제로 삭제에 실패했습니다." };
  }

  if (data.ok) {
    revalidatePath("/cart");
    return null;
  } else {
    return data;
  }
}
