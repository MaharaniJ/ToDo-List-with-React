import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { ToastContainer } from "react-hot-toast";
import Section from "./Section";

function TaskList({ tasks, setTasks }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const isTodos = tasks.filter((task) => task.status === "todo");
    const isInProgress = tasks.filter((task) => task.status === "inprogress");
    const isClosed = tasks.filter((task) => task.status === "closed");

    setTodos(isTodos);
    setInProgress(isInProgress);
    setClosed(isClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];

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
          closed={closed}
        />
      ))}
    </div>
  );
}

export default TaskList;
