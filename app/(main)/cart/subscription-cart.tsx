import useUserStore from "@/app/(main)/(auth)/login/zustand/useStore";
import SubscriptionItemList from "@/app/(main)/cart/_components/subscription-item-list";
import { deleteCartItems } from "@/app/(main)/cart/action/cart";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { Cart } from "@/types/cart";
import { ErrorRes } from "@/types/response";
import Image from "next/image";
import { useMemo, useState } from "react";

interface SubscriptionCartProps {
  items: Cart[];
  error: ErrorRes | null;
  onDeleteSuccess?: (deleteId: number) => void;
  onDeleteMutiple?: (deleteIds: number[]) => void;
}

export default function SubscriptionCart({
  items,
  error,
  onDeleteSuccess,
  onDeleteMutiple,
}: SubscriptionCartProps) {
  // 아이템 수량 관리
  const [quantity, setQuantity] = useState<Record<number, number>>(() => {
    const initialQuantity: Record<number, number> = {};
    items.forEach((item) => {
      initialQuantity[item._id] = item.quantity;
    });
    return initialQuantity;
  });

  // 토큰 가져오기
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  // 체크박스 선택된 상품 ID
  const [selectIds, setSelectIds] = useState<number[]>([]);

  // 여러 건 삭제
  const [isDeleting, setIsDeleting] = useState(false);

  // 수량 변경 핸들러
  const handleQuantityChange = (cartId: number, newQuantity: number) => {
    setQuantity((prev) => ({
      ...prev,
      [cartId]: newQuantity,
    }));
  };

  // 실시간 총 금액
  const total = useMemo(() => {
    const productsTotal = items.reduce((sum, item) => {
      const isSoldOut = item.product.quantity === item.product.buyQuantity;
      if (isSoldOut) return sum;

      const currentQty = quantity[item._id] || item.quantity;
      return sum + item.product.price * currentQty;
    }, 0);

    const shippingFees = 0;
    const discount = productsTotal * 0.1 || 0;

    return {
      products: productsTotal,
      shippingFees,
      discount,
      total: productsTotal + shippingFees - discount,
    };
  }, [items, quantity]);

  // 품절 상품 개수
  const soldOutCount = useMemo(() => {
    return items.filter((item) => item.product.quantity === item.product.buyQuantity).length;
  }, [items]);

  // 구매 가능한 상품 개수
  const availableCount = items.length - soldOutCount;

  // 개별 선택/해제 핸들러
  const handleSelect = (id: number) => {
    setSelectIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (selectIds.length === items.length) {
      setSelectIds([]);
    } else {
      setSelectIds(items.map((item) => item._id));
    }
  };

  // 한건 삭제 핸들러
  const handleDeleteSucces = (deleteId: number) => {
    setSelectIds((prev) => prev.filter((id) => id !== deleteId));
    onDeleteSuccess?.(deleteId);
  };

  // 여러 건 삭제 핸들러
  const handleDeleteMultiple = async () => {
    if (selectIds.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }

    // 헤더 에러 방지
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!confirm(`선택한 ${selectIds.length}개 상품을 삭제하시겠습니까?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const formData = new FormData();
      formData.append("cartIds", JSON.stringify(selectIds));
      formData.append("accessToken", accessToken);
      const result = await deleteCartItems(null, formData);

      if (result === null) {
        onDeleteMutiple?.(selectIds);

        setSelectIds([]);
      } else {
        alert(result.message);
      }
    } catch {
      alert("삭제에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-9 justify-center">
      {/* 장바구니 목록 */}
      <div className="xl:w-2/3">
        {items.length > 0 ? (
          <>
            <section className="flex gap-3 items-center bg-white border border-[#F9F9FB] rounded-[0.875rem] p-3 sm:p-7 mb-5 shadow-(--shadow-card)">
              <Checkbox
                label={`전체 선택(${selectIds.length}/${items.length})`}
                checked={selectIds.length === items.length}
                onChange={handleSelectAll}
                className="text-[#1A1A1C] text-[0.75rem] font-black"
              />
              <button
                onClick={handleDeleteMultiple}
                disabled={selectIds.length === 0 || isDeleting}
                className="ml-auto text-text-tertiary text-[0.625rem] font-bold"
              >
                선택 삭제
              </button>
            </section>

            {/* 상품 목록 */}
            {items.map((cart) => (
              <SubscriptionItemList
                key={cart._id}
                cart={cart}
                parentError={error}
                isSelect={selectIds.includes(cart._id)}
                onSelect={() => handleSelect(cart._id)}
                onQuantityChange={handleQuantityChange}
                onDeleteSuccess={() => handleDeleteSucces(cart._id)}
                accessToken={accessToken}
              />
            ))}
          </>
        ) : (
          <div className="border border-[#F9F9FB] rounded-[0.875rem] px-7 py-7 sm:px-7 sm:py-7 bg-white shadow-(--shadow-card)">
            <p className="text-[0.75rem] text-[#1A1A1C] font-bold text-center">
              구독 중인 상품이 없습니다.
            </p>
          </div>
        )}
      </div>

      {/* 결제 상세 요약 */}
      <aside className="xl:w-1/3">
        <div className="xl:sticky xl:top-8">
          <section className="flex flex-col gap-7 bg-white border border-border-primary rounded-[0.875rem] shadow-(--shadow-card) px-9 py-9 mb-5">
            <h2 className="text-[1.125rem] text-[#1A1A1C] font-black">결제 상세 요약</h2>
            <div className="flex justify-between">
              <p className="text-[0.75rem] text-text-secondary font-bold">총 상품 금액</p>
              <p className="text-[0.75rem] text-[#1A1A1C] font-black">
                {total.products.toLocaleString()}원
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[0.75rem] text-text-secondary font-bold">배송비</p>
              <p className="text-[0.75rem] text-[#1A1A1C] font-black">
                +{total.shippingFees.toLocaleString()}원
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[0.75rem] text-text-secondary font-bold">정기구독 할인</p>
              <p className="text-[0.75rem] text-[#1A1A1C] font-black">
                {total.discount.toLocaleString()}원
              </p>
            </div>

            <div className="flex justify-between border-t border-border-primary py-7">
              <h2 className="text-[1rem] text-[#1A1A1C] font-black">총 결제 예정액</h2>
              <p className="text-2xl text-[#FBA613] font-black">{total.total.toLocaleString()}원</p>
            </div>

            {/* 구매하기 버튼 */}
            <Button href="/checkout" disabled={availableCount === 0}>
              {availableCount > 0
                ? `${availableCount}개 상품 구매하기`
                : "구매 가능한 상품이 없습니다."}
            </Button>

            <div className="flex items-center justify-center gap-2">
              <Image src="/images/cart/safe.svg" alt="" width={14} height={14} />
              <p className="text-center text-[0.75rem] text-text-tertiary font-black">
                안전한 보안 결제 시스템
              </p>
            </div>
          </section>

          {/* 정기 구독 혜택 */}
          <section className="flex flex-col bg-[#FFF9F2] px-5 py-5 rounded-[0.875rem] gap-3 border border-[#FFF5E6]">
            <div className="flex items-center gap-2.5">
              <Image src="/images/cart/구독혜택.svg" alt="" width={28} height={28} />
              <h3 className="text-[0.75rem] text-[#1A1A1C] font-black">나만의 정기 구독 혜택</h3>
            </div>
            <ul className="flex flex-col gap-1.5 ml-4">
              <li className="text-[0.75rem] text-text-tertiary font-bold list-disc ml-2 pl-1">
                배송비 무료 혜택
              </li>
              <li className="text-[0.75rem] text-text-tertiary font-bold list-disc ml-2 pl-1">
                전 상품 10% 자동 상시 할인
              </li>
              <li className="text-[0.75rem] text-text-tertiary font-bold list-disc ml-2 pl-1">
                배송 주기 자유로운 변경 및 해지
              </li>
            </ul>
          </section>
        </div>
      </aside>
    </div>
  );
}
