import { useCheckerContext } from "./useCheckerContext";

export const useApplications = () => {
  const { applications } = useCheckerContext();
  return applications;
};
