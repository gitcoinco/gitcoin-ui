## useApplicationEvaluations.ts

```typescript
type UseApplicationEvaluations = (
  chainId: number,
  roundId: string,
  applicationId: string,
) => {
  data: {
    application: ProjectApplication;
    applicationEvaluations: Evaluation[];
  };
  isLoading: boolean;
  isError: boolean;
  error: Error;
};
```

- useQuery -> ["viewApplicationEvaluationsPage", chainId, roundId, applicationId]
- getApplicationByIdFromIndexer -> services/allo
- getCheckerApplicationEvaluations -> services/checker

---

## useApplicationOverviewEvaluations.ts

```typescript
type UseApplicationOverviewEvaluations = ({ applicationId }: { applicationId: string }) => {
  application: CheckerApplication;
  applicationEvaluations: Evaluation[];
  evaluationQuestions: CheckerApiEvaluationQuestion[];
  poolData: CheckerPoolData;
};
```

- gets poolId, chainId, poolsData from useCheckerContext
- generates poolUUID
- gets poolData from poolsData
- gets application from poolData
- gets applicationEvaluations from application
- gets evaluationQuestions from poolData

---

## useGetApplicationsFinalEvaluationPage.ts

```typescript
type UseGetApplicationsFinalEvaluationPage = () => {
  categorizedReviews: Record<
    "INREVIEW" | "READY_TO_REVIEW" | "APPROVED" | "REJECTED",
    ProjectReview[]
  >;
  statCardsProps: StatCardProps[];
  reviewBody: ReviewBody;
  poolData: CheckerPoolData;
};
```

- gets poolId, chainId, poolsData from useCheckerContext
- generates poolUUID
- gets poolData from poolsData
- gets categorizedReviews and statCardsProps from poolData.applications -> categorizeProjectReviews()
- generates reviewBody with poolData

## useGetApplicationsReviewPage.ts

```typescript
type UseGetApplicationsReviewPage = () => {
  categorizedReviews: Record<
    "INREVIEW" | "READY_TO_REVIEW" | "APPROVED" | "REJECTED",
    ProjectReview[]
  >;
  statCardsProps: StatCardProps[];
  poolData: CheckerPoolData;
};
```

- gets poolId, chainId, poolsData from useCheckerContext
- generates poolUUID
- gets poolData from poolsData
- gets categorizedReviews and statCardsProps from poolData.applications -> categorizeProjectReviews()

---

## useGetPastApplications.ts

```typescript
type UseGetPastApplications = (
  chainId: number,
  roundId: string,
  applicationId: string,
) => {
  data: PastApplication[];
  isLoading: boolean;
  isError: boolean;
  error: Error;
};
```

- useQuery -> ["getPastApplications", chainId, roundId, applicationId]
- getPastApplicationsByApplicationIdFromIndexer -> services/allo

---

## useInitialize.ts

```typescript
type UseInitialize = ({ address, poolId, chainId }: InitData) => void;
```

- sets initialState with setInitialStateAction
- usePoolData -> fetchPoolData and stores it in the context

---

## usePoolData.ts

```typescript
type UsePoolData = () => {
  poolData: CheckerPoolData;
  refetch: () => void;
};
```

- useQuery -> ["poolData", chainId, poolId, address]
- syncPool -> services/checker
- getApplicationsFromIndexer -> services/allo
- getCheckerPoolData -> services/checker
- generates poolUUID
- parses applications from indexer and checker api to applications object and stores it in the context

---

## usePerformEvaluation.ts

```typescript
type UsePerformEvaluation = () => {
  setEvaluationBody: (evaluationBody: EvaluationBody) => void;
  isEvaluating: boolean;
  isError: boolean;
  isSuccess: boolean;
};
```

- has a state to store the evaluationBody
- has a mutation to sign the evaluation
- has a mutation to submit the evaluation
- triggers the signing mutation when evaluationBody is set and submits the evaluation, resetting the evaluationBody.
  NOTE: wouldn't it be better to have a single mutation that handles both signing and submitting?
  Do we need to have a state to store the evaluationBody?

---

## usePerformOnChainReview.ts

```typescript
type UsePerformOnChainReview = () => {
  setReviewBody: (reviewBody: ReviewBody) => void;
  steps: Step[];
  isReviewing: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error;
};
```

- has a state to store the reviewBody
- has states to store the progress of the review steps, contractUpdatingStatus, indexingStatus, finishingStatus
- has a mutation to submit the review
- triggers the mutation when reviewBody is set
- resets the review steps when the mutation is successful
- resets the reviewBody when the mutation is successful

NOTE: do we need to have a state to store the reviewBody?, do we need to have a state to store the review steps independently instead of combining them?
