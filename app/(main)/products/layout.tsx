import { Metadata } from "next";

export const metadata: Metadata = {
  title: "상품 목록",
  description: "9DOG 상품 목록 페이지입니다.",
  openGraph: {
    title: "목록",
    description: "9DOG 상품 목록 페이지입니다.",
    url: "/products",
    images: {
      url: "",
    },
  },
};
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
