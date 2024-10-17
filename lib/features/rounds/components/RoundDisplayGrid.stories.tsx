import type { Meta, StoryObj } from "@storybook/react";
import { TaskList } from "../../../examples/task-list/task-list";
import RoundDisplayGrid from "./RoundDisplayGrid";
import { activeProjects, activeRounds } from "@/types/QueryFilters/rounds/QueryFilters";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

const meta = {
  title: "Components/RoundDisplayGrid",
  component: RoundDisplayGrid,
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
          <RoundDisplayGrid query={activeRounds()} />
        </QueryClientProvider>
      );
    },
  ],
} as Meta<typeof RoundDisplayGrid>;

export default meta;
type Story = StoryObj<typeof RoundDisplayGrid>;

export const Default: Story = {};
