import { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 (FAQ)",
  description: "9DOG FAQ 페이지입니다.",
  openGraph: {
    title: "자주 묻는 질문 (FAQ)",
    description: "9DOG FAQ 페이지입니다.",
    url: "https://final-06-gu-dog-release.vercel.app/support/faq",
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

export default function Faq() {
  return (
    <main className="bg-bg-secondary min-h-screen pb-40 pt-20">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter mb-8">
          자주 묻는 질문
        </h1>
        <div role="region">
          <p className="text-text-secondary">FAQ 콘텐츠가 추가될 예정입니다.</p>
        </div>
      </div>
    </main>
  );
}
