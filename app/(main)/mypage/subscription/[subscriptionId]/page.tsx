import Adjustdelivery from "@/app/(main)/mypage/_components/adjustdelivery";
import DeliveryPeri from "@/app/(main)/mypage/_components/DeliveryPeri";
import DetailSub from "@/app/(main)/mypage/_components/DetailSub";
import { Product404 } from "@/app/(main)/mypage/_components/DogFoodImage";
import Button from "@/components/common/Button";

export default function SubscriptionEdit() {
  return (
    <>
      <div className="flex flex-row">
        <DetailSub title="고메 화식 패키지" image={<Product404 />} price="45,000 원" />
        <DeliveryPeri />
        <Adjustdelivery />
      </div>
    </>
  );
}
