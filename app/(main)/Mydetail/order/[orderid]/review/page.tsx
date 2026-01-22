import Contentdetail from "@/app/(main)/mypage/_components/Contentdetail";
import { PlusIcon, PrevIcon } from "@/app/(main)/mypage/_components/Icons";
import StarComponent from "@/app/(main)/mypage/_components/StarComponent";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Link from "next/link";

export default function Review() {
  return (
    <>
      <div className="pt-[70px] pb-[112px] pl-[620px] pr-[620px] ">
        <Link className="flex flex-row gap-[7px]" href={"/mypage/subscription"}>
          <PrevIcon className="W-[17.5px] h-[17.5px] text-[#909094]" />
          <p className="text-[#909094] font-inter text-[11.7px] font-black leading-[17.5px]  uppercase">
            뒤로가기
          </p>
        </Link>
        <div className="flex flex-col items-center gap-[14px] pt-[35px]">
          <Badge variant="accent">{"MANAGE PLAN"}</Badge>
          <h1 className="text-[#1A1A1C] text-center font-inter text-[29.5px] font-black leading-[35px] tracking-[-1.575px]">
            {" "}
            소중한 후기를 들려주세요{" "}
          </h1>
          <p className="text-[#646468] text-center font-inter text-[14.7px] font-medium leading-[24.5px] pb-[35px]">
            작성해주신 후기는 다른 견주님들께 큰 도움이 됩니다.
          </p>
        </div>
        <div className="bg-white w-[632px] h-[886px] rounded-[35px] flex flex-col items-center">
          {/* {평점 있는 컨테이너} */}
          <div className="pb-[10px]">
            <StarComponent />
          </div>

          <div className="flex flex-row justify-between w-[532px]">
            <p className="text-[#1A1A1C] font-inter text-[11.5px] font-black leading-[17.5px]">
              리뷰 제목
            </p>
          </div>
          <Input className="w-[532px] pb-[35px]" label="" placeholder="제목을 입력해 주세요" />

          <Contentdetail />
          <div className="flex flex-col items-start pt-[35px] rounded-[14px] border-2 border-dashed border-black/10  ">
            <p className="text-[#1A1A1C] font-inter text-[11.5px] font-black leading-[17.5px]">
              사진 첨부
            </p>
            <div className="w-[84px] h-[84px] flex flex-col justify-center items-center gap-1">
              <PlusIcon className="w-[21px] h-[21px] text-[#909094] " />
              <p className="text-[#909094] text-center font-inter text-[10px] font-black  uppercase">
                추가
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-[14px] pt-[28px]">
              <Button className="w-[257px]" size="md" variant="primary">
                후기 저장하기
              </Button>
              <Button
                className="w-[257px] rounded-[14px] border-2 border-black/10 bg-white"
                size="md"
                variant="ghost"
              >
                작성 취소
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
