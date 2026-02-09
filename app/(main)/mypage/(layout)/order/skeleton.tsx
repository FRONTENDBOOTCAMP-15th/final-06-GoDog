import Skeleton from "@/components/common/Skeleton";

export function MyItemListSkeleton() {
  return (
    <>
      <div className="rounded-[42px] border border-[rgba(0,0,0,0.06)] bg-[#FFFFFF] shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] flex flex-col overflow-hidden w-full">
        {/* 이미지 영역: MyItemList의 mt-[30px] mx-[30px] 구조 유지 */}
        <div className="mt-[30px] mx-[30px]">
          <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-black/5">
            <Skeleton className="w-full h-full" />
          </div>
        </div>

        {/* 타이틀 영역 */}
        <div className="pt-[27px] px-[29px] pb-[14.5px]">
          <Skeleton className="h-7 w-3/4 rounded-lg" />
        </div>

        {/* 상세 정보 영역 (주문일, 수량, 주기) */}
        <div className="px-[29px] space-y-[7px] mb-[14.5px]">
          {/* 주문일 */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-10 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
          {/* 수량 */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-8 rounded" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
          {/* 주기 */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-8 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>

        {/* 구분선 */}
        <hr className="w-[calc(100%-58px)] h-px mx-auto border-0 bg-[rgba(0,0,0,0.06)]" />

        {/* 결제 금액 영역 */}
        <div className="pb-9 pt-[15px] px-[29px] flex justify-between items-center">
          <Skeleton className="h-4 w-14 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>

        {/* 하단 구분선 */}
        <hr className="w-[calc(100%-58px)] h-px mx-auto border-0 bg-[rgba(0,0,0,0.06)]" />

        {/* 하단 버튼 영역 (리뷰 작성 / 상세 보기) */}
        <div className="w-full flex justify-center items-center px-[29px] py-[20px]">
          <Skeleton className="h-4 w-24 rounded-full" />
        </div>
      </div>
    </>
  );
}
