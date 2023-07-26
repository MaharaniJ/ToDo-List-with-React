import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast,{Toaster} from "react-hot-toast";

function CreateTask({ tasks, setTasks }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3)
      return toast.error("A task must have more than 2 characters");

    if (task.name.length > 100)
      return toast.error("A task must not be more than 100 characters");

    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task created");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="pt-16">
        <input
          type="text"
          className="border-2 border-slate-100 bg-slate-300 rounded-md mr-4 h-12 w-64 px-1"
          value={task.name}
          onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
        />
        <button className="bg-cyan-500 rounded-md px-4 h-12 text-white" type="submit">
          Create
        </button>
      </form>
      <Toaster />
    </>
  );
}

export default CreateTask;
