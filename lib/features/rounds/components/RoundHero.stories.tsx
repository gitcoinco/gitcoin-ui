import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import RoundHero from "./RoundHero";

const random_roundId = "0x1530877ae5604a398b62a1b06cd88b0f32824596";
const random_chainId = "10";

const meta = {
  title: "Components/RoundHero",
  component: RoundHero,
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
          <RoundHero roundId={random_roundId} chainId={random_chainId} />
        </QueryClientProvider>
      );
    },
  ],
} as Meta<typeof RoundHero>;

export default meta;
type Story = StoryObj<typeof RoundHero>;

export const Default: Story = {};
