import React, { FC, useState, useContext, useEffect } from "react";
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

const Registration: FC = () => {
  const {
    doingsUsers,
    setDoingsUsers,
    setUserDisplayName,
    setUserDisplayEmail,
  } = useContext(myContextApi) ?? {};
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [isRegSuccess, setIsRegSuccess] = useState<boolean>(false);
  const [accountExists, setAccountExists] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUserDetails = {
      fullName: formData.get("full_name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string | number,
      confirmPassword: formData.get("password2") as string | number,
    };
    const { password, confirmPassword } = newUserDetails;
    const crosscheck = doingsUsers?.some(
      (result) => result.email === newUserDetails.email
    );
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      event.currentTarget.reset();

      return null;
    } else if (crosscheck) {
      setIsPasswordMatch(true);

      setAccountExists(true);
    } else {
      setUserDisplayName && setUserDisplayName(newUserDetails.fullName);
      setUserDisplayEmail && setUserDisplayEmail(newUserDetails.email);
      setIsPasswordMatch(true);
      setIsRegSuccess(true);
      const newUser = [...(doingsUsers ?? []), newUserDetails];
      setDoingsUsers?.(newUser);
      localStorage.setItem("doingsUsers", JSON.stringify(newUser));

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [isRegSuccess]);
  return (
    <div>
      {isRegSuccess && (
        <p
          className="w-full text-center text-gray-200 bg-green-600 py-2 tracking-widest"
          data-aos="fade-down"
        >
          Registration Successful!
        </p>
      )}
      <div className="flex flex-col items-center relative">
        <figure>
          <img src={done} alt="" className="shadow-lg" />
        </figure>
        <div className="flex flex-col items-center mt-5 leading-tight tracking-wider">
          <p className="text-lg text-center leading-tight">
            Get things done with <br />
            <span className="text-2xl font-bold">MY DOINGS</span>
          </p>
          <i className="text-sm">Let's help you meet your tasks</i>
        </div>
        <form className="px-5 md:w-1/2" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Enter your full name"
            variant="outlined"
            sx={{
              width: "100%",
              backgroundColor: "transparent",
              marginTop: "10px",
            }}
            type="text"
            required
            name="full_name"
          />
          <TextField
            id="outlined-basic"
            label="Enter your email"
            variant="outlined"
            sx={{
              width: "100%",
              backgroundColor: "transparent",
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
              Enter password
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
          <FormControl
            sx={{
              width: "100%",
              marginTop: "10px",
            }}
            variant="outlined"
            required
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm password
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
              name="password2"
            />
          </FormControl>
          {!isPasswordMatch && (
            <label className="text-red-800 text-xs">
              Password not a match. Try again
            </label>
          )}
          {accountExists && (
            <label className="text-red-800 text-xs">
              An account with this email already exists
            </label>
          )}
          <button className="py-3 rounded text-xl font-bold mt-5 w-full">
            Submit
          </button>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[#D8605B] font-bold">Sign In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
