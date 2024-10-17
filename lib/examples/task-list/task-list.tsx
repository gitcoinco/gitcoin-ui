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
    <main className="space-y-8">
      <form
        className="space-y-4"
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
        <div className="flex justify-end gap-2">
          <Button disabled={!newTask}>Add Task</Button>
          <Button variant="secondary" onClick={() => setNewTask("")}>
            Clear
          </Button>
        </div>
      </form>

      <div className="flex flex-col rounded-md bg-slate-50 shadow-md dark:bg-slate-800">
        {error ? (
          <div
            data-testid="error-message"
            className="border-danger-500 flex items-center gap-2 border px-4 py-2 dark:border-slate-800"
          >
            Error loading tasks: {error.message}
          </div>
        ) : (
          tasks.map((task) => (
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-2 last:border-b-0 dark:border-slate-800">
              <Checkbox
                key={task.id}
                label={task.title}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-full rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
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

      <p className="text-right font-semibold after:font-normal after:content-['_tasks_remaning']">
        <span data-testid="incomplete">{incomplete}</span>/<span data-testid="total">{total}</span>
      </p>
    </main>
  );
};
