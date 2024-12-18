import { Meta, StoryObj } from "@storybook/react";

import { FileUpload } from "./FileUpload";

export default {
  title: "Primitives/FileUpload",
  component: FileUpload,
} as Meta<typeof FileUpload>;

export const Default: StoryObj<any> = {
  decorators: [(Story) => <Story />],
  render: (args) => {
    return (
      <div>
        <FileUpload {...args} />
      </div>
    );
  },
};
