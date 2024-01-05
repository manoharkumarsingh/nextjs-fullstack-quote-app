import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Alert from "@mui/material/Alert";

interface userInput {
  firstName: String;
  lastName: String;
  password: String;
  email: String;
}

const Signup = () => {
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
  const handleSubmit = () => {};

  return (
    <div className="flex justify-center items-center  ">
      <div className="mt-8">
        {/* {data && data.user && (
          <Alert severity="success">
            {data.user.firstName} is SignedUp. You can login now!
          </Alert>
        )} */}
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
