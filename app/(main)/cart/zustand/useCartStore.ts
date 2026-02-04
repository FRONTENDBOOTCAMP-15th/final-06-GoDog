import { getCartItems } from "@/lib/cart";
import { CartListRes, ErrorRes } from "@/types/response";
import { create } from "zustand";

type DeliveryÇycle = "biweekly" | "monthly";

interface CartStoreState {
  cartData: CartListRes | null;
  isLoading: boolean;
  error: ErrorRes | null;

  // 정기구독 배송 주기 상태
  deliveryCycles: Record<number, DeliveryÇycle>;

  // 상태 변경 함수
  setError: (error: ErrorRes | null) => void;
  fetchCart: (accessToken: string) => Promise<void>;
  handleDeleteSuccess: (deleteId: number) => void;
  handleDeleteMultiple: (deleteIds: number[]) => void;
  updateQuantity: (cartId: number, newQuantity: number) => void;

  // 정기구독 배송 함수
  setDeliveryCycle: (cartId: number, cycle: DeliveryÇycle) => void;
  getDeliveryCycle: (cartId: number) => DeliveryÇycle;

  // 1회구매/정기구독 필터링 데이터
  getOnetimeItmes: () => CartListRes["item"];
  getSubscriptionItems: () => CartListRes["item"];

  // 품절 여부 확인
  isSoldOut: (cartId: number) => boolean;

  // 각 탭별 총 금액 계산
  getCartTotal: (type?: "oneTime" | "subscription") => {
    productsPrice: number;
    shippingFees: number;
    totalPrice: number;
    availableCount: number;
  };

  // // 선택 상품 총 금액 계산
  // getSelectedCartTotal: (
  //   selectIds: number[],
  //   type?: "oneTime" | "subscription"
  // ) => {
  //   productsPrice: number;
  //   shippingFees: number;
  //   totalPrice: number;
  //   selectedCount: number;
  // };
}

const useCartStore = create<CartStoreState>((set, get) => ({
  cartData: null,
  isLoading: false,
  error: null,
  deliveryCycles: {}, // 초기값

  setError: (error) => set({ error }),

  // 장바구니 목록 불러오기
  fetchCart: async (accessToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getCartItems(accessToken);
      if (data.ok === 0) {
        set({ error: data, isLoading: false });
      } else {
        const initialCycles: Record<number, DeliveryÇycle> = {};
        data.item.forEach((cart) => {
          if (cart.color?.includes("정기구독")) {
            initialCycles[cart._id] = "biweekly";
          }
        });

        set({ cartData: data, isLoading: false, deliveryCycles: initialCycles });
      }
    } catch {
      set({
        error: { ok: 0, message: "장바구니 목록을 불러오는데 실패했습니다." },
        isLoading: false,
      });
    }
  },

  // 한건 삭제
  handleDeleteSuccess: (deleteId: number) => {
    set((state) => {
      const newCycles = { ...state.deliveryCycles };
      delete newCycles[deleteId]; // ✅ 삭제된 상품의 배송 주기도 제거

      return {
        cartData: state.cartData
          ? { ...state.cartData, item: state.cartData.item.filter((i) => i._id !== deleteId) }
          : null,
        deliveryCycles: newCycles,
      };
    });
  },

  // 여러 건 삭제
  handleDeleteMultiple: (deleteIds: number[]) => {
    set((state) => {
      const newCycles = { ...state.deliveryCycles };
      deleteIds.forEach((id) => delete newCycles[id]); // ✅ 삭제된 상품들의 배송 주기도 제거

      return {
        cartData: state.cartData
          ? {
              ...state.cartData,
              item: state.cartData.item.filter((i) => !deleteIds.includes(i._id)),
            }
          : null,
        deliveryCycles: newCycles,
      };
    });
  },

  // 수량 업데이트
  updateQuantity: (cartId: number, newQuantity: number) => {
    set((state) => ({
      cartData: state.cartData
        ? {
            ...state.cartData,
            item: state.cartData.item.map((item) =>
              item._id === cartId ? { ...item, quantity: newQuantity } : item
            ),
          }
        : null,
    }));
  },

  // 배송 주기 설정
  setDeliveryCycle: (cartId: number, cycle: DeliveryÇycle) => {
    set((state) => ({
      deliveryCycles: {
        ...state.deliveryCycles,
        [cartId]: cycle,
      },
    }));
  },

  // 배송 주기 가져오기
  getDeliveryCycle: (cartId: number) => {
    return get().deliveryCycles[cartId] || "biweekly";
  },

  // 1회구매 상품
  getOnetimeItmes: () => {
    const items = get().cartData?.item || [];
    return items.filter((cart) => cart.color?.includes("1회구매"));
  },

  // 정기구독 상품
  getSubscriptionItems: () => {
    const items = get().cartData?.item || [];
    return items.filter((cart) => cart.color?.includes("정기구독"));
  },

  // 품절 여부 확인
  isSoldOut: (cartId: number) => {
    const items = get().cartData?.item || [];
    const cart = items.find((item) => item._id === cartId);

    if (!cart) return false;

    return cart.product.quantity === cart.product.buyQuantity;
  },

  // 총 금액 계산(타입별 필터링)
  getCartTotal: (type?: "oneTime" | "subscription") => {
    let items = get().cartData?.item || [];

    // 타입별 필터링
    if (type === "oneTime") {
      items = items.filter((cart) => cart.color?.includes("1회구매"));
    } else if (type === "subscription") {
      items = items.filter((cart) => cart.color?.includes("정기구독"));
    }

    // 구매 가능한 상품
    const availableItems = items.filter(
      (item) => item.product.quantity !== item.product.buyQuantity
    );

    // 총 상품 금액 계산
    const productsTotal = availableItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return {
      productsPrice: productsTotal,
      shippingFees: 0,
      totalPrice: productsTotal,
      availableCount: availableItems.length,
    };
  },

  // // 선택 상품 총 금액 계산
  // getSelectedCartTotal: (selectIds: number[], type?: "oneTime" | "subscription") => {
  //   let items = get().cartData?.item || [];

  //   // 타입별 필터링
  //   if (type === "oneTime") {
  //     items = items.filter((cart) => cart.color?.includes("1회구매"));
  //   }
  // },
}));

export default useCartStore;
