import React, { useMemo } from "react";

import { tv } from "tailwind-variants";
import { match, P } from "ts-pattern";

import DefaultLogo from "@/assets/default_logo.png";
import { Avatar as ShadCNAvatar, AvatarFallback, AvatarImage } from "@/ui-shadcn/avatar";

interface AvatarProps {
  fallbackName?: string;
  ipfsCID?: string;
  url?: string;
  ipfsBaseURL?: string;
  defaultImage?: string;
  avatarClassName?: string;
}

export const AvatarVariants = tv({
  slots: {
    avatar: "aspect-square size-full w-12 bg-white",
  },
});

export const Avatar = ({
  fallbackName,
  ipfsCID,
  url,
  ipfsBaseURL = "https://ipfs.io/ipfs/",
  defaultImage = DefaultLogo,
  avatarClassName,
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

  const { avatar } = AvatarVariants();

  return (
    <ShadCNAvatar role="presentation" className={avatar({ className: avatarClassName })}>
      <AvatarImage src={imageURL} alt="avatar" className="p-1" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </ShadCNAvatar>
  );
};
