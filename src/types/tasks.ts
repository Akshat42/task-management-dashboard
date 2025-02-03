export type Task = {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
};

export type SortOrder = "asc" | "desc";
