import { Metadata } from "next";

export const metadata: Metadata = {
  title: "주문 내역",
  description: "9DOG 주문 내역 페이지입니다.",
  openGraph: {
    title: "주문 내역",
    description: "9DOG 주문 내역 페이지입니다.",
    url: "https://final-06-gu-dog-release.vercel.app/mypage/order",
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

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
