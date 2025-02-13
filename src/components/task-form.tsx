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
import { useForm } from "react-hook-form";

type TaskFormProps = {
  task?: Task;
  onClose: () => void;
};

interface TaskFromInput {
  title: string;
  description: string;
  status: Task["status"];
  dueDate: string;
}

function TaskForm({ task, onClose }: TaskFormProps) {
  const { addTask, editTask } = useTaskContext();

  const submitForm = (data: TaskFromInput) => {
    if (!data.title || !data.dueDate) return;
    const newTask = {
      title: data.title,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
    };
    if (task) {
      editTask(task.id, newTask);
    } else {
      addTask(newTask);
    }
    onClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskFromInput>();

  const handleSelectChange = (value: Task["status"]) => {
    setValue("status", value, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title", { required: true })} />
        {errors.title && (
          <span className="text-sm text-red-400">Title is required</span>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-sm text-red-400">Description is required</span>
        )}
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          {...register("status", { required: true })}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger {...register("status", { required: true })}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <span className="text-sm text-red-400">Status is required</span>
        )}
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          {...register("dueDate", { required: true })}
        />
        {errors.dueDate && (
          <span className="text-sm text-red-400">Due Date is required</span>
        )}
      </div>
      <Button type="submit">{task ? "Update Task" : "Add Task"}</Button>
    </form>
  );
}

export default TaskForm;
