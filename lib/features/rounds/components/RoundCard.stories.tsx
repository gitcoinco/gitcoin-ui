import type { Meta, StoryObj } from "@storybook/react";
import { gql } from "graphql-request";
import { GitcoinGraphqlService } from "@/services/GitcoinGraphql";
import RoundCard from "./RoundCard";

const random_roundId = "0x1530877ae5604a398b62a1b06cd88b0f32824596";
const random_chainId = "10";

const meta = {
  title: "Components/RoundCard",
  component: RoundCard,
  loaders: [
    async () => {
      try {
        const query = gql`
        query activeProjects {
          round(chainId: ${random_chainId}, id: "${random_roundId}") {
            id
            roundMetadata
          }
        }
      `;
        const round = await GitcoinGraphqlService.getRound(query);

        return { round };
      } catch (error) {
        console.error(error);
        return { error };
      }
    },
  ],
  decorators: [
    (Story, { loaded }) => {
      return <RoundCard round={loaded.round} />;
    },
  ],
} as Meta<typeof RoundCard>;

export default meta;
type Story = StoryObj<typeof RoundCard>;

export const Default: Story = {};
