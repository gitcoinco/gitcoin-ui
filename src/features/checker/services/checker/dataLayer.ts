import { syncPool } from "./api";
import { executeQuery } from "./checkerClient";
import { checkerApplicationEvaluationsQuery, checkerPoolDataQuery } from "./queries";
import { CheckerApiApplication, CheckerApiPoolData } from "./types";

export async function getCheckerPoolData(
  chainId?: number,
  alloPoolId?: string,
): Promise<CheckerApiPoolData> {
  try {
    const sync = await syncPool({ chainId: chainId as number, alloPoolId: alloPoolId as string });
    const response = (await executeQuery(checkerPoolDataQuery, {
      chainId,
      alloPoolId,
    })) as unknown as {
      pools: CheckerApiPoolData[];
    };

    console.log("DEBUG: ", response);

    return response.pools[0];
  } catch (e) {
    throw new Error(`Failed to fetch pools data from checker api with error: ${e}.`);
  }
}

export async function getCheckerApplicationEvaluations(
  chainId: number,
  alloPoolId: string,
  alloApplicationId: string,
) {
  try {
    const response = (await executeQuery(checkerApplicationEvaluationsQuery, {
      chainId,
      alloPoolId,
      alloApplicationId,
    })) as unknown as {
      applications: CheckerApiApplication[];
    };
    return response.applications[0]?.evaluations ?? [];
  } catch (e) {
    throw new Error(
      `Failed to fetch application evaluations data from checker api with error: ${e}.`,
    );
  }
}
