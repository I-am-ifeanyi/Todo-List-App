import React, { FC, useContext } from 'react'

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { myContextApi } from "../StateManager";



const DoingsForm = () => {
    const { todo, setTodo, isFormSubmitted, setIsFormSubmitted } =
      useContext(myContextApi);

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setIsFormSubmitted(true)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo((todo) => ({
      ...todo,
      [name]: value
    }))
    console.log(todo);
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
          value={todo.title}
          onChange={handleChange}
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
          value={todo.newDoings}
          onChange={handleChange}
        />
        <TextField
          id="datetime-local"
          label="Time for Doings"
          type="datetime-local"
          defaultValue="2023-02-25T10:30"
          sx={{ width: "100%", backgroundColor: "", marginTop: "16px" }}
          InputLabelProps={{
            shrink: true,
          }}

          name="date"
          value={todo.date}
          onChange={handleChange}
          
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
}

export default DoingsForm