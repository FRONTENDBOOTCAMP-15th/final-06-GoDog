import Input from "@/components/common/Input";

export default function Contentdetail() {
  return (
    <>
      <div className="flex flex-row justify-between w-[532px]">
        <p className="text-[#1A1A1C] font-inter text-[11.5px] font-black leading-[17.5px]">
          상세 내용
        </p>
        <p className="text-[#909094] font-inter text-[11.5px] font-black leading-[17.5px]">0/100</p>
      </div>
      <Input
        className="w-[532px]"
        label=""
        placeholder="아이의 반응이나 제품에 대한 솔직한 후기를 남겨주세요 (최대 100자)"
      />
    </>
  );
}
