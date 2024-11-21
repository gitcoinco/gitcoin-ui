import { executeQuery } from "./alloClient";
import { applicationsForManagerQuery, getApplicationByIdQuery } from "./queries";
import { ProjectApplication, ProjectApplicationForManager } from "./types";

export async function getApplicationsFromIndexer(
  chainId?: number,
  roundId?: string,
): Promise<ProjectApplicationForManager[]> {
  try {
    const response = await executeQuery(applicationsForManagerQuery, {
      chainId,
      roundId,
    });

    return response.applications as ProjectApplicationForManager[];
  } catch (e) {
    throw new Error(`Failed to fetch applications data. with error: ${e}`);
  }
}

export async function getApplicationByIdFromIndexer(
  chainId: number,
  roundId: string,
  applicationId: string,
): Promise<ProjectApplication> {
  try {
    const response = await executeQuery(getApplicationByIdQuery, {
      chainId,
      roundId,
      applicationId,
    });

    return response.application as ProjectApplication;
  } catch (e) {
    throw new Error(`Failed to fetch application data. with error: ${e}`);
  }
}
