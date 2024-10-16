import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Checkbox } from "../checkbox";
import { useTaskListContext } from "./task-list-context";
import { Icon } from "../icon";

export const TaskList = () => {
  const [newTask, setNewTask] = useState("");
  const { tasks, error, addTask, toggleTask, removeTask, total, incomplete } = useTaskListContext();

  return (
    <main className="ui-space-y-8">
      <form
        className="ui-space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          addTask(newTask);
        }}
      >
        <Input
          label="Add a task"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className="ui-flex ui-justify-end ui-gap-2">
          <Button disabled={!newTask}>Add Task</Button>
          <Button variant="secondary" onClick={() => setNewTask("")}>
            Clear
          </Button>
        </div>
      </form>

      <div className="ui-flex ui-flex-col ui-rounded-md ui-bg-slate-50 ui-shadow-md dark:ui-bg-slate-800">
        {error ? (
          <div className="ui-flex ui-items-center ui-gap-2 ui-border-b ui-border-slate-200 ui-px-4 ui-py-2 last:ui-border-b-0 dark:ui-border-slate-800">
            <p data-testid="error-message" className="ui-text-danger-500">
              Error loading tasks: {error.message}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div className="ui-flex ui-items-center ui-gap-2 ui-border-b ui-border-slate-200 ui-px-4 ui-py-2 last:ui-border-b-0 dark:ui-border-slate-800">
              <Checkbox
                key={task.id}
                label={task.title}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="ui-w-full ui-rounded-md ui-p-2 hover:ui-bg-slate-100 dark:hover:ui-bg-slate-700"
              />
              <Button
                title="Remove task"
                variant="destructive"
                size="small"
                onClick={() => removeTask(task.id)}
              >
                <Icon type="x" />
              </Button>
            </div>
          ))
        )}
      </div>

      <p className="ui-text-right ui-font-semibold after:ui-font-normal after:ui-content-['_tasks_remaning']">
        <span data-testid="incomplete">{incomplete}</span>/<span data-testid="total">{total}</span>
      </p>
    </main>
  );
};
