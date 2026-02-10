import { Metadata } from "next";

export const metadata: Metadata = {
  title: "결제",
  description: "9DOG 결제 페이지입니다.",
  openGraph: {
    title: "결제 - 9DOG",
    description: "9DOG 결제 페이지입니다.",
    url: "https://final-06-gu-dog-release.vercel.app/checkout",
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
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
