import "../globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "pretendard/dist/web/static/pretendard.css";
import Providers from "@/app/provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://final-06-gu-dog-release.vercel.app"),

  title: {
    default: "9DOG - 반려견 건강 식단 정기구독",
    template: "%s - 9DOG",
  },
  description: "건강한 반려견 사료와 간식을 정기구독으로 만나보세요.",
  openGraph: {
    title: "9DOG - 반려견 건강 식단 정기구독",
    description: "건강한 반려견 사료와 간식을 정기구독으로 만나보세요.",
    images: {
      url: "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
