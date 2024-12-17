import type { Meta, StoryObj } from "@storybook/react";

import { VerticalTab } from "./VerticalTab";

const tabs = [
  {
    triggerContent: (
      <div className="flex flex-col gap-2 text-left">
        <div className="text-base font-normal leading-7">Applications</div>
        <div className="text-sm font-normal leading-normal">Review and approve applications</div>
      </div>
    ),
    triggerValue: "applications",
    tabContent: (
      <div className="inline-flex h-60 flex-col justify-start gap-6 rounded-3xl bg-[#f7f7f7] p-6">
        <div className="text-2xl font-medium leading-loose text-black">Applications</div>
        <div className="text-base font-normal leading-7 text-grey-900">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    ),
  },
  {
    triggerContent: (
      <div className="flex flex-col gap-2 text-left">
        <div className="text-base font-normal leading-7">Voters</div>
        <div className="text-sm font-normal leading-normal">Configure voter settings</div>
      </div>
    ),
    triggerValue: "signup",
    tabContent: (
      <div className="inline-flex h-60 flex-col justify-start gap-6 rounded-3xl bg-[#f7f7f7] p-6">
        <div className="text-2xl font-medium leading-loose text-black">Voters</div>
        <div className="text-base font-normal leading-7 text-grey-900">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    ),
  },
];

const meta = {
  title: "Primitives/VerticalTab",
  component: VerticalTab,
  args: {
    tabs,
  },
} satisfies Meta<typeof VerticalTab>;

export default meta;

type Story = StoryObj<typeof VerticalTab>;

export const Default: Story = {
  args: {
    tabs,
  },
};
