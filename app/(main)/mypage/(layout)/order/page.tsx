"use server";

import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { Pencil, RigthMark } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";

export default async function Orders() {
  return (
    <div className="w-full min-w-[360px]">
      <p className="mt-[108px] text-[#1A1A1C] text-center  text-[26.3px] not-italic font-[900] ">
        김구독님이 이용 중인
      </p>
      <div className="flex flex-row justify-center">
        <p className="text-[#FBA613] text-center text-[26.3px] not-italic font-[900] ">주문 내역</p>
        <p className="text-[#1A1A1C] text-center text-[26.3px] not-italic font-[900] ">입니다</p>
      </div>

      <div className="max-w-[1280px] mx-auto pt-[57px] pb-[100px] px-[20px] lg:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-7 justify-items-center">
          <MyItemList
            title="나인독 정밀 사료A"
            image={<Product404 />}
            href="/mypage/orders/1"
            content="리뷰 작성"
            date="2026.01.20"
            period="2주 주기 배송"
            price="45,800원"
            mark={<Pencil />}
          />
          <MyItemList
            title="나인독 정밀 사료A"
            image={<Product404 />}
            href="/mypage/orders/1"
            content="리뷰 작성"
            date="2026.01.20"
            period="2주 주기 배송"
            price="45,800원"
            mark={<Pencil />}
          />
          <MyItemList
            title="나인독 정밀 사료A"
            image={<Product404 />}
            href="/mypage/orders/1"
            content="리뷰 작성"
            date="2026.01.20"
            period="2주 주기 배송"
            price="45,800원"
            mark={<Pencil />}
          />
          <MyItemList
            title="나인독 정밀 사료A"
            image={<Product404 />}
            href="/mypage/orders/1"
            content="리뷰 작성"
            date="2026.01.20"
            period="2주 주기 배송"
            price="45,800원"
            mark={<Pencil />}
          />
        </div>
      </div>
    </div>
  );
}
