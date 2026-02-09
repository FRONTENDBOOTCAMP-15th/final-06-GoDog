import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정기 구독",
  description: "9DOG 정기 구독 플랜 페이지입니다.",
  openGraph: {
    title: "정기 구독",
    description: "9DOG 정기 구독 플랜 페이지입니다.",
    url: "/mypage/subscription",
    images: {
      url: "",
    },
  },
};

export default function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
