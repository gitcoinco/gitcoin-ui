import { ProjectBanner } from "@/components/project/components/ProjectBanner/ProjectBanner";
import { Button } from "@/primitives/Button";

import { EvaluationList } from "../../components/EvaluationList/EvaluationList";
import { useApplicationEvaluations } from "../../hooks/useApplication";

export interface ApplicationEvaluationOverviewProps {
  chainId: number;
  roundId: string;
  applicationId: string;
}

export const ApplicationEvaluationOverview = ({
  chainId,
  roundId,
  applicationId,
}: ApplicationEvaluationOverviewProps) => {
  const { data, isLoading, error } = useApplicationEvaluations(chainId, roundId, applicationId);
  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading evaluations</div>;

  const project = data?.application.metadata.application.project;

  return (
    <div className="flex flex-col gap-6">
      <ProjectBanner
        bannerImg={project.bannerImg ?? ""}
        logoImg={project.logoImg ?? ""}
        avatarPosition="left"
      />
      <h1 className="text-3xl font-medium leading-9">{project.title}</h1>
      <div className="h-0.5 bg-[#EAEAEA]" />
      <p className="leading-9 text-grey-900">
        Evaluate this project and see how others have evaluated this project.
      </p>
      <div className="px-16">
        <EvaluationList evaluations={data.applicationEvaluations} />
      </div>
      <Button variant="primary" value="Perform evaluation" />;
    </div>
  );
};
