import { Metadata } from "next";

export const metadata: Metadata = {
  title: "반려견 건강 설문조사",
  description: "반려견의 정보를 입력하고 AI 건강 분석을 통해 최적의 사료를 추천받으세요.",
  openGraph: {
    title: "반려견 건강 설문조사",
    description: "반려견의 정보를 입력하고 AI 건강 분석을 통해 최적의 사료를 추천받으세요.",
    url: "https://final-06-gu-dog-release.vercel.app/survey",
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

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
