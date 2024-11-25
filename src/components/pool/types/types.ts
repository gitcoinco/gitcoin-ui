import { UseQueryResult } from "@tanstack/react-query";

import { RoundStatus, RoundType } from "@/components/Badges";

export interface PoolCardDataProps {
  roundName: string;
  roundId: string;
  chainId: number;
  roundType: RoundType;
  startDate: Date;
  endDate: Date;
  roundStatus: RoundStatus;
}

interface QueryProps {
  queryResult: UseQueryResult<PoolCardDataProps, Error>;
}

export interface onClickProps {
  redirectLink?: string;
  redirect?: boolean;
}

export type PoolCardProps = (PoolCardDataProps | QueryProps) & onClickProps;
