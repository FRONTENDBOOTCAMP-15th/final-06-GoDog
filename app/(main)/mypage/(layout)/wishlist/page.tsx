// app/(main)/mypage/wishlist/page.tsx

import { getWishlist } from "@/app/(main)/mypage/(layout)/wishlist/getWishlist";
import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import WishlistComponent from "@/app/(main)/mypage/_components/wishlist";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import { getUser } from "@/lib/user";
import { Item } from "@/types/product";
import { BookmarkListRes, ResDate } from "@/types/response";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateWishlist({
  params,
}: {
  params: Promise<{ path: string; name: string; orderdate: string; price: string }>;
}): Promise<Metadata | undefined> {
  const { path, name, orderdate, price } = await params;

  return;
}

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Wishlist({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  let userName = "회원";

  if (token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");
      const payload = JSON.parse(decodedPayload);
      const userId = payload._id || payload.id;

      const userRes = await getUser(userId);
      if (userRes && "item" in userRes) {
        userName = userRes.item.name;
      }
    } catch (error) {
      console.error("유저 정보를 불러오는 데 실패했습니다.", error);
    }
  }

  const response = await getWishlist();
  console.log(response);

  const wishlistItems = response?.ok === 1 ? response.item : [];

  // 임시 값
  const totalPages = 3;

  return (
    <div className="w-full min-w-[360px] pb-[70px]">
      <div className="mt-[108px]">
        <p className="text-[#1A1A1C] text-center text-[26.3px] not-italic font-[900]">
          {userName}님이 저장한
        </p>
        <div className="flex flex-row justify-center">
          <p className="text-[#FBA613] text-center text-[26.3px] not-italic font-[900]">
            관심 상품
          </p>
          <p className="text-[#1A1A1C] text-center text-[26.3px] not-italic font-[900]">
            목록입니다
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-[57px] pb-[100px] px-[20px] lg:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-7 justify-items-center">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item: Item, index: number) => (
              <WishlistComponent key={item._id || index} Product={item.product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-text-tertiary">
              저장된 관심 상품이 없습니다.
            </div>
          )}
        </div>
      </div>
      {/* 페이지네이션 */}
      <PaginationWrapper currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
