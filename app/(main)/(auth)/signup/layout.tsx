import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
  description: "9DOG에 회원가입하고 우리 아이를 위한 맞춤 건강 식단을 관리하세요.",
  openGraph: {
    title: "회원가입",
    description: "9DOG에 회원가입하고 우리 아이를 위한 맞춤 건강 식단을 관리하세요.",
    url: "https://final-06-gu-dog-release.vercel.app/signup",
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

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
