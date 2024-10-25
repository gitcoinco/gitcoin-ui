import React, { useMemo } from "react";

import clsx from "clsx";
import { match, P } from "ts-pattern";

import DefaultBanner from "@/assets/default_banner.jpg";

interface BannerImageProps {
  ipfsCID?: string;
  url?: string;
  size?: number;
  ipfsBaseURL?: string;
  defaultImage?: string;
}

export const BannerImage = ({
  ipfsCID,
  url,
  size = 0,
  ipfsBaseURL = "https://ipfs.io/ipfs/",
  defaultImage = DefaultBanner,
}: BannerImageProps) => {
  const imageURL = useMemo(() => {
    return match({ ipfsCID, url })
      .with({ ipfsCID: P.nullish, url: P.nullish }, () => defaultImage)
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

  const sizeStyle = useMemo(() => {
    if (!size || size <= 0) {
      return undefined;
    }
    return { width: `${size}px` };
  }, [size]);

  return <img src={imageURL} alt="banner" className="aspect-3/1 object-cover" style={sizeStyle} />;
};
