import { Address } from "viem";

export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  APPEAL = "APPEAL",
  IN_REVIEW = "IN_REVIEW",
  CANCELLED = "CANCELLED",
}
export enum RoundCategory {
  QuadraticFunding,
  Direct,
}

export interface ReviewBody {
  roundId: string;
  strategyAddress: Address;
  applicationsToUpdate: {
    index: number;
    status: ApplicationStatus;
  }[];
  currentApplications: {
    index: number;
    status: ApplicationStatus;
  }[];
  strategy?: RoundCategory;
}
