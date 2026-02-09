import { Metadata } from "next";
import LoginForm from "@/app/(main)/(auth)/login/_components/LoginForm";

export const metadata: Metadata = {
  title: "로그인",
  description: "반려견 맞춤형 건강 사료 구독 서비스, 9DOG 시작하기",
  openGraph: {
    title: "로그인",
    description: "반려견 맞춤형 건강 사료 구독 서비스, 9DOG 시작하기",
    url: "/login",
    images: {
      url: "",
    },
  },
};

export default function Login() {
  return <LoginForm />;
}
