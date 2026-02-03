import { Product, ProductImage, ProductExtra } from "@/types/product";
import Link from "next/link";
import { TrashIcon } from "@/app/(main)/mypage/_components/Icons";
import Image from "next/image";

export default function WishlistComponent({ Product }: { Product: Product }) {
  console.log(Product, "프로덕트");

  return (
    <>
      <div className="rounded-[42px] border border-[rgba(0,0,0,0.06)] bg-[#FFFFFF] shadow-[0_2px_12px_0_rgba(0,0,0,0.03)]">
        <Image
          src={Product.mainImages[0].path}
          className="mt-[30px] ml-[30px] mr-[30px] w-[211px] h-[211px] w-fully"
          alt="상품 이미지"
          width={211}
          height={211}
        />
        <div className="flex justify-between items-center mt-[27px] px-[29px] pb-[14.5px]">
          <div className="text-[#1A1A1C] text-[18px] font-black">{Product.name}</div>
          <button>
            <TrashIcon className="text-[#909094]" />
          </button>
        </div>

        <hr className="w-[calc(100%-58px)] h-px mx-auto border-0 bg-[rgba(0,0,0,0.06)] " />
        <div className="pb-[36px] pt-[15px] flex pl-[29px] justify-between pr-[29px] ">
          <p className=" text-[#1A1A1C] text-[12px] font-black">결제금액</p>
          <p className="text-[#FBA613] text-[12px] font-black ">
            {Product.price.toLocaleString()}원
          </p>
        </div>

        <Link
          className="pt-[20px] flex flex-row pl-[29px] justify-center gap-[12px]"
          href={"/Mydetail/Subplan"}
        ></Link>
      </div>
    </>
  );
}
