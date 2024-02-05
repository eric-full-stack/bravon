import Logo from "./logo";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center animate-pulse animate-wiggle">
        <Logo minimal size={50} />
      </div>
    </div>
  );
}
