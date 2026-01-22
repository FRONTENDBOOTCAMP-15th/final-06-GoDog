"use client";

import Badge from "@/components/common/Badge";
import Link from "next/link";

interface DetailSubProps {
  title: string;
  image: React.ReactElement; // 이미지 컴포넌트
  price: string;
}

export default function DetailSub({ title, image, price }: DetailSubProps) {
  return (
    <>
      <div className=" w-[338px] h-[503px] rounded-[49px] border border-[rgba(0,0,0,0.06)] bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] p-8 ">
        <div className="w-[281px] h-[281px] -translate-x-[5px]">{image}</div>
        <div className="pl-[107px] pb-[14px] ">
          <Badge className="translate-y-[28px]" variant="status">
            {"구독중"}
          </Badge>
        </div>
        <div className="translate-y-[28px] pb-[14px] text-[#1A1A1C] font-['Inter'] text-[19.7px] not-italic font-[900] leading-[28px] tracking-[-0.525px]">
          {title}
        </div>
        <div className="translate-y-[28px] w-[272px] h-[1px] bg-[rgba(0,0,0,0.06)] mx-auto " />
        <div className="translate-y-[28px] flex flex-row justify-between">
          <p className="text-[#646468] font-['Inter'] text-[11.5px] not-italic font-bold leading-[17.5px] pt-[22px]">
            월 정기 결제액
          </p>
          <p className="text-[#FBA613] font-['Inter'] text-[20.2px] not-italic font-[900] leading-[28px] pt-[14px]">
            {price}
          </p>
        </div>
      </div>
    </>
  );
}
