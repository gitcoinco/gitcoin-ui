import type { Meta, StoryObj } from "@storybook/react";
import { CheckerReviewsLabel } from "./CheckerReviewsLabel";

const meta = {
  title: "Features/Checker/components/CheckerReviewsLabel",
  component: CheckerReviewsLabel,
  args: {
    posReviews: 2,
    negReviews: 2,
  },
  argTypes: {
    posReviews: {
      control: "number",
    },
    negReviews: {
      control: "number",
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof CheckerReviewsLabel>;

export const Default: Story = {};
