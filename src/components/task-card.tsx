import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TaskForm from "./task-form";
import { Task } from "@/types/tasks";
import useTaskContext from "@/hooks/use-task-context";

export default function TaskCard({ task }: { task: Task }) {
  const { deleteTask } = useTaskContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-left">
        <p>{task.description}</p>
        <div className="mt-2">
          <Badge>{task.status}</Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={() => setIsDialogOpen(true)}>Edit</Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <TaskForm task={task} onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
