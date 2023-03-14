import React, { useContext} from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { myContextApi } from "../StateManager";

const DoingsForm = () => {
  const { todos, setTodos } = useContext(myContextApi) ?? {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get form data
    const formData = new FormData(event.currentTarget);

    // create new todo object
    const newTodo = {
      title: formData.get("title") as string,
      newDoings: formData.get("newDoings") as string,
      date: formData.get("date")
        ? new Date(formData.get("date") as string)
        : null,
    };

    // add new todo to array and also save to local storage. Object is stringified because local storage only save strings
    const newItem = [...(todos ?? []), newTodo];
    setTodos?.(newItem);
    localStorage.setItem("todos", JSON.stringify(newItem));

    console.log(todos);

    // clear form fields
    event.currentTarget.reset();
     
  };

  return (
    <div className="mt-2">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{
            width: "100%",
            backgroundColor: "",
            marginTop: "10px",
          }}
          type="text"
          required
          name="title"
        />
        <TextField
          id="outlined-basic"
          label="Enter New Doings"
          variant="outlined"
          sx={{
            width: "100%",
            backgroundColor: "transparent",
            marginTop: "10px",
          }}
          type="text"
          required
          name="newDoings"
        />
        <TextField
          id="datetime-local"
          label="Date for Doings"
          type="datetime-local"
          defaultValue=""
          sx={{ width: "100%", backgroundColor: "", marginTop: "16px" }}
          InputLabelProps={{
            shrink: true,
          }}
          name="date"
          required
        />
        <Button
          variant="contained"
          sx={{ width: "100%", backgroundColor: "#D8605B", marginTop: "16px" }}
          type="submit"
        >
          Add Doings
        </Button>
      </form>
    </div>
  );
};

export default DoingsForm;
