import ProductDetail from "@/app/(main)/products/_components/ProductDetail";
import { ErrorRes, PostListRes, ProductInfoRes, ReviewListRes } from "@/types/response";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

interface Props {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{
    reviewPage?: string;
    qnaPage?: string;
  }>;
}

// 상품 목록
export async function getProduct(productId: string): Promise<ProductInfoRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`, {
      headers: { "Client-Id": CLIENT_ID },
      cache: "no-store",
    });
    const data = await res.json();
    if (data.ok === 1 && data.item) {
      return { ok: 1, item: data.item };
    }
    return { ok: 0, message: "상품을 찾을 수 없습니다." };
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "상품 정보를 불러오는데 실패했습니다." };
  }
}

// 리뷰
async function getReviews(productId: string): Promise<ReviewListRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/replies/products/${productId}`, {
      headers: { "Client-Id": CLIENT_ID },
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "리뷰를 불러오는데 실패했습니다." };
  }
}

// QnA
async function getQna(productId: string): Promise<PostListRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/posts?type=qna&custom={"product_id":${productId}}`, {
      headers: { "Client-Id": CLIENT_ID },
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: "QnA를 불러오는데 실패했습니다." };
  }
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { productId } = await params;
  const { reviewPage, qnaPage } = await searchParams;

  const currentReviewPage = Number(reviewPage) || 1;
  const currentQnaPage = Number(qnaPage) || 1;

  // 임시 값 (나중에 API 연결)
  const REVIEW_RER_PAGE = 5;
  const QNA_PER_PAGE = 3;

  const data = await getProduct(productId);
  if (data.ok === 0) {
    return <div>{data.message}</div>;
  }
  const product = data.item;

  const reviewData = await getReviews(productId);
  const reviews = reviewData.ok === 1 ? reviewData.item : [];
  const reviewTotalPages = Math.max(1, Math.ceil(reviews.length / REVIEW_RER_PAGE));

  const qnaData = await getQna(productId);
  const qna = qnaData.ok === 1 ? qnaData.item : [];
  const qnaTotalPages = Math.max(1, Math.ceil(qna.length / QNA_PER_PAGE));

  return (
    <ProductDetail
      product={product}
      reviews={reviews.slice((currentReviewPage - 1) * REVIEW_RER_PAGE)}
      qna={qna.slice((currentQnaPage - 1) * QNA_PER_PAGE)}
      currentReviewPage={currentReviewPage}
      currentQnaPage={currentQnaPage}
      reviewTotalPages={reviewTotalPages}
      qnaTotalPages={qnaTotalPages}
      reviewCount={reviews.length}
      qnaCount={qna.length}
    />
  );
}
