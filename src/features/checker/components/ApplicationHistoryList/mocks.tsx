import { ApplicationStatus } from "@/components/Badges/ApplicationBadge/ApplicationBadge";

import { Application } from "./types";

export const mockApplications: Application[] = [
  {
    id: 1,
    name: "my new project",
    date: new Date(2024, 5, 3, 15, 0, 0),
    status: ApplicationStatus.Pending,
    round: "my new round",
  },
  {
    id: 1,
    name: "my great project",
    date: new Date(2024, 5, 3, 15, 0, 0),
    status: ApplicationStatus.Approved,
    round: "my great round",
  },
  {
    id: 1,
    name: "my spam project",
    date: new Date(2024, 5, 3, 15, 0, 0),
    status: ApplicationStatus.Rejected,
    round: "my spam round",
  },
];