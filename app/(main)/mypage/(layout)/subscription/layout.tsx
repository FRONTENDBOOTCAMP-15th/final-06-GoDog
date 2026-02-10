import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정기 구독",
  description: "9DOG 정기 구독 플랜 페이지입니다.",
  openGraph: {
    title: "정기 구독",
    description: "9DOG 정기 구독 플랜 페이지입니다.",
    url: "https://final-06-gu-dog-release.vercel.app/cart/mypage/subscription",
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

export default function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
