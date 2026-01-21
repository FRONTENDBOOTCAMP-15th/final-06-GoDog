import { SubscriptionIcon, PurchaseIcon, HeartIcon, UserIcon } from "@/components/common/Icons";

export default function MypageButton({ content }: Readonly<{ content: React.ReactNode }>) {
  return (
    <>
      <div className="w-full h-361.25 bg-[#F9F9FB]">
        <button
          className="flex flex-col items-center 
        w-[287.96px] h-[165.9px] 
        pt-[26.56px] pr-[29.5px] pb-[30.145px] pl-[29.5px] 
        gap-[14.515px] shrink-0 
        rounded-[35px] border-2 border-[#FBA613] 
        bg-white 
        shadow-[0_8px_32px_0_rgba(251,166,19,0.20)]"
          type="button"
        >
          <span className="w-16.25 h-16.25 bg-[#FBA613] flex justify-center items-center rounded-[14px]">
            <UserIcon className="text-white" />
          </span>
          <span
            className="text-[#FBA613] 
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
        </button>
      </div>
    </>
  );
}
