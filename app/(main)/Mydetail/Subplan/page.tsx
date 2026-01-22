import Adjustdelivery from "@/app/(main)/mypage/_components/adjustdelivery";
import DeliveryPeri from "@/app/(main)/mypage/_components/DeliveryPeri";
import DetailSub from "@/app/(main)/mypage/_components/DetailSub";
import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { PrevIcon } from "@/app/(main)/mypage/_components/Icons";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Link from "next/link";

export default function SubscriptionEdit() {
  return (
    <>
      <div className="pt-[70px] pb-[70px] pl-[506px] pr-[506px] ">
        <Link className="flex flex-row gap-[7px]" href={"/mypage/subscription"}>
          <PrevIcon className="W-[17.5px] h-[17.5px] text-[#909094]" />
          <p className="text-[#909094] font-inter text-[11.7px] font-black leading-[17.5px]  uppercase">
            내 계정으로
          </p>
        </Link>
        <div className="flex flex-col items-center gap-[14px] pt-[35px]">
          <Badge variant="accent">{"MANAGE PLAN"}</Badge>
          <h1 className="text-[#1A1A1C] text-center font-inter text-[39.5px] font-black leading-[42px] tracking-[-2.1px]">
            {" "}
            정기 구독 플랜{" "}
          </h1>
          <p className="text-[#646468] text-center font-inter text-[14.7px] font-medium leading-[24.5px]">
            아이의 식사량에 맞춰 배송 주기와 일정을 자유롭게 조절하세요.
          </p>
        </div>

        <div>
          <div className="flex flex-row pt-[35px] gap-[35px]">
            <DetailSub title="고메 화식 패키지" image={<Product404 />} price="45,000 원" />
            <div className="flex flex-col gap-[28px]">
              <DeliveryPeri />
              <Adjustdelivery />
              <Button
                className="rounded-[28px] border-2 border-black/[0.06]"
                size="md"
                variant="ghost"
              >
                구독 해지 신청
              </Button>
              <Button size="md" variant="primary">
                변경 사항 저장하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
