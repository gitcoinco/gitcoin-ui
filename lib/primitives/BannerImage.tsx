import React from "react";
import DefaultProfileImage from "@/assets/default_logo.png";
import clsx from "clsx";

type BannerImageProps = {
  ipfsCID?: string | undefined;
  url?: string | undefined;
  height?: number | undefined;
};

export default function BannerImage({ ipfsCID, url, height }: BannerImageProps) {
  function prepareURL() {
    if (ipfsCID) {
      // TODO pull this out to an env file or request it from the server to hide our api keys
      return "https://ipfs.io/ipfs/" + ipfsCID;
    }
    if (url) {
      return url;
    }

    // TODO maybe auto-generate an avatar or something nice to looks at
    return DefaultProfileImage;
  }

  return (
    <div className="">
      <img
        src={prepareURL()}
        alt="Banner"
        // className="h-[150px] r"
        className={clsx("w-full object-cover", height && `h-[${height}]`, !height && "h-[150px]")}
      />
    </div>
  );
}
