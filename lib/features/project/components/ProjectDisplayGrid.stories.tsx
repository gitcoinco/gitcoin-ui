import type { Meta, StoryObj } from "@storybook/react";
import { TaskList } from "../../../examples/task-list/task-list";
import ProjectDisplayGrid from "./ProjectDisplayGrid";
import { activeProjects } from "@/types/QueryFilters/rounds/QueryFilters";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

const meta = {
  title: "Components/ProjectDisplayGrid",
  component: TaskList,
  loaders: [
    async () => {
      try {
        //   const random_projectID = "0x00065ad5b4ac5b42ac82c60ac9e939505f7996e95b6181919a5353fc50e6b664"
        //   const random_chainId = "424"

        //   const query = gql`
        //   query singleProject {
        //     project(chainId: ${random_chainId}, id: "${random_projectID}") {
        //       id
        //       metadata
        //     }
        //   }
        // `;

        //   const project = await GitcoinGraphqlService.getProject(query)

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
} as Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    msw: { handlers: [] },
  },
};
