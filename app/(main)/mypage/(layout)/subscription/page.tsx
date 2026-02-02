import { getOrderlist } from "@/app/(main)/mypage/(layout)/order/getOrderlist"; // 기존 주문 조회 함수 재사용
import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import { RigthMark } from "@/app/(main)/mypage/_components/Mark";
import MyItemList from "@/app/(main)/mypage/_components/MyItemListA";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import Image from "next/image";
import {
  Order,
  OrderListRes,
  FlattenedOrderProduct,
} from "@/app/(main)/mypage/(layout)/order/types/order";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Subscription({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const response: OrderListRes = await getOrderlist(currentPage);
  const orders: Order[] = response?.ok === 1 ? response.item : [];

  const subscriptionItems: FlattenedOrderProduct[] = orders.flatMap((order) =>
    order.products
      .filter((product) => product.extra?.period)
      .map((product) => ({
        ...product,
        orderId: order._id,
        displayDate: order.createdAt.split(" ")[0],
      })),
  );

  const totalPages = response?.pagination?.totalPages || 1;
  console.log(subscriptionItems);
  console.log(orders);
  return (
    <div className="w-full min-w-[360px] pb-[70px]">
      <div className="mt-[108px]">
        <p className="text-[#1A1A1C] text-center text-[26px] font-[900]">김구독님이 이용 중인</p>
        <div className="flex flex-row justify-center">
          <p className="text-[#FBA613] text-center text-[26px] font-[900]">정기 구독 플랜</p>
          <p className="text-[#1A1A1C] text-center text-[26px] font-[900]">목록입니다</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-[57px] pb-[110px] px-[20px] lg:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-7 justify-items-center">
          {orders.length > 0 ? (
            orders.map((item, index) => (
              <MyItemList
                key={`${item.orderId}-${index}`}
                subscriptionId={String(item._id)}
                title={item.products[0].name}
                image={
                  <div className="rounded-3xl overflow-hidden w-[211px] h-[211px] relative">
                    {item.products[0].image?.path ? (
                      <Image
                        src={item.products[0].image?.path}
                        alt={item.products[0].name}
                        width={211}
                        height={211}
                        className="object-cover"
                      />
                    ) : (
                      <Product404 />
                    )}
                  </div>
                }
                content="상세 보기"
                date={item.createdAt}
                period={item.period}
                quantity={item.products[0].quantity}
                price={`${item.products[0].price.toLocaleString()}원`}
                mark={<RigthMark />}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-[#909094]">
              현재 이용 중인 정기 구독 플랜이 없습니다.
            </div>
          )}
        </div>
      </div>
      <PaginationWrapper currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
