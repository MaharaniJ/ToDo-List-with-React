import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { ToastContainer } from "react-hot-toast";
import Section from "./Section";

function TaskList({ tasks, setTasks }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const isTodos = tasks.filter((task) => task.status === "todo");
    const isInProgress = tasks.filter((task) => task.status === "inprogress");
    const isCompleted = tasks.filter((task) => task.status === "completed");

    setTodos(isTodos);
    setInProgress(isInProgress);
    setCompleted(isCompleted);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "completed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          completed={completed}
        />
      ))}
    </div>
  );
}

export default TaskList;
