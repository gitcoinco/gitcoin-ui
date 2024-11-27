import { Address } from "viem";

import { ApplicationStatus } from "@/components/Badges";

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
