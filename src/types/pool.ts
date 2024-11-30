export enum PoolStatus {
  PreRound = "PreRound",
  RoundInProgress = "RoundInProgress",
  ApplicationsInProgress = "ApplicationsInProgress",
  FundingPending = "FundingPending",
}

export enum PoolType {
  QuadraticFunding = "allov2.DonationVotingMerkleDistributionDirectTransferStrategy",
  DirectGrants = "allov2.DirectGrantsSimpleStrategy",
}

export interface PoolData {
  roundName: string;
  roundId: string;
  chainId: number;
  poolType: PoolType;
  startDate: Date;
  endDate: Date;
  poolStatus: PoolStatus;
}
