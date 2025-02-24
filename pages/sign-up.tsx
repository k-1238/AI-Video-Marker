import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import LoginImage from "../public/loginImg2.jpg";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",

  // [theme.breakpoints.down("md")]: {
  //   flexDirection: "column",
  // },
}));

const Page = () => {
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [usernameMessage, setusernameMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }

    const data = new FormData(event.currentTarget);

    const allData = {
      email: data.get("email"),
      password: data.get("password"),
      userName: data.get("username"),
      phoneNumber: data.get("phoneNumber"),
    };

    try {
      const res = await axios.post(
        "/api/auth/register",
        allData
      );

      if (res?.data) {
        router.push("/sign-in");
      }

      return res.data;
    } catch (error) {
      console.log("ERROR : ", error);
    }
  };

  const validateInputs = (): boolean => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const phoneNumberInput = document.getElementById("phoneNumber") as HTMLInputElement;
    const usernameInput = document.getElementById("username") as HTMLInputElement;

    let isValid = true;

    if (!emailInput.value || !/\S+@\S+\.\S+/.test(emailInput.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!passwordInput.value || passwordInput.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    // Phone Number Validation
    if (!phoneNumberInput.value || phoneNumberInput.value.length < 6) {
      setPhoneNumberError(true);
      setPhoneNumberMessage("Phone number must be at least 6 characters long.");
      isValid = false;
    } else {
      setPhoneNumberError(false);
      setPhoneNumberMessage("");
    }

    // Username Validation
    if (!usernameInput.value || usernameInput.value.length < 3) {
      setUsernameError(true);
      setusernameMessage("Username must be at least 3 characters long.");
      isValid = false;
    } else {
      setUsernameError(false);
      setusernameMessage("");
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <Container>
        <div className="hidden justify-center items-center w-[50%] sm:flex relative">
            <Image 
                alt="image" 
                src={LoginImage} 
                // layout="fill" 
                // objectFit="cover" 
            />
        </div>

        <div className="w-full sm:w-[50%] p-8  ">
          <div className="w-full flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="w-[80%] h-[600px] flex flex-col gap-2 "
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{ textAlign: "center", marginBottom: 2 }}
              >
                Sign Up
              </Typography>

              <FormControl fullWidth>
                <FormLabel htmlFor="number">Phone Number</FormLabel>
                <TextField
                  error={phoneNumberError}
                  helperText={phoneNumberMessage}
                  id="phoneNumber"
                  type="number"
                  name="phoneNumber"
                  placeholder="+62"
                  autoComplete="number"
                  autoFocus
                  required
                  variant="outlined"
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  error={usernameError}
                  helperText={usernameMessage}
                  id="username"
                  type="text"
                  name="username"
                  placeholder=""
                  autoComplete="username"
                  autoFocus
                  required
                  variant="outlined"
                />
              </FormControl>

              <FormControl fullWidth>

                <FormLabel htmlFor="email">Email</FormLabel>

                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  variant="outlined"
                />

              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="password">Password</FormLabel>

                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  variant="outlined"
                />

              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="password">Confirm Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  variant="outlined"
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign up
              </Button>

              <Divider>or</Divider>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  signIn("google", { callbackUrl: "/" });
                }}
              >
                Sign In with Google
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  signIn("github", { callbackUrl: "/" });
                }}
              >
                Sign In with Github
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                You have an account?{" "}
                <Link href="/sign-in" variant="body2">
                  Sign In
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Page;