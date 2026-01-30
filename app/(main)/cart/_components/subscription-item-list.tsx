import { deleteCartItem, updateCartItem } from "@/app/(main)/cart/action/cart";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import ProductImage from "@/components/common/ProductImage";
import QuantityControl from "@/components/common/Quantitycontrol";
import { Cart } from "@/types/cart";
import { ErrorRes } from "@/types/response";
import Image from "next/image";
import { useState, useTransition } from "react";

interface SubscriptionItemListProps {
  cart: Cart;
  parentError: ErrorRes | null;
  onQuantityChange?: (cartId: number, newQuantity: number) => void;
}

export default function SubscriptionItemList({
  cart,
  parentError,
  onQuantityChange,
}: SubscriptionItemListProps) {
  const { product, quantity } = cart;

  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<ErrorRes | null>(null);

  // 수량 변경 핸들러
  const handleQuantityChange = async (newQuantity: number) => {
    setCurrentQuantity(newQuantity);
    setLocalError(null);

    // 부모에게 변경 알림(총 금액 업데이트)
    onQuantityChange?.(cart._id, newQuantity);

    // FormData 생성
    const formData = new FormData();
    formData.append("cartId", cart._id.toString());
    formData.append("quantity", newQuantity.toString());

    // 로딩 상태, api 통신
    setIsLoading(true);
    try {
      const result = await updateCartItem(null, formData);

      if (result?.ok === 0) {
        setLocalError(result);
        throw new Error(result.message);
      }
    } catch {
      setLocalError({ ok: 0, message: "수량 변경에 실패했습니다." });
      setCurrentQuantity(quantity);
      onQuantityChange?.(cart._id, quantity);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("local", localError);
  console.log("parent", parentError);

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm("삭제하시겠습니까?")) return;

    const formData = new FormData();
    formData.append("cartId", cart._id.toString());

    setIsLoading(true);
    try {
      const result = await deleteCartItem(null, formData);
      if (result?.ok === 0) {
        alert(result.message);
      }
    } catch {
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-3.5">
      <div className="flex items-center gap-2 sm:gap-5 border border-[#F9F9FB] rounded-[0.875rem] px-3 py-3 sm:px-7 sm:py-7 bg-white shadow-(--shadow-card)">
        <Checkbox label={product.name} hideLabel />
        <div className="w-20 h-20 sm:w-24 shrink-0">
          <ProductImage src={cart.product.image?.path} alt="" className="rounded-[0.875rem]" />
        </div>
        <div className="flex flex-col gap-1 sm:gap-2">
          <h3 className="text-[#1A1A1C] text-sm sm:text-[1rem] font-black">{product.name}</h3>
          <p className="text-text-tertiary text-[0.75rem] font-bold">
            {product.price.toLocaleString()}원
          </p>
          <p className="text-[0.625rem] text-(--color-text-primary) font-bold">
            배송 주기 선택: {product.extra?.period}
          </p>
          <div className="flex felx-col gap-0.5 sm:gap-1.5">
            <Button variant="outline" size="xs">
              격주 배송(2주)
            </Button>
            <Button variant="secondary" size="xs">
              매월 배송(4주)
            </Button>
          </div>
          {/* 수량 조절 버튼 */}
          <QuantityControl initialCount={currentQuantity} onChange={handleQuantityChange} />
          {/* 에러 메시지 */}
          {localError && <p className="text-red-500 text-xs mt-1">{localError.message}</p>}
          {!localError && parentError && (
            <p className="text-red-500 text-xs mt-1">{parentError.message}</p>
          )}

          {/* 로딩 */}
          {isLoading}
        </div>
        <div className="flex flex-col items-end ml-auto gap-18 sm:gap-32">
          <button onClick={handleDelete} disabled={isLoading}>
            <Image src="/images/cart/x.svg" alt="" width={28} height={28} />
          </button>
          <p className="text-[#1A1A1C] font-black text-sm sm:text-[1rem]">
            {(product.price * currentQuantity).toLocaleString()}원
          </p>
        </div>
      </div>
    </section>
  );
}
