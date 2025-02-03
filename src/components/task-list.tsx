import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskCard from "./task-card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import useTaskContext from "@/hooks/use-task-context";
import { Task } from "@/types/tasks";
import NoTasksFound from "./no-tasks-found";

type TaskListProps = {
  initialFilter?: Task["status"] | "All";
};

export default function TaskList({ initialFilter = "All" }: TaskListProps) {
  const { filterTasks, sortTasks } = useTaskContext();
  const [filter, setFilter] = useState<Task["status"] | "All">(initialFilter);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredTasks = filterTasks(filter);
  const sortedTasks = sortTasks(filteredTasks, sortOrder);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div>
      <div className="mb-4 flex items-center space-x-4">
        <Select onValueChange={(value) => setFilter(value as Task["status"] | "All")} defaultValue={filter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={toggleSortOrder} variant="outline" className="flex items-center">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by Due Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </Button>
      </div>
      {sortedTasks.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <NoTasksFound />
      )}
    </div>
  );
}
