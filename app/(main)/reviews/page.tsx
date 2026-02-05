"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import ReviewImage from "@/components/common/ReviewImage";
import ProductImage from "@/components/common/ProductImage";
import Link from "next/link";
import { getAllReplies } from "@/lib";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import { Review, ReviewProduct } from "@/types/review";

interface ReviewListPageProps {
  onSelectProduct?: (product: ReviewProduct) => void;
}

type SortType = "new" | "helpful";
type RatingFilter = "all" | "1" | "2" | "3" | "4" | "5";

// 리뷰 카드 컴포넌트
const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-white rounded-[3rem] border border-border-primary overflow-hidden hover:shadow-card hover:border-accent-primary/20 transition-all duration-500 flex flex-col group">
      <div className="aspect-1 overflow-hidden bg-bg-warm relative">
        <ReviewImage src={review.extra?.image?.path || ""} alt="review" className="w-full" />
        <div className="absolute top-6 left-6">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-1">
            <span className="text-accent-primary font-black">★</span>
            <span className="text-xs font-black text-text-primary">{review.rating}.0</span>
          </div>
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-xl font-black text-text-primary tracking-tight line-clamp-1">
            {review.extra?.title}
          </h4>
        </div>

        <p className="text-sm font-medium text-text-secondary leading-relaxed mb-6 line-clamp-3">
          {review.content}
        </p>

        <div className="mt-auto space-y-4">
          {/* 구매 상품 정보 */}
          <Link
            href={`/`}
            className="w-full flex items-center space-x-4 p-4 bg-bg-secondary rounded-2xl border border-transparent hover:border-accent-soft cursor-pointer transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative">
              <ProductImage src={review?.product?.image?.path || ""} alt="product" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-text-tertiary uppercase tracking-widest mb-0.5">
                PURCHASED ITEM
              </p>
              <p className="text-xs font-black text-text-primary truncate">{review.product.name}</p>
            </div>
          </Link>

          <div className="flex items-center justify-between pt-4 border-t border-border-primary">
            <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">
              {review.user.name} | {review.createdAt}
            </span>
            <button
              type="button"
              className="flex items-center text-[10px] font-black text-text-secondary hover:text-accent-primary transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 10h4.757a2 2 0 110 4h-1.32l.623 3.308a2 2 0 01-1.942 2.366H9.43a2 2 0 01-1.947-1.557L6 10.122V4a2 2 0 012-2h5a2 2 0 012 2v6z"
                />
              </svg>
              도움돼요 {review?.extra?.likeCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 로딩 스켈레톤 컴포넌트
const ReviewCardSkeleton = () => (
  <div className="bg-white rounded-[3rem] border border-border-primary overflow-hidden animate-pulse">
    <div className="aspect-1 bg-gray-200" />
    <div className="p-8 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="h-16 bg-gray-100 rounded-2xl" />
    </div>
  </div>
);

// 빈 상태 컴포넌트
const EmptyState = () => (
  <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-border-primary">
    <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-text-tertiary">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h4 className="text-xl font-black text-text-primary mb-2">선택한 별점의 후기가 없습니다</h4>
    <p className="text-text-secondary font-medium">다른 별점 필터를 선택해 보세요.</p>
  </div>
);

// 에러 상태 컴포넌트
const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-red-200">
    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
    <h4 className="text-xl font-black text-text-primary mb-2">리뷰를 불러오지 못했습니다</h4>
    <p className="text-text-secondary font-medium mb-6">{message}</p>
    <Button variant="outline" size="sm" onClick={onRetry}>
      다시 시도
    </Button>
  </div>
);

const ITEMS_PER_PAGE = 9;

