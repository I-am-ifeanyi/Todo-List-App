import React, { useState, createContext } from "react";




interface IUserDetails {
  fullName: string,
  email: string,
  password: string | number,
  confirmPassword: string | number
}

interface ITodo {
  title: string,
  newDoings: string | number,
  date: Date | undefined
}

const myContextApi = createContext<ITodo | null>(null);

const StateManager = ({ children }: { children: React.ReactNode }) => {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)

  return (
    <myContextApi.Provider
      value={{ todo, setTodo, isFormSubmitted, setIsFormSubmitted }}
    >
      {children}
    </myContextApi.Provider>
  );
};

export { StateManager, myContextApi };
