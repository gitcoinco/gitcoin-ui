import type { Meta, StoryObj } from "@storybook/react";

import { IconLabel } from "@/components/IconLabel";

import { IconType } from "../Icon";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  argTypes: {
    variant: {
      options: ["default"],
      control: "select",
    },
  },
  args: {
    header: "Simple Header",
    content: "Simple Content",
  },
};

export const coolProject: Story = {
  args: {
    header: (
      <IconLabel
        type="default"
        label="Cool Project"
        iconType={IconType.GLOBE}
        iconVariant="text-lg font-medium"
      />
    ),
    content: (
      <div className="flex flex-col gap-4 ">
        <span className="font-sans text-[16px]/[24px] font-normal  ">
          An onchain project that is very cool. Did I mention that it was cool?
        </span>
        <div className="flex flex-wrap items-start gap-10">
          <div className="flex flex-col  gap-4">
            <IconLabel type="address" ens="coolproject.eth" />
            <IconLabel type="social" platform="website" link={"https://twitter.com/user"} />
            <IconLabel
              type="social"
              platform="twitter"
              link={"https://twitter.com/useruser"}
              isVerified={true}
            />
            <IconLabel
              type="social"
              platform="github"
              link={"https://twitter.com/user"}
              isVerified={true}
            />
          </div>
          <div className="flex flex-col  gap-4">
            <IconLabel type="dateWithPrefix" prefix="Applied on:" date={new Date()} />
            <IconLabel type="social" platform="github" link={"https://twitter.com/user"} />
          </div>
        </div>
      </div>
    ),
    variant: "default",
  },
};
