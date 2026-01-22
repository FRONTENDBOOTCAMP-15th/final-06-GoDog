import { StarEmptyIcon, StarFillIcon } from "@/app/(main)/mypage/_components/Icons";

export default function StarComponent() {
  return (
    <>
      <div className="flex flex-col items-center gap-[36px]">
        <p className="text-[#9CA3AF] font-inter text-[12px] font-black pt-[36px]">
          만족도를 선택해 주세요
        </p>
        <div className="flex flex-row gap-2 ">
          <div className="text-[#FBA613] w-[42px] h-[42px]">
            <StarFillIcon />
          </div>
          <div className="text-[#FBA613] w-[42px] h-[42px]">
            <StarFillIcon />
          </div>
          <div className="text-[#FBA613] w-[42px] h-[42px]">
            <StarFillIcon />
          </div>
          <div className="text-[#F0F0F3] w-[42px] h-[42px]">
            <StarFillIcon />
          </div>
          <div className="text-[#F0F0F3] w-[42px] h-[42px]">
            <StarFillIcon />
          </div>
        </div>

        <p className="text-[#1A1A1C] font-inter text-[16px] font-black ">보통이에요</p>
        <div className=" w-[532px] h-[1px] bg-[rgba(0,0,0,0.06)] mx-auto" />
      </div>
    </>
  );
}
