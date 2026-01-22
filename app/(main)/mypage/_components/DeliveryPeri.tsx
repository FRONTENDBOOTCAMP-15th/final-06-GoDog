"use client";

import Button from "@/components/common/Button";
import { SubscriptIcon } from "lucide-react";

export default function DeliveryPeri({}) {
  return (
    <>
      <div className="w-[487px] h-[389px] flex flex-col items-start self-stretch gap-[28px] p-[35px] rounded-[42px] border border-black/5 bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.03)]">
        <div className="flex flex-row gap-[11px]">
          <SubscriptIcon className="w-[21px] h-[21px] text-[#FBA613] bg-[#FFF5E6]" />
          <h1 className="font-['Inter'] text-[16.5px] font-[900] leading-[24.5px]  text-[#1A1A1C] rounded-2xl">
            배송 주기 변경
          </h1>
        </div>

        {/* {활성화 된 버튼} */}
        <Button
          className="rounded-[25.2px] border-[2px] border-black/5 bg-white w-[415px] h-[80px]"
          size="lg"
          variant="ghost"
        >
          <div className="flex flex-col items-start grow-1">
            <p className="font-['Inter'] text-[11.7px] font-[900] leading-[17.5px] text-[#909094] ">
              격주 배송 (2주)
            </p>
            <p className="font-['Inter'] text-[10.3px] font-bold leading-[16.5px] text-[#909094] opacity-60">
              보편적인 식사량이에요
            </p>
          </div>
        </Button>

        {/* {활성화 되지 않은 버튼} */}
        <Button
          className="rounded-[25.2px] border-[2px] border-black/5 bg-white w-[415px] h-[80px]"
          size="lg"
          variant="ghost"
        >
          <div className="flex flex-col items-start grow-1">
            <p className="font-['Inter'] text-[11.7px] font-[900] leading-[17.5px] text-[#909094]">
              매달 배송 (4주)
            </p>
            <p className="font-['Inter'] text-[10.3px] font-bold leading-[16.5px] text-[#909094] opacity-60">
              가장 많이 선택하시는 주기에요
            </p>
          </div>
        </Button>
      </div>
    </>
  );
}
