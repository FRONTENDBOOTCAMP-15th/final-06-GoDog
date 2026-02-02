"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useUserStore from "@/app/(main)/(auth)/login/zustand/useStore";
import WishlistComponent from "@/app/(main)/mypage/_components/wishlist";
import { getBookmarks } from "@/lib/bookmar";
import { Bookmark } from "@/types/bookmark";

export default function Wishlist() {
  const user = useUserStore((state) => state.user);
  const [items, setItems] = useState<Bookmark[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?.token?.accessToken) return;
      const data = await getBookmarks(user.token.accessToken);
      if (data.ok === 1) {
        setItems(data.item);
      }
    };
    fetchBookmarks();
  }, [user]);

  return (
    <div className="w-full min-w-[360px] pb-[70px]">
      <div className="mt-[108px]">
        <p className="text-[#1A1A1C] text-center text-[26.3px] not-italic font-[900]">
          {user?.name || ""}님이 저장한
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
        {items.length === 0 ? (
          <p className="text-center text-[#909094]">관심 상품이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-7 justify-items-center">
            {items.map((item) => (
              <WishlistComponent
                key={item._id}
                title={item.product?.name || "상품명 없음"}
                image={
                  <div className="rounded-3xl overflow-hidden w-full h-full">
                    <Image
                      src={item.product?.mainImages[0]?.path || "/images/product-404.jpg"}
                      width={300}
                      height={300}
                      alt={item.product?.name || "상품 이미지"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                }
                href={`/products/${item.product?._id}`}
                price={`${item.product?.price?.toLocaleString() || 0}원`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
