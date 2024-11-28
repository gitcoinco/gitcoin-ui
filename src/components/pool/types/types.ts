import { PoolStatus, PoolType } from "@/components/Badges";

export interface PoolData {
  roundName: string;
  roundId: string;
  chainId: number;
  poolType: PoolType;
  startDate: Date;
  endDate: Date;
  poolStatus: PoolStatus;
}

export interface onClickProps {
  redirectLink?: string;
  redirect?: boolean;
}
