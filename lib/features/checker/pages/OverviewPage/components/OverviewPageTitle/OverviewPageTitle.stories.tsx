import type { Meta, StoryObj } from "@storybook/react";
import { OverviewPageTitle } from "@/features/checker/pages/OverviewPage/components";

const meta = {
  title: "Features/Checker/Components",
  component: OverviewPageTitle,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof OverviewPageTitle>;

export const Default: Story = {};
