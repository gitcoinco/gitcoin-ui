import { ApplicationBadgeStatus } from "~application/components";

export interface Application {
  id: number;
  status: ApplicationBadgeStatus;
  name: string;
  date: Date;
  round: string;
}
