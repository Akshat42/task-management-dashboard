import useTaskContext from "@/hooks/use-task-context";
import React from "react";

const TaskSummary: React.FC = () => {
  const { tasks } = useTaskContext();

  const summary = tasks.reduce(
    (acc, task) => {
      acc[task.status]++;
      return acc;
    },
    { Pending: 0, "In Progress": 0, Completed: 0 }
  );

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {Object.entries(summary).map(([status, count]) => (
        <div key={status} className="bg-secondary p-4 rounded-lg">
          <h3 className="font-semibold">{status}</h3>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskSummary;
