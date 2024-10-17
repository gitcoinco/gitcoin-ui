import type { Meta, StoryObj } from "@storybook/react";
import ProjectDisplayGrid from "./ProjectDisplayGrid";
import { activeProjects } from "@/types/QueryFilters/rounds/QueryFilters";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { undefinedArrayHandler, undefinedHandler } from "@/mocks/handlers";

const meta = {
  title: "Components/ProjectDisplayGrid",
  component: ProjectDisplayGrid,
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
          <ProjectDisplayGrid query={activeProjects()} />
        </QueryClientProvider>
      );
    },
  ],
} as Meta<typeof ProjectDisplayGrid>;

export default meta;
type Story = StoryObj<typeof ProjectDisplayGrid>;

export const Default: Story = {};

// export const Loading: Story = {
//   parameters: {
//     msw: {
//       handlers: [undefinedArrayHandler],
//     },
//   },
// };
