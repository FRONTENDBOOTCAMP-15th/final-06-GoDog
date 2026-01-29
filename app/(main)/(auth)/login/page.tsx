"use client";

import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import Input from "@/components/common/Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChangeEvent, FormEvent, useState } from "react";

// 응답 타입 정의
interface LoginResponse {
  TOKEN?: string;
  user_name?: string;
}

export default function Login() {
  const router = useRouter();
  // 상태 (state) 관리
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // 입력값 변경 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 로그인 함수
  const handleSignin = async (e?: FormEvent) => {
    if (e) e.preventDefault(); // 폼 제출 시 새로고침 방지

    const { email, password } = loginData;

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해 주세요");
      return;
    }

    try {
      const response = await fetch("https://fesp-api.koyeb.app/market/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "client-id": "febc15-final06-ecad" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const res: LoginResponse = await response.json();

      if (res.TOKEN) {
        localStorage.setItem("token", res.TOKEN);
        localStorage.setItem("user_name", res.user_name || "");
        router.push("/"); // 페이지 이동
      } else {
        alert("ID,password를 확인해 주세요");
      }
    } catch (err) {
      console.error(err);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className="bg-bg-secondary min-h-screen flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* 상단 로고 및 안내 */}
          <div className="flex flex-col items-center text-center mb-10">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="9Dog" width={133} height={48} />
            </Link>
            <h2 className=" mt-2 text-2xl font-black text-text-primary tracking-tight mb-2">
              반가워요! 9DOG입니다
            </h2>
            <p className="text-sm font-medium text-text-tertiary">
              당신의 소중한 친구를 위한 영양 맞춤형 라이프
            </p>
          </div>

          {/* 로그인 폼 카드 */}
          <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-card border border-border-primary mb-8">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="이메일 주소"
                name="email"
                placeholder="hello@9dog.co.kr"
                onChange={handleInputChange}
              />
              <Input
                label="비밀번호"
                name="password"
                placeholder="••••••••"
                type="password"
                onChange={handleInputChange}
              />

              <div className="flex items-center justify-between pt-2 mb-6">
                <Checkbox label="로그인 상태 유지" />
                <button className="text-xs font-bold text-text-tertiary hover:text-text-primary transition-colors underline underline-offset-4">
                  비밀번호 찾기
                </button>
              </div>

              <Button
                variant="primary"
                className="w-full py-5 text-lg rounded-2xl shadow-glow"
                onClick={handleSignin}
              >
                로그인
              </Button>
            </form>
          </div>

          {/* 하단 보조 액션 */}
          <div className="text-center">
            <p className="text-sm font-bold text-text-secondary">
              아직 9DOG 회원이 아니신가요?
              <Link
                href="/singup"
                className="ml-2 text-accent-primary font-black hover:underline underline-offset-4 transition-all"
              >
                회원가입 하기
              </Link>
            </p>
            <Link
              href="/"
              className="inline-block mt-7 text-xs font-black text-text-tertiary hover:text-text-primary uppercase tracking-[0.2em] transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
