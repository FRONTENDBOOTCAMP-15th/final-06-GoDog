"use client";

import TextArea from "@/app/(main)/mypage/_components/Contentdetail";
import Contentdetail from "@/app/(main)/mypage/_components/Contentdetail";
import { PlusIcon, PrevIcon } from "@/app/(main)/mypage/_components/Icons";
import StarComponent from "@/app/(main)/mypage/_components/StarComponent";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Link from "next/link";
import { useState } from "react";

export default function Review() {
  const [preview, setPreview] = useState("/images/moomin.png");
  const [reviewContent, setReviewContent] = useState("");
  const MAX_LEN = 100; // 최대 글자 수 설정
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

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
        <div className="bg-white w-[632px]  rounded-[35px] flex flex-col items-center">
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

          <Contentdetail
            className="w-[532px]"
            label="상세 내용"
            placeholder="아이의 반응이나 제품에 대한 솔직한 후기를 남겨주세요 (최대 100자)"
            currentLength={reviewContent.length} // 실시간 글자 수 전달
            maxLength={MAX_LEN} // 최대 글자 수 전달
            value={reviewContent} // 입력된 값 연결
            onChange={(e) => setReviewContent(e.target.value)} // 입력 시 상태 업데이트
          />

          {/* {사진 업로드 기능} */}
          <div className="flex flex-col  items-center mt-[35px]">
            <p className="text-[#1A1A1C] font-inter text-[11.5px] font-black leading-[17.5px] pb-[14px]">
              사진 첨부
            </p>
            <div className="flex justify-start  w-[532px] gap-2">
              <form
                action="/https://fesp-api.koyeb.app/market"
                method="post"
                encType="multipart/form-data"
              >
                {/* {action "/" 는 파일이 전송될 서버의 주소 , method는 post 방식으로, enctype=~ 는 파일 데이터 전송을 위한 인코딩 방식, 필수이다. } */}
                <img
                  className="w-[84px] h-[84px]  border-2 rounded-[14px] border-[#909094]  shadow-2xl "
                  src={preview}
                  alt="프로필 이미지"
                ></img>
              </form>

              {/* {id는 자스에서 요소 식별 id, name은 서버로 데이터를 보낼 때 사용할 이름, accept는 이미지 파일만 선택하도록 제한} */}
              {/* <div className="w-[35px] h-[35px]  flex justify-center items-center mb-[50px]"> */}
              <label className="" htmlFor="profileImageUpload"></label>
              <input
                className="w-[84px] h-[84px]  border-2 rounded-[14px] border-[#909094] border-dashed shadow-2xl text-transparent "
                type="file"
                id="profileImageUpload"
                name="profileImageFile"
                accept="image/*"
                onChange={handleImageChange}
              ></input>
              <div className="">
                <PlusIcon className="text-[#909094] w-[21px] pb-[3px]" />
                <p className="text-[#909094] font-inter text-[11.5px] font-black">추가</p>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className="pb-[50px]">
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
