import { IconButton, TextField } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTasks } from "../store/slices/tasksSlice";

const InputTask = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  async function postTask(task) {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        task,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );


      console.log(response.data);
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }
  const addTask = () => {
    if (input != "") {
      const done = postTask({ user_id: 1, title: input, completed: false });
      if (done){
      dispatch(addTasks({ user_id: input, title: input, completed: false }));
      setInput("");
    }
      else{
        alert("Task Add Failed....")
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          mt: 1,
        }}
      >
        <TextField
          id="add-task-input"
          label="Add Task Here"
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && addTask()}
        />
        <IconButton aria-label="add" size="medium" onClick={addTask}>
          <AddIcon color="primary" fontSize="inherit" />
        </IconButton>
      </div>
    </>
  );
};

export default InputTask;
