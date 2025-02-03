import { Routes, Route, Link } from "react-router";

import "./App.css";
import TaskHome from "./pages/task-home";
import TaskSummary from "./components/task-summary";
import { Button } from "./components/ui/button";
import CompletedTasks from "./pages/task-competed";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Task Management Dashboard</h1>
      <TaskSummary />
      <nav className="mb-4">
        <Button asChild className="mr-2">
          <Link to="/">All Tasks</Link>
        </Button>
        <Button asChild>
          <Link to="/completed">Completed Tasks</Link>
        </Button>
      </nav>
      <Routes>
        <Route path="/" element={<TaskHome />} />
        <Route path="/completed" element={<CompletedTasks />} />
      </Routes>
    </>
  );
}

export default App;
