import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

export default function ProductsCard({ product }: { product: Product }) {
  return (
    <li className="flex w-[calc(25%-21px)] min-w-62.5 flex-col overflow-hidden rounded-3xl sm:rounded-[2.1875rem] border border-black/10 bg-white">
      <Link href={`/products/${product._id}`} className="flex w-full flex-col no-underline">
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-white">
          <Image
            src={product.mainImages[0]?.path || "/placeholder.png"}
            alt={product.name}
            width={280}
            height={280}
            className="block h-full w-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>

        <div className="flex flex-col items-start gap-2 px-3 py-3 sm:px-4 sm:py-4">
          <h3 className="text-base sm:text-lg font-black leading-6 tracking-tight text-text-primary">
            {product.name}
          </h3>
          <p className="text-sm sm:text-base font-black leading-6 text-text-secondary">
            {product.price.toLocaleString()}원
          </p>

          {product.extra?.lifeStage?.map((lifeStage: string) => (
            <span
              key={lifeStage}
              className="inline-flex items-center rounded-md bg-orange-500/80 px-2.5 py-1 text-[0.625rem] font-normal uppercase leading-none tracking-wider text-white backdrop-blur-sm"
            >
              {lifeStage}
            </span>
          ))}
        </div>
      </Link>
    </li>
  );
}
