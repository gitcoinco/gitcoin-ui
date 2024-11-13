import { ApplicationStatus } from "@/components/Badges/ApplicationBadge/ApplicationBadge";

export interface Application {
  id: number;
  status: ApplicationStatus;
  name: string;
  date: Date;
  round: string;
}
