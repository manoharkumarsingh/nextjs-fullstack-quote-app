import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import axios from "axios";
import Loader from "@/components/loader";
import Error from "@/components/error";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";

interface UserInput {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState<UserInput>({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: false,
    inputData: true,
  });

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const userInputState: UserInput = {
      ...userInput,
      [e.target.id]: e.target.value,
    };
    setUserInput(userInputState);
  };

  const handleSubmit = async () => {
    const prevStatus = { ...status };
    setStatus({
      ...prevStatus,
      loading: true,
      error: false,
      inputData: true,
    });
    const response = await axios
      .post("/api/users/login", {
        userSignin: userInput,
      })
      .then((res) => res.data)
      .catch((err) => err);

    if (!response) {
      setStatus({
        ...prevStatus,
        loading: false,
        error: true,
        inputData: true,
      });
    } else if (response.status == 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
      router.push("/");
      setStatus({
        ...prevStatus,
        loading: false,
        error: false,
        inputData: true,
      });
    } else if (response.status == 200 && !response.data.token) {
      setStatus({
        ...prevStatus,
        loading: false,
        error: false,
        inputData: false,
      });
    }
  };

  if (status.loading) {
    return <Loader></Loader>;
  } else if (status.error) {
    return <Error></Error>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="mt-8">
        <Typography className="flex justify-center" variant="h4" gutterBottom>
          Login!!
        </Typography>
        {!status.inputData && (
          <Alert severity="error" className="mb-2">
            Email or password is invalid!!
          </Alert>
        )}
        <div className="mb-2 bg-white">
          <TextField
            className="w-96 bg-white"
            id="email"
            label="Email"
            type="text"
            autoComplete="current-password"
            variant="filled"
            onChange={handleUserInput}
          />
        </div>

        <div>
          <TextField
            className="w-96"
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            onChange={handleUserInput}
          />
        </div>
        <div className="mt-10 ">
          <Link className="text-[#039be5]" href={"/signup"}>
            Don't have an account ?
          </Link>
        </div>
        <div className="mt-4">
          <Button
            className="bg-sky-500"
            variant="contained"
            disableElevation
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
