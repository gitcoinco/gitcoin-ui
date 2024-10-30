import React, { useMemo } from "react";

import { match, P } from "ts-pattern";

import DefaultLogo from "@/assets/default_logo.png";
import { Avatar as ShadCNAvatar, AvatarFallback, AvatarImage, Shape } from "@/ui-shadcn/avatar";

interface AvatarProps {
  fallbackName?: string;
  ipfsCID?: string;
  url?: string;
  size?: number;
  ipfsBaseURL?: string;
  defaultImage?: string;
  shape?: Shape;
}

export const Avatar = ({
  fallbackName,
  ipfsCID,
  url,
  size = 40,
  ipfsBaseURL = "https://ipfs.io/ipfs/",
  defaultImage = DefaultLogo,
  shape = "round",
}: AvatarProps) => {
  const imageURL = useMemo(() => {
    return match({ ipfsCID, url, fallbackName })
      .with({ ipfsCID: P.nullish, url: P.nullish, fallbackName: P.nullish }, () => defaultImage)
      .with({ ipfsCID, url: P.string.length(0) }, ({ ipfsCID }) => `${ipfsBaseURL}${ipfsCID}`)
      .with({ ipfsCID, url: P.nullish }, ({ ipfsCID }) => `${ipfsBaseURL}${ipfsCID}`)
      .with({ ipfsCID: P.string.length(0), url }, ({ url }) => url)
      .with({ ipfsCID: P.nullish, url }, ({ url }) => url)
      .with(
        { ipfsCID: P.string.minLength(1), url: P.string.minLength(1) },
        ({ ipfsCID }) => `${ipfsBaseURL}${ipfsCID}`,
      )

      .otherwise(() => defaultImage);
  }, [ipfsCID, url, ipfsBaseURL]);

  const fallback = useMemo(() => {
    return match(fallbackName)
      .with(undefined, () => "")
      .otherwise((name) => {
        const words = name.trim().split(/\s+/);
        return match(words)
          .with([P.string], ([word]) =>
            word.length === 1 ? word.toUpperCase() : word.slice(0, 2).toUpperCase(),
          )
          .otherwise(([first, second]) => (first[0] + (second?.[0] || "")).toUpperCase());
      });
  }, [fallbackName]);

  return (
    <ShadCNAvatar
      role="presentation"
      className=" size-full bg-white p-1 shadow-md shadow-slate-600"
      shape={shape}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <AvatarImage src={imageURL} alt="avatar" />
      <AvatarFallback shape="square">{fallback}</AvatarFallback>
    </ShadCNAvatar>
  );
};
