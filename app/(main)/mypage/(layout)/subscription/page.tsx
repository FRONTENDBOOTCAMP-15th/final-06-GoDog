"use client";

import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { RigthMark } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import Image from "next/image";
import useUserStore from "@/zustand/useStore";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/order";
import { useEffect } from "react";

export default function Subscription() {
  // 1. 스토어에서 유저 정보를 가져옵니다.
  const user = useUserStore((state) => state.user);
  const token = user?.token?.accessToken || "";
  const userName = user?.name || "회원"; // 이름이 없을 경우를 대비한 기본값

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: resSublist, isLoading } = useQuery({
    queryKey: ["subscriptions", page], // 쿼리 키를 좀 더 명확하게 지정
    queryFn: () =>
      getOrders(token, {
        page,
        limit: 4,
      }),
    enabled: !!token, // 토큰이 있을 때만 실행
  });

  return (
    <div className="w-full min-w-[360px] pb-[70px]">
      <div className="mt-[108px]">
        <p className="text-[#1A1A1C] text-center text-[26px] font-[900]">
          {userName}님이 이용 중인
        </p>
        <div className="flex flex-row justify-center">
          <p className="text-[#FBA613] text-center text-[26px] font-[900]">정기 구독 플랜</p>
          <p className="text-[#1A1A1C] text-center text-[26px] font-[900]">목록입니다</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-[57px] pb-[110px] px-[20px] lg:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-7 justify-items-center">
          {isLoading ? (
            <div className="col-span-full py-20 text-center">불러오는 중...</div>
          ) : resSublist?.ok === 1 && resSublist.item.length > 0 ? (
            resSublist.item.map((item) => (
              <MyItemList
                key={item._id}
                subscriptionId={String(item._id)}
                title={item.products[0].name}
                image={
                  <div className="rounded-3xl overflow-hidden w-[211px] h-[211px] relative">
                    {item.products[0].image?.path ? (
                      <Image
                        src={item.products[0].image?.path}
                        alt={item.products[0].name}
                        fill // fill 속성을 사용하는 것이 Next.js 이미지 최적화에 유리합니다.
                        className="object-cover"
                      />
                    ) : (
                      <Product404 />
                    )}
                  </div>
                }
                content="상세 보기"
                date={item.createdAt.split(" ")[0]}
                period={item.period}
                quantity={item.products[0].quantity}
                price={`${item.products[0].price.toLocaleString()}원`}
                mark={<RigthMark />}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-[#909094]">
              현재 이용 중인 정기 구독 플랜이 없습니다.
            </div>
          )}
        </div>
      </div>
      <PaginationWrapper
        currentPage={page}
        totalPages={resSublist?.ok === 1 ? resSublist.pagination.totalPages : 1}
      />
    </div>
  );
}
