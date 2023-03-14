import React, { useState, createContext, useEffect } from "react";

interface IUserDetails {
  fullName: string;
  email: string;
  password: string | number;
  confirmPassword: string | number;
}

interface ITodo {
  title: string;
  newDoings: string;
  date: Date | null;
}
interface Language {
  code: string;
  name: string;
}

interface IMyContext {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  handleDelete: (index: number) => void;
  handleUpdate: (index: number, updatedItem: ITodo) => void;
  languages: Language[];
  changeLanguage: string;
  translatedText: string | number;
  textToTranslate: string;
  setChangeLanguage: React.Dispatch<React.SetStateAction<string>>;
  setTranslatedText: React.Dispatch<React.SetStateAction<string | number>>;
  setTextToTranslate: React.Dispatch<React.SetStateAction<string>>;
  isFetching: boolean;
  sourceLang: string;
  setSourceLang: React.Dispatch<React.SetStateAction<string>>;
  doingsUsers: IUserDetails[];
  setDoingsUsers: React.Dispatch<React.SetStateAction<IUserDetails[]>>;
  userDisplayName: string;
  setUserDisplayName: React.Dispatch<React.SetStateAction<string>>;
  userDisplayEmail: string;
  setUserDisplayEmail: React.Dispatch<React.SetStateAction<string>>;
  isUser: boolean;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
}
const apiKey = import.meta.env.VITE_API_KEY;

const myContextApi = createContext<IMyContext | null>(null);

const StateManager = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [doingsUsers, setDoingsUsers] = useState<IUserDetails[]>([]);
  const [userDisplayName, setUserDisplayName] = useState<string>("");
  const [userDisplayEmail, setUserDisplayEmail] = useState<string>("");
  const [isUser, setIsUser] = useState<boolean>(false);

  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string | number>("");
  const [changeLanguage, setChangeLanguage] = useState<string>("en");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [sourceLang, setSourceLang] = useState<string>("en");

  // Check if there are items stored in the local storage, if so, set them to the todos array
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleDelete = (index: number): void => {
    // remove item from array
    const newItems = [...todos];
    newItems.splice(index, 1);
    setTodos(newItems);

    // update local storage
    localStorage.setItem("todos", JSON.stringify(newItems));
  };

  const handleUpdate = (index: number, updatedItem: ITodo) => {
    // update item in array
    const newItems = [...todos];
    newItems[index] = updatedItem;
    setTodos(newItems);

    // update local storage
    localStorage.setItem("todos", JSON.stringify(newItems));
  };

  // Fetch the different languages to be translated
  const options: RequestInit = {
    method: "GET",
    headers: new Headers({
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    }),
  };
  useEffect(() => {
    fetch("https://text-translator2.p.rapidapi.com/getLanguages", options)
      .then((response) => response.json())
      .then((response) => setLanguages(response.data.languages))
      .catch((err) => console.error(err));
  }, []);

  // Post text to be translated and fetch and save the translated text
  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", sourceLang);
  encodedParams.append("target_language", changeLanguage);
  encodedParams.append("text", textToTranslate);

  const option: RequestInit = {
    method: "POST",
    headers: new Headers({
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    }),
    body: encodedParams,
  };
  useEffect(() => {
    setIsFetching(true);
    fetch("https://text-translator2.p.rapidapi.com/translate", option)
      .then((response) => response.json())
      .then((response) => {
        setTranslatedText(response?.data?.translatedText), setIsFetching(false);

        setIsFetching(false);
      })
      .catch((err) => console.error(err));
  }, [textToTranslate, changeLanguage]);
  console.log(translatedText);
  return (
    <myContextApi.Provider
      value={{
        todos,
        setTodos,
        handleDelete,
        handleUpdate,
        languages,
        changeLanguage,
        translatedText,
        textToTranslate,
        setChangeLanguage,
        setTranslatedText,
        setTextToTranslate,
        isFetching,
        sourceLang,
        setSourceLang,
        doingsUsers,
        setDoingsUsers,
        userDisplayName,
        setUserDisplayName,
        userDisplayEmail,
        setUserDisplayEmail,
        isUser,
        setIsUser,
      }}
    >
      {children}
    </myContextApi.Provider>
  );
};

export { StateManager, myContextApi };
