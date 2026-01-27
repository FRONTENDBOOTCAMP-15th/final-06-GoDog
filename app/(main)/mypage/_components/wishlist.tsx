"use client";
import { InputHTMLAttributes } from "react";

import Link from "next/link";
import { HeartIcon } from "@/app/(main)/mypage/_components/Icons";

interface MyItemListProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  title: string;

  image: React.ReactElement; // 아이콘 컴포넌트
  href: string;
  price: string;

  period?: string;
  date?: string;
  className?: string;
}

export default function WishlistComponent({
  title,
  image,
  href,

  date,
  period,
  price,

  className = "",
}: MyItemListProps) {
  return (
    <>
      <div
        className={` rounded-[42px] border border-[rgba(0,0,0,0.06)] bg-[#FFFFFF] shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] ${className}`}
      >
        <div className=" mt-[30px] ml-[30px] mr-[30px] ">{image}</div>
        <div className="flex">
          <div className="pt-[27px] pl-[29px] pb-[14.5px] text-[#1A1A1C]  text-[18px] font-black ">
            {title}
          </div>
          <HeartIcon className=" mt-[27px] ml-[7px] text-[#FBA613]" />
        </div>
        <div className="flex flex-row pl-[29px] justify-between pr-[29px]">
          <p className="text-[#646468]">{date}</p>
        </div>
        <div className="pb-[7px] flex flex-row pl-[29px] justify-between pr-[29px]">
          <p className="text-[#646468]">{period}</p>
        </div>
        <div className=" h-[1px] bg-[rgba(0,0,0,0.06)] mx-auto" />
        <div className="pb-[36px] pt-[15px] flex flex-row pl-[29px] justify-between pr-[29px] ">
          <p className=" text-[#1A1A1C]  text-[12px] font-black">결제금액</p>
          <p className="text-[#FBA613] font-['Pretendard'] text-[12px] font-black ">{price}</p>
        </div>

        <Link
          className="pt-[20px] flex flex-row pl-[29px] justify-center gap-[12px]"
          href={"/Mydetail/Subplan"}
        ></Link>
      </div>
    </>
  );
}
