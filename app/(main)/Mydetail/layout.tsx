export default function Mypagelayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* {회색 영역} */}
      <div className="w-full h-[1280px] bg-[#F9F9FB] ">{children}</div>
    </>
  );
}
