import React, { useState, createContext, useEffect, useRef } from "react";

interface IUserDetails {
  fullName: string;
  email: string;
  password: string | number;
  confirmPassword: string | number;
}

interface ITodo {
  title: string;
  newDoings: string | number;
  date: Date | undefined;
}

const myContextApi = createContext<ITodo | null | IUserDetails>(null);

const StateManager = ({ children }: { children: React.ReactNode }) => {
  const inputRef = useRef();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [doingsUsers, setDoingsUsers] = useState<IUserDetails[]>([]);

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
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5e3037cc9amsha2a12b21aae7181p16d9bajsn7173051fbda5",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
  };
  useEffect(() => {
    fetch("https://tex-translator2.p.rapidapi.com/getLanguages", options)
      .then((response) => response.json())
      .then((response) => setLanguages(response.data.languages))
      .catch((err) => console.error(err));
  }, []);

  // Post text to be translated and fetch and save the translated text
  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", sourceLang);
  encodedParams.append("target_language", changeLanguage);
  encodedParams.append("text", textToTranslate);

  const option = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "5e3037cc9amsha2a12b21aae7181p16d9bajsn7173051fbda5",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: encodedParams,
  };
  useEffect(() => {
    setIsFetching(true);
    fetch("https://tex-translator2.p.rapidapi.com/translate", option)
      .then((response) => response.json())
      .then((response) => {
        setTranslatedText(response?.data?.translatedText), setIsFetching(false);
      })
      .catch((err) => console.error(err));
  }, [textToTranslate]);

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
      }}
    >
      {children}
    </myContextApi.Provider>
  );
};

export { StateManager, myContextApi };
