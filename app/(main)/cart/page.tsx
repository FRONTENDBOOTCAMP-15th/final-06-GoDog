"use client";

import { getCartItems } from "@/app/(main)/cart/action/cart";
import OnetimeCart from "@/app/(main)/cart/cart";
import SubscriptionCart from "@/app/(main)/cart/subscription-cart";
import Badge from "@/components/common/Badge";
import Tab from "@/components/common/Tab";
import { CartListRes, ErrorRes } from "@/types/response";
import { useEffect, useState } from "react";

type TabType = "oneTime" | "subscription";

export default function Cart() {
  const [activeTab, setActiveTab] = useState<TabType>("oneTime");
  const [cartData, setCartData] = useState<CartListRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorRes | null>(null);

  // 장바구니 데이터 로드
  useEffect(() => {
    loadCart();
  }, []);

  // 장바구니 로드
  const loadCart = async () => {
    try {
      setIsLoading(true);
      const data = await getCartItems();

      if (data.ok === 0) {
        setError(data);
      } else {
        setCartData(data);
      }
    } catch {
      setError({ ok: 0, message: "장바구니 목록을 불러오는데 실패했습니다. 다시 시도해 주세요." });
    } finally {
      setIsLoading(false);
    }
  };

  // 한건 삭제 성공 핸들러
  const handleDeleteSuccess = (deleteId: number) => {
    if (!cartData) return;

    setCartData({
      ...cartData,
      item: cartData.item.filter((item) => item._id !== deleteId),
    });
  };

  // 여러건 삭제 성공 핸들러
  const handleDeleteMultiple = (deleteIds: number[]) => {
    if (!cartData) return;

    setCartData({
      ...cartData,
      item: cartData.item.filter((item) => !deleteIds.includes(item._id)),
    });
  };

  // 수량 변경 후 재조회
  const handleQuantityUpdate = async () => {
    await loadCart();
  };

  if (isLoading) {
    return (
      <div className="bg-[#F9F9FB]">
        <div className="xl:max-w-300 min-w-90 mx-auto px-4 pt-8 pb-[8.75rem]">
          <div className="text-center py-20">
            <p className="text-text-tertiary">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !cartData) {
    return (
      <div className="bg-[#F9F9FB]">
        <div className="xl:max-w-300 min-w-90 mx-auto px-4 pt-8 pb-[8.75rem]">
          <div className="text-center py-20">
            <p className="text-red-500">{error?.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // 1회 구매와 정기구독 상품 분리
  const onetimeItems = cartData.item.filter((cart) => cart.color?.includes("1회구매"));

  const subscriptionItems = cartData?.item.filter((cart) => cart.color?.includes("정기구독"));

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "oneTime", label: "1회 구매", count: onetimeItems.length || 0 },
    { key: "subscription", label: "정기구독", count: subscriptionItems.length || 0 },
  ];

  return (
    <div className="bg-[#F9F9FB] ">
      <div className="xl:max-w-300 min-w-90 mx-auto px-4 pt-8 pb-[8.75rem]">
        {/* 헤더 */}
        <section className="text-center mb-16 mt-10">
          <Badge variant="accent" className="mb-3.5">
            SHOPPING CART
          </Badge>
          <h2 className="text-[2rem] font-black">장바구니</h2>
        </section>

        {/* 탭 버튼 */}
        <section className="flex justify-center mb-9">
          <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </section>
        {activeTab === "oneTime" ? (
          <OnetimeCart
            items={onetimeItems}
            error={error}
            onDeleteSuccess={handleDeleteSuccess}
            onDeleteMutiple={handleDeleteMultiple}
            onQuantityUpdate={handleQuantityUpdate}
          />
        ) : (
          <SubscriptionCart
            items={subscriptionItems}
            error={error}
            onDeleteSuccess={handleDeleteSuccess}
            onDeleteMutiple={handleDeleteMultiple}
            onQuantityUpdate={handleQuantityUpdate}
          />
        )}
      </div>
    </div>
  );
}
