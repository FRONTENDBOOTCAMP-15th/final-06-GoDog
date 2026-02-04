"use client";

import OnetimeCart from "@/app/(main)/cart/cart";
import SubscriptionCart from "@/app/(main)/cart/subscription-cart";
import Badge from "@/components/common/Badge";
import Tab from "@/components/common/Tab";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCarts, removeFromCart } from "@/lib/cart";
import useUserStore from "@/app/(main)/(auth)/login/zustand/useStore";
import { Cart } from "@/types/cart";

type TabType = "oneTime" | "subscription";

function CartContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<TabType>(
    tabParam === "subscription" ? "subscription" : "oneTime",
  );
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const user = useUserStore((state) => state.user);

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

  const onetimeItems = cartItems.filter(
    (item) => !item.color || item.color === "oneTime",
  );
  const subscriptionItems = cartItems.filter(
    (item) => item.color === "subscribe",
  );

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "oneTime", label: "1회 구매", count: onetimeItems.length },
    { key: "subscription", label: "정기구독", count: subscriptionItems.length },
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
          <OnetimeCart items={onetimeItems} onRemove={handleRemove} />
        ) : (
          <SubscriptionCart items={subscriptionItems} onRemove={handleRemove} />
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense>
      <CartContent />
    </Suspense>
  );
}
