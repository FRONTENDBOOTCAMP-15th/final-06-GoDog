import { getProduct } from "@/lib";

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  const res = await getProduct(Number(productId));

  if (res.ok === 1 && res.item) {
    const product = res.item;
    return {
      title: `${product.name} 문의하기`,
      description: `${product.name}에 대해 궁금한 점을 문의하세요.`,
      openGraph: {
        title: `${product.name} 문의하기`,
        description: `${product.name}에 대해 궁금한 점을 문의하세요.`,
        images: [
          {
            url: "https://final-06-gu-dog-release.vercel.app/images/ogimage.png",
            width: 1200,
            height: 630,
            alt: "9DOG - 반려견 건강 식단 정기 구독 서비스",
          },
        ],
      },
    };
  }
}

export default function ProductQnaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
