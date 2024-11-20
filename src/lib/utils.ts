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