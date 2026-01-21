import Image from "next/image";
import Link from "next/link";

export default function Product() {
  return (
    <main className="mx-auto w-full max-w-300 items-center gap-28 px-5 pb-35 pt-17.5">
      <section className="mx-auto max-w-300 px-5 pb-21 pt-10.5">
        <button
          className="mb-7 inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent font-semibold text-[#8b8b8f]"
          type="button"
        >
          ‹ 목록으로
        </button>

        {/* 상품이미지 */}
        <div className="mx-auto flex h-138 max-w-[75rem] flex-row items-start gap-14">
          <div className="image-card">
            <Image
              className="block h-138 w-134.5 rounded-4xl object-cover"
              src="/images/ADT-S-01  스몰어덜트 치킨앤라이스 2.png"
            />
          </div>

          <div className="flex h-128 w-134.5 flex-col items-start">
            <span className="flex items-center rounded-[0.4375rem] border border-[rgba(251,166,19,0.2)] bg-[#fff5e6] px-[0.65625rem] py-[0.21875rem] font-['Pretendard'] text-[0.625rem] font-extrabold uppercase leading-[0.9375rem] tracking-[0.03125rem] text-[#fba613]">
              ADULT
            </span>
            <div>
              <h1 className="mb-12.5 text-[2.625rem] font-bold">어덜트 밸런스 치킨</h1>
            </div>

            {/* 정보카드 */}
            <div className="mb-8.75 flex flex-col items-start gap-5.25 self-stretch rounded-[2.1875rem] bg-bg-secondary p-7">
              <dl>
                <div className="flex h-[1.5625rem] w-[30.125rem] items-center justify-between self-stretch py-7">
                  <dt className="font-medium">판매가격</dt>
                  <dd className="text-[1.625rem] font-bold">32,000원</dd>
                </div>

                <div className="my-[0.625rem] h-px bg-black/[0.06]" />

                <div className="mt-[1.3125rem] flex h-[1.5625rem] w-[30.125rem] items-center justify-between self-stretch">
                  <dt className="text-sm text-[#8b8b8f]">배송정보</dt>
                  <dd className="text-[#3a3a3c]">무료배송 [9Dog 정기구독 시]</dd>
                </div>
                <div className="mt-[1.3125rem] flex h-[1.5625rem] w-[30.125rem] items-center justify-between self-stretch">
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
            <div className="flex flex-row items-start gap-3.5">
              <button
                className="flex h-[3.25rem] w-[27.75rem] flex-1 items-center justify-center rounded-[0.875rem] bg-[#fba613] px-[1.3125rem] py-[1.09375rem] shadow-[0_0.5rem_2rem_0_rgba(251,166,19,0.2)]"
                type="button"
              >
                구매하기
              </button>
              <button
                className="flex h-[3.25rem] w-[5.0625rem] items-center justify-center rounded-[0.875rem] border-[0.125rem] border-black/10 bg-white px-7 py-[0.85938rem]"
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
      <nav className="mx-auto flex w-full max-w-[75rem] flex-col items-center border-y border-black/[0.06] bg-white/95 px-5 backdrop-blur-[12px]">
        <div className="flex max-w-[75rem] items-start justify-center self-stretch px-5">
          <button className="flex flex-col items-center justify-center px-[2.625rem] py-[1.09375rem] text-center text-[0.76875rem] font-black leading-[1.09375rem] text-[#fba613]">
            상세정보
            <div className="absolute bottom-0 h-[0.21875rem] w-[7.9375rem] rounded-[624.9375rem] bg-[#fba613]" />
          </button>
          <button className="flex flex-col items-center justify-center px-[2.625rem] py-[1.09375rem] text-center font-['Pretendard'] text-[0.76875rem] font-bold leading-[1.09375rem] text-[#909094]">
            구매후기(428)
          </button>
          <button className="flex flex-col items-center justify-center px-[2.625rem] py-[1.09375rem] text-center font-['Pretendard'] text-[0.76875rem] font-bold leading-[1.09375rem] text-[#909094]">
            Q&A(15)
          </button>
        </div>
      </nav>

      {/* 상세정보 */}
      <section>
        <Image src="/images/image 27.png" />
        <Image src="/images/image 28.png" />

        <div className="flex flex-col items-center self-stretch border-y border-black/[0.06] bg-white/95 px-[2.625rem] py-[1.09375rem] backdrop-blur-[12px]">
          <button
            type="button"
            className="text-center font-['Pretendard'] text-[0.76875rem] font-bold leading-[1.09375rem] text-[#909094]"
          >
            상세 더보기
          </button>
        </div>
      </section>

      {/* 리뷰 */}
      <section className="flex items-end justify-between self-stretch border-b border-black/[0.06] pb-[2.1875rem]">
        <div className="flex w-[18.625rem] flex-col items-start justify-end gap-[0.4375rem] pt-[2.375rem]">
          <h2 className="text-[1.96875rem] font-black leading-[2.1875rem] tracking-[-0.09844rem] text-[#1a1a1c]">
            구매 견주님들의 솔직 후기
          </h2>
          <div className="flex items-center">
            <span className="font-['Pretendard'] text-[1.96875rem] font-black leading-[2.1875rem] text-[#fba613]">
              4.8
            </span>
            <span className="flex flex-col items-start pl-[0.65625rem] font-['Pretendard'] text-sm font-bold leading-[1.3125rem] text-[#909094]">
              {" "}
              / 5.0{" "}
            </span>
            <span className="flex flex-col items-start pl-[0.65625rem] font-['Pretendard'] text-sm font-black leading-[1.3125rem] text-[#fba613]">
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

      <section className="mt-10 rounded-[2.1875rem] border border-black/[0.06] bg-white p-7 shadow-[0_2px_12px_0_rgba(0,0,0,0.03)]">
        <Link href="#" className="flex items-start gap-6">
          <div className="h-[8.75rem] w-[8.75rem] flex-shrink-0">
            <Image
              src="/images/ADT-S-01  스몰어덜트 치킨앤라이스 2.png"
              className="block h-full w-full rounded-[1.125rem] object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="flex flex-col">
                <span>★★★★★</span>
                <p>우리 애가 너무 잘 먹어요!</p>
                <p>견주사랑 | 2024.01.10</p>
              </div>

              <div className="ml-auto self-start">
                <button className="inline-flex items-center gap-2 rounded-[0.875rem] border border-black/[0.06] bg-[#f5f5f7] p-[0.4375rem] text-[0.625rem] font-bold">
                  👍 도움돼요 24
                </button>
              </div>
            </div>

            <div className="mt-[0.625rem] font-['Pretendard'] text-sm font-medium leading-[1.42188rem] text-[#646468]">
              <p>
                입맛이 까다로운 편인데 이건 봉지 소리만 들려도 달려와요.성분도 착해서 안심하고
                먹입니다.벌써 세번째 구매예요.
              </p>
            </div>
          </div>
        </Link>
      </section>

      <section className="mt-10 rounded-[2.1875rem] border border-black/[0.06] bg-white p-7 shadow-[0_2px_12px_0_rgba(0,0,0,0.03)]">
        <Link href="#" className="flex items-start gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="flex flex-col">
                <span>★★★★☆</span>
                <p>변 상태가 좋아졌어요</p>
                <p>초코맘 | 2024.01.08</p>
              </div>

              <div className="ml-auto self-start">
                <button className="inline-flex items-center gap-2 rounded-[0.875rem] border border-black/[0.06] bg-[#f5f5f7] p-[0.4375rem] text-[0.625rem] font-bold">
                  👍 도움돼요 12
                </button>
              </div>
            </div>

            <div className="mt-[0.625rem] font-['Pretendard'] text-sm font-medium leading-[1.42188rem] text-[#646468]">
              <p>
                장이 예민해서 설사를 자주 했는데 나인독으로 바꾸고 나서 황금변을 봅니다. 다만 가격이
                조금 있는 편이라 별 하나 뺐어요.
              </p>
            </div>
          </div>
        </Link>
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
      <div className="mx-auto max-w-[75rem]">
        <section className="flex justify-between gap-6 border-b border-black/[0.06] pb-5">
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex h-7 w-fit items-center justify-center rounded-[0.625rem] bg-black/[0.06] px-3 text-xs font-bold text-[#646468]">
              QnA
            </span>
            <h2 className="m-0 text-[2.5rem] font-black tracking-[-0.02em]">
              궁금한 점을 물어 보세요.
            </h2>
          </div>
          <button className="h-11 cursor-pointer self-center whitespace-nowrap rounded-[0.875rem] border-0 bg-[#fba613] px-[1.125rem] text-center font-['Pretendard'] text-[0.76875rem] font-bold leading-[1.09375rem] text-white shadow-[0_8px_32px_rgba(251,166,19,0.2)]">
            문의 작성하기
          </button>
        </section>

        <section className="border-b border-black/[0.06]">
          <a
            href="#"
            className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-[18px] py-[26px] text-inherit no-underline"
          >
            <span className="flex items-center rounded-[0.4375rem] border border-black/[0.06] bg-[#f0f0f3] px-[0.65625rem] py-[0.21875rem] font-['Pretendard'] text-[0.625rem] font-extrabold uppercase leading-[0.9375rem] tracking-[0.03125rem] text-[#646468]">
              답변완료
            </span>
            <p className="m-0 text-lg font-extrabold tracking-[-0.01em]">
              유통기한이 얼나마 되나요?
            </p>
            <p className="m-0 whitespace-nowrap text-sm font-semibold text-[#909094]">
              질문자1 | 2024.01.12
            </p>
            <span className="text-lg leading-none text-[#909094]">⌄</span>
          </a>
        </section>

        <section className="border-b border-black/[0.06]">
          <a
            href="#"
            className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-[18px] py-[26px] text-inherit no-underline"
          >
            <span className="inline-flex h-7 items-center justify-center whitespace-nowrap rounded-[0.625rem] bg-[rgba(60,220,120,0.12)] px-3 text-[0.625rem] font-bold text-[#2fa86a]">
              답변대기
            </span>
            <p className="m-0 text-lg font-extrabold tracking-[-0.01em]">샘플 신청이 가능한가요?</p>
            <p className="m-0 whitespace-nowrap text-sm font-semibold text-[#909094]">
              멍뭉이 | 2024.01.09
            </p>
            <span className="text-lg leading-none text-[#909094]">⌄</span>
          </a>
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
      </div>
    </main>
  );
}
