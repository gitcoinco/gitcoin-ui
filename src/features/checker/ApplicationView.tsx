import { CheckerProvider } from "~checker/store";

import {
  ViewApplicationEvaluationsPage,
  type ViewApplicationEvaluationsPageProps,
} from "./pages/ViewApplicationEvaluationsPage/ViewApplicationEvaluationsPage";

export const ApplicationView: React.FC<ViewApplicationEvaluationsPageProps> = (props) => {
  return (
    <CheckerProvider>
      <ViewApplicationEvaluationsPage {...props} />
    </CheckerProvider>
  );
};