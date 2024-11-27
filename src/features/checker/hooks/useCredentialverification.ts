import { useState, useEffect } from "react";

import { isVerified } from "@/lib/passport/credentialVerification";

import { ProjectApplicationForManager } from "../services/allo";

export function useCredentialverification(
  applicationMetadata: Partial<ProjectApplicationForManager> | undefined,
) {
  const [isTwitterVerified, setIsTwitterVerified] = useState<boolean>(false);
  const [isGithubVerified, setIsGithubVerified] = useState<boolean>(false);

  useEffect(() => {
    async function checkVerification() {
      if (applicationMetadata) {
        const twitterVerified = await isVerified("twitter", applicationMetadata);
        const githubVerified = await isVerified("github", applicationMetadata);

        setIsTwitterVerified(twitterVerified);
        setIsGithubVerified(githubVerified);
      }
    }

    checkVerification();
  }, [applicationMetadata]);

  return { isTwitterVerified, isGithubVerified };
}
