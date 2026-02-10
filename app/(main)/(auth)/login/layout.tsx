import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "반려견 맞춤형 건강 사료 구독 서비스, 9DOG 시작하기",
  openGraph: {
    title: "로그인",
    description: "반려견 맞춤형 건강 사료 구독 서비스, 9DOG 시작하기",
    url: "https://final-06-gu-dog-release.vercel.app/login",
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

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
