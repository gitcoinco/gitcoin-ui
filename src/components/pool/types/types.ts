import { UseQueryResult } from "@tanstack/react-query";

import { PoolStatus, PoolType } from "@/components/Badges";

export interface PoolCardDataProps {
  roundName: string;
  roundId: string;
  chainId: number;
  poolType: PoolType;
  startDate: Date;
  endDate: Date;
  poolStatus: PoolStatus;
}

interface QueryProps {
  queryResult: UseQueryResult<PoolCardDataProps, Error>;
}

export interface onClickProps {
  redirectLink?: string;
  redirect?: boolean;
}

export type PoolCardProps = (PoolCardDataProps | QueryProps) & onClickProps;
