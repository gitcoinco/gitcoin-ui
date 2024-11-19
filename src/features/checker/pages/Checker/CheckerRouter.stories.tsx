import { useEffect, useRef, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { CheckerProvider } from "~checker/store/CheckerProvider";

import { useCheckerDispatchContext } from "../../hooks/useCheckerDispatchContext";
import {
  goToApplicationEvaluationAction,
  goToReviewApplicationsAction,
} from "../../store/checkerActions";
import { goToApplicationEvaluationOverviewAction } from "../../store/checkerActions";
import { CheckerRouter } from "./CheckerRouter";

const RouteSwitch = () => {
  const dispatch = useCheckerDispatchContext();
  const [countdown, setCountdown] = useState(5);
  const [currentRouteIndex, setCurrentRouteIndex] = useState(1);
  const countdownRef = useRef(countdown);

  const goToRoutes: Record<number, () => void> = {
    1: () => dispatch(goToApplicationEvaluationOverviewAction({ projectId: "1" })),
    2: () => dispatch(goToApplicationEvaluationAction({ projectId: "2" })),
    3: () => dispatch(goToReviewApplicationsAction()),
  };

  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          goToRoutes[currentRouteIndex]();
          setCurrentRouteIndex((prevIndex) => (prevIndex % 3) + 1); // Cycle through 1, 2, 3
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRouteIndex]);

  return <div>Next route change in: {countdown} seconds</div>;
};

const meta = {
  title: "Features/Checker/Router",
  component: CheckerRouter,
  args: {
    address: "0x1234567890123456789012345678901234567890",
    roundId: "609",
    chainId: 42161,
  },
  decorators: [
    (Story) => (
      <CheckerProvider>
        <Story />
        <RouteSwitch />
      </CheckerProvider>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof CheckerRouter>;

export const Default: Story = {};
