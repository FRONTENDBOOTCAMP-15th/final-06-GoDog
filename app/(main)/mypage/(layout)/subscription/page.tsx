import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { RigthMark } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";

export default async function Subscription() {
  return (
    <div className="w-full min-w-[360px]">
      <p className="mt-[108px] text-[#1A1A1C] text-center  text-[26px]  font-[900] ">
        김구독님이 이용 중인
      </p>
      <div className="flex flex-row justify-center">
        <p className="text-[#FBA613] text-center  text-[26px]  font-[900] ">정기 구독 플랜</p>
        <p className="text-[#1A1A1C] text-center  text-[26px]  font-[900] ">목록입니다</p>
      </div>

      <div className="max-w-[1280px] mx-auto pt-[57px] pb-[110px] px-[20px] lg:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-7 justify-items-center">
          <MyItemList
            title="나인독 정밀 사료A"
            image={
              <div className="rounded-3xl overflow-hidden w-full h-full">
                <Product404 />
              </div>
            }
            href="/products/1"
            content="상세 보기"
            date="2026.01.20"
            period="2주 주기 배송"
            price="45,800원"
            mark={<RigthMark />}
          />
          <MyItemList
            title="나인독 정밀 사료A"
            image={
              <div className="rounded-3xl overflow-hidden w-full h-full">
                <Product404 />
              </div>
            }
            href="/products/1"
            content="상세 보기"
            date="2026.01.20"
            period="2주 주기 배송"
            price="45,800원"
            mark={<RigthMark />}
          />{" "}
          <MyItemList
            title="나인독 정밀 사료A"
            image={
              <div className="rounded-3xl overflow-hidden w-full h-full">
                <Product404 />
              </div>
            }
            href="/products/1"
            content="상세 보기"
            date="2026.01.20"
            period="2주 주기 배송"
            price="45,800원"
            mark={<RigthMark />}
          />{" "}
          <MyItemList
            title="나인독 정밀 사료A"
            image={
              <div className="rounded-3xl overflow-hidden w-full h-full">
                <Product404 />
              </div>
            }
            href="/products/1"
            content="상세 보기"
            date="2026.01.20"
            period="2주 주기 배송"
            price="45,800원"
            mark={<RigthMark />}
          />
        </div>
      </div>
    </div>
  );
}
