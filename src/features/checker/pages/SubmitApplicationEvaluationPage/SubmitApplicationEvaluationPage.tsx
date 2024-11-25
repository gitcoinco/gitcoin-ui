// src/components/SubmitApplicationEvaluation/SubmitApplicationEvaluationPage.tsx
import { useEffect, useState } from "react";

import { Hex } from "viem";

import { PoolType } from "@/components/Badges";
import EvaluationForm from "@/components/EvaluationForm/EvaluationForm";
import { IconLabel } from "@/components/IconLabel";
import { PoolSummary } from "@/components/pool/components/PoolSummary/PoolSummary";
import { ProjectBanner } from "@/components/project/components/ProjectBanner/ProjectBanner";
import { useToast } from "@/hooks/use-toast";
import { Accordion } from "@/primitives/Accordion";
import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";
import { Markdown } from "@/primitives/Markdown/Markdown";

import { useInitialize } from "~checker/hooks";
import { useApplicationOverviewEvaluations } from "~checker/hooks/useApplicationEvaluations";
import { EVALUATION_STATUS, EvaluationBody } from "~checker/services/checker/api";
import {
  goToApplicationEvaluationOverviewAction,
  goToSubmitFinalEvaluationAction,
  useCheckerDispatchContext,
} from "~checker/store";

import { SubmitApplicationEvaluationModal } from "./SubmitApplicationEvaluationModal";
import { getAnswerEnum } from "./utils";

export interface SubmitApplicationEvaluationPageProps {
  chainId: number;
  poolId: string;
  applicationId: string;
  address?: Hex;
  setEvaluationBody: (data: EvaluationBody) => void;
  isSigning: boolean;
  isErrorSigning: boolean;
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
  isSigning,
  isErrorSigning,
  isSuccess,
  isEvaluating,
  isError,
}: SubmitApplicationEvaluationPageProps) => {
  useInitialize({ address: address ?? "0x", poolId, chainId });

  const [evaluationStatus, setEvaluationStatus] = useState<EVALUATION_STATUS>(
    EVALUATION_STATUS.UNCERTAIN,
  );
  const [evaluationBody, setLocalEvaluationBody] = useState<EvaluationBody | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { application, evaluationQuestions } =
    useApplicationOverviewEvaluations({ applicationId }) || {};
  const [toastShowed, setToastShowed] = useState(false);
  const dispatch = useCheckerDispatchContext();
  const { toast } = useToast();

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

  const goToSubmitFinalEvaluation = () => {
    dispatch(goToSubmitFinalEvaluationAction());
  };

  useEffect(() => {
    if ((isSuccess || isError) && !toastShowed) {
      setToastShowed(true);
      setIsModalOpen(false);
      showToast();
      goToSubmitFinalEvaluation();
    }
  }, [isSuccess, isError, toastShowed]);

  if (!application || !evaluationQuestions) return null;

  const project = application.metadata.application.project;
  const groups = evaluationQuestions.map((q) => ({
    id: q.questionIndex.toString(),
    heading: q.question,
  }));

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
      type === "approve" ? EVALUATION_STATUS.APPROVED : EVALUATION_STATUS.REJECTED;
    setEvaluationStatus(evaluationType);
    setLocalEvaluationBody({
      chainId,
      alloPoolId: poolId,
      alloApplicationId: applicationId,
      cid: application.metadataCid,
      evaluator: address ?? "0xGitcoinShips!!!",
      summaryInput: {
        questions: data,
        summary: feedback,
      },
      evaluationStatus: evaluationType,
      signature: "0x",
    });
    setIsModalOpen(true);
  };

  const onSave = () => {
    if (evaluationBody) {
      setEvaluationBody(evaluationBody);
    }
  };

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-20">
      <SubmitApplicationEvaluationModal
        evaluationStatus={evaluationStatus}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        isSigning={isSigning}
        isErrorSigning={isErrorSigning}
        isSuccess={isSuccess}
        isEvaluating={isEvaluating}
        isError={isError}
        onSave={onSave}
      />
      <PoolSummary
        chainId={chainId}
        poolId={poolId}
        strategy={PoolType.QuadraticFunding}
        name={"Hello World"}
        registerStartDate={new Date()}
        registerEndDate={new Date()}
        allocationStartDate={new Date()}
        allocationEndDate={new Date()}
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
        <div className="flex w-[628px] flex-col gap-4">
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
            content={
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start gap-10">
                  <div className="flex flex-col gap-4">
                    {application.metadata.application.recipient && (
                      <IconLabel
                        type="address"
                        address={application.metadata.application.recipient}
                      />
                    )}
                    {project.website && (
                      <IconLabel type="social" platform="website" link={project.website} />
                    )}
                    {project.projectTwitter && (
                      <IconLabel
                        type="social"
                        platform="twitter"
                        link={
                          project.projectTwitter.includes("https://")
                            ? project.projectTwitter
                            : `https://x.com/${project.projectTwitter}`
                        }
                        isVerified={!!project.credentials["twitter"]}
                      />
                    )}
                    {project.projectGithub && (
                      <IconLabel
                        type="social"
                        platform="github"
                        link={
                          project.projectGithub.includes("https://")
                            ? project.projectGithub
                            : `https://github.com/${project.projectGithub}`
                        }
                        isVerified={!!project.credentials["github"]}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <IconLabel
                      type="dateWithPrefix"
                      prefix="Applied on:"
                      date={new Date(project.createdAt)}
                    />
                    {project.projectGithub && (
                      <IconLabel
                        type="social"
                        platform="github"
                        link={
                          project.projectGithub.includes("https://")
                            ? project.projectGithub
                            : `https://github.com/${project.projectGithub}`
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            }
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
            content={<div>TODO</div>}
            variant="default"
            border="none"
            padding="none"
            isOpen={false}
          />
        </div>

        <div className="w-[628px] rounded-[20px] border border-gray-100 p-5">
          <EvaluationForm groups={groups} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
