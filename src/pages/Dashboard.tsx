import React, { FC } from "react";

import DoingsForm from "../components/DoingsForm";
import MyDoings from "../components/MyDoings";

import clock from "../assets/images/clock.png";

const Dashboard: FC = () => {
  return (
    <div className="bg-gray-200 h-auto pb-20 md:w-1/2 relative m-auto">
      <div className="flex flex-col items-center relative leading-tight">
        <div className="h-auto w-full bg-[#F4C27F] shadow-lg p-5 flex flex-col items-center">
          <figure className="border-4 border-[#D8605B] rounded-full shadow-lg w-[130px] h-[130px]">
            <img src={clock} alt="clock" />
          </figure>
          <figcaption className="text-2xl font-semibold tracking-wider">
            Ifeanyi Onyeka{" "}
          </figcaption>
          <i className="text-sm font-light text-[#D8605B]">
            theonyekagroup@gmail.com
          </i>
          <DoingsForm />
        </div>
        <h2 className="my-5 tracking-widest text-2xl font-bold text-[#D8605B] border-b-2 rounded-b-lg px-2 border-[#D8605B] ">
          DOINGS LIST
        </h2>
        <MyDoings />
      </div>
    </div>
  );
};

export default Dashboard;
