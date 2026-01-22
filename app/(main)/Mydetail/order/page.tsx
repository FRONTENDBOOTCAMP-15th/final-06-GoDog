"use server";

import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { Pencil, RigthMark } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";

export default async function Orders() {
  return (
    <>
      <p className="mt-[108px] text-[#1A1A1C] text-center font-['Pretendard'] text-[26.3px] not-italic font-[900] leading-[31.5px] tracking-[-1.312px]">
        김구독님이 이용 중인
      </p>
      <div className="flex flex-row justify-center">
        <p className="text-[#FBA613] text-center font-['Pretendard'] text-[26.3px] not-italic font-[900] leading-[31.5px] tracking-[-1.312px]">
          주문 내역
        </p>
        <p className="text-[#1A1A1C] text-center font-['Pretendard'] text-[26.3px] not-italic font-[900] leading-[31.5px] tracking-[-1.312px]">
          입니다
        </p>
      </div>

      <div className="flex flex-row gap-7 justify-center pt-[57px] pb-[109px]">
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/mypage/orders/[orderId]/page.tsx"
          content="리뷰 작성"
          date="2026.01.20"
          period="2주 주기 배송"
          price="45,800원"
          mark={<Pencil />}
        />
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/mypage/orders/[orderId]/page.tsx"
          content="리뷰 작성"
          date="2026.01.20"
          period="2주 주기 배송"
          price="45,800원"
          mark={<Pencil />}
        />
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/mypage/orders/[orderId]/page.tsx"
          content="리뷰 작성"
          date="2026.01.20"
          period="2주 주기 배송"
          price="45,800원"
          mark={<Pencil />}
        />
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/mypage/orders/[orderId]/page.tsx"
          content="리뷰 작성"
          date="2026.01.20"
          period="2주 주기 배송"
          price="45,800원"
          mark={<Pencil />}
        />
      </div>
    </>
  );
}
