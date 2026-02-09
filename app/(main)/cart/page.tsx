import CartFrom from "@/app/(main)/cart/CartForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "장바구니",
  description: "9DOG 장바구니 페이지입니다.",
  openGraph: {
    title: "장바구니",
    description: "9DOG 장바구니 페이지입니다.",
    url: "/cart",
    images: {
      url: "",
    },
  },
};

export default function Cart() {
  return <CartFrom />;
}
