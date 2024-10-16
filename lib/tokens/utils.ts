import { Colors, ColorSet } from "./types";

const filterColorsByShades = (colors: Colors, shades: string[]) => {
  const filteredColors: Colors = {};
  const colorKeys = Object.keys(colors);
  colorKeys.forEach((colorKey) => {
    filteredColors[colorKey] = shades.reduce((acc, shade) => {
      if (colors[colorKey][shade]) {
        acc[shade] = colors[colorKey][shade];
      }
      return acc;
    }, {} as ColorSet);
  });
  return filteredColors;
};

const filterColorsByColorKeys = (colors: Colors, keys: string[]) => {
  const filteredColors: Colors = keys.reduce((acc, colorKey) => {
    if (colors[colorKey]) {
      acc[colorKey] = colors[colorKey];
    }
    return acc;
  }, {} as Colors);
  return filteredColors;
};

export const generateColorPalette = ({
  baseColors,
  colorKeys,
  shades,
}: {
  baseColors: Colors;
  colorKeys?: string[];
  shades?: string[];
}) => {
  const isColorKeysProvided = colorKeys && colorKeys.length > 0;
  const isShadesProvided = shades && shades.length > 0;

  const filteredColors = isColorKeysProvided
    ? filterColorsByColorKeys(baseColors, colorKeys)
    : baseColors;

  const filteredShades = isShadesProvided
    ? filterColorsByShades(filteredColors, shades)
    : filteredColors;
  return filteredShades;
};
