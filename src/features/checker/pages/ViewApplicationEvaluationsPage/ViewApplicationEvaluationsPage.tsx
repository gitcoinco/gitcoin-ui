import { useApplicationEvaluations } from "../../hooks/useApplication";


export interface ViewApplicationEvaluationsPageProps {
  chainId: number;
  roundId: string;
  applicationId: string;
}

export const ViewApplicationEvaluationsPage: React.FC<ViewApplicationEvaluationsPageProps> = ({
  chainId,
  roundId,
  applicationId,
}) => {
  // const { data } = useApplicationEvaluations(chainId, roundId, applicationId);

  return <div>Wire Page in</div>;
};