// 메인 컴포넌트
const ReviewListPage = ({ onSelectProduct }: ReviewListPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 필터/정렬/페이지 값 읽기
  const ratingFilter = (searchParams.get("rating") || "all") as RatingFilter;
  const sort = (searchParams.get("sort") || "new") as SortType;
  const currentPage = Number(searchParams.get("page")) || 1;

  // URL 파라미터 업데이트 헬퍼 함수
  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // useQuery로 리뷰 데이터 fetch
  const {
    data: reviewsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews", ratingFilter, sort, currentPage],
    queryFn: async () => {
      const sortParam: Record<string, 1 | -1> = sort === "new" ? { createdAt: -1 } : { likes: -1 };

      const res = await getAllReplies({
        rating: ratingFilter === "all" ? undefined : ratingFilter,
        sort: sortParam,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });

      if (!res.ok) {
        throw new Error(res.message || "리뷰를 불러오는데 실패했습니다.");
      }

      return res;
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분간 가비지 컬렉션 방지
  });

  const reviews = reviewsData?.ok === 1 ? reviewsData.item : [];
  const totalPages = reviewsData?.ok === 1 ? reviewsData.pagination?.totalPages : 0;

  const handleRatingFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSearchParams({
      rating: e.target.value === "all" ? null : e.target.value,
      page: null, // 필터 변경 시 1페이지로 이동
    });
  };

  const handleSortChange = (newSort: SortType) => {
    updateSearchParams({
      sort: newSort === "new" ? null : newSort, // 기본값이면 URL에서 제거
      page: null, // 정렬 변경 시 1페이지로 이동
    });
  };

  return (
    <div className="bg-bg-secondary min-h-screen pb-40 pt-20">
      <div className="container-custom">
        {/* 상단 통계 헤더 */}
        <div className="bg-white rounded-[4rem] p-12 md:p-16 border border-border-primary shadow-soft mb-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-soft/30 rounded-full blur-[80px] pointer-events-none" />

          <div className="text-center md:text-left relative z-10">
            <Badge variant="accent" className="mb-4">
              REAL CUSTOMER REVIEWS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter mb-4">
              견주님들이 보증하는 <br />
              <span className="text-accent-primary">9Dog의 정직함</span>
            </h2>
            <p className="text-text-secondary font-medium text-lg">
              실제 구매 고객님들이 남겨주신 소중한 기록입니다.
            </p>
          </div>

          <div className="flex items-center space-x-12 relative z-10">
            <div className="text-center">
              <p className="text-[10px] font-black text-text-tertiary uppercase tracking-widest mb-2">
                평균 평점
              </p>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-text-primary">4.9</span>
                <div className="flex text-accent-primary text-sm mt-1">★★★★★</div>
              </div>
            </div>
            <div className="w-px h-20 bg-border-primary hidden md:block" />
            <div className="text-center">
              <p className="text-[10px] font-black text-text-tertiary uppercase tracking-widest mb-2">
                전체 리뷰 수
              </p>
              <span className="text-5xl font-black text-accent-primary">12,402</span>
              <p className="text-[10px] font-black text-text-tertiary mt-1">REAL FEEDBACK</p>
            </div>
          </div>
        </div>

        {/* 필터 및 정렬 바 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          {/* 별점 필터 셀렉트 박스 */}
          <div className="relative group w-full md:w-64">
            <select
              value={ratingFilter}
              onChange={handleRatingFilterChange}
              className="w-full px-8 py-4 bg-white border-2 border-border-primary focus:border-accent-primary rounded-2xl shadow-soft outline-none font-black text-text-primary transition-all appearance-none cursor-pointer"
            >
              <option value="all">전체 별점 보기</option>
              <option value="5">★★★★★ 5점만 보기</option>
              <option value="4">★★★★☆ 4점만 보기</option>
              <option value="3">★★★☆☆ 3점만 보기</option>
              <option value="2">★★☆☆☆ 2점만 보기</option>
              <option value="1">★☆☆☆☆ 1점만 보기</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary group-focus-within:text-accent-primary group-focus-within:rotate-180 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* 정렬 버튼 그룹 */}
          <div className="flex items-center space-x-2">
            <Button
              variant={sort === "new" ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleSortChange("new")}
              disabled={isLoading}
            >
              최신순
            </Button>
            <Button
              variant={sort === "helpful" ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleSortChange("helpful")}
              disabled={isLoading}
            >
              도움순
            </Button>
          </div>
        </div>

        {/* 리뷰 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-in fade-in duration-700">
          {isLoading ? (
            // 로딩 스켈레톤
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <ReviewCardSkeleton key={index} />
            ))
          ) : isError ? (
            // 에러 상태
            <ErrorState
              message={error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."}
              onRetry={() => refetch()}
            />
          ) : reviews.length > 0 ? (
            // 리뷰 목록
            reviews.map((review) => <ReviewCard key={review._id} review={review} />)
          ) : (
            // 빈 상태
            <EmptyState />
          )}
        </div>

        {/* 페이징 */}
        {!isLoading && !isError && reviews.length > 0 && (
          <PaginationWrapper currentPage={currentPage} totalPages={totalPages} paramKey="page" />
        )}

        {/* 하단 CTA */}
        <div className="mt-32 p-16 bg-text-primary rounded-[4rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter relative z-10">
            아이의 변화를 <span className="text-accent-primary">직접 경험</span>해 보세요
          </h3>
          <p className="text-white/60 font-medium mb-12 relative z-10">
            지금 정기 구독을 시작하면 10% 할인 혜택을 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button href="/survey" variant="primary">
              맞춤 사료 찾으러 가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewListPage;
