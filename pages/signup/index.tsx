import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Loader from "@/components/loader";

interface userInput {
  firstName: String;
  lastName: String;
  password: String;
  email: String;
}

const Signup = () => {
  const [status, setStatus] = useState({
    loading: false,
    error: false,
  });

  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState<userInput>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const userInputState: userInput = {
      ...userInput,
      [e.target.id]: e.target.value,
    };
    setUserInput(userInputState);
  };
  const handleSubmit = async () => {
    setStatus({
      loading: true,
      error: false,
    });
    setMessage("");
    const response = await axios
      .post("/api/users", {
        userNew: { ...userInput },
      })
      .then((res) => {
        setUserInput({
          firstName: "",
          lastName: "",
          password: "",
          email: "",
        });
        setStatus({
          loading: false,
          error: false,
        });
        setMessage("User successfully created");
      })
      .catch((err) => {
        setStatus({
          loading: false,
          error: true,
        });
        if (err.response.data.error) {
          setMessage(err.response.data.error);
        } else {
          setMessage("Internal server error, Please try again!!");
        }
      });
  };

  if (status.loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="flex justify-center items-center  ">
      <div className="mt-8">
        {(!status.error && message && (
          <Alert severity="success">{message}</Alert>
        )) ||
          (status.error && message && (
            <Alert severity="error">{message}</Alert>
          ))}
        <Typography className="flex justify-center" variant="h4" gutterBottom>
          Signup!!
        </Typography>
        <div className="mb-3">
          <TextField
            className="w-96"
            id="firstName"
            label="First Name"
            type="text"
            autoComplete="current-password"
            variant="filled"
            onChange={handleUserInput}
          />
        </div>

        <div className="mb-3">
          <TextField
            className="w-96"
            id="lastName"
            label="Last Name"
            type="text"
            autoComplete="current-password"
            variant="filled"
            onChange={handleUserInput}
          />
        </div>

        <div className="mb-3">
          <TextField
            className="w-96"
            id="email"
            label="Email"
            type="text"
            autoComplete="current-password"
            variant="filled"
            onChange={handleUserInput}
          />
        </div>

        <div className="mb-3">
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
          <Link className="text-[#039be5]" href={"/login"}>
            Already have an account ?
          </Link>
        </div>
        <div className="mt-4">
          <Button
            className="bg-sky-500"
            variant="contained"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
