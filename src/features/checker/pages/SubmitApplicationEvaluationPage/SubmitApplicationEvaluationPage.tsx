// src/components/SubmitApplicationEvaluation/SubmitApplicationEvaluationPage.tsx
import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { Hex } from "viem";

import { ApplicationBadge, ApplicationBadgeStatus } from "@/components/Badges";
import { EvaluationForm } from "@/components/EvaluationForm/EvaluationForm";
import { IconLabel } from "@/components/IconLabel";
import { PoolSummary } from "@/components/pool/components/PoolSummary/PoolSummary";
import { ProjectBanner } from "@/components/project/components/ProjectBanner/ProjectBanner";
import { ProjectSummary } from "@/components/project/components/ProjectSummary/ProjectSummary";
import { useToast } from "@/hooks/use-toast";
import { formatDate, DateFormat } from "@/lib/dates/formatDate";
import { Accordion } from "@/primitives/Accordion";
import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";
import { ListGrid, ListGridColumn } from "@/primitives/ListGrid";
import { Markdown } from "@/primitives/Markdown/Markdown";

import {
  useGetPastApplications,
  useInitialize,
  useApplicationOverviewEvaluations,
} from "~checker/hooks";
import { PastApplication } from "~checker/services/allo";
import { goToApplicationEvaluationOverviewAction, useCheckerDispatchContext } from "~checker/store";
import { EvaluationStatus, EvaluationBody } from "~checker/types";

import { SubmitApplicationEvaluationModal } from "./SubmitApplicationEvaluationModal";
import { getAnswerEnum } from "./utils";

export interface SubmitApplicationEvaluationPageProps {
  chainId: number;
  poolId: string;
  applicationId: string;
  address: Hex;
  setEvaluationBody: (data: EvaluationBody) => void;
  isSuccess: boolean;
  isEvaluating: boolean;
  isError: boolean;
}

