import type { Meta, StoryObj } from "@storybook/react";

import { ProjectHeader } from "./ProjectHeader";
import { mockProject } from "./mocks";

const meta = {
  title: "Features/Checker/ProjectHeader",
  component: ProjectHeader,
  args: { project: mockProject },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof ProjectHeader>;

export const Default: Story = { args: { project: mockProject } };
