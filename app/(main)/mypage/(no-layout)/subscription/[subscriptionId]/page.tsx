import SubscriptionEditClient from "@/app/(main)/mypage/(no-layout)/subscription/[subscriptionId]/SubscriptionEditClient";
import { getOrderDetail } from "./GetOrderDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "구독 관리",
  description: "9DOG 구독 상세 정보 및 관리 페이지입니다.",
  openGraph: {
    title: "구독 관리",
    description: "9DOG 구독 상세 정보 및 관리 페이지입니다.",
    url: "https://final-06-gu-dog-release.vercel.app/mypage/subscription",
    images: [
      {
        url: "https://final-06-gu-dog-release.vercel.app/images/ogimage.png",
        width: 1200,
        height: 630,
        alt: "9DOG - 반려견 건강 식단 정기 구독 서비스",
      },
    ],
  },
};

interface Props {
  params: { subscriptionId: string };
}

export default async function SubscriptionEditPage({ params }: Props) {
  const { subscriptionId } = await params;
  const response = await getOrderDetail(subscriptionId);

  if (!response || response.ok !== 1) {
    return <div className="py-40 text-center text-[#909094]">주문 내역을 불러올 수 없습니다.</div>;
  }

  return <SubscriptionEditClient initialData={response.item} orderId={subscriptionId} />;
}
