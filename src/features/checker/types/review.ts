import { Address } from "viem";

import { ApplicationStatus } from "./application";
import { PoolCategory } from "./pool";

export interface Review {
  reviewer: `0x${string}`;
  approved: boolean;
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
  strategy?: PoolCategory;
}
