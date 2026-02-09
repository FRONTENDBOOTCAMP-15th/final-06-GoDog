import Skeleton from "@/components/common/Skeleton";

export const ProductCardSkeleton = () => (
  <div className="rounded-[42px] border border-[rgba(0,0,0,0.06)] bg-[#FFFFFF] shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
    {/* 이미지 영역: Aspect Ratio 유지 및 여백 포함 */}
    <div className="mt-[30px] mx-[30px] relative">
      <div className="w-[211px] h-[211px] rounded-[24px] overflow-hidden border border-black/5">
        <Skeleton className="w-full h-full" />
      </div>
    </div>

    {/* 컨텐츠 영역 */}
    <div className="flex flex-col pt-[27px] px-[29px] pb-[36px]">
      {/* 제목 및 삭제 버튼 행 */}
      <div className="flex justify-between items-center mb-[14.5px]">
        {/* 상품명 제목 */}
        <Skeleton className="h-6 w-2/3 rounded-lg" />
        {/* 버튼 아이콘 */}
        <Skeleton className="w-5 h-5 rounded-md" />
      </div>

      {/* 구분선 */}
      <hr className="w-full h-px border-0 bg-[rgba(0,0,0,0.06)] mb-[15px]" />

      {/* 가격 정보 행 */}
      <div className="flex justify-between items-center">
        {/* '판매 가격' 텍스트 자매 */}
        <Skeleton className="h-4 w-12 rounded" />
        {/* 실제 가격 숫자 자리 */}
        <Skeleton className="h-4 w-20 rounded" />
      </div>
    </div>
  </div>
);
