import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const modularRedirect = (
  redirectLink?: string,
  redirect?: boolean,
  chainId?: string,
  roundId?: string,
) => {
  let link = redirectLink;
  if (!link) {
    return;
  }
  if (chainId && roundId) {
    link = link.replace("{chainId}", chainId).replace("{roundId}", roundId);
  } else if (chainId) {
    link = link.replace("{chainId}", chainId);
  } else if (roundId) {
    link = link.replace("{roundId}", roundId);
  }
  if (redirect) {
    window.open(link, "_blank");
  } else {
    window.location.href = link;
  }
};

export function formatLocalDate(isoDate: string) {
  const date = new Date(isoDate);

  return date.toLocaleString(undefined, {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function shortAddress(address: string) {
  if (typeof address !== "string" || address.length < 8) {
    throw new Error("Address must be a string with at least 8 characters.");
  }
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function capitalizeWord(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
