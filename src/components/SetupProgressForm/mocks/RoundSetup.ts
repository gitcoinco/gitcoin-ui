import { FormField } from "@/components/Form";

const fields: FormField[] = [
  {
    field: {
      name: "name",
      label: "Round name",
      className: "border-grey-300",
      validation: { minLength: 5 },
    },
    component: "Input",
    placeholder: "My Round Name",
  },

  {
    field: {
      name: "description",
      label: "Round description",
      validation: { required: true },
      className: "border-grey-300",
    },
    component: "MarkdownEditor",
  },
  {
    field: {
      name: "payoutToken",
      label: "Select payout token",
      validation: { required: true },
    },
    component: "Select",
    options: [
      {
        items: [
          { label: "ETH", value: "ETH" },
          { label: "USDC", value: "USDC" },
        ],
      },
    ],
    placeholder: "Select",
    className: "bg-white border-grey-300",
    size: "md",
  },
  {
    field: {
      name: "banner",
      label: "Cover image",
      validation: { required: true, isFile: true },
    },
    component: "FileUpload",
  },
];

const roundDetailsFields2: FormField[] = [
  {
    field: {
      name: "description",
      label: "Round description",
      validation: { required: true },
      className: "border-grey-300",
    },
    component: "MarkdownEditor",
  },
  {
    field: {
      name: "requirements",
      label: "What requirements do you have from applicants?",
      className: "border-grey-300",
      validation: { minLength: 5 },
    },
    component: "Input",
    placeholder: "Enter requirements",
  },
];

const args = {
  formTitle: "Round details",
  formDescription:
    "Fill out the details about your round. You can change most of these at any time.",
  fields,
  persistKey: "storybook-round-form-1",
  onSubmit: (values: any) => void 0,
  nextButtonText: "Next",
  backButtonText: "Back",
};

const args2 = {
  formTitle: "Round description and requirements",
  formDescription: "Provide details about your round and specify the requirements for applicants.",
  fields: roundDetailsFields2,
  persistKey: "storybook-round-form-2",
  onSubmit: (values: any) => void 0,
  nextButtonText: "Next",
  backButtonText: "Back",
};

const deployRoundFields: FormField[] = [];

const args3 = {
  formTitle: "Review your round and deploy onchain",
  formDescription: "You can edit your round after it’s been deployed. ",
  fields: deployRoundFields,
  persistKey: "storybook-round-form-3",
  onSubmit: (values: any) => void 0,
  finalButtonText: "Publish",
  backButtonText: "Back",
};

export const roundSetupSteps = [
  { name: "Round description and requirements", props: args2 },
  { name: "Round details", props: args },
  { name: "Deploy round", props: args3 },
];
