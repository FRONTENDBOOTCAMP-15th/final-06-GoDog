"use client";

import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import Input from "@/components/common/Input";
import ProductImage from "@/components/common/ProductImage";
import useCartStore from "@/zustand/useCartStore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkoutItems, getSelectCartTotal } = useCartStore();

  // 체크박스 상태 관리 (주문동의, 정기결제동의, 제3자제공동의)
  const [checkedList, setCheckedList] = useState({
    order: false,
    autoPay: false,
    thirdParty: false,
  });

  // 단건 구매(쿼리 파라미터)
  const productId = searchParams.get("product_id");

  const finalCheckoutItems = useMemo(() => {
    // 쿼리 파라미터에 상품 id가 있으면 바로 구매
    if (productId) {
      return [
        {
          _id: Number(productId),
          product: {
            name: searchParams.get("name") || "",
            price: Number(searchParams.get("price") || 0),
            image: { path: searchParams.get("image") || "" },
            quantity: 999, // 임시
            buyQuantity: 0,
          },
          quantity: Number(searchParams.get("quantity") || 1),
          color: searchParams.get("type") === "subscription" ? "subscription" : "oneTime",
          size: searchParams.get("cycle") || "", // 배송 주기
        },
      ];
    }
    // 쿼리가 없으면 장바구니 zustand 스토어 아이템 사용
    return checkoutItems;
  }, [productId, searchParams, checkoutItems]);

  const firstItem = finalCheckoutItems[0];
  const isSubscribe = firstItem.color?.includes("subscription");
  const cycleLabel = firstItem.size === "2w" ? "격주 배송" : "매월 배송";
  const displayProductName =
    finalCheckoutItems.length > 1
      ? `${firstItem.product.name} 외 ${finalCheckoutItems.length - 1}건`
      : firstItem.product.name;

  // 결제하기 버튼 활성화 조건 계산
  const isAllChecked = useMemo(() => {
    if (isSubscribe) {
      // 정기구독: 3개 모두 체크 필요
      return checkedList.order && checkedList.autoPay && checkedList.thirdParty;
    }
    // 일반구매: 주문동의와 제3자제공동의 2개 체크 필요
    return checkedList.order && checkedList.thirdParty;
  }, [isSubscribe, checkedList]);

  // 금액 계산
  const { productsPrice, shippingFees, discount, totalPrice } = useMemo(() => {
    if (!finalCheckoutItems.length) {
      return { productsPrice: 0, shippingFees: 0, discount: 0, totalPrice: 0 };
    }

    // 바로 구매인 경우 직접 계산
    if (productId) {
      const item = finalCheckoutItems[0];
      const price = item.product.price * item.quantity;
      const disc = isSubscribe ? price * 0.1 : 0;

      return {
        productsPrice: price,
        shippingFees: 0,
        discount: disc,
        totalPrice: price,
      };
    }

    // 장바구니 구매인 경우
    const selectIds = finalCheckoutItems.map((item) => item._id);
    const type = isSubscribe ? "subscription" : "oneTime";
    return getSelectCartTotal(selectIds, type);
  }, [productId, finalCheckoutItems, isSubscribe, getSelectCartTotal]);

  if (finalCheckoutItems.length === 0) {
    return (
      <div className="flex flex-col items-center py-40 gap-4">
        <p className="text-text-secondary font-bold">결제할 상품 정보가 없습니다.</p>
        <Button variant="outline" onClick={() => router.push("/cart")}>
          장바구니로 돌아가기
        </Button>
      </div>
    );
  }

  const finalAmount = totalPrice - discount;

  return (
    <div className="bg-(--color-bg-secondary)">
      <div className="xl:max-w-300 min-w-90 mx-auto px-4 pt-8 pb-[8.75em]">
        {/* 헤더 */}
        <section className="text-center mb-16 mt-10">
          <Badge variant="accent" className="mb-3.5">
            CHECKOUT
          </Badge>
          <h2 className="text-[2rem] font-black">주문/결제</h2>
        </section>
        <div className="flex flex-col xl:flex-row gap-10">
          <div className="flex flex-col gap-9 xl:w-2/3">
            {/* 주문 상품 정보 */}
            <section>
              <div className="border border-[#F9F9FB] rounded-[0.875rem] px-3 py-3 sm:px-7 sm:py-7 bg-white shadow-(--shadow-card)">
                <h2 className="text-lg text-(--color-text-primary) font-black mb-7">
                  주문 상품 정보
                </h2>
                <div className="flex gap-2 sm:gap-5">
                  <div className="w-20 h-20 sm:w-17 shrink-0">
                    <ProductImage
                      src={firstItem.product.image?.path}
                      alt={firstItem.product.name}
                      className="w-full h-full rounded-[0.875rem] object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 sm:gap-1 mt-2.5">
                    <p className="text-[1rem] text-(--color-text-primary) font-black">
                      {displayProductName}
                    </p>
                    <p className="text-xs text-(--color-text-tertiary) font-bold">
                      {isSubscribe
                        ? `정기배송 (${cycleLabel}) | 수량 ${finalCheckoutItems.length}개`
                        : `수량 ${finalCheckoutItems.length}개`}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 배송 정보 */}
            <section>
              <div className="border border-[#F9F9FB] rounded-[0.875rem] px-3 py-3 sm:px-7 sm:py-7 bg-white shadow-(--shadow-card)">
                <h2 className="text-lg text-(--color-text-primary) font-black mb-7">배송 정보</h2>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-5">
                    <Input label="수령인" placeholder="" className="w-full" />
                    <Input label="연락처" placeholder="" className="w-full" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-2.5 items-end">
                      <Input label="배송지 주소" placeholder="" />
                      <Button variant="outline" size="md" className="">
                        주소 찾기
                      </Button>
                    </div>
                    <Input label="" placeholder="" />
                    <Input label="" placeholder="상세 주소를 입력해주세요" />
                  </div>
                  <Input label="배송 요청사항" placeholder="" />
                </div>
              </div>
            </section>
          </div>

          {/* 최종 결제 금액 */}
          <div className="xl:w-1/3">
            <div className="xl:sticy xl:top-8">
              <section>
                <div className="flex flex-col gap-7 border border-[#F9F9FB] rounded-[0.875rem] px-3 py-3 sm:px-7 sm:py-7 bg-white shadow-(--shadow-card)">
                  <h2 className="text-lg text-(--color-text-primary) font-black">최종 결제 금액</h2>
                  <div className="flex flex-col gap-3.5">
                    <div className="flex justify-between">
                      <p className="text-xs text-(--color-text-secondary) font-bold">
                        총 상품 금액
                      </p>
                      <p className="text-xs text-(--color-text-primary) font-bold">
                        {productsPrice.toLocaleString()}원
                      </p>
                    </div>
                    {isSubscribe && (
                      <div className="flex justify-between">
                        <p className="text-xs text-(--color-text-secondary) font-bold">
                          정기 구독 할인
                        </p>
                        <p className="text-xs text-(--color-accent-primary) font-bold">
                          -{discount.toLocaleString()}원
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <p className="text-xs text-(--color-text-secondary) font-bold">배송비</p>
                      <p className="text-xs text-(--color-text-primary) font-bold">
                        {shippingFees.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-text-tertiary pt-7">
                    <p className="text-[1rem] text-(--color-text-primary) font-black">
                      최종 결제액
                    </p>
                    <p className="text-[1.625rem] text-(--color-accent-primary) font-black">
                      {finalAmount.toLocaleString()}원
                    </p>
                  </div>
                  <ul className="flex flex-col gap-1.5 py-1.5">
                    <li>
                      <Checkbox
                        label="(필수) 주문 정보를 확인하였으며 결제에 동의합니다."
                        size="sm"
                        checked={checkedList.order}
                        onChange={() => setCheckedList((prev) => ({ ...prev, order: !prev.order }))}
                      />
                    </li>
                    {isSubscribe && (
                      <li>
                        <Checkbox
                          label="(필수) 매월 자동 정기 결제에 동의합니다."
                          size="sm"
                          checked={checkedList.autoPay}
                          onChange={() =>
                            setCheckedList((prev) => ({ ...prev, autoPay: !prev.autoPay }))
                          }
                        />
                      </li>
                    )}
                    <li>
                      <Checkbox
                        label="(필수) 개인정보 제 3자 제공에 동의합니다."
                        size="sm"
                        checked={checkedList.thirdParty}
                        onChange={() =>
                          setCheckedList((prev) => ({ ...prev, thirdParty: !prev.thirdParty }))
                        }
                      />
                    </li>
                  </ul>
                  <Button disabled={!isAllChecked}>
                    {finalAmount.toLocaleString()}원 결제하기
                  </Button>
                  <Button
                    href="/cart"
                    variant="outline"
                    className="w-full border-none text-xs text-text-secondary font-black hover:bg-transparent hover:underline shadow-none"
                  >
                    장바구니로 돌아가기
                  </Button>
                </div>
                <p className="flex justify-center gap-2.5 text-[0.625rem] text-(--color-text-primary) font-black) mt-7">
                  <Image src="/images/checkout/safe2.svg" alt="" width={18} height={18} />
                  TSL 1.3 암호화 보안 결제 시스템
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
