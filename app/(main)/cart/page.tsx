"use client";

import OnetimeCart from "@/app/(main)/cart/cart";
import SubscriptionCart from "@/app/(main)/cart/subscription-cart";
import Badge from "@/components/common/Badge";
import { useState } from "react";

export default function Cart() {
  const [activeTab, setActiveTab] = useState<"oneTime" | "subscription">("oneTime");

  return (
    <div className="bg-[#F9F9FB] ">
      <div className="xl:max-w-300 min-w-90 mx-auto px-4 py-8">
        {/* 헤더 */}
        <section className="text-center mb-16 mt-10">
          <Badge variant="accent" className="mb-3.5">
            SHOPPING CART
          </Badge>
          <h2 className="text-[2rem] font-black">장바구니</h2>
        </section>

        {/* 탭 버튼 */}
        <section className="flex justify-center mb-9">
          <div className="border px-1.5 py-1.5 rounded-[0.875rem] border-border-primary bg-white shadow-(--shadow-card)">
            <button
              onClick={() => setActiveTab("oneTime")}
              className={`pl-10.5 pr-10.5 pt-3.5 pb-3.5 rounded-[0.875rem]  text-[0.75rem] font-black cursor-pointer
              ${activeTab === "oneTime" && "bg-[#FBA613] text-white shadow-(--shadow-glow)"}
              ${activeTab !== "oneTime" && "bg-white text-text-tertiary"}`}
            >
              1회 구매(2)
            </button>
            <button
              onClick={() => setActiveTab("subscription")}
              className={`pl-10.5 pr-10.5 pt-3.5 pb-3.5 rounded-[0.875rem]  text-[0.75rem] font-black cursor-pointer
                ${activeTab === "subscription" && "bg-[#FBA613] text-white shadow-(--shadow-glow)"}
                ${activeTab !== "subscription" && "bg-white text-text-tertiary"}
                `}
            >
              정기구독(1)
            </button>
          </div>
        </section>
        {activeTab === "oneTime" ? <OnetimeCart /> : <SubscriptionCart />}
      </div>
    </div>
  );
}
