import NoTasksFound from "@/components/no-tasks-found";
import TaskList from "@/components/task-list";
import useTaskContext from "@/hooks/use-task-context";

export default function CompletedTasks() {
  const { tasks } = useTaskContext();
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  return (
    <>
      {completedTasks.length > 0 ? (
        <TaskList initialFilter="Completed" />
      ) : (
        <NoTasksFound />
      )}
    </>
  );
}
