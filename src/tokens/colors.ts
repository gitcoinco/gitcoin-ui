import { Colors, ColorSet } from "./types";

const black = "#000000";

const white = "#ffffff";

const grey: ColorSet = {
  "50": "#F7F7F7",
  "100": "#ECEDED",
  "200": "#EAEAEA",
  "300": "#C8CCCC",
  "500": "#959C9C",
  "700": "#555555",
  "900": "#4B5050",
};

export const colors: Colors = {
  text: {
    primary: black,
    secondary: grey["900"],
    tertiary: grey["500"],
    white,
  },
  background: {
    primary: white,
    secondary: grey["50"],
    tertiary: grey["100"],
  },
  border: {
    primary: grey["100"],
  },

  brand: "#307168",
  black,
  white,
  neutral: {
    "25": "#F6F6F6",
    "50": "#F7F7F7",
    "100": "#E5E5E5",
    "200": "#E6E6E6",
    "600": "#979998",
  },
  moss: {
    "50": "#F2FBF8",
    "100": "#D5F2EA",
    "300": "#78D0BC",
    "500": "#329A88",
    "700": "#22635A",
    "900": "#1E443F",
  },
  grey,
  blue: {
    "50": "#F2F9FD",
    "100": "#E4F0FA",
    "300": "#8EC9EB",
    "500": "#2B94CC",
    "700": "#185E8C",
    "900": "#194461",
  },
  green: {
    brand: "#185B52",
    "50": "#F4FAEB",
    "100": "#E5F4D3",
    "200": "#47A095",
    "300": "#ADDB7B",
    "400": "#00433B",
    "500": "#7ABF39",
    "600": "#65a30d",
    "700": "#426A21",
    "900": "#30491E",
  },
  red: {
    "50": "#FEF5F2",
    "100": "#FFE8E1",
    "300": "#FFB7A0",
    "500": "#F56A3E",
    "700": "#BE3F17",
    "900": "#82331A",
  },
  pink: {
    "500": "#D44D6E",
  },
  yellow: {
    "50": "#FDFCED",
    "100": "#F8F4CD",
    "300": "#EBDC6C",
    "500": "#DCAD24",
    "700": "#A2651B",
    "900": "#6D421A",
  },
  purple: {
    "50": "#F5F4FE",
    "100": "#EBEAFD",
    "300": "#BFBAF8",
    "500": "#7D67EB",
    "700": "#5C35CC",
    "900": "#40268C",
  },
  orange: {
    "300": "#FF9776",
    "400": "#DE3714",
    "600": "#A2401F",
  },
};
