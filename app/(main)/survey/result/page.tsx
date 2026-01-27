"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { parseResultCodes, getProductByCode, type ProductData } from "@/lib/recommendProducts";
import ProductImage from "@/components/common/ProductImage";

function SurveyResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ 상위 제품 코드들 파싱 (기존 code → top 으로 변경)
  const topCodesParam = searchParams.get("top");
  const topCodes = parseResultCodes(topCodesParam);

  // 설문 데이터 파라미터 읽기
  const sizeParam = searchParams.get("size") || "소형견";
  const ageParam = searchParams.get("age") || "adult";
  const proteinParam = searchParams.get("protein") || "상관없음";
  const healthParam = searchParams.get("health") || "";

  // ✅ 모든 상위 제품 데이터 조회
  const topProducts = topCodes
    ? topCodes.map((code) => getProductByCode(code)).filter((p): p is ProductData => p !== null)
    : [];

  // 메인 추천 제품은 1순위
  const mainProduct = topProducts[0];

  // 나이 라벨 변환
  const ageLabel = ageParam === "puppy" ? "퍼피" : ageParam === "adult" ? "성견" : "시니어";

  // 건강 고민 파싱
  const healthConcerns = healthParam ? healthParam.split(",").filter((c) => c !== "없음") : [];

  const handleRetake = () => {
    router.push("/survey");
  };

  const handleSelectProduct = (product: ProductData) => {
    router.push(`/products/${product.extra.code}`);
  };

  const handleViewAll = () => {
    router.push("/products");
  };

  // 제품이 없을 경우 에러 페이지
  if (!mainProduct || topProducts.length === 0) {
    return (
      <div className="bg-bg-secondary min-h-screen pb-40 pt-16">
        <div className="container-custom max-w-[900px] text-center">
          <h2 className="text-3xl font-black mb-4">추천 결과를 찾을 수 없습니다</h2>
          <p className="text-text-secondary mb-8">
            설문 조건에 맞는 제품을 찾지 못했어요. 조건을 변경해 다시 진행해 주세요.
          </p>
          <Link href="/survey">
            <Button variant="primary">설문 다시하기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary min-h-screen pb-40 pt-16">
      <div className="container-custom max-w-[1100px]">
        {/* 상단 요약 */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <Badge variant="accent" className="mb-4">
            ANALYSIS COMPLETE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter mb-6">
            우리 아이를 위한 <span className="text-accent-primary">최적의 사료</span>를 찾았습니다
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-5 py-2.5 bg-white rounded-full text-xs font-black text-text-secondary border border-border-primary shadow-soft">
              # {sizeParam}
            </span>
            <span className="px-5 py-2.5 bg-white rounded-full text-xs font-black text-text-secondary border border-border-primary shadow-soft">
              # {ageLabel}
            </span>
            {proteinParam !== "상관없음" && (
              <span className="px-5 py-2.5 bg-white rounded-full text-xs font-black text-text-secondary border border-border-primary shadow-soft">
                # {proteinParam} 선호
              </span>
            )}
            {healthConcerns.map((concern) => (
              <span
                key={concern}
                className="px-5 py-2.5 bg-accent-soft rounded-full text-xs font-black text-accent-primary border border-accent-primary/20 shadow-soft"
              >
                # {concern} 케어
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 메인 추천 제품 비주얼 (1순위) */}
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="bg-white rounded-[4rem] p-4 shadow-card border border-border-primary overflow-hidden group">
              <div className="aspect-square rounded-[3.5rem] overflow-hidden bg-bg-warm relative flex items-center justify-center">
                {mainProduct.mainImages?.[0] ? (
                  <ProductImage
                    src={`${mainProduct.mainImages[0].path}/${mainProduct.mainImages[0].name}`}
                    alt={mainProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="text-[120px] group-hover:scale-110 transition-transform duration-700">
                    🐕
                  </div>
                )}

                <div className="absolute top-8 left-8">
                  <Badge
                    variant="accent"
                    className="bg-white/95 backdrop-blur-md px-6 py-2 text-sm shadow-xl"
                  >
                    BEST MATCH #1
                  </Badge>
                </div>
              </div>
              <div className="p-10 text-center">
                {/* ✅ extra.code로 변경 */}
                <p className="text-sm text-text-tertiary font-mono mb-2">
                  {mainProduct.extra.code}
                </p>
                <h3 className="text-3xl font-black text-text-primary mb-3 tracking-tighter">
                  {mainProduct.name}
                </h3>
                <p className="text-lg font-black text-accent-primary mb-8">
                  {mainProduct.price.toLocaleString()}원
                </p>
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="primary"
                    className="flex-1 py-5 rounded-2xl shadow-glow"
                    onClick={() => handleSelectProduct(mainProduct)}
                  >
                    제품 상세보기
                  </Button>
                  <Button variant="outline" className="px-6 rounded-2xl" onClick={handleRetake}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 📝 추천 사유 분석 */}
          <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
            <div className="bg-white rounded-[3.5rem] p-10 md:p-12 border border-border-primary shadow-soft">
              <h4 className="text-xl font-black text-text-primary mb-10 tracking-tight flex items-center">
                <span className="w-8 h-8 bg-accent-soft text-accent-primary rounded-xl flex items-center justify-center mr-3 text-sm">
                  💡
                </span>
                영양 전문가의 추천 사유
              </h4>

              <div className="space-y-6">
                <div className="p-6 bg-bg-secondary rounded-3xl border border-transparent hover:border-accent-soft transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-accent-primary text-white rounded-xl flex items-center justify-center shrink-0 font-black text-sm">
                      1
                    </div>
                    <p className="text-sm font-medium text-text-secondary leading-relaxed pt-1">
                      {mainProduct.content}
                    </p>
                  </div>
                </div>

                {/* ✅ 건강 고민과 매칭되는 추가 추천 이유 자동 생성 */}
                {mainProduct.extra.healthBenefits.length > 0 && (
                  <div className="p-6 bg-bg-secondary rounded-3xl border border-transparent hover:border-accent-soft transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-accent-primary text-white rounded-xl flex items-center justify-center shrink-0 font-black text-sm">
                        2
                      </div>
                      <p className="text-sm font-medium text-text-secondary leading-relaxed pt-1">
                        {mainProduct.extra.healthBenefits.join(", ")}에 특화된 영양 성분이 포함되어
                        있어
                        {healthConcerns.length > 0
                          ? ` 고민하시는 ${healthConcerns.join(", ")} 문제에 효과적으로 도움을 줄 수 있습니다.`
                          : ` 반려견의 건강을 종합적으로 지원해줍니다.`}
                      </p>
                    </div>
                  </div>
                )}

                {/* ✅ 체형 및 활동량에 따른 추천 이유 */}
                <div className="p-6 bg-bg-secondary rounded-3xl border border-transparent hover:border-accent-soft transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-accent-primary text-white rounded-xl flex items-center justify-center shrink-0 font-black text-sm">
                      3
                    </div>
                    <p className="text-sm font-medium text-text-secondary leading-relaxed pt-1">
                      100g당 {mainProduct.extra.kcalPer100g}kcal의 적정 칼로리로 설계되어 {ageLabel}
                      의 활동량에 알맞은 에너지를 공급해줍니다.
                      {mainProduct.extra.bodyType.includes("과체중") ||
                        (mainProduct.extra.bodyType.includes("비만") &&
                          " 저칼로리 설계로 체중 관리에도 효과적입니다.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 📊 영양 정보 */}
            <div className="bg-text-primary rounded-[3.5rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/20 rounded-full blur-[80px] pointer-events-none"></div>

              <h4 className="text-xl font-black mb-10 tracking-tight relative z-10">
                영양 밸런스 리포트
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">
                    단백질
                  </p>
                  <p className="text-xl font-black">{mainProduct.extra.nutrition.protein}%</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">
                    지방
                  </p>
                  <p className="text-xl font-black">{mainProduct.extra.nutrition.fat}%</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">
                    칼로리
                  </p>
                  <p className="text-xl font-black text-accent-primary">
                    {mainProduct.extra.kcalPer100g}kcal
                  </p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">
                    수분
                  </p>
                  <p className="text-xl font-black">{mainProduct.extra.nutrition.moisture}%</p>
                </div>
              </div>

              <div className="mt-10 p-6 bg-white/10 rounded-[2rem] border border-white/10 flex items-center space-x-6">
                <div className="w-12 h-12 bg-accent-primary rounded-2xl flex items-center justify-center shrink-0 shadow-glow">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-xs font-bold leading-relaxed opacity-80">
                  {ageLabel}의 영양 요구량과 {sizeParam} 특성을 완벽히 반영한 영양 배합입니다.
                  주기적인 사료 변경 없이도 반려견의 성장 및 건강 상태에 맞춰 최적의 영양을
                  공급해줍니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 다른 추천 제품 보기 (2~5순위) */}
        {topProducts.length > 1 && (
          <div className="mt-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-text-primary">
                다른 추천 제품{" "}
                <span className="text-accent-primary">(총 {topProducts.length}개)</span>
              </h3>
              <Button variant="ghost" onClick={handleViewAll}>
                전체 보기
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topProducts.slice(1).map((product, index) => (
                <div
                  key={product.extra.code}
                  className="bg-white rounded-3xl border border-border-primary shadow-card overflow-hidden hover:shadow-lg hover:border-accent-soft transition-all group cursor-pointer relative"
                  onClick={() => handleSelectProduct(product)}
                >
                  <div className="aspect-square bg-bg-warm flex items-center justify-center p-4 relative">
                    {product.mainImages?.[0] ? (
                      <ProductImage
                        src={`${product.mainImages[0].path}/${product.mainImages[0].name}`}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-500">
                        🐶
                      </div>
                    )}

                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 backdrop-blur-sm">#{index + 2}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-text-tertiary mb-1">{product.extra.code}</p>
                    <h4 className="font-black text-text-primary mb-2 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="font-bold text-accent-primary">
                      {product.price.toLocaleString()}원
                    </p>

                    {/* 제품 특징 태그 */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.extra.healthBenefits.slice(0, 2).map((benefit) => (
                        <span
                          key={benefit}
                          className="text-[10px] px-2 py-1 bg-accent-soft text-accent-primary rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 하단 액션 버튼 */}
        <div className="mt-20 flex flex-col items-center">
          <p className="text-sm font-bold text-text-tertiary mb-8">더 궁금한 점이 있으신가요?</p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="px-12 py-5 rounded-[1.5rem] font-black"
              onClick={handleViewAll}
            >
              전체 상품 구경하기
            </Button>
            <Button variant="ghost" className="px-10 rounded-[1.5rem]" onClick={handleRetake}>
              설문 다시하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SurveyResultPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-bg-secondary min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-secondary font-medium">추천 결과를 분석하고 있습니다...</p>
          </div>
        </div>
      }
    >
      <SurveyResultContent />
    </Suspense>
  );
}
