import { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 (FAQ)",
  description: "9DOG FAQ 페이지입니다.",
  openGraph: {
    title: "자주 묻는 질문 (FAQ)",
    description: "9DOG FAQ 페이지입니다.",
    url: "/support/faq",
    images: {
      url: "",
    },
  },
};

export default function Faq() {
  return (
    <>
      <h1>자주 묻는 질문</h1>
    </>
  );
}
