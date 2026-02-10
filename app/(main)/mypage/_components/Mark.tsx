// 공통 타입 정의
interface ImageProps {
  className?: string;
}

export const RigthMark = ({ className }: ImageProps) => {
  return <img src="/images/right-mark.png" alt="className" />;
};

export const Pencil = ({ className }: ImageProps) => {
  return <img src="/images/pencil.png" alt="className" />;
};
