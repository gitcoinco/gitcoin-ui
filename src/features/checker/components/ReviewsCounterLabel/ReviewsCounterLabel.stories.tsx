import type { Meta, StoryObj } from "@storybook/react";

import { ReviewsCounterLabel } from "./ReviewsCounterLabel";

const meta: Meta<typeof ReviewsCounterLabel> = {
  title: "features/Checker/Components/ReviewsCounterLabel",
  component: ReviewsCounterLabel,
  argTypes: {
    posReviews: {
      control: {
        type: "number",
        min: 0,
      },
    },
    negReviews: {
      control: {
        type: "number",
        min: 0,
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the component.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewsCounterLabel>;

export const Default: Story = {
  args: {
    posReviews: 0,
    negReviews: 0,
  },
};

export const Pending: Story = {
  args: {
    posReviews: 0,
    negReviews: 0,
  },
};

export const WithoutMaxReviews: Story = {
  args: {
    posReviews: 1,
    negReviews: 2,
  },
};

export const WithMaxReviews: Story = {
  args: {
    posReviews: 3,
    negReviews: 2,
  },
};

export const TooManyReviews: Story = {
  args: {
    posReviews: 300,
    negReviews: 200,
  },
};
