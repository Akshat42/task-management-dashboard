import { TaskContext } from "@/hooks/use-task-context";
import { SortOrder, Task } from "@/types/tasks";
import type React from "react";
import { useState, useEffect } from "react";

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id: string, updatedTask: Omit<Task, "id">) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...updatedTask, id } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filterTasks = (status: Task["status"] | "All") => {
    return status === "All"
      ? tasks
      : tasks.filter((task) => task.status === status);
  };

  const sortTasks = (tasksToSort: Task[], sortOrder: SortOrder) => {
    return [...tasksToSort].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, filterTasks, sortTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
