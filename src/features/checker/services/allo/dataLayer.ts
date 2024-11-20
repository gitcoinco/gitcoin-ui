import { executeQuery } from "./alloClient";
import { applicationsForManagerQuery } from "./queries";
import { ProjectApplicationForManager } from "./types";

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
