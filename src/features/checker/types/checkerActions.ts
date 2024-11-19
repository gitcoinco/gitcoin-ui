import { ProjectApplicationForManager } from "./projectApplication";

export interface SetApplicationsAction {
  type: "SET_APPLICATIONS";
  payload: ProjectApplicationForManager[];
}

export type CheckerAction = SetApplicationsAction;
