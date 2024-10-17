import type { Meta, StoryObj } from "@storybook/react";
import { gql } from "graphql-request";
import { GitcoinGraphqlService } from "@/services/GitcoinGraphql";
import ProjectCard from "./ProjectCard";
import { undefinedHandler } from "@/mocks/handlers";

const random_projectID = "0x00065ad5b4ac5b42ac82c60ac9e939505f7996e95b6181919a5353fc50e6b664";
const random_chainId = "424";

const meta = {
  title: "Components/ProjectCard",
  component: ProjectCard,
  loaders: [
    async () => {
      try {
        const query = gql`
        query singleProject {
          project(chainId: ${random_chainId}, id: "${random_projectID}") {
            id
            metadata
          }
        }
      `;

        const project = await GitcoinGraphqlService.getProject(query);

        return { project };
      } catch (error) {
        console.error(error);
        return { error };
      }
    },
  ],
  decorators: [
    (Story, { loaded }) => {
      return <ProjectCard project={loaded.project} />;
    },
  ],
} as Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [undefinedHandler],
    },
  },
};
