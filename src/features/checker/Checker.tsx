import { CheckerRouter, CheckerProps } from "./CheckerRouter";
import { CheckerProvider } from "./store";

export const Checker = (props: CheckerProps) => {
  return (
    <CheckerProvider>
      <CheckerRouter {...props} />
    </CheckerProvider>
  );
};
