import React, { FC, useContext, useState, useRef } from "react";
import { myContextApi } from "../StateManager";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const MyDoings: FC = () => {
  const {
    todos,
    handleDelete,
    languages,
    translatedText,
    textToTranslate,
    setChangeLanguage,
    setTextToTranslate,
    isFetching,
    setSourceLang,
  } = useContext(myContextApi) ?? {};

  const [sureToDelete, setSureToDelete] = useState<boolean>(false);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setChangeLanguage && setChangeLanguage(selectedLang);
  };

  return (
    <div className="flex flex-col gap-5 w-[90%] md:w-[1/2]">
      {todos?.map((doings, index: number) => {
        console.log(doings.date ? doings.date : null);
        return (
          <div
            className="relative m-auto w-full shadow-2xl p-4 rounded-xl"
            key={index}
          >
            <div className="w-full ">
              <form className="flex flex-col items-center relative leading-tight justify-between gap-2">
                <aside className="flex flex-col justify-between w-full gap-4">
                  <div className="flex justify-between items-center">
                    <i className="text-[12px]">
                      {doings.date
                        ? doings.date.toLocaleString().slice(0, 17).split("T") +
                          " " +
                          " "
                        : ""}
                    </i>
                    <select
                      name="country"
                      required
                      className="border bg-black/50 text-gray-200 text-[12px] md:text-md rounded"
                      onChange={handleLanguageChange}
                    >
                      <option value="en">Translate Doings</option>
                      {languages?.map((language, index: number) => {
                       setSourceLang && setSourceLang(language.code)
                        return (
                          <option key={index} value={language.code}>
                            {language.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col w-full bg-[#F4C27F] rounded-lg p-1 relative">
                    <label className="font-bold text-sm tracking-wider uppercase text-[#D8605B]">
                      {doings.title}
                    </label>
                    <textarea
                      value={
                        textToTranslate === doings.newDoings
                          ? translatedText
                          : doings.newDoings
                      }
                      className="w-full mt-1 border text-black p-1 rounded resize-none h-32 font-bold"
                      disabled
                    />
                    {textToTranslate === doings.newDoings && isFetching && (
                      <figure className="absolute w-full border h-full flex items-center justify-center">
                        <CircularProgress color="success" />
                      </figure>
                    )}
                  </div>
                </aside>
                {sureToDelete && (
                  <div className="text-start text-gray-800">
                    <p className="">
                      Are you sure you want to delete this{" "}
                      <strong>doings</strong>?
                    </p>{" "}
                    <div className="flex justify-between">
                      <button
                        className="border p-1 rounded mt-2"
                        onClick={() => setSureToDelete(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="border p-1 rounded mt-2"
                        onClick={() => {
                          handleDelete && handleDelete(index);
                          setSureToDelete(false);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}

                {!sureToDelete && (
                  <aside className="flex w-full gap-4 justify-between">
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
                      onClick={() => {
                        setSureToDelete(true);
                      }}
                    >
                      Delete
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
                      onClick={() => {
                        setTextToTranslate && setTextToTranslate(doings.newDoings);
                      }}
                    >
                      Translate
                    </Button>
                  </aside>
                )}
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyDoings;
