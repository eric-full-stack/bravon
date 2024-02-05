import { cn } from "@/lib/utils";
import { Wallpoet } from "next/font/google";

const wallPoet = Wallpoet({ weight: "400", subsets: ["latin"] });
export function LogoText({ className }: { className?: string }) {
  return <span className={cn(wallPoet.className, className)}>BRAVON</span>;
}
export default function Logo({
  className,
  size = 20,
  minimal = false,
  showSymbol = true,
}: {
  size?: number;
  className?: string;
  minimal?: boolean;
  showSymbol?: boolean;
}) {
  return (
    <div
      className={cn([
        "items-initial relative z-20 flex gap-2 text-lg font-medium",
        className,
      ])}
    >
      {showSymbol && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <ellipse
              stroke="#fff"
              ry="13.33333"
              rx="14.06504"
              id="svg_1"
              cy="11.9187"
              cx="11.67479"
              fill="#ffffff"
            />
            <g id="Layer_1">
              <g id="svg_18">
                <line
                  transform="rotate(44.0616 3.23014 15.1621)"
                  stroke="#000"
                  id="svg_3"
                  y2="11.86221"
                  x2="-13"
                  y1="18.46205"
                  x1="18"
                  strokeWidth="5"
                  fill="none"
                />
                <line
                  transform="rotate(111.782 22.4 14.4897)"
                  stroke="#000"
                  id="svg_5"
                  y2="11.86221"
                  x2="6.58491"
                  y1="18.46205"
                  x1="36"
                  strokeWidth="5"
                  fill="none"
                />
              </g>
            </g>
            <rect
              fill="#ffffff"
              strokeWidth="5"
              x="10.09183"
              y="15.92857"
              width="3.61224"
              height="10.40816"
              id="svg_2"
            />
          </g>
        </svg>
      )}
      <span
        className={`${!minimal ? "block" : "hidden"} ${wallPoet.className}`}
      >
        BRAVON
      </span>
    </div>
  );
}
