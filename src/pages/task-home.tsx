import NoTasksFound from "@/components/no-tasks-found";
import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useTaskContext from "@/hooks/use-task-context";
import React, { useState } from "react";

const TaskHome: React.FC = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { tasks } = useTaskContext()
  return (
    <div className="container mx-auto p-4">
        <div className="mb-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <TaskForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        {tasks.length > 0 ? <TaskList /> : <NoTasksFound />}  
      </div>
  );
};

export default TaskHome;
