import { Metadata } from "next";

export const metadata: Metadata = {
  title: "설문 결과",
  description: "반려견을 위한 최적의 사료 추천 결과를 확인하세요.",
  openGraph: {
    title: "설문 결과",
    description: "반려견을 위한 최적의 사료 추천 결과를 확인하세요.",
    url: "https://final-06-gu-dog-release.vercel.app/survey/result",
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

export default function SurveyResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
