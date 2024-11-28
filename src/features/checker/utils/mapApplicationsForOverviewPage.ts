import { StatCardProps } from "@/primitives/StatCard";

import { CheckerApplication } from "~checker/store";

import { ProjectReview, Review } from "../components/ProjectReviewList/types";

// Define the structure of the function's return type
interface ProjectReviewsResultByCategory {
  categorizedReviews: Record<"INREVIEW" | "READY_TO_REVIEW", ProjectReview[]>;
  statCardsProps: StatCardProps[];
  application: CheckerApplication;
}

// Define the AI evaluator address
const AI_EVALUATOR_ADDRESS = "0x0000000000000000000000000000000000000001" as const;

// Utility function to categorize project reviews and calculate application counts
export function categorizeProjectReviews(
  applications: Record<string, CheckerApplication>,
): ProjectReviewsResultByCategory {
  const applicationsArray = Object.values(applications);

  // Initialize the categorized reviews record
  const categorizedReviews: Record<"INREVIEW" | "READY_TO_REVIEW", ProjectReview[]> = {
    INREVIEW: [],
    READY_TO_REVIEW: [],
  };

  // Initialize application counts
  const applicationCounts = {
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  };

  for (const application of applicationsArray) {
    // Only consider applications that are PENDING
    if (application.status !== "PENDING") {
      // Update application counts based on status
      switch (application.status) {
        case "APPROVED":
          applicationCounts.approved += 1;
          break;
        case "REJECTED":
          applicationCounts.rejected += 1;
          break;
        default:
          break;
      }
      applicationCounts.total += 1;
      continue; // Skip non-PENDING applications
    }

    // Update application counts for PENDING
    applicationCounts.pending += 1;
    applicationCounts.total += 1;

    if (!application.evaluations) {
      application.evaluations = [];
    }

    // Separate evaluations into AI and non-AI
    const aiEvaluations =
      application.evaluations?.filter(
        (evaluation) => evaluation.evaluator.toLowerCase() === AI_EVALUATOR_ADDRESS.toLowerCase(),
      ) ?? [];

    const humanEvaluations =
      application.evaluations?.filter(
        (evaluation) => evaluation.evaluator.toLowerCase() !== AI_EVALUATOR_ADDRESS.toLowerCase(),
      ) ?? [];

    // Determine the category based on the number of human evaluations
    const isReadyForReview = humanEvaluations.length >= 2;
    const category: "INREVIEW" | "READY_TO_REVIEW" = isReadyForReview
      ? "READY_TO_REVIEW"
      : "INREVIEW";

    // Map human evaluations to reviews
    const reviews: Review[] = humanEvaluations?.map((evaluation) => {
      const isApproved = evaluation.evaluatorScore >= 50; // Assuming 50 as the approval threshold
      const reviewerAddress: `0x${string}` = evaluation.evaluator.startsWith("0x")
        ? (evaluation.evaluator as `0x${string}`)
        : (`0x${evaluation.evaluator}` as `0x${string}`);
      return {
        reviewer: reviewerAddress,
        approved: isApproved,
      };
    });

    // Calculate the average score including both AI and human evaluations
    const totalScore =
      application.evaluations?.reduce((sum, evaluation) => sum + evaluation.evaluatorScore, 0) ?? 0;
    const totalEvaluations = application.evaluations?.length ?? 0;
    const scoreAverage = totalEvaluations > 0 ? totalScore / totalEvaluations : 0;

    // Calculate AI suggestion score (average AI evaluator scores)
    const aiTotalScore =
      aiEvaluations?.reduce((sum, evaluation) => sum + evaluation.evaluatorScore, 0) ?? 0;
    const aiSuggestion = aiEvaluations.length > 0 ? aiTotalScore / aiEvaluations.length : 0;

    const projectData = application.metadata.application.project;

    // Create the ProjectReview object
    const projectReview: ProjectReview = {
      id: application.id,
      name: projectData.title,
      date: new Date(projectData.createdAt),
      avatarUrl: `https://d16c97c2np8a2o.cloudfront.net/ipfs/${
        projectData.logoImg ?? projectData.bannerImg ?? ""
      }`,
      reviews, // Only human reviews
      aiSuggestion, // AI suggestion based on AI evaluations
      scoreAverage, // Average score from all evaluations
    };

    // Add the ProjectReview to the appropriate category
    categorizedReviews[category].push(projectReview);
  }

  const statCardsProps: StatCardProps[] = [
    {
      label: "Applications pending",
      value: applicationCounts.pending.toString(),
    },
    {
      label: "Applications approved",
      value: applicationCounts.approved.toString(),
    },
    {
      label: "Applications rejected",
      value: applicationCounts.rejected.toString(),
    },
    {
      label: "Total applications",
      value: applicationCounts.total.toString(),
    },
  ];

  const application = applicationsArray[0];

  return {
    categorizedReviews,
    statCardsProps,
    application,
  };
}