export const SubmitApplicationEvaluationPage = ({
  chainId,
  poolId,
  applicationId,
  address,
  setEvaluationBody,
  isSuccess,
  isEvaluating,
  isError,
}: SubmitApplicationEvaluationPageProps) => {
  useInitialize({ address, poolId, chainId });

  const [evaluationStatus, setEvaluationStatus] = useState<EvaluationStatus>(
    EvaluationStatus.UNCERTAIN,
  );
  const [evaluationBody, setLocalEvaluationBody] = useState<EvaluationBody | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { application, evaluationQuestions, poolData } =
    useApplicationOverviewEvaluations({ applicationId }) || {};

  const dispatch = useCheckerDispatchContext();
  const { data: pastApplications } = useGetPastApplications(chainId, poolId, applicationId);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const showToast = () => {
    toast({
      status: isSuccess ? "success" : "error",
      description: isSuccess
        ? "Your evaluation has been saved"
        : "Error: Your evaluation has not been saved. Please try again.",
      timeout: 5000,
    });
  };

  const goToApplicationEvaluationOverview = () => {
    dispatch(goToApplicationEvaluationOverviewAction({ projectId: applicationId }));
  };

  useEffect(() => {
    if ((isSuccess || isError) && isModalOpen) {
      showToast();
      setIsModalOpen(false);
      goToApplicationEvaluationOverview();
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["poolData", chainId, poolId, address] }); // Invalidate the query
      }
    }
  }, [isSuccess, isError]);

  if (!application || !evaluationQuestions) return null;

  const project = application.metadata.application.project;

  const groups = evaluationQuestions.map((q) => ({
    id: q.questionIndex.toString(),
    heading: q.question,
  }));

  const columns: ListGridColumn<PastApplication>[] = pastApplications
    ? [
        {
          header: "Status",
          key: "status",
          width: "0.5fr",
          render: (item) => {
            let status;
            // Determine the badge properties based on the status
            if (item.status === "REJECTED") {
              status = ApplicationBadgeStatus.Rejected;
            } else if (item.status === "APPROVED") {
              status = ApplicationBadgeStatus.Approved;
            } else {
              status = ApplicationBadgeStatus.Pending;
            }

            return <ApplicationBadge status={status} />;
          },
        },
        {
          header: "Date",
          key: "createdAtBlock",
          width: "1.2fr",
          render: (item) => (
            <span className="text-[16px]/[24px]">
              {formatDate(new Date(item.statusSnapshots[0]?.updatedAt), DateFormat.FullDate24Hour)}
            </span>
          ),
        },
        {
          header: "Round",
          key: "name",
          width: "1.8fr",
          render: (item) => <p className="text-[16px]/[24px]">{item.round.roundMetadata.name}</p>,
        },
      ]
    : [];

  const handleSubmit = ({
    type,
    selections,
    feedback,
  }: {
    type: "approve" | "reject";
    selections: Record<string, string>;
    feedback: string;
  }) => {
    const data = evaluationQuestions.map((q) => ({
      questionIndex: q.questionIndex,
      answerEnum: getAnswerEnum(selections[q.questionIndex - 1]),
    }));

    const evaluationType =
      type === "approve" ? EvaluationStatus.APPROVED : EvaluationStatus.REJECTED;
    setEvaluationStatus(evaluationType);
    setLocalEvaluationBody({
      chainId,
      alloPoolId: poolId,
      alloApplicationId: applicationId,
      cid: application.metadataCid,
      evaluator: address,
      summaryInput: {
        questions: data,
        summary: feedback,
      },
      evaluationStatus: evaluationType,
    });
    setIsModalOpen(true);
  };

  const onSave = () => {
    if (evaluationBody) {
      setEvaluationBody(evaluationBody);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PoolSummary
        chainId={chainId}
        poolId={poolId}
        programId={poolData?.project.id as string}
        strategyName={poolData?.strategyName}
        name={poolData?.roundMetadata?.name}
        applicationsStartTime={poolData?.applicationsStartTime}
        applicationsEndTime={poolData?.applicationsEndTime}
        donationsStartTime={poolData?.donationsStartTime}
        donationsEndTime={poolData?.donationsEndTime}
      />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-20">
        <SubmitApplicationEvaluationModal
          evaluationStatus={evaluationStatus}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          isSuccess={isSuccess}
          isEvaluating={isEvaluating}
          isError={isError}
          onSave={onSave}
        />

        <div>
          <Button
            variant="secondry"
            icon={<Icon type={IconType.CHEVRON_LEFT} />}
            onClick={goToApplicationEvaluationOverview}
            value="back to evaluation overview"
          />
        </div>

        <ProjectBanner
          bannerImg={project.bannerImg ?? ""}
          logoImg={project.logoImg ?? ""}
          avatarPosition="left"
        />
        <h1 className="text-3xl font-medium leading-9">Evaluate {project.title}</h1>
        <div className="h-0.5 bg-[#EAEAEA]" />
        <div className="flex gap-2">
          <div className="flex w-full max-w-[600px] flex-col gap-4">
            <Accordion
              header={
                <IconLabel
                  type="default"
                  label={project.title}
                  iconType={IconType.GLOBE}
                  iconVariant="text-lg font-medium"
                />
              }
              isOpen={true}
              content={<ProjectSummary projectMetadata={project} application={application} />}
              variant="default"
              border="none"
              padding="none"
            />
            <Accordion
              header={
                <IconLabel
                  type="default"
                  label="Project details"
                  iconType={IconType.CLIPBOARD_LIST}
                  iconVariant="text-lg font-medium"
                />
              }
              content={<Markdown>{project.description}</Markdown>}
              variant="default"
              border="none"
              padding="none"
              isOpen={false}
            />
            <Accordion
              header={
                <IconLabel
                  type="default"
                  label="Application answers"
                  iconType={IconType.STAR}
                  iconVariant="text-lg font-medium"
                />
              }
              content={
                <div className="flex flex-col gap-4">
                  {application.metadata.application.answers.map((answer, index) => {
                    if (answer.encryptedAnswer || !answer.answer) {
                      return null;
                    }
                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <span className="font-sans text-[16px]/[24px] font-bold">
                          {answer.question}
                        </span>
                        <span className="font-sans text-[16px]/[24px] font-normal">
                          <Markdown>{answer.answer}</Markdown>
                        </span>
                      </div>
                    );
                  })}
                </div>
              }
              variant="default"
              border="none"
              padding="none"
              isOpen={false}
            />
            <Accordion
              header={
                <IconLabel
                  type="default"
                  label="Past applications"
                  iconType={IconType.INFORMATION_CIRCLE}
                  iconVariant="text-lg font-medium"
                />
              }
              content={
                pastApplications ? (
                  <div>
                    <ListGrid
                      data={pastApplications}
                      columns={columns}
                      rowClassName="h-[72px]"
                      getRowKey={(item: PastApplication) => `${item.id}-${item.roundId}`}
                    />
                  </div>
                ) : (
                  <div>No past applications</div>
                )
              }
              variant="default"
              border="none"
              padding="none"
              isOpen={false}
            />
          </div>

          <div className="border-gray-100 rounded-[20px] border p-5">
            <EvaluationForm groups={groups} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
