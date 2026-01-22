"use client";

import { CalendarIcon, MiniCalendarIcon } from "@/app/(main)/mypage/_components/Icons";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { SubscriptIcon } from "lucide-react";

export default function Adjustdelivery() {
  return (
    <>
      <div className="flex flex-row">
        <div className="w-[487px] h-[227px] flex flex-col items-start self-stretch gap-[28px] p-[35px] rounded-[42px] border border-black/5 bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.03)]">
          <div className="flex flex-row gap-[11px]">
            <CalendarIcon className="w-[21px] h-[21px] text-[#3BB2F6] bg-[#EFF6FF]" />
            <h1 className="font-['Inter'] text-[16.5px] font-[900] leading-[24.5px]  text-[#1A1A1C] rounded-2xl">
              다음 배송일 조정
            </h1>
          </div>

          {/* {활성화 된 버튼} */}
          <div className="relative">
            <Input className="w-[415px]" label="" placeholder="2026-02-16"></Input>
            <MiniCalendarIcon className="w-[14px] h-[14px] absolute top-0 right-[28px] translate-y-9.5" />
          </div>
          <p className="text-[#909094] font-inter text-[10.3px] font-bold leading-[16.5px]">
            {" "}
            * 지정하신 날짜로부터 2-3일 내에 배송이 완료됩니다. (결제일 기준)
          </p>
        </div>
      </div>
    </>
  );
}
