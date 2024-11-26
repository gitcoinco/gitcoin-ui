import { ApplicationStatus } from "@/components/Badges";

export interface Application {
  id: number;
  status: ApplicationStatus;
  name: string;
  date: Date;
  round: string;
}
