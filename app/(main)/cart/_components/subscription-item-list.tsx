import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import ProductImage from "@/components/common/ProductImage";
import QuantityControl from "@/components/common/Quantitycontrol";
import Image from "next/image";
import { Cart } from "@/types/cart";

interface Props {
  items: Cart[];
  onRemove: (cartId: number) => void;
}

export default function SubscriptionItemList({ items, onRemove }: Props) {
  if (items.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center py-20 text-text-tertiary">
        <p className="text-sm font-bold">장바구니에 담긴 상품이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3.5">
      {items.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-2 sm:gap-5 border border-[#F9F9FB] rounded-[0.875rem] px-3 py-3 sm:px-7 sm:py-7 bg-white shadow-(--shadow-card)"
        >
          <Checkbox label={item.product?.name || ""} hideLabel />
          <div className="w-20 h-20 sm:w-24 shrink-0">
            <ProductImage
              src={item.product?.image?.path || item.product?.mainImages?.[0]?.path || ""}
              alt={item.product?.name || ""}
              className="rounded-[0.875rem]"
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <h3 className="text-[#1A1A1C] text-sm sm:text-[1rem] font-black">
              {item.product?.name}
            </h3>
            <p className="text-text-tertiary text-[0.75rem] font-bold">
              {item.product?.extra?.weight ? `${item.product.extra.weight}g` : ""}
            </p>
            <p className="text-[0.625rem] text-(--color-text-primary) font-bold">배송 주기 선택</p>
            <div className="flex felx-col gap-0.5 sm:gap-1.5">
              <Button
                variant={item.size === "2w" ? "secondary" : "outline"}
                size="xs"
              >
                격주 배송(2주)
              </Button>
              <Button
                variant={item.size === "4w" ? "secondary" : "outline"}
                size="xs"
              >
                매월 배송(4주)
              </Button>
            </div>
            <QuantityControl initialCount={item.quantity} />
          </div>
          <div className="flex flex-col items-end ml-auto gap-18 sm:gap-32">
            <button onClick={() => onRemove(item._id)}>
              <Image src="/images/cart/x.svg" alt="삭제" width={28} height={28} />
            </button>
            <p className="text-[#1A1A1C] font-black text-sm sm:text-[1rem]">
              {((item.product?.price ?? 0) * item.quantity).toLocaleString()}원
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
