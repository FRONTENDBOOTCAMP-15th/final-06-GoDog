import Image from "next/image";
import Link from "next/link";

export default function Products() {
  return (
    <div className="w-full bg-[#f9f9fb] px-[356px] py-[70px] pb-[140px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-14 px-5">
        {/* 제목 */}
        <section className="flex w-[72.5rem] flex-col items-center text-center">
          <h1 className="pb-[1.3125rem] text-[2.625rem]">상품 목록</h1>
          <p className="text-[#646468]">
            아이의 연령대와 건강 상태에 맞게 설계된 프리미언 영양 식단을 만나보세요.
          </p>
        </section>

        {/* 필터 태그 */}
        <nav className="flex h-[3.875rem] w-[72.5rem] items-center justify-center p-[0.4375rem]">
          <div className="flex w-fit items-start self-stretch p-[7px]">
            <button
              type="button"
              className="h-[42px] w-[99px] cursor-pointer rounded-[0.875rem] border border-black/[0.06] bg-white text-xs font-bold leading-[1.125rem] text-[#909094]"
            >
              전체보기
            </button>
            <button
              type="button"
              className="h-[42px] w-[99px] cursor-pointer rounded-[0.875rem] border border-black/[0.06] bg-white text-xs font-bold leading-[1.125rem] text-[#909094]"
            >
              퍼피(Puppy)
            </button>
            <button
              type="button"
              className="h-[42px] w-[99px] cursor-pointer rounded-[0.875rem] border border-black/[0.06] bg-white text-xs font-bold leading-[1.125rem] text-[#909094]"
            >
              성견(Adult)
            </button>
            <button
              type="button"
              className="h-[42px] w-[99px] cursor-pointer rounded-[0.875rem] border border-black/[0.06] bg-white text-xs font-bold leading-[1.125rem] text-[#909094]"
            >
              시니어(Senior)
            </button>
          </div>
        </nav>

        {/* 상품 목록 그리드 */}
        <section>
          <ul className="grid grid-cols-4 gap-7">
            {[1, 2, 3, 4].map((item) => (
              <li
                key={item}
                className="flex h-[400px] flex-col overflow-hidden rounded-[2.1875rem] border border-black/[0.06] bg-white"
              >
                <Link href={`/products/${item}`} className="flex w-full flex-col no-underline">
                  <div className="flex aspect-square w-full items-center justify-center bg-white">
                    <Image
                      src="/images/PUP-L-01라지퍼피 치킨앤브라운라이스 2.png"
                      alt="퍼피 치킨앤브라운라이스"
                      width={280}
                      height={280}
                      className="block h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2 px-[18px] pb-[22px] pt-[18px]">
                    <h3 className="w-[13.1875rem] text-[1.09375rem] font-black leading-[1.53125rem] tracking-[-0.02731rem] text-[#1a1a1c]">
                      퍼피 성장기 고메 A
                    </h3>
                    <p className="text-[0.9875rem] font-black leading-[1.53125rem] text-[#646468]">
                      28,000원
                    </p>
                    <span className="inline-flex items-center rounded-[0.4375rem] bg-[rgba(251,166,19,0.8)] px-[0.65625rem] py-[0.21875rem] text-[0.625rem] uppercase leading-[0.9375rem] tracking-[0.03125rem] text-white backdrop-blur-[6px]">
                      PUPPY
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 페이지네이션 */}
        <ul className="flex max-w-[1200px] items-center justify-center gap-[7px] self-stretch pt-[0.875rem] font-semibold">
          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-[2.625rem] w-[2.625rem] cursor-not-allowed items-center justify-center rounded-[0.875rem] border border-black/[0.06] bg-[#f2f2f2] p-0 leading-none text-[#646468]"
            >
              ‹
            </button>
          </li>
          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border border-transparent bg-[#fba613] p-0 font-semibold leading-none text-white shadow-[0_8px_32px_0_rgba(251,166,19,0.2)]"
            >
              1
            </button>
          </li>
          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border border-black/[0.06] bg-white p-0 leading-none text-black"
            >
              2
            </button>
          </li>
          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border border-black/[0.06] bg-white p-0 leading-none text-black"
            >
              ›
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
