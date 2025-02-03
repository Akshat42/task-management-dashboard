import { FileX } from "lucide-react";

export default function NoTasksFound() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <FileX className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        No tasks found
      </h2>
      <p className="text-gray-500">
        There are no tasks to display. Try adding a new task or changing your
        filters.
      </p>
    </div>
  );
}
