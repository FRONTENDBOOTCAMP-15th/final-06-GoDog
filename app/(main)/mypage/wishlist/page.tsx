"use server";

import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { RigthMark } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";

export default async function Wishlist() {
  return (
    <>
      <div className="mt-[108px]">
        <p className=" text-[#1A1A1C] text-center font-['Pretendard'] text-[26.3px] not-italic font-[900] leading-[31.5px] tracking-[-1.312px]">
          김구독님이 저장한
        </p>
        <div className="flex flex-row justify-center">
          <p className="text-[#FBA613] text-center font-['Pretendard'] text-[26.3px] not-italic font-[900] leading-[31.5px] tracking-[-1.312px]">
            관심 상품
          </p>
          <p className="text-[#1A1A1C] text-center font-['Pretendard'] text-[26.3px] not-italic font-[900] leading-[31.5px] tracking-[-1.312px]">
            목록입니다
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-7 justify-center pt-[57px] pb-[110px]">
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/products/[productId]/page.tsx"
          content="상세 보기"
          price="45,800원"
          mark={<RigthMark />}
        />
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/products/[productId]/page.tsx"
          content="상세 보기"
          price="45,800원"
          mark={<RigthMark />}
        />
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/products/[productId]/page.tsx"
          content="상세 보기"
          price="45,800원"
          mark={<RigthMark />}
        />
        <MyItemList
          title="나인독 정밀 사료A"
          image={<Product404 />}
          href="/app/(main)/products/[productId]/page.tsx"
          content="상세 보기"
          price="45,800원"
          mark={<RigthMark />}
        />
      </div>
    </>
  );
}
