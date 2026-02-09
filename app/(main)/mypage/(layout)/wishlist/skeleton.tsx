import Skeleton from "@/components/common/Skeleton";

export const ProductCardSkeleton = () => (
  // 1. w-full을 주어 부모 Grid 너비(max-w-[280px])를 그대로 따르게 합니다.
  <div className="w-full max-w-[280px] rounded-[42px] border border-[rgba(0,0,0,0.06)] bg-[#FFFFFF] shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
    {/* 이미지 영역: 고정 크기 대신 aspect-square와 padding 활용 */}
    <div className="pt-[30px] px-[30px] w-full">
      <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-black/5">
        <Skeleton className="w-full h-full" />
      </div>
    </div>

    {/* 컨텐츠 영역: 기존 컴포넌트의 여백 구조와 동일하게 맞춤 */}
    <div className="mt-[27px] px-[29px] pb-[14.5px]">
      <div className="flex justify-between items-center">
        {/* 상품명 제목 */}
        <Skeleton className="h-[22px] w-3/5 rounded-lg" />
        {/* 휴지통 아이콘 위치 */}
        <Skeleton className="w-6 h-6 rounded-md" />
      </div>
    </div>

    {/* 구분선: 실제 컴포넌트와 동일한 여백 적용 */}
    <hr className="w-[calc(100%-58px)] h-px mx-auto border-0 bg-[rgba(0,0,0,0.06)]" />

    {/* 가격 정보 행 */}
    <div className="pb-[36px] pt-[15px] px-[29px] flex justify-between items-center">
      {/* '판매 가격' 라벨 */}
      <Skeleton className="h-4 w-12 rounded" />
      {/* 가격 숫자 */}
      <Skeleton className="h-4 w-20 rounded" />
    </div>
  </div>
);
