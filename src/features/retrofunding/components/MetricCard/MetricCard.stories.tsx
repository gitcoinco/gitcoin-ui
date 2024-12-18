import { StoryObj, Meta } from "@storybook/react";

import { Button, Icon, IconType } from "@/primitives";

import { MetricCard } from "./MetricCard";

export default {
  title: "features/retrofunding/components/MetricCard/MetricCard",
  component: MetricCard,
} as Meta<typeof MetricCard>;

type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  render: () => (
    <MetricCard
      heading="Metric here"
      paragraph="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptat iusto odio estamos, praesentium voluptat iusto odio estamos and this should be cut off"
      button={
        <Button
          icon={<Icon className="size-4" type={IconType.PLUS} />}
          iconPosition="left"
          variant="grey"
          value="Add metric"
        />
      }
      bottomSection={<div>Read more</div>}
    />
  ),
};

export const WithDifferentButton: Story = {
  render: () => (
   <div className="flex flex-col gap-4">
     <MetricCard
      heading="Metric here"
      paragraph="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptat iusto odio estamos, praesentium voluptat iusto odio estamos and this should be cut off"
      button={
        <Button
          icon={<Icon className="size-4" type={IconType.PLUS} />}
          iconPosition="left"
          variant="light-purple"
          value="Add to ballot"
          onClick={() => alert("Button clicked!")}
        />
      }
      bottomSection={<div>Read more</div>}
    />
     <MetricCard
      heading="Metric here"
      paragraph="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptat iusto odio estamos, praesentium voluptat iusto odio estamos and this should be cut off"
      button={
        <Button
          icon={<Icon className="size-4" type={IconType.CHECK} />}
          iconPosition="left"
          variant="light-green"
          value="Added to ballot"
          onClick={() => alert("Button clicked!")}
        />
      }
      bottomSection={<div>Read more</div>}
    />
    </div>
  ),
};
