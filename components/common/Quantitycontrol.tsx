// components/cart/QuantityControl.tsx
import Image from "next/image";

interface QuantityControlProps {
  count: number; // 현재 개수
  onCountUp: () => void; // 개수 증가
  onCountDown: () => void; // 개수 감소
  className?: string; // 추가 스타일
}

export default function QuantityControl({
  count,
  onCountUp,
  onCountDown,
  className = "",
}: QuantityControlProps) {
  return (
    <div
      className={`flex items-center border rounded-[0.875rem] w-fit bg-[#F9F9FB] border-border-primary ${className}`}
    >
      {/* 감소 버튼 */}
      <button
        onClick={onCountDown}
        className="flex px-0.5 sm:px-1 sm:py-1 justify-center items-center cursor-pointer"
      >
        <Image src="/images/cart/-.svg" alt="감소" width={28} height={28} />
      </button>

      {/* 개수 표시 */}
      <p className="sm:w-9 text-center text-xs font-semibold">{count}</p>

      {/* 증가 버튼 */}
      <button
        onClick={onCountUp}
        className="flex justify-center items-center px-0.5 sm:px-1 sm:py-1 cursor-pointer"
      >
        <Image src="/images/cart/+.svg" alt="증가" width={28} height={28} />
      </button>
    </div>
  );
}
