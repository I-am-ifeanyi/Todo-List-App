import React, { FC, useContext } from "react";
import { myContextApi } from "../StateManager";

import Button from "@mui/material/Button";

const MyDoings: FC = () => {
  const { todo, setTodo, isFormSubmitted } = useContext(myContextApi);
  console.log(todo);
  return (
    <div>
      {isFormSubmitted && (
        <div className="relative m-auto w-[90%] shadow-2xl p-4 rounded-xl">
          <div className="w-full ">
            <form className="flex flex-col items-center relative leading-tight justify-between gap-2">
              <aside className="flex flex-col justify-between w-full gap-4">
                <i className="text-[12px]">{todo.date}</i>

                <div className="flex flex-col w-full bg-[#F4C27F] rounded-lg p-1">
                  <label>{todo.title}</label>
                  <input
                    type="text"
                    defaultValue="Doings"
                    value={todo.newDoings}
                    className="w-full mt-1 border bg-[#F4C27F] text-gray-800 p-1 rounded"
                    disabled
                  />
                </div>
              </aside>

              <aside className="flex w-full gap-4">
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    width: "10%",
                    backgroundColor: "",
                    marginTop: "16px",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "10%",
                    backgroundColor: "#D8605B",
                    marginTop: "16px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginRight: "auto",
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "40%",
                    height: "40px",
                    backgroundColor: "white",
                    color: "#D8605B",
                    marginTop: "16px",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Translate to French
                </Button>
              </aside>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDoings;
