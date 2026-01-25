"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Product() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // 처음 화면에서는 닫혀 있으니까 기본 false
  const [purchaseType, setPurchaseType] = useState<"oneTime" | "subscribe">("oneTime");
  // 1회 구매, 정기구독 구분 창
  const [deliveryCycle, setDeliveryCycle] = useState<"2w" | "4w">("2w");
  // 배송주기 선택

  const basePrice = 32000;
  const discountRate = 0.1; // 정기구독 10% 할인
  const finalPrice = purchaseType === "subscribe" ? basePrice * (1 - discountRate) : basePrice;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <main className="mx-auto w-full min-w-[360px] max-w-300 items-center px-4 pb-35 pt-17.5 sm:px-5">
      <section className="mx-auto max-w-300 px-2 pb-21 pt-10.5 sm:px-5">
        <button
          className="mb-7 inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent font-semibold text-[#8b8b8f]"
          type="button"
        >
          ‹ 목록으로
        </button>

        {/* 상품이미지 */}
        <div className="mx-auto flex max-w-[75rem] flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-14">
          <div className="image-card w-full max-w-[538px] flex-shrink-0">
            <Image
              className="block w-full rounded-4xl object-cover"
              src="/images/ADT-S-01  스몰어덜트 치킨앤라이스 2.png"
              width={538}
              height={552}
              alt="어덜트 밸런스 치킨 상품 이미지"
            />
          </div>

          <div className="flex w-full flex-col items-start lg:max-w-[34rem]">
            <span className="flex items-center rounded-[0.4375rem] border border-[rgba(251,166,19,0.2)] bg-[#fff5e6] px-[0.65625rem] py-[0.21875rem] text-[0.625rem] font-extrabold uppercase leading-[0.9375rem] tracking-[0.03125rem] text-[#fba613]">
              ADULT
            </span>
            <div>
              <h1 className="mb-6 text-2xl font-bold sm:mb-12.5 sm:text-[2.625rem]">
                어덜트 밸런스 치킨
              </h1>
            </div>

            {/* 정보카드 */}
            <div className="mb-8.75 flex w-full flex-col items-start self-stretch rounded-[2.1875rem] bg-bg-secondary p-4 sm:p-7">
              <dl className="w-full">
                <div className="flex min-h-[1.5625rem] w-full items-center justify-between self-stretch py-4 sm:py-7">
                  <dt className="font-medium">판매가격</dt>
                  <dd className="text-xl font-bold sm:text-[1.625rem]">32,000원</dd>
                </div>

                <div className="my-[0.625rem] h-px bg-black/[0.06]" />

                <div className="mt-[1.3125rem] flex min-h-[1.5625rem] w-full flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="text-sm text-[#8b8b8f]">배송정보</dt>
                  <dd className="text-sm text-[#3a3a3c] sm:text-base">
                    무료배송 [9Dog 정기구독 시]
                  </dd>
                </div>
                <div className="mt-[1.3125rem] flex min-h-[1.5625rem] w-full items-center justify-between self-stretch">
                  <dt className="text-sm text-[#8b8b8f]">상품 정보</dt>
                  <dd className="text-[#3a3a3c]">2KG</dd>
                </div>
              </dl>
            </div>

            <p className="pb-[2.63281rem] font-['Abhaya_Libre_Medium'] text-sm font-medium leading-[1.42188rem] text-[#646468]">
              가장 신선한 원재료로 아이의 입맛과 건강을 동시에 챙기세요.
              <br />
              인공 첨가물 없이 정직하게 만들었습니다.
            </p>

            {/* 액션 */}
            <div className="flex w-full flex-row items-start gap-3.5">
              <button
                className="flex h-[3.25rem] flex-1 items-center justify-center rounded-[0.875rem] bg-[#fba613] text-white px-4 py-[1.09375rem] shadow-[0_0.5rem_2rem_0_rgba(251,166,19,0.2)] sm:px-[1.3125rem]"
                type="button"
                onClick={() => {
                  setPurchaseType("oneTime");
                  setIsOpen(true);
                }}
              >
                구매하기
              </button>
              <button
                className="flex h-[3.25rem] w-[3.5rem] flex-shrink-0 items-center justify-center rounded-[0.875rem] border-[0.125rem] border-black/10 bg-white px-4 py-[0.85938rem] sm:w-[5.0625rem] sm:px-7"
                type="button"
                aria-label="찜하기"
              >
                ♡
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 메뉴 이동 버튼 */}
      <nav className="mx-auto flex w-full max-w-[75rem] flex-col items-center border-y border-black/[0.06] bg-white/95 px-2 backdrop-blur-[12px] sm:px-5">
        <div className="flex w-full max-w-[75rem] items-start justify-center self-stretch px-0 sm:px-5">
          <button className="flex flex-col items-center justify-center px-3 py-[1.09375rem] text-center text-[0.65rem] font-black leading-[1.09375rem] text-[#fba613] sm:px-[2.625rem] sm:text-[0.76875rem]">
            상세정보
            <div className="absolute bottom-0 h-[0.21875rem] w-[5rem] rounded-[624.9375rem] bg-[#fba613] sm:w-[7.9375rem]" />
          </button>
          <button className="flex flex-col items-center justify-center px-3 py-[1.09375rem] text-center text-[0.65rem] font-bold leading-[1.09375rem] text-[#909094] sm:px-[2.625rem] sm:text-[0.76875rem]">
            구매후기(428)
          </button>
          <button className="flex flex-col items-center justify-center px-3 py-[1.09375rem] text-center text-[0.65rem] font-bold leading-[1.09375rem] text-[#909094] sm:px-[2.625rem] sm:text-[0.76875rem]">
            Q&A(15)
          </button>
        </div>
      </nav>

      {/* 상세정보 */}
      <section className="w-full">
        <Image
          src="/images/image 27.png"
          width={1200}
          height={800}
          alt="상품 상세 이미지 1"
          className="h-auto w-full"
        />
        <Image
          src="/images/image 28.png"
          width={1200}
          height={800}
          alt="상품 상세 이미지 2"
          className="h-auto w-full"
        />

        <div className="flex flex-col items-center self-stretch border-y border-black/[0.06] bg-white/95 px-[2.625rem] py-[1.09375rem] backdrop-blur-[12px]">
          <button
            type="button"
            className="text-center text-[0.76875rem] font-bold leading-[1.09375rem] text-[#909094]"
          >
            상세 더보기
          </button>
        </div>
      </section>

      {/* 리뷰 */}
      <section className="mt-[4rem] flex flex-col gap-4 border-b border-black/[0.06] pb-[2.1875rem] sm:mt-[7rem] sm:flex-row sm:items-end sm:justify-between">
        <div className="flex w-full flex-col items-start justify-end gap-[0.4375rem] pt-[2.375rem] sm:w-auto">
          <h2 className="text-xl font-black leading-[2.1875rem] tracking-[-0.09844rem] text-[#1a1a1c] sm:text-[1.96875rem]">
            구매 견주님들의 솔직 후기
          </h2>
          <div className="flex items-center">
            <span className=" text-xl font-black leading-[2.1875rem] text-[#fba613] sm:text-[1.96875rem]">
              4.8
            </span>
            <span className="flex flex-col items-start pl-[0.65625rem] text-sm font-bold leading-[1.3125rem] text-[#909094]">
              {" "}
              / 5.0{" "}
            </span>
            <span className="flex flex-col items-start pl-[0.65625rem] text-sm font-black leading-[1.3125rem] text-[#fba613]">
              ★★★★★
            </span>
          </div>
        </div>
        <div className="flex items-start gap-[0.4375rem]">
          <button
            className="flex flex-col items-center justify-center rounded-[0.65625rem] border border-black/[0.06] bg-[#f9f9fb] px-[1.09375rem] py-[0.54688rem] text-center text-[0.65625rem] font-bold leading-[0.875rem] text-[#1a1a1c]"
            type="button"
          >
            최신순
          </button>
          <button
            className="flex flex-col items-center justify-center rounded-[0.65625rem] border border-[#fba613] bg-white px-[1.09375rem] py-[0.54688rem] text-center text-[0.65625rem] font-bold leading-[0.875rem] text-[#fba613]"
            type="button"
          >
            사진후기만
          </button>
        </div>
      </section>

      <section className="mt-[1.75rem]">
        <article className="mt-6 rounded-[1.5rem] border border-black/[0.06] bg-white p-4 shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] sm:mt-10 sm:rounded-[2.1875rem] sm:p-7">
          <Link href="#" className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
            <div className="h-24 w-24 flex-shrink-0 sm:h-[8.75rem] sm:w-[8.75rem]">
              <Image
                src="/images/ADT-S-01  스몰어덜트 치킨앤라이스 2.png"
                className="block h-full w-full rounded-[1.125rem] object-cover"
                width={140}
                height={140}
                alt="리뷰 상품 이미지"
              />
            </div>

            <div className="w-full flex-1">
              <div className="flex flex-wrap items-start gap-2 sm:gap-3">
                <a href="#" className="flex flex-col gap-1 hover:opacity-80">
                  <span>★★★★★</span>
                  <p className="text-sm sm:text-base">우리 애가 너무 잘 먹어요!</p>
                  <p className="text-xs text-gray-500 sm:text-sm">견주사랑 | 2024.01.10</p>
                </a>
                {/* Link 안에 Link는 x, a로 해야함 */}

                <div className="ml-auto self-start">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-[0.875rem] border border-black/[0.06] bg-[#f5f5f7] p-[0.4375rem] text-[0.5rem] font-bold sm:gap-2 sm:text-[0.625rem]"
                  >
                    👍 도움돼요 24
                  </button>
                </div>
              </div>

              <div className="mt-[0.625rem] text-xs font-medium leading-[1.42188rem] text-[#646468] sm:text-sm">
                <p>
                  입맛이 까다로운 편인데 이건 봉지 소리만 들려도 달려와요.성분도 착해서 안심하고
                  먹입니다.벌써 세번째 구매예요.
                </p>
              </div>
            </div>
          </Link>
        </article>

        <article className="mt-6 rounded-[1.5rem] border border-black/[0.06] bg-white p-4 shadow-[0_2px_12px_0_rgba(0,0,0,0.03)] sm:mt-10 sm:rounded-[2.1875rem] sm:p-7">
          <Link href="#" className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
            <div className="w-full flex-1">
              <div className="flex flex-wrap items-start gap-2 sm:gap-3">
                <Link href="#" className="flex flex-col gap-1 hover:opacity-80">
                  <span>★★★★☆</span>
                  <p className="text-sm sm:text-base">변 상태가 좋아졌어요</p>
                  <p className="text-xs sm:text-sm">초코맘 | 2024.01.08</p>
                </Link>

                <div className="ml-auto self-start">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-[0.875rem] border border-black/[0.06] bg-[#f5f5f7] p-[0.4375rem] text-[0.5rem] font-bold sm:gap-2 sm:text-[0.625rem]"
                  >
                    👍 도움돼요 12
                  </button>
                </div>
              </div>

              <div className="mt-[0.625rem] text-xs font-medium leading-[1.42188rem] text-[#646468] sm:text-sm">
                <p>
                  장이 예민해서 설사를 자주 했는데 나인독으로 바꾸고 나서 황금변을 봅니다. 다만
                  가격이 조금 있는 편이라 별 하나 뺐어요.
                </p>
              </div>
            </div>
          </Link>
        </article>
      </section>

      <ul className="flex w-full items-center justify-center gap-[0.4375rem] self-stretch pt-3.5 font-semibold">
        <li className="flex shrink-0 items-center justify-center">
          <button
            type="button"
            className="inline-flex h-[2.625rem] w-[2.625rem] cursor-not-allowed items-center justify-center rounded-[0.875rem] border border-black/10 bg-[#f2f2f2] p-0 leading-none text-[#646468]"
            disabled
          >
            ‹
          </button>
        </li>

        <li className="flex shrink-0 items-center justify-center">
          <button
            type="button"
            className="inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border border-transparent bg-[#fba613] p-0 font-semibold leading-none text-white shadow-md"
          >
            1
          </button>
        </li>

        <li className="flex shrink-0 items-center justify-center">
          <button
            type="button"
            className="inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border border-black/10 bg-white p-0 leading-none text-black"
          >
            2
          </button>
        </li>

        <li className="flex shrink-0 items-center justify-center">
          <button
            type="button"
            className="inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border border-black/10 bg-white p-0 leading-none text-black"
          >
            ›
          </button>
        </li>
      </ul>

      {/* QnA */}
      <div className="mx-auto mt-14 flex max-w-[75rem] flex-col gap-2.5 sm:mt-28">
        <section className="flex flex-col gap-4 border-b border-black/[0.06] pb-5 sm:flex-row sm:justify-between sm:gap-6">
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex h-7 w-fit items-center justify-center rounded-[0.625rem] bg-black/[0.06] px-3 text-xs font-bold text-[#646468]">
              QnA
            </span>
            <h2 className="m-0 text-xl font-black tracking-[-0.02em] sm:text-[2.5rem]">
              궁금한 점을 물어 보세요.
            </h2>
          </div>
          <button className="h-11 w-fit cursor-pointer self-start whitespace-nowrap rounded-[0.875rem] border-0 bg-[#fba613] px-[1.125rem] text-center text-[0.76875rem] font-bold leading-[1.09375rem] text-white shadow-[0_8px_32px_rgba(251,166,19,0.2)] sm:self-center">
            문의 작성하기
          </button>
        </section>

        <div className="flex flex-col">
          <section className="border-b border-black/[0.06]">
            <a
              href="#"
              className="flex flex-col gap-2 py-4 text-inherit no-underline sm:grid sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:gap-[18px] sm:py-[26px]"
            >
              <span className="flex w-fit items-center rounded-[0.4375rem] border border-black/[0.06] bg-[#f0f0f3] px-[0.65625rem] py-[0.21875rem] text-[0.625rem] font-extrabold uppercase leading-[0.9375rem] tracking-[0.03125rem] text-[#646468]">
                답변완료
              </span>
              <p className="m-0 text-sm font-extrabold tracking-[-0.01em] sm:text-lg">
                유통기한이 얼나마 되나요?
              </p>
              <p className="m-0 whitespace-nowrap text-xs font-semibold text-[#909094] sm:text-sm">
                질문자1 | 2024.01.12
              </p>
              <span className="hidden text-lg leading-none text-[#909094] sm:block">⌄</span>
            </a>
          </section>

          <section className="border-b border-black/[0.06]">
            <a
              href="#"
              className="flex flex-col gap-2 py-4 text-inherit no-underline sm:grid sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:gap-[18px] sm:py-[26px]"
            >
              <span className="inline-flex h-7 w-fit items-center justify-center whitespace-nowrap rounded-[0.625rem] bg-[rgba(60,220,120,0.12)] px-3 text-[0.625rem] font-bold text-[#2fa86a]">
                답변대기
              </span>
              <p className="m-0 text-sm font-extrabold tracking-[-0.01em] sm:text-lg">
                샘플 신청이 가능한가요?
              </p>
              <p className="m-0 whitespace-nowrap text-xs font-semibold text-[#909094] sm:text-sm">
                멍뭉이 | 2024.01.09
              </p>
              <span className="hidden text-lg leading-none text-[#909094] sm:block">⌄</span>
            </a>
          </section>
        </div>

        <ul className="flex w-full items-center justify-center gap-[0.4375rem] self-stretch pt-3.5 font-semibold">
          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-[2.625rem] w-[2.625rem] cursor-not-allowed items-center justify-center rounded-[0.875rem] border border-black/10 bg-[#f2f2f2] p-0 leading-none text-[#646468]"
              disabled
            >
              ‹
            </button>
          </li>

          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border border-transparent bg-[#fba613] p-0 font-semibold leading-none text-white shadow-md"
            >
              1
            </button>
          </li>

          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border border-black/10 bg-white p-0 leading-none text-black"
            >
              2
            </button>
          </li>

          <li className="flex shrink-0 items-center justify-center">
            <button
              type="button"
              className="inline-flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center rounded-[0.875rem] border border-black/10 bg-white p-0 leading-none text-black"
            >
              ›
            </button>
          </li>
        </ul>
      </div>

      {/* 구매 모달창 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex flex-col w-[72rem] h-[80vh] overflow-y-auto rounded-xl bg-white px-15 py-10 gap-10 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 막대 */}

            <div
              className="flex justify-center pb-7 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <span className="h-1.5 w-15 rounded-full bg-gray-200" />
            </div>

            {/* 배송 옵션 */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => setPurchaseType("oneTime")}
                className={[
                  "flex-1 w-[35rem] border border-black rounded bg-white py-2",
                  purchaseType === "oneTime"
                    ? "border-[#fba613] bg-[#fff5e6] text-[#fba613] font-bold"
                    : "border-black bg-white",
                ].join(" ")}
              >
                1회 구매
              </button>

              <button
                type="button"
                onClick={() => setPurchaseType("subscribe")}
                className={[
                  "flex-1 w-[35rem] border border-black rounded bg-white py-2",
                  "flex-1 w-[35rem] rounded border py-2",
                  purchaseType === "subscribe"
                    ? "border-[#fba613] bg-[#fff5e6] text-[#fba613] font-bold"
                    : "border-black bg-white",
                ].join(" ")}
              >
                정기구독
              </button>
            </div>

            {/* 상품 정보 */}
            <div className="flex items-start gap-6 ">
              <Image src="/images/product-404.jpg" alt="상품 이미지" width={150} height={150} />
              <div className="h-full items-center">
                {purchaseType !== "subscribe" && <p>일회성 구매</p>}
                <p className="text-center font-bold text-2xl">어덜트 밸런스 치킨</p>
                <div className="flex items-center gap-2">
                  {purchaseType === "subscribe" && (
                    <span className="text-sm text-gray-400 line-through">
                      {basePrice.toLocaleString()}원
                    </span>
                  )}
                  <p className="font-bold text-xl text-[#fba613]">
                    {finalPrice.toLocaleString()}원
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="ml-auto self-start text-l text-[#646468]"
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            </div>

            {/* 1회 구매 */}
            {purchaseType !== "subscribe" && (
              <div className="flex flex-col gap-10">
                <div className="rounded-full border border-black/10 bg-gray-50 px-6 py-4 text-center">
                  <span className="flex justify-center text-m font-semibold text-[#646468]">
                    현재 &nbsp; <span className="font-bold text-black">1회성 일반 구매</span>를
                    선택하셨습니다.
                  </span>
                </div>
                <div className="h-px  bg-gray-200" />
              </div>
            )}

            {/* 정기구독 */}
            {purchaseType === "subscribe" && (
              <div className="flex flex-col gap-5">
                <span className="font-semibold text-m">배송주기 선택</span>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryCycle("2w")}
                    className={`flex-1 w-[35rem] rounded py-2 font-semibold transition
      ${
        deliveryCycle === "2w"
          ? "border-[#fba613] bg-[#fba613]/20 text-[#fba613]"
          : "border border-gray-300 bg-white text-gray-400"
      } 
    `}
                  >
                    격주 배송(2주)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryCycle("4w")}
                    className={`flex-1 w-[35rem] rounded py-2 font-semibold transition
      ${
        deliveryCycle === "4w"
          ? "border-[#fba613] bg-[#fba613]/20 text-[#fba613]"
          : "border border-gray-300 bg-white text-gray-400"
      }
    `}
                  >
                    매월 배송(4주)
                  </button>
                </div>
                <span className="text-[#fba613] font-semibold">
                  * 정기구독 시 10% 추가 할인 및 무료배송 혜택이 적용됩니다.
                </span>

                <div className="h-px bg-gray-200" />
              </div>
            )}

            <div className="flex justify-between">
              <p className="font-semibold text-m">수량</p>
              <button type="button">- 1 +</button>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex justify-between">
              <p className="font-semibold text-m">총 결제금액</p>
              <div className="flex items-center gap-2">
                {purchaseType === "subscribe" && (
                  <span className="text-sm text-gray-400 line-through">
                    {basePrice.toLocaleString()}원
                  </span>
                )}
                <p className="font-bold text-xl text-[#fba613]">{finalPrice.toLocaleString()}원</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="flex-1 w-[35rem] border border-black rounded bg-white py-2"
              >
                장바구니 담기
              </button>
              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="flex-1 w-[35rem] rounded bg-gray-200 py-2"
              >
                바로 구매하기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
