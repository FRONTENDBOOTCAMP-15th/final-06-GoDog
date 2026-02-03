import { deleteCartItem, updateCartItem } from "@/app/(main)/cart/action/cart";
import Badge from "@/components/common/Badge";
import Checkbox from "@/components/common/Checkbox";
import ProductImage from "@/components/common/ProductImage";
import QuantityControl from "@/components/common/Quantitycontrol";
import { Cart } from "@/types/cart";
import { ErrorRes } from "@/types/response";
import Image from "next/image";
import { useState } from "react";

interface OnetimeItemListProps {
  cart: Cart;
  parentError: ErrorRes | null;
  onQuantityChange?: (cartId: number, newQuantity: number) => void;
  isSelect: boolean;
  onSelect: () => void;
  onDeleteSuccess?: () => void;
  onQuantityUpdateComplete?: () => void;
}

export default function OnetimeItemList({
  cart,
  parentError,
  onQuantityChange,
  isSelect,
  onSelect,
  onDeleteSuccess,
  onQuantityUpdateComplete,
}: OnetimeItemListProps) {
  const { product, quantity } = cart;

  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<ErrorRes | null>(null);

  // 품절 여부
  const isSoldOut = product.quantity === product.buyQuantity;

  // 수량 변경 핸들러
  const handleQuantityChange = async (newQuantity: number) => {
    if (isSoldOut) return;

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
      onQuantityUpdateComplete?.();
    } catch {
      setLocalError({ ok: 0, message: "수량 변경에 실패했습니다. 다시 시도해 주세요." });
      setCurrentQuantity(quantity);
      onQuantityChange?.(cart._id, quantity);
    } finally {
      setIsLoading(false);
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm("삭제하시겠습니까?")) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("cartId", cart._id.toString());

      const result = await deleteCartItem(null, formData);

      if (result?.ok !== 0) {
        onDeleteSuccess?.();
      }
    } catch {
      alert("삭제에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-3.5">
      <div
        className={`flex items-center gap-2 sm:gap-5 border border-[#F9F9FB] rounded-[0.875rem] px-3 py-3 sm:px-7 sm:py-7 bg-white shadow-(--shadow-card) ${
          isSoldOut ? "border-bg-tertiary opacity-60" : "border-[#F9F9FB]"
        }`}
      >
        <Checkbox label={product.name} hideLabel checked={isSelect} onChange={onSelect} />
        <div className="w-20 h-20 sm:w-24 shrink-0 relative">
          <ProductImage
            src={product.image?.path}
            alt=""
            className={`rounded-[0.875rem] ${isSoldOut ? "grayscale" : ""}`}
          />
        </div>
        <div className="flex flex-col gap-1 sm:gap-3.5">
          <div className="flex gap-1 items-center ">
            <h3 className="text-[#1A1A1C] text-xs sm:text-[1rem] font-black">{product.name}</h3>
            {isSoldOut && <Badge variant="default">품절</Badge>}
          </div>
          <p className="text-text-tertiary text-[0.75rem] font-bold">
            {product.price.toLocaleString()}원
          </p>
          {isSoldOut ? (
            <p className="text-text-tertiary text-xs font-bold">
              현재 상품의 재고가 없어 주문이 불가능합니다.
            </p>
          ) : (
            <QuantityControl initialCount={currentQuantity} onChange={handleQuantityChange} />
          )}
          {/* 에러 메시지 */}
          {localError && <p className="text-red-500 text-xs mt-1">{localError.message}</p>}
          {!localError && parentError && (
            <p className="text-red-500 text-xs mt-1">{parentError.message}</p>
          )}

          {/* 로딩 */}
          {isLoading}
        </div>
        <div className="flex flex-col items-end ml-auto gap-8 sm:gap-14">
          <button onClick={handleDelete} disabled={isLoading}>
            <Image src="/images/cart/x.svg" alt="" width={28} height={28} />
          </button>
          <p className="text-[#1A1A1C] font-black text-xs sm:text-[1rem] whitespace-nowrap">
            {(product.price * currentQuantity).toLocaleString()}원
          </p>
        </div>
      </div>
    </section>
  );
}
