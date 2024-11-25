import { Hex } from "viem";

import EvaluationForm from "@/components/EvaluationForm/EvaluationForm";
import { IconLabel } from "@/components/IconLabel";
import { ProjectBanner } from "@/components/project/components/ProjectBanner/ProjectBanner";
import { Accordion } from "@/primitives/Accordion";
import { IconType } from "@/primitives/Icon";
import { Markdown } from "@/primitives/Markdown/Markdown";

import { useInitialize } from "~checker/hooks";
import { useApplicationOverviewEvaluations } from "~checker/hooks/useApplicationEvaluations";

export interface SubmitApplicationEvaluationPageProps {
  chainId: number;
  poolId: string;
  applicationId: string;
  address?: Hex;
}

export const SubmitApplicationEvaluationPage = ({
  chainId,
  poolId,
  applicationId,
  address,
}: SubmitApplicationEvaluationPageProps) => {
  useInitialize({ address: address ?? "0x", poolId, chainId });

  const { application, evaluationQuestions } =
    useApplicationOverviewEvaluations({ applicationId }) || {};

  if (!application || !evaluationQuestions) return null;

  const project = application.metadata.application.project;
  const groups = evaluationQuestions.map((q) => ({
    id: q.questionIndex.toString(),
    heading: q.question,
  }));

  const handleSubmit = (data: any) => {
    // TODO
    console.log("Submitting evaluation for applications : ", project);
  };

  return (
    <div className="mx-auto flex flex-col gap-4 px-20">
      <ProjectBanner
        bannerImg={project.bannerImg ?? ""}
        logoImg={project.logoImg ?? ""}
        avatarPosition="left"
      />
      <h1 className="text-3xl font-medium leading-9">Evaluate {project.title}</h1>
      <div className="h-0.5 bg-[#EAEAEA]" />

      <div className="flex gap-2">
        <div className="flex w-1/2 flex-col gap-4">
          <Accordion
            header={
              <IconLabel
                type="default"
                label={project.title}
                iconType={IconType.GLOBE}
                iconVariant="text-lg font-medium"
              />
            }
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
                        isVerified={project.credentials["twitter"] ? true : false}
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
                        isVerified={project.credentials["github"] ? true : false}
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
            isOpen={false}
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
            content={<Markdown children={project.description}></Markdown>}
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
                  } else {
                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <span className="font-sans text-[16px]/[24px] font-bold">
                          {answer.question}
                        </span>
                        <span className="font-sans text-[16px]/[24px] font-normal">
                          <Markdown children={answer.answer} />
                        </span>
                      </div>
                    );
                  }
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

        <div className="w-1/2 rounded-[20px] border border-gray-100 p-5">
          <EvaluationForm groups={groups} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
