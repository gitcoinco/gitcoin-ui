import { StoryObj, Meta } from "@storybook/react";

import { Button } from "@/primitives";

import { MetricCard } from "./MetricCard";

export default {
  title: "Features/Retrofunding/Components/MetricCard/MetricCard",
  component: MetricCard,
} as Meta<typeof MetricCard>;

type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  render: () => (
    <MetricCard
      title="Metric here"
      description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptat iusto odio estamos, praesentium voluptat iusto odio estamos and this should be cut off"
      variant="addMetric"
      onClick={() => alert("Button clicked!")}
      onReadMore={() => alert("Read more clicked!")}
    />
  ),
};

export const AddToBallot: Story = {
  render: () => (
    <MetricCard
      title="Metric here"
      description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptat iusto odio estamos, praesentium voluptat iusto odio estamos and this should be cut off"
      variant="addToBallot"
      onClick={() => alert("Button clicked!")}
      onReadMore={() => alert("Read more clicked!")}
    />
  ),
};

export const AddedToBallot: Story = {
  render: () => (
    <MetricCard
      title="Metric here"
      description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptat iusto odio estamos, praesentium voluptat iusto odio estamos and this should be cut off"
      variant="addedToBallot"
      onClick={() => alert("Button clicked!")}
      onReadMore={() => alert("Read more clicked!")}
    />
  ),
};

export const WithCustomButton: Story = {
  render: () => (
    <MetricCard
      title="Metric here"
      description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptat iusto odio estamos, praesentium voluptat iusto odio estamos and this should be cut off"
      variant="addMetric"
      onClick={() => alert("Custom button clicked!")}
      onReadMore={() => alert("Read more clicked!")}
      customButton={
        <Button
          variant="error"
          value="Custom Button"
          onClick={() => alert("Custom button variant")}
        />
      }
    />
  ),
};
