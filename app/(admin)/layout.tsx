"use client";

import { AdminLayoutClient } from "@/components/layouts/AdminLayoutClient";
import { ReactNode, useEffect } from "react";
import useUserStore from "@/zustand/useStore";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const userType = useUserStore.getState().user?.type;

  useEffect(() => {
    if (userType !== "admin") {
      alert("관리자만 접근가능한 페이지입니다.");
      router.push("/");
    }
  }, [userType, router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}
