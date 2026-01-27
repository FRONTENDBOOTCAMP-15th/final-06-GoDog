"use server";

import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { RigthMark } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";
import WishlistComponent from "@/app/(main)/mypage/_components/wishlist";
export default async function Wishlist() {
  return (
    <div className="w-full min-w-[360px]">
      <div className="mt-[108px]">
        <p className="text-[#1A1A1C] text-center  text-[26.3px] not-italic font-[900] ">
          김구독님이 저장한
        </p>
        <div className="flex flex-row justify-center">
          <p className="text-[#FBA613] text-center  text-[26.3px] not-italic font-[900] ">
            관심 상품
          </p>
          <p className="text-[#1A1A1C] text-center  text-[26.3px] not-italic font-[900]">
            목록입니다
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-[57px] pb-[100px] px-[20px] lg:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-7 justify-items-center">
          <WishlistComponent
            title="나인독 정밀 사료A"
            image={
              <div className="rounded-3xl overflow-hidden w-full h-full">
                <Product404 />
              </div>
            }
            href="/products/1"
            content="상세 보기"
            price="45,800원"
          />
          <WishlistComponent
            title="나인독 정밀 사료A"
            image={
              <div className="rounded-3xl overflow-hidden w-full h-full">
                <Product404 />
              </div>
            }
            href="/products/1"
            content="상세 보기"
            price="45,800원"
          />{" "}
          <WishlistComponent
            title="나인독 정밀 사료A"
            image={
              <div className="rounded-3xl overflow-hidden w-full h-full">
                <Product404 />
              </div>
            }
            href="/products/1"
            content="상세 보기"
            price="45,800원"
          />{" "}
          <WishlistComponent
            title="나인독 정밀 사료A"
            image={
              <div className="rounded-3xl overflow-hidden w-full h-full">
                <Product404 />
              </div>
            }
            href="/products/1"
            content="상세 보기"
            price="45,800원"
          />
        </div>
      </div>
    </div>
  );
}
