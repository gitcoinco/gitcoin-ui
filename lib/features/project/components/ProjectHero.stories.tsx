import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import ProjectHero from "./ProjectHero";

const random_projectID = "0x00065ad5b4ac5b42ac82c60ac9e939505f7996e95b6181919a5353fc50e6b664";
const random_chainId = "424";

const meta = {
  title: "Components/ProjectHero",
  component: ProjectHero,
  loaders: [
    async () => {
      try {
        return {};
      } catch (error) {
        console.error(error);
        return { error };
      }
    },
  ],
  decorators: [
    (Story, { loaded }) => {
      const queryClient = new QueryClient();

      return (
        <QueryClientProvider client={queryClient}>
          <ProjectHero projectId={random_projectID} chainId={random_chainId} />
        </QueryClientProvider>
      );
    },
  ],
} as Meta<typeof ProjectHero>;

export default meta;
type Story = StoryObj<typeof ProjectHero>;

export const Default: Story = {};
