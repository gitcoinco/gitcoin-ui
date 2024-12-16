export enum PoolStatus {
  PreRound = "PreRound",
  RoundInProgress = "RoundInProgress",
  ApplicationsInProgress = "ApplicationsInProgress",
  FundingPending = "FundingPending",
}

// Type guard for PoolStatus
export const isPoolStatus = (value: string): value is PoolStatus =>
  Object.values(PoolStatus).includes(value as PoolStatus);

export enum PoolType {
  QuadraticFunding = "allov2.DonationVotingMerkleDistributionDirectTransferStrategy",
  DirectGrants = "allov2.DirectGrantsSimpleStrategy",
}

// Type guard for PoolType
export const isPoolType = (value: string): value is PoolType =>
  Object.values(PoolType).includes(value as PoolType);

export interface PoolData {
  banner?: string;
  roundName: string;
  roundId: string;
  chainId: number;
  poolType: PoolType;
  startDate: Date;
  endDate: Date;
  poolStatus: PoolStatus;
}

// Type guard for PoolData
export const isPoolData = (value: any): value is PoolData =>
  typeof value === "object" &&
  typeof value.roundName === "string" &&
  typeof value.roundId === "string" &&
  typeof value.chainId === "number" &&
  isPoolType(value.poolType) &&
  isPoolStatus(value.poolStatus) &&
  value.startDate instanceof Date &&
  value.endDate instanceof Date;
