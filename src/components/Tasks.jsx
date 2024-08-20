import { Typography } from "@mui/material";
import InputTask from "./InputTask.jsx";
import Task from "./Task.jsx";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks, updateTask } from "../store/slices/tasksSlice.js";
Array.prototype.myFilter = function (callback) {
  const trueArray = [];
  const falseArray = [];

  this.forEach((element, index, array) => {
    if (callback(element, index, array)) {
      trueArray.push(element);
    } else {
      falseArray.push(element);
    }
  });

  return [trueArray, falseArray];
};
const Tasks = () => {
  

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const taskStatus = useSelector(state => state.tasks.status);


  function onDelete(title) {
    dispatch(deleteTask(title));
  }
  function handleTick(title) {
    dispatch(updateTask({title,changes:{completed:true}}))
  }


  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus,dispatch]);
  
  const [completed, pending] = tasks.myFilter((elem) => {
    return elem.completed;
  });
  console.log("taskstatus",taskStatus)

  return (
    <>
      <div className="tasks-container" style={{ margin: "10",marginTop:"30px" }}>
        <InputTask />

        <Typography variant="h5" sx={{ mt: 2 }}>
          Pending
        </Typography>
        {pending.map((elem) => (
          <Task
            key={elem.title}
            completed={elem.completed}
            title={elem.title}
            handleTick={handleTick}
            onDelete={onDelete}
          />
        ))}
        <Typography variant="h5" sx={{ mt: 2 }}>
          Completed
        </Typography>
        {completed.map((elem) => (
          <Task
            key={elem.title}
            completed={elem.completed}
            title={elem.title}
            handleTick={handleTick}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default Tasks;
