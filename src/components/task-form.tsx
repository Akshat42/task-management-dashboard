import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Task } from "@/types/tasks";
import useTaskContext from "@/hooks/use-task-context";

type TaskFormProps = {
  task?: Task;
  onClose: () => void;
};

function TaskForm({ task, onClose }: TaskFormProps) {
  const { addTask, editTask } = useTaskContext();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<Task["status"]>(
    task?.status || "Pending"
  );
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    const newTask = { title, description, status, dueDate };
    if (task) {
      editTask(task.id, newTask);
    } else {
      addTask(newTask);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value as Task["status"])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{task ? "Update Task" : "Add Task"}</Button>
    </form>
  );
}

export default TaskForm;
