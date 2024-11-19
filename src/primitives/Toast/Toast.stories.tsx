import { Meta, StoryObj } from "@storybook/react";

import Toast from "./Toast";

export default {
  title: "Primitives/Toast",
  component: Toast,
} as Meta;

export const success: StoryObj = {
  args: {
    props: {
      status: "success",
      description: "Your evaluation has been saved",
      timeout: 10000,
    },
  },
};

export const error: StoryObj = {
  args: {
    props: {
      status: "error",
      description: "Error: Your evaluation has not been saved. Please try again.",
      timeout: 10000,
    },
  },
};

export const successTopCenter: StoryObj = {
  args: {
    props: {
      status: "success",
      description: "Your evaluation has been saved",
      timeout: 10000,
      toastPosition: "top-center",
    },
  },
};

export const errorCenter: StoryObj = {
  args: {
    props: {
      status: "error",
      description: "Error: Your evaluation has not been saved. Please try again.",
      timeout: 10000,
      toastPosition: "top-center",
    },
  },
};

export const successTopRight: StoryObj = {
  args: {
    props: {
      status: "success",
      description: "Your evaluation has been saved",
      timeout: 10000,
      toastPosition: "top-right",
    },
  },
};

export const errorTopRight: StoryObj = {
  args: {
    props: {
      status: "error",
      description: "Error: Your evaluation has not been saved. Please try again.",
      timeout: 10000,
      toastPosition: "top-right",
    },
  },
};

export const successTopLeft: StoryObj = {
  args: {
    props: {
      status: "success",
      description: "Your evaluation has been saved",
      timeout: 10000,
      toastPosition: "top-left",
    },
  },
};

export const errorTopLeft: StoryObj = {
  args: {
    props: {
      status: "error",
      description: "Error: Your evaluation has not been saved. Please try again.",
      timeout: 10000,
      toastPosition: "top-left",
    },
  },
};

export const successBottomLeft: StoryObj = {
  args: {
    props: {
      status: "success",
      description: "Your evaluation has been saved",
      timeout: 10000,
      toastPosition: "bottom-left",
    },
  },
};

export const errorBottomLeft: StoryObj = {
  args: {
    props: {
      status: "error",
      description: "Error: Your evaluation has not been saved. Please try again.",
      timeout: 10000,
      toastPosition: "bottom-left",
    },
  },
};

export const successBottomCenter: StoryObj = {
  args: {
    props: {
      status: "success",
      description: "Your evaluation has been saved",
      timeout: 10000,
      toastPosition: "bottom-center",
    },
  },
};

export const errorBottomCenter: StoryObj = {
  args: {
    props: {
      status: "error",
      description: "Error: Your evaluation has not been saved. Please try again.",
      timeout: 10000,
      toastPosition: "bottom-center",
    },
  },
};

export const successBottomRight: StoryObj = {
  args: {
    props: {
      status: "success",
      description: "Your evaluation has been saved",
      timeout: 10000,
      toastPosition: "bottom-right",
    },
  },
};
