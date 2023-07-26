import { useDrop } from "react-dnd";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Header from "./Header";
import Task from "./Task";

function Section({ status, tasks, todos, inProgress, closed, setTasks }) {
//   const [isOver, setIsOver] = useState(false);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (item) => addItemToSection(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const addItemToSection = (id) => {
    console.log("dropped", id, status);
    setTasks((prev) => {
      const updatedTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast("Task status changed", { icon: "" });
      return updatedTasks;
    });
  };

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }

  if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    tasksToMap = closed;
  }

  return (
    <div
      ref={drop}
      className={`w-64 ${isOver ? "bg-slate-200" : ""} rounded-md p-2`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
}

export default Section;
