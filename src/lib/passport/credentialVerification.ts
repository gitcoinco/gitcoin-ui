import {
  ProjectApplicationMetadata,
  type ProjectApplicationForManager,
  type VerifiableCredential,
} from "@/features/checker/services/allo";

import { PassportVerifier } from "./PassportVerifier";

export const IAM_SERVER = "did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC";

const verifier = new PassportVerifier();

export async function isVerified(
  provider: "twitter" | "github",
  application: ProjectApplicationForManager | undefined,
): Promise<boolean> {
  console.log(" ===> provider", provider);
  const applicationMetadata = application?.metadata;
  console.log(" ===> applicationMetadata", applicationMetadata);
  const verifiableCredential = applicationMetadata?.application.project.credentials[provider];
  console.log(" ===> verifiableCredential", verifiableCredential);
  if (verifiableCredential === undefined) {
    console.log(" ===> verifiableCredential is undefined");
    return false;
  }

  const vcHasValidProof = await verifier.verifyCredential(verifiableCredential);
  console.log(" ===> vcHasValidProof", vcHasValidProof);
  const vcIssuedByValidIAMServer = verifiableCredential.issuer === IAM_SERVER;
  console.log(" ===> vcIssuedByValidIAMServer", vcIssuedByValidIAMServer);
  const providerMatchesProject = vcProviderMatchesProject(
    provider,
    verifiableCredential,
    applicationMetadata,
  );
  console.log(" ===> providerMatchesProject", providerMatchesProject);
  const roleAddresses = application?.canonicalProject?.roles.map((role) => role.address);
  const vcIssuedToAtLeastOneProjectOwner = (roleAddresses ?? []).some((role) =>
    vcIssuedToAddress(verifiableCredential, role.toLowerCase()),
  );
  console.log(" ===> vcIssuedToAtLeastOneProjectOwner", vcIssuedToAtLeastOneProjectOwner);
  return (
    vcHasValidProof &&
    vcIssuedByValidIAMServer &&
    providerMatchesProject &&
    vcIssuedToAtLeastOneProjectOwner
  );
}

function vcIssuedToAddress(vc: VerifiableCredential, address: string) {
  const vcIdSplit = vc.credentialSubject.id.split(":");
  const addressFromId = vcIdSplit[vcIdSplit.length - 1];
  return addressFromId.toLowerCase() === address.toLowerCase();
}

function vcProviderMatchesProject(
  provider: string,
  verifiableCredential: VerifiableCredential,
  applicationMetadata: ProjectApplicationMetadata | undefined,
) {
  let vcProviderMatchesProject = false;
  if (provider === "twitter") {
    vcProviderMatchesProject =
      verifiableCredential.credentialSubject.provider?.split("#")[1].toLowerCase() ===
      applicationMetadata?.application.project?.projectTwitter?.toLowerCase();
  } else if (provider === "github") {
    vcProviderMatchesProject =
      verifiableCredential.credentialSubject.provider?.split("#")[1].toLowerCase() ===
      applicationMetadata?.application.project?.projectGithub?.toLowerCase();
  }
  return vcProviderMatchesProject;
}