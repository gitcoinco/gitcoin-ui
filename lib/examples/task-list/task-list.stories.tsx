import type { Meta, StoryObj } from "@storybook/react";
import { TaskList } from "./task-list";
import { TaskListProvider } from "./task-list-context";
import { taskListHandler, taskListHandlerWithError } from "../../mocks/handlers";
import { expect, within } from "@storybook/test";

const meta = {
  title: "Components/TaskList",
  component: TaskList,
  loaders: [
    async () => {
      try {
        const tasks = await fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
          response.json(),
        );

        return { tasks };
      } catch (error) {
        console.error(error);
        return { error };
      }
    },
  ],
  decorators: [
    (Story, { loaded }) => {
      return (
        <TaskListProvider tasks={loaded.tasks} error={loaded.error}>
          <Story />
        </TaskListProvider>
      );
    },
  ],
} as Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {};

export const WithoutGlobalMockedTasks: Story = {
  parameters: {
    msw: { handlers: [] },
  },
};

export const WithMockedTasks: Story = {
  parameters: {
    msw: {
      handlers: [taskListHandler],
    },
  },
};

export const WithFetchError: Story = {
  parameters: {
    msw: {
      handlers: [taskListHandlerWithError],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByTestId("error-message");

    expect(errorMessage).toBeInTheDocument();
  },
};
