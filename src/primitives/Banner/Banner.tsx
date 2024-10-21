import React, { useMemo } from "react";
import DefaultBanner from "@/assets/default_banner.jpg";
import { match, P } from "ts-pattern";

interface BannerProps {
  fallbackName?: string;
  ipfsCID?: string;
  url?: string;
  height?: number;
  ipfsBaseURL?: string;
  defaultImage?: string;
}

export const Banner = ({
  fallbackName,
  ipfsCID,
  url,
  height = 150,
  ipfsBaseURL = "https://ipfs.io/ipfs/",
  defaultImage = DefaultBanner,
}: BannerProps) => {
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

  return (
    <img
      src={imageURL}
      alt="Banner"
      role="presentation"
      className={`ui-w-full ui-object-cover ui-h-[${height}]`}
    />
  );
};
