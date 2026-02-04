import useUserStore from "@/app/(main)/(auth)/login/zustand/useStore";
import { updateCartItem } from "@/app/(main)/cart/action/cart";
import useCartStore from "@/app/(main)/cart/zustand/useCartStore";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import ProductImage from "@/components/common/ProductImage";
import QuantityControl from "@/components/common/Quantitycontrol";
import { Cart } from "@/types/cart";
import Image from "next/image";
import { useState } from "react";

interface SubscriptionItemListProps {
  cart: Cart;
  isSelect: boolean;
  onSelect: () => void;
  onDelete: (cartId: number) => Promise<void>;
}

export default function SubscriptionItemList({
  cart,
  isSelect,
  onSelect,
  onDelete,
}: SubscriptionItemListProps) {
  // 토큰 가져오기
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  // zustand 상태
  const {
    isLoading,
    error: storeError,
    setError,
    updateQuantity,
    isSoldOut,
    getDeliveryCycle,
    setDeliveryCycle,
  } = useCartStore();

  // 배송 주기 가져오기
  const deliveryCycle = getDeliveryCycle(cart._id);

  // 품절 여부
  const soldOut = isSoldOut(cart._id);

  // 개별 금액 총 금액
  const totalPrice = cart.product.price * cart.quantity;

  // 수량 변경 핸들러
  const handleQuantityChange = async (newQuantity: number) => {
    if (soldOut) return;

    const prevQuantity = cart.quantity;

    // zustand 먼저 업데이트
    updateQuantity(cart._id, newQuantity);

    // FormData 생성
    const formData = new FormData();
    formData.append("cartId", cart._id.toString());
    formData.append("quantity", newQuantity.toString());
    // 토큰 추가
    if (accessToken) {
      formData.append("accessToken", accessToken);
    }

    try {
      const result = await updateCartItem(null, formData);

      if (result?.ok !== 0) {
        setError(result);
      } else {
        updateQuantity(cart._id, prevQuantity);
        setError(result);
      }
    } catch {
      updateQuantity(cart._id, prevQuantity);
      setError({ ok: 0, message: "수량 변경에 실패했습니다. 다시 시도해 주세요." });
    }
  };

  //  삭제 핸들러
  const handleDelete = () => {
    onDelete(cart._id);
  };

  // 배송 주기 변경 핸들러
  const handleCycleChange = (cycle: "biweekly" | "monthly") => {
    setDeliveryCycle(cart._id, cycle);
    // 필요하다면 여기서 API 호출도 가능
  };

  return (
    <section className="flex flex-col gap-3.5">
      <div
        className={`flex items-center gap-2 sm:gap-5 border border-[#F9F9FB] rounded-[0.875rem] px-3 py-3 sm:px-7 sm:py-7 bg-white shadow-(--shadow-card) ${
          soldOut ? "border-bg-tertiary opacity-60" : "border-[#F9F9FB]"
        }`}
      >
        <Checkbox label={cart.product.name} hideLabel checked={isSelect} onChange={onSelect} />
        <div className="w-20 h-20 sm:w-24 shrink-0">
          <ProductImage
            src={cart.product.image?.path}
            alt=""
            className={`rounded-[0.875rem] ${soldOut ? "grayscale" : ""}`}
          />
        </div>
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="flex gap-1 items-center">
            <h3 className="text-[#1A1A1C] text-xs sm:text-[1rem] font-black">
              {cart.product.name}
            </h3>
            {soldOut && <Badge variant="default">품절</Badge>}
          </div>
          <p className="text-text-tertiary text-[0.75rem] font-bold">
            {cart.product.price.toLocaleString()}원
          </p>
          {soldOut ? (
            <p className="text-text-tertiary text-xs font-bold">
              현재 상품의 재고가 없어 주문이 불가능합니다.
            </p>
          ) : (
            <>
              <p className="text-[0.625rem] text-(--color-text-primary) font-bold">
                배송 주기 선택:{" "}
                <span className="text-[#1A1A1C]">
                  {deliveryCycle === "biweekly" ? "격주 배송(2주)" : "매월 배송(4주)"}
                </span>
              </p>

              <div className="flex felx-col gap-0.5 sm:gap-1.5">
                <Button
                  variant={deliveryCycle === "biweekly" ? "secondary" : "outline"}
                  size="xs"
                  onClick={() => handleCycleChange("biweekly")}
                  disabled={isLoading}
                  className="flex-1 px-2 py-1.5 rounded text-[0.625rem] sm:text-xs font-bold transition-all border"
                >
                  격주 배송(2주)
                </Button>
                <Button
                  variant={deliveryCycle === "monthly" ? "secondary" : "outline"}
                  size="xs"
                  onClick={() => handleCycleChange("monthly")}
                  disabled={isLoading}
                  className="flex-1 px-2 py-1.5 rounded text-[0.625rem] sm:text-xs font-bold transition-all border"
                >
                  매월 배송(4주)
                </Button>
              </div>
              {/* 수량 조절 버튼 */}
              <QuantityControl
                initialCount={cart.quantity}
                disabled={isLoading}
                onChange={handleQuantityChange}
              />
            </>
          )}
          {/* 에러 메시지 */}
          {storeError && <p className="text-red-500 text-xs mt-1">{storeError.message}</p>}
        </div>
        <div className="flex flex-col items-end ml-auto gap-18 sm:gap-32">
          <button onClick={handleDelete} disabled={isLoading}>
            <Image src="/images/cart/x.svg" alt="" width={28} height={28} />
          </button>
          <p className="text-[#1A1A1C] font-black text-xs sm:text-[1rem] whitespace-nowrap">
            {totalPrice.toLocaleString()}원
          </p>
        </div>
      </div>
    </section>
  );
}
