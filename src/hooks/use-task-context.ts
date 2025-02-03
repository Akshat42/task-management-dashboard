import { Task, SortOrder } from "@/types/tasks";
import { createContext, useContext } from "react";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  editTask: (id: string, task: Omit<Task, "id">) => void;
  deleteTask: (id: string) => void;
  filterTasks: (status: Task["status"] | "All") => Task[];
  sortTasks: (tasks: Task[], sortOrder: SortOrder) => Task[];
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export default useTaskContext;
