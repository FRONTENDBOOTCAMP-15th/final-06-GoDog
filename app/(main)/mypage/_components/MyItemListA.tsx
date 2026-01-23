"use client";
import { InputHTMLAttributes } from "react";

import Link from "next/link";

interface MyItemListProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  title: string;
  content: string;
  image: React.ReactElement; // 아이콘 컴포넌트
  href: string;
  price: string;
  mark: React.ReactElement;
  period?: string;
  date?: string;
  className?: string;
}

export default function MyItemList({
  title,
  image,
  href,
  content,
  date,
  period,
  price,
  mark,
  className = "",
}: MyItemListProps) {
  // 마우스 올렸을 때 스타일 변화

  return (
    <>
      <div
        className={`w-[270px] h-[505px] rounded-[42px] border border-[rgba(0,0,0,0.06)] bg-[#FFFFFF] shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] ${className}`}
      >
        <div className="w-[210px] h-[210px] mt-[30px] ml-[30px]  rounded-3xl">{image}</div>
        <div className="pt-[27px] pl-[29px] pb-[14.5px] text-[#1A1A1C]  text-[17.5px] font-black leading-[24.5px] tracking-[-0.437px] not-italic">
          {title}
        </div>
        <div className="flex flex-row pl-[29px] justify-between pr-[29px]">
          <p className="text-[#909094]  text-[12.3px] font-medium leading-[17.5px] not-italic">
            주문일
          </p>
          <p className="text-[#646468]">{date}</p>
        </div>
        <div className="pb-[7px] flex flex-row pl-[29px] justify-between pr-[29px]">
          <p className="text-[#909094]  text-[12.3px] font-medium leading-[17.5px] not-italic">
            주기
          </p>
          <p className="text-[#646468]">{period}</p>
        </div>
        <div className=" w-[211px] h-[1px] bg-[rgba(0,0,0,0.06)] mx-auto" />
        <div className="pb-[36px] pt-[15px] flex flex-row pl-[29px] justify-between pr-[29px] ">
          <p className=" text-[#1A1A1C]  text-[12.3px] font-black leading-[17.5px] not-italic">
            결제금액
          </p>
          <p className="text-[#FBA613] font-['Pretendard'] text-[12.3px] font-black leading-[17.5px] not-italic">
            {price}
          </p>
        </div>
        <div className=" w-[211px] h-[1px] bg-[rgba(0,0,0,0.06)] mx-auto" />

        <Link
          className="pt-[20px] flex flex-row pl-[29px] justify-center gap-[12px]"
          href={"/Mydetail/Subplan"}
        >
          <div>{content}</div>
          <div className="translate-y-0.75">{mark}</div>
        </Link>
      </div>
    </>
  );
}
