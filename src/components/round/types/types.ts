import { UseQueryResult } from "@tanstack/react-query";

import { RoundStatus, RoundType } from "@/components/Badges";

export type RoundCardDataProps = {
  roundName: string;
  roundId: string;
  chainId: number;
  roundType: RoundType;
  startDate: Date;
  endDate: Date;
  roundStatus: RoundStatus;
};

type QueryProps = {
  queryResult: UseQueryResult<RoundCardDataProps, Error>;
};

export type onClickProps = {
  redirectLink?: string;
  redirect?: boolean;
};

export type RoundCardProps = (RoundCardDataProps | QueryProps) & onClickProps;
