import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from 'next/link';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import LoginImage from "../public/loginImg2.jpg";
import { signIn } from "next-auth/react";
import { ButtonBase } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  // alignItems: "center",
  width: "100%",
  justifyContent: "center",
  height: "100vh",

  // [theme.breakpoints.down("md")]: {
  //   flexDirection: "column",
  // },
}));

interface Props { }

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  currentTarget: HTMLFormElement;
}

const Page = (props: Props) => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);

    const allData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email: allData.email,
      password: allData.password,
    });

    if (result?.error) {
      alert(result.error)

      console.error("Login failed:", result.error);
    } else {
      console.log("Login successful:", result);
    }
  };

  const validateInputs = (): boolean => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <Container>
        <div className="w-full flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[400px]"
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Sign in
            </Typography>

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

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => {
                validateInputs();
              }}
            >
              Sign in
            </Button>

            <Link className="self-center mt-2" href={""}>Forgot your password?</Link>
            <Divider sx={{ my: 2 }}>or</Divider>
            <div className="flex flex-row gap-2">
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
                  signIn("github", { callbackUrl: "/" })
                }}
              >
                Sign In with Github
              </Button>
            </div>

            <Typography sx={{ textAlign: "center", marginTop: 2 }}>
              Don&apos;t have an account?{" "}
              <Link href={"/sign-up"}>Sign Up</Link>
            </Typography>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Page;