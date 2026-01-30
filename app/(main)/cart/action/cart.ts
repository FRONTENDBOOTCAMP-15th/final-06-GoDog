"use server";

import { CartItemRes, CartListRes, ErrorRes } from "@/types/response";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

type ActionState = ErrorRes | null;

/**
 * 장바구니 목록 조회
 * @returns {Promise<CartListRes | ErrorRes>} - 장바구니 데이터 / 에러
 * @description
 * 사용자의 장바구니 목록 조회
 */
const TEMP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNzY5NzQ2OTI1LCJleHAiOjE3Njk4MzMzMjUsImlzcyI6IkZFQkMifQ.HJ0US9DRZw3gLXnJfBUGPhtv0JgepC02z8MsiPSJ0k4";

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

    // 만약 토큰이 만료되었거나 없을 경우 서버에서 준 에러 처리
    if (!res.ok) {
      console.error("Fetch error:", data);
    }
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제로 조회에 실패했습니다." };
  }

  return data;
}

/**
 * 장바구니 수량 수정
 * @param {ActionState} prevState - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 수정할 정보를 담은 FormData 객체
 * @returns {Promise<ActionState>} - 수정 결과 응답 객체
 * @description
 * 장바구니 상품의 수량을 수정하고, 성공 시 장바구니 페이지를 갱신
 * 실패 시 에러 메시지를 반환
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
 * 장바구니 상품 삭제
 * @param {ActionState} prevState - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 상품 정보를 담은 FormData 객체
 * @returns {Promise<ActionState>} - 삭제 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 장바구니에서 상품을 삭제하고, 성공 시 장바구니 페이지를 갱신
 * 실패 시 에러 메시지를 반환
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
