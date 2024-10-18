import React, { useMemo } from "react";
import DefaultLogo from "@/assets/default_logo.png";
import { match, P } from "ts-pattern";
import { Avatar as ShadCNAvatar, AvatarFallback, AvatarImage } from "@/ui-shadcn/avatar";

interface ProfileImageProps {
  projectName?: string;
  ipfsCID?: string;
  url?: string;
  size?: number;
}

export default function Avatar({ projectName, ipfsCID, url, size = 40 }: ProfileImageProps) {
  const ipfsBaseURL = "https://ipfs.io/ipfs/"; // process.env.NEXT_PUBLIC_IPFS_URL || "https://ipfs.io/ipfs/";

  const imageURL = useMemo(() => {
    return match({ ipfsCID, url, projectName })
      .with({ ipfsCID: P.nullish, url: P.nullish, projectName: P.nullish }, () => DefaultLogo)
      .with({ ipfsCID, url: P.string.length(0) }, ({ ipfsCID }) => `${ipfsBaseURL}${ipfsCID}`)
      .with({ ipfsCID, url: P.nullish }, ({ ipfsCID }) => `${ipfsBaseURL}${ipfsCID}`)
      .with({ ipfsCID: P.string.length(0), url }, ({ url }) => url)
      .with({ ipfsCID: P.nullish, url }, ({ url }) => url)
      .with(
        { ipfsCID: P.string.minLength(1), url: P.string.minLength(1) },
        ({ ipfsCID }) => `${ipfsBaseURL}${ipfsCID}`,
      )

      .otherwise(() => DefaultLogo);
  }, [ipfsCID, url, ipfsBaseURL]);

  const fallback = useMemo(() => {
    return match(projectName)
      .with(undefined, () => "")
      .otherwise((name) => {
        const words = name.trim().split(/\s+/);
        return match(words)
          .with([P.string], ([word]) =>
            word.length === 1 ? word.toUpperCase() : word.slice(0, 2).toUpperCase(),
          )
          .otherwise(([first, second]) => (first[0] + (second?.[0] || "")).toUpperCase());
      });
  }, [projectName]);

  return (
    <ShadCNAvatar
      role="presentation"
      className="ui-h-full ui-w-full ui-shadow-md ui-shadow-slate-600"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <AvatarImage src={imageURL} alt="avatar" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </ShadCNAvatar>
  );
}
