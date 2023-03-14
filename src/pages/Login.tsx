import React, { FC, useState, FormEvent, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { myContextApi } from "../StateManager";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import done from "../assets/images/Done.png";

const Login: FC = () => {
  const { doingsUsers} = useContext(myContextApi) ?? {};
  const [isAccountFound, setIsAccountFound] = useState<boolean>(true);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newLogin = {
      email: formData.get("email") as string,
      password: formData.get("password") as string | number,
    };

    const details = doingsUsers?.some(
      (users) =>
        users.email === newLogin.email && users.password === newLogin.password
    );
    if (details) {
      setIsAccountFound(true);

      navigate("/dashboard");
    } else {
      setIsAccountFound(false);
      event.currentTarget.reset()
    }
  };
   useEffect(() => {
     window.scrollTo({
       top: 0,
       behavior: "smooth",
     });
   }, []);
  return (
    <div>
      <div className="flex flex-col items-center relative top-5">
        <figure>
          <img src={done} alt="" className="shadow-lg" />
        </figure>
        <div className="flex flex-col items-center mt-5 leading-tight tracking-wider">
          <p className="text-lg text-center leading-tight">
            Welcome Back <br /> to
          </p>
          <h1>DOINGS</h1>
        </div>
        <div className="px-5">
          <form onSubmit={formSubmit} className="w-full">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{
                width: "100%",
                backgroundColor: "",
                marginTop: "10px",
              }}
              type="email"
              required
              name="email"
            />
            <FormControl
              sx={{
                width: "100%",
                marginTop: "10px",
              }}
              variant="outlined"
              required
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
              />
            </FormControl>
            {!isAccountFound && (
              <label className="text-xs text-red-800">
                Email or Password could not be found. Try again
              </label>
            )}{" "}
            <p className="text-center font-bold my-10 md:my-5 cursor-pointer" onClick={() => alert("Feature in progress")}>
              Forgot Password?
            </p>
            <button className="py-3 rounded text-xl font-bold w-full">
              Submit
            </button>
          </form>
          <p className="text-center mt-2">
            Don't have an account?{" "}
            <Link to="/registration">
              <span className="text-[#D8605B] font-bold">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
