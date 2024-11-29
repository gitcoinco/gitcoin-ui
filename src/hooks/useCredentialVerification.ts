import { useState, useEffect } from "react";

import { ProjectApplicationForManager, verifyCredentials } from "@/features/checker";

export function useCredentialVerification(
  applicationMetadata: Partial<ProjectApplicationForManager> | undefined,
) {
  const [isTwitterVerified, setIsTwitterVerified] = useState<boolean>(false);
  const [isGithubVerified, setIsGithubVerified] = useState<boolean>(false);

  useEffect(() => {
    async function checkVerification() {
      if (applicationMetadata) {
        try {
          const { twitter, github } = await verifyCredentials(applicationMetadata);
          setIsTwitterVerified(twitter);
          setIsGithubVerified(github);
        } catch (error) {
          console.error("Failed to verify credentials:", error);
        }
      }
    }

    checkVerification();
  }, [applicationMetadata]);

  return { isTwitterVerified, isGithubVerified };
}
