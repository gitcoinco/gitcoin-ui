import { useApplicationEvaluations } from "../../hooks/useApplication";

export const ViewApplicationEvaluationsPage = (
  chainId: number,
  roundId: string,
  applicationId: string,
) => {
  const { data } = useApplicationEvaluations(chainId, roundId, applicationId);

  return <div>Wire Page in</div>;
};
