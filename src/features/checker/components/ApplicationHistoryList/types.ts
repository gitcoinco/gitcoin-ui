import { ApplicationBadgeStatus } from "@/components/Badges";

export interface Application {
  id: number;
  status: ApplicationBadgeStatus;
  name: string;
  date: Date;
  round: string;
}
