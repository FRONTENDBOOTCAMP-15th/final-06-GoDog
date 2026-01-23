"use client";

import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import {
  SubscriptionIcon,
  PurchaseIcon,
  HeartIcon,
  UserIcon,
  CameraIcon,
} from "@/app/(main)/mypage/_components/Icons";
import Input from "@/components/common/Input";
import { useState } from "react";

export default function Profile() {
  const [preview, setPreview] = useState("/images/moomin.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center pt-[75px]  ">
        {/* <p className=" rounded-[7px] border border-[#FBA613]/20 bg-[#FFF5E6] w-[102px] h-[24px] leading-5 text-center text-[#FBA613] font-['Pretendard'] font-[800] text-[10px]">
          ACCOUNT EDIT
        </p> */}

        <Badge variant="accent" className="">
          {"ACCOUT EDIT"}
        </Badge>
        <h1 className="pt-[14px] text-[#1A1A1C] font-['Pretendard'] text-[26px] font-black">
          회원정보 수정
        </h1>
        <p className="pt-[14px] pb-[42px] text-[#646468] font-['Pretendard'] text-[14px] font-[500]">
          서비스 이용을 위한 소중한 정보를 안전하게 관리하세요.
        </p>

        <div className="mb-[161px] w-[672px] h-[779px] pl-[56px] pr-[56px] pt-[56px] pb-[70px] rounded-[49px] border border-black/[0.06] bg-[#FFF] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col">
            <div className="flex flex-col  items-center">
              <form
                action="/https://fesp-api.koyeb.app/market"
                method="post"
                encType="multipart/form-data"
              >
                {/* {action "/" 는 파일이 전송될 서버의 주소 , method는 post 방식으로, enctype=~ 는 파일 데이터 전송을 위한 인코딩 방식, 필수이다. } */}
                <img
                  className="w-[97px] h-[97px] rounded-full ring-2 ring-white shadow-2xl"
                  src={preview}
                  alt="프로필 이미지"
                ></img>

                {/* {id는 자스에서 요소 식별 id, name은 서버로 데이터를 보낼 때 사용할 이름, accept는 이미지 파일만 선택하도록 제한} */}
                <div className="w-[35px] h-[35px] ml-16 -mt-8  flex justify-center items-center">
                  <label htmlFor="profileImageUpload">
                    <div className="w-[35px] h-[35px] bg-[#FBA613] rounded-full flex flex-row justify-center items-center border-2 border-[#FFFFFF] hover:cursor-pointer">
                      <CameraIcon className="text-white " />
                    </div>
                  </label>
                  <input
                    className="bg-amber-400 w-[35px] h-[35px] ml-[130px] bg-[#FBA613] flex justify-center items-center rounded-full ring-2 ring-white text-transparent hidden"
                    type="file"
                    id="profileImageUpload"
                    name="profileImageFile"
                    accept="image/*"
                    onChange={handleImageChange}
                  ></input>
                </div>
              </form>
              <p className="mb-[42px] pt-[14px] text-[#909094] text-[10.5px] font-[700] leading-[14px] tracking-[1.05px] uppercase">
                프로필 사진 변경
              </p>
            </div>
          </div>

          <Input
            className="mb-[22px]  [&>label]:text-black [&>label]:font-black [&>label]:text-[12px] [&>label]:font-['Pretendard'] "
            label="이메일 주소"
            placeholder="hello@9Dog.co.kr"
          ></Input>
          {/* {배송 주소 입력 폼} */}
          <div className="">
            <div className="flex flex-row gap-[11px] ">
              <Input
                className="w-[112px] [&>label]:text-black [&>label]:font-black [&>label]:text-[12px] [&>label]:font-['Pretendard'] "
                label="배송 주소"
                placeholder="12345"
              ></Input>

              <Button className="w-[81px] mt-[28px]" size="xs" variant="primary">
                주소 찾기
              </Button>
            </div>
            <div className="mb-[73px]">
              <Input label="" placeholder="서울특별시 강남구 테헤란로 1234"></Input>
              <Input label="" placeholder="나인독 타워 9층"></Input>
            </div>
            <div>
              {/* { 제출 버튼 } */}

              <div className=" h-[1px] bg-[rgba(0,0,0,0.06)] mx-auto mb-[28px] " />
              <div className="flex flex-row gap-[14px]">
                <Button className="w-[270px] " size="md" variant="primary">
                  정보 저장하기
                </Button>

                <Button
                  className="rounded-[14px] border-2 border-black/10 w-[270px]  text-black font-black text-[12px] font-['Pretendard'] "
                  size="md"
                  variant="ghost"
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
