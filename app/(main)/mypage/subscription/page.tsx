"use server";

import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { RigthMark } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";

export default async function Subscription() {
  return (
    <>
      <p className="mt-[108px] text-[#1A1A1C] text-center font-['Pretendard'] text-[26.3px] not-italic font-[900] leading-[31.5px] tracking-[-1.312px]">
        김구독님이 이용 중인
      </p>
      <div className="flex flex-row justify-center">
        <p className="text-[#FBA613] text-center font-['Pretendard'] text-[26.3px] not-italic font-[900] leading-[31.5px] tracking-[-1.312px]">
          정기 구독 플랜
        </p>
        <p className="text-[#1A1A1C] text-center font-['Pretendard'] text-[26.3px] not-italic font-[900] leading-[31.5px] tracking-[-1.312px]">
          목록입니다
        </p>
      </div>

      <div className="flex flex-row gap-7 justify-center pt-[57px] pb-[110px] ">
        <MyItemList
          className=" "
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/products/[productId]/page.tsx"
          content="상세 보기"
          date="2026.01.20"
          period="2주 주기 배송"
          price="45,800원"
          mark={<RigthMark />}
        />
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/products/[productId]/page.tsx"
          content="상세 보기"
          date="2026.01.20"
          period="2주 주기 배송"
          price="45,800원"
          mark={<RigthMark />}
        />
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/products/[productId]/page.tsx"
          content="상세 보기"
          date="2026.01.20"
          period="2주 주기 배송"
          price="45,800원"
          mark={<RigthMark />}
        />
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/products/[productId]/page.tsx"
          content="상세 보기"
          date="2026.01.20"
          period="2주 주기 배송"
          price="45,800원"
          mark={<RigthMark />}
        />
      </div>

      {/* {주문 내역에서 content 글자색 변경처리하기} */}
      {/* {관심상품일때, 주문일이랑 주기 hidden처리} */}
    </>
  );
}
