import React from "react";
import { tv } from "tailwind-variants";

interface CircleStatProps {
  value: number | string;
  size?: "small" | "medium" | "large";
  showPercentageSymbol?: boolean;
  thresholds?: { low: number; mid: number };
  colors?: { low: string; mid: string; high: string };
  className?: string;
}

const circleStat = tv({
  base: "flex items-center justify-center rounded-full text-center font-sans font-400",
  variants: {
    size: {
      small: "w-8 h-8 text-xs",
      medium: "w-12 h-12 text-base",
      large: "w-16 h-16 text-lg"
    },
    color: {
      low: "bg-orange-300",
      mid: "bg-yellow-300",
      high: "bg-green-300"
    }
  },
  defaultVariants: {
    size: "medium",
    color: "low"
  }
});

export const CircleStat: React.FC<CircleStatProps> = ({
  value,
  size = "medium",
  showPercentageSymbol = true,
  thresholds = { low: 30, mid: 60 },
  colors,
  className
}) => {
  const getColorVariant = () => {
    const _value = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(_value) || _value <= thresholds.low) return "low";
    else if (_value < thresholds.mid) return "mid";
    else return "high";
  };

  const colorVariant = getColorVariant();
  const colorStyle = colors ? { backgroundColor: colors[colorVariant] } : {};

  return (
    <div className={circleStat({ size, color: colorVariant, class: className })} style={colorStyle}>
      {`${value}${showPercentageSymbol ? "%" : ""}`}
    </div>
  );
};
