"use client";

import { getOrderlist } from "./getOrderlist";
import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { Pencil } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import {
  Order,
  OrderListRes,
  FlattenedOrderProduct,
} from "@/app/(main)/mypage/(layout)/order/types/order";
import { getOrders } from "@/lib/order";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/zustand/useStore";
import { Item } from "@/types/product";
import { useEffect } from "react";

export default function Orders() {
  const user = useUserStore((state) => state.user);

  const userName = user?.name || "회원"; // 유저 이름 연결

  const token = useUserStore.getState().user?.token?.accessToken || "";
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data: resOrderlist, isLoading } = useQuery({
    queryKey: [page],
    queryFn: () =>
      getOrders(token, {
        page,
        limit: 4,
      }),
  });
  console.log(resOrderlist);
  useEffect(() => {
    if (resOrderlist) console.log(resOrderlist);
  }, [resOrderlist]);

  const orderlist = resOrderlist?.ok === 1 ? resOrderlist.item : [];
  const pagination = resOrderlist?.ok === 1 ? resOrderlist.pagination : undefined;

  return (
    <div className="w-full min-w-[360px] pb-[70px]">
      <div className="mt-[108px]">
        <p className="text-[#1A1A1C] text-center text-[26.3px] font-[900]">
          {userName}님이 이용 중인
        </p>
        <div className="flex flex-row justify-center">
          <p className="text-[#FBA613] text-center text-[26.3px] font-[900]">주문 내역</p>
          <p className="text-[#1A1A1C] text-center text-[26.3px] font-[900]">입니다</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-[57px] pb-[100px] px-[20px] lg:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-7 justify-items-center">
          {/* 데이터 유무에 따른 조건부 렌더링 추가 */}
          {resOrderlist?.ok && resOrderlist.item.length > 0 ? (
            resOrderlist.item.map((item, index: number) => (
              <MyItemList
                key={item._id}
                productid={item.products[0]._id}
                orderId={String(item._id)}
                title={item.products[0].name}
                image={
                  <div className="rounded-3xl overflow-hidden w-[211px] h-[211px] relative">
                    {item.products[0].image?.path ? (
                      <Image
                        src={item.products[0].image?.path}
                        alt={item.products[0].name}
                        width={211}
                        height={211}
                        className="object-cover"
                      />
                    ) : (
                      <Product404 />
                    )}
                  </div>
                }
                content="리뷰 작성"
                date={item.createdAt.split(" ")[0]}
                period={item.period || "1회 구매"}
                quantity={item.products[0].quantity}
                price={`${item.products[0].price.toLocaleString()}원`}
                mark={<Pencil />}
              />
            ))
          ) : (
            /* 데이터가 없을 때 표시할 메시지 */
            <div className="col-span-full py-20 text-center">
              <p className="text-[#909094] text-[18px] font-medium">
                현재 이용 중인 주문 내역이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
      <PaginationWrapper currentPage={page} totalPages={pagination?.totalPages || 1} />
    </div>
  );
}
