import { OverviewPageTitle, PendingReviewList, ReadyToSubmitList } from "./components";

export const OverviewPage = () => {
  // we will have some logic to fetch
  return (
    <div className="ui-flex ui-flex-col ui-gap-8">
      <OverviewPageTitle />
      <ReadyToSubmitList />
      <PendingReviewList />
    </div>
  );
};
