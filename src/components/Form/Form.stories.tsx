import { Meta, StoryObj } from "@storybook/react";

import { Form, FormProps } from "./Form";
import { FormField } from "./types/fieldTypes";

const fields: FormField[] = [
  {
    field: {
      name: "roundName",
      label: "Round name",
      className: "border-grey-300",
      validation: { minLength: 7 },
    },
    component: "Input",
    placeholder: "your cool round name",
  },

  {
    field: {
      name: "roundDescription",
      label: "Round description",
      validation: { required: true },
    },
    component: "MarkdownEditor",
  },
  {
    field: {
      name: "select",
      label: "Select",
      validation: { required: true },
    },
    component: "Select",
    options: [
      {
        items: [
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
        ],
      },
      {
        items: [
          { label: "Carrot", value: "carrot" },
          { label: "Lettuce", value: "lettuce" },
        ],
      },
    ],
    placeholder: "Select",
    variant: "filled",
    size: "md",
  },
  {
    field: {
      name: "fileUpload",
      label: "File upload",
      validation: { required: true },
    },
    component: "FileUpload",
  },
];

export default {
  title: "Components/Form",
  component: Form,
} as Meta;
type Story = StoryObj<FormProps>;

export const Default: Story = {
  args: {
    formTitle: "Round details",
    formDescription:
      "Fill out the details about your round. You can change most of these at any time.",
    fields,
    persistKey: "storybook-form",
    onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
  },
  render: (args) => {
    return (
      <div>
        <Form {...args} />
      </div>
    );
  },
};
