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
  Retrofunding = "allov2.RetroFundingStrategy",
}

// Type guard for PoolType
export const isPoolType = (value: string): value is PoolType =>
  Object.values(PoolType).includes(value as PoolType);

export interface PoolData {
  roundName: string;
  roundId: string;
  chainId: number;
  poolType: PoolType;
  applicationStartDate: Date;
  applicationEndDate: Date;
  votingStartDate: Date;
  votingEndDate: Date;
  poolStatus: PoolStatus;
  operatorsCount: number;
  logoImg?: string;
  onClick?: () => void;
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
