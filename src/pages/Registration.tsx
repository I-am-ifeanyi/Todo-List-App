import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div>
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
        <div className="px-5 md:px-40">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Enter your full name"
              variant="outlined"
              sx={{
                width: "100%",
                backgroundColor: "",
                marginTop: "10px",
              }}
              type="text"
              required
            />
            <TextField
              id="outlined-basic"
              label="Enter your email"
              variant="outlined"
              sx={{
                width: "100%",
                backgroundColor: "",
                marginTop: "10px",
              }}
              type="email"
              required
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
              />
            </FormControl>
            <button className="py-3 rounded text-xl font-bold mt-5">Submit</button>
          </Box>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[#D8605B] font-bold">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
