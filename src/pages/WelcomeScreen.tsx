import React, {FC} from 'react'
import { Link } from 'react-router-dom';

import done from "../assets/images/Done.png";



const WelcomeScreen: FC = () => {
    
  return (
    <div>
      <div className="flex flex-col items-center relative top-20">
        <figure>
          <img src={done} alt="" className="shadow-lg" />
        </figure>
        <div className="flex flex-col items-center mt-5 leading-tight tracking-wider">
          <p className="text-lg">Welcome to</p>
          <h1>MY DOINGS</h1>
          <p className="text-center mt-2 px-4 md:px-20 tracking-widest">
            We gladly welcome you to OUR DOINGS todo app. Designed to aid users
            keep to plan and not miss crucial activity in their daily lives. The
            user interface is top notch while the general experience is wowing
            to say the least.{" "}
          </p>
        </div>
      </div>
      <div className="md:px-40 px-5">
        <Link to="login">
          {" "}
          <button className="relative top-32 text-center m-auto w-full py-4 font-bold text-xl rounded">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomeScreen