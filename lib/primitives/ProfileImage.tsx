import React from "react";
import DefaultBannerImage from "@/assets/default_banner.jpg";
import clsx from "clsx";

type ProfileImageProps = {
  ipfsCID?: string | undefined;
  url?: string | undefined;
  size?: number | undefined;
};

export default function ProfileImage({ ipfsCID, url, size }: ProfileImageProps) {
  function prepareURL() {
    if (ipfsCID) {
      // TODO pull this out to an env file or request it from the server to hide our api keys
      return "https://ipfs.io/ipfs/" + ipfsCID;
    }
    if (url) {
      return url;
    }

    // TODO maybe auto-generate a gradient or something nice to looks at
    return DefaultBannerImage;
  }

  return (
    <div className="">
      <img
        src={prepareURL()}
        alt="Profile"
        // className="h-[150px] r"
        className={clsx(
          "rounded-full border-4 border-white",
          size && `size-[${size}]`,
          !size && "size-[60px]",
        )}
      />
    </div>
  );
}
