"use client";

import OnetimeCart from "@/app/(main)/cart/onetime-cart";
import SubscriptionCart from "@/app/(main)/cart/subscription-cart";
import useCartStore from "@/zustand/useCartStore";
import Badge from "@/components/common/Badge";
import Tab from "@/components/common/Tab";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCarts, removeFromCart } from "@/lib/cart";
import useUserStore from "@/zustand/useStore";
import { Cart } from "@/types/cart";

type TabType = "oneTime" | "subscription";

export default function Cart() {
  const [activeTab, setActiveTab] = useState<TabType>("oneTime");

  // 토큰 가져오기
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  // zustand 상태
  const { cartData, isLoading, error, fetchCart, getOnetimeItems, getSubscriptionItems } =
    useCartStore();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.token?.accessToken) return;
      const res = await getCarts(user.token.accessToken);
      if (res.ok === 1) {
        setCartItems(res.item);
      }
    };
    fetchCart();
  }, [user]);

  const handleRemove = async (cartId: number) => {
    if (!user?.token?.accessToken) return;
    const res = await removeFromCart(user.token.accessToken, cartId);
    if (res.ok === 1) {
      setCartItems((prev) => prev.filter((item) => item._id !== cartId));
    }
  };

  const onetimeItems = cartItems.filter((item) => !item.color || item.color === "oneTime");
  const subscriptionItems = cartItems.filter((item) => item.color === "subscribe");

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "oneTime", label: "1회구매", count: onetimeCount },
    { key: "subscription", label: "정기구독", count: subscriptionCount },
  ];

  // 로딩
  if (isLoading && !cartData) {
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

  // 에러
  if (error) {
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
        {activeTab === "oneTime" ? <OnetimeCart /> : <SubscriptionCart />}
      </div>
    </div>
  );
}
