import type { Meta, StoryObj } from "@storybook/react";

import { ProjectEvaluationAction } from "./ProjectEvaluationAction";
import { EvaluationAction } from "./types";

const meta = {
  title: "Features/Checker/Components/ProjectEvaluationAction",
  component: ProjectEvaluationAction,
  args: {
    status: "pending",
    onEvaluate: (projectId: string, action: EvaluationAction) => {
      console.log(`Evaluating project ${projectId} with action ${action}`);
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof ProjectEvaluationAction>;

export const Default: Story = {
  args: {
    status: "pending",
    onEvaluate: (projectId, action) => {
      console.log(`Evaluating project ${projectId} with action ${action}`);
    },
  },
} satisfies Story;

export const Approved: Story = {
  args: {
    status: "approved",
    onEvaluate: (projectId, action) => {
      console.log(`Evaluating project ${projectId} with action ${action}`);
    },
  },
} satisfies Story;

export const Rejected: Story = {
  args: {
    status: "rejected",
    onEvaluate: (projectId, action) => {
      console.log(`Evaluating project ${projectId} with action ${action}`);
    },
  },
} satisfies Story;
