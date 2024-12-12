import { Meta, StoryObj } from "@storybook/react";

import { ApplicationSummary } from "./ApplicationSummary";
import { project, application, pastApplications } from "./mocks";

const meta: Meta<typeof ApplicationSummary> = {
  title: "Components/project/ApplicationSummary",
  component: ApplicationSummary,
  argTypes: {
    project: { control: "object", description: "Metadata about the project." },
    application: { control: "object", description: "Current application details." },
    pastApplications: { control: "object", description: "List of past applications." },
  },
};

export default meta;

type Story = StoryObj<typeof ApplicationSummary>;

export const Default: Story = {
  args: {
    project,
    application,
    pastApplications,
  },
};
