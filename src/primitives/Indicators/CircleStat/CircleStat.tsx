import React from "react";
import { cn } from "@/lib/utils";
import { colors as col } from "../../../tokens/colors";
import { ColorSet } from "@/tokens/types";

interface CircleStatProps {
  text: number | string;
  size?: number;
  color?: string;
  showPercentageSymbol?: boolean;
  font?: {
    family?: string;
    weight?: string;
    size?: string;
    lineHeight?: string;
    color?: string;
  };
}

export const CircleStat: React.FC<CircleStatProps> = ({
  text,
  size = 48,
  color,
  showPercentageSymbol = true,
  font = {},
}) => {
  const defaultColors = {
    low: (col.orange as ColorSet)["300"],
    mid: (col.yellow as ColorSet)["300"],
    high: (col.green as ColorSet)["300"],
  };

  const defaultFont = {
    family: "DM Sans",
    weight: "400",
    size: "16px",
    lineHeight: "24px",
    color: col.black,
  };

  const usedFont = { ...defaultFont, ...font };

  const getColor = (text: number | string) => {
    if (color) return color;
    const value = typeof text === "string" ? parseFloat(text) : text;

    if (isNaN(value)) {
      return defaultColors.low;
    }
    if (value <= 30) {
      return defaultColors.low;
    } else if (value < 60) {
      return defaultColors.mid;
    } else {
      return defaultColors.high;
    }
  };

  return (
    <div
      className={cn("ui-flex ui-items-center ui-justify-center ui-rounded-full")}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontFamily: usedFont.family,
        fontWeight: usedFont.weight,
        fontSize: usedFont.size,
        lineHeight: usedFont.lineHeight,
        color: usedFont.color as string,
        backgroundColor: getColor(text),
      }}
    >
      {`${text}${showPercentageSymbol ? "%" : ""}`}
    </div>
  );
};
