import { executeQuery } from "./checkerClient";
import { checkerPoolDataQuery } from "./queries";
import { PoolData } from "./types";

export async function getCheckerPoolData(chainId?: number, alloPoolId?: string): Promise<PoolData> {
  try {
    const response = (await executeQuery(checkerPoolDataQuery, {
      chainId,
      alloPoolId,
    })) as unknown as {
      pools: PoolData[];
    };
    return response.pools[0];
  } catch (e) {
    throw new Error(`Failed to fetch pools data from checker api with error: ${e}.`);
  }
}
