export enum ApplicationStatus {
  APPEAL,
  APPROVED,
  CANCELLED,
  FRAUD,
  IN_REVIEW,
  PENDING,
  RECEIVED,
  REJECTED,
}

export type ApplicationStatusType = keyof typeof ApplicationStatus;
