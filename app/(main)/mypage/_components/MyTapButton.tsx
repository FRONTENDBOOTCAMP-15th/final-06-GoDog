"use client";

import {
  HeartIcon,
  UserIcon,
  SubscriptionIcon,
  PurchaseIcon,
  CameraIcon,
} from "@/app/(main)/mypage/_components/Icons";
import Link from "next/link";

interface MyTapButtonProps {
  content: string;
  icon: React.ReactNode; // 아이콘 컴포넌트
  isActive?: boolean;
  href: string;
}

export default function MyTapButton({ content, icon, isActive = false, href }: MyTapButtonProps) {
  // 마우스 올렸을 때 스타일 변화

  const containerStyle = isActive
    ? "bg-[#FBA613] text-white shadow-[0_8px_32px_0_rgba(251,166,19,0.20)]"
    : "bg-white text-[#FBA613] border-2 border-black/10 hover:bg-gray-50";

  const iconBgStyle = isActive ? "bg-white/20" : "bg-[#FFF9F2]";
  const iconColor = isActive ? "text-white" : "text-[#FBA613]";

  return (
    <>
      <Link
        href={href}
        className={`flex flex-col items-center 
      w-[287.96px] h-[165.9px] 
      pt-[26.56px] pr-[29.5px] pb-[30.145px] pl-[29.5px] active:scale-95
      gap-[14.515px] shrink-0 
      rounded-[35px] 
     ${containerStyle}`}
        type="button"
      >
        <span
          className={`w-16.25 h-16.25  flex justify-center items-center rounded-[14px]${iconBgStyle}`}
        >
          <span className={iconColor}>{icon}</span>
        </span>
        <span
          className="
      text-center 
      font-['Pretendard'] 
      text-[16.6px] 
      font-black 
      leading-[25.725px] 
      tracking-[-0.414px] 
      not-italic"
        >
          {content}
        </span>
      </Link>
    </>
  );
}
