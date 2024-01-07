import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Loader from "@/components/loader";

interface userInput {
  name: String;
}

const Createquote = () => {
  const [status, setStatus] = useState({
    loading: false,
    error: false,
  });
  const [message, setMessage] = useState(false);
  const [quoteInput, setQuoteInput] = useState<userInput>({
    name: "",
  });

  const handleQuoteInput = (e: ChangeEvent<HTMLInputElement>) => {
    const quoteInputState: userInput = {
      ...quoteInput,
      [e.target.id]: e.target.value,
    };
    setQuoteInput(quoteInputState);
  };
  const handleSubmit = async () => {
    setStatus({
      loading: true,
      error: false,
    });
    setMessage(false);
    await axios
      .post(
        "/api/quotes",
        { name: quoteInput.name },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setQuoteInput({
          name: "",
        });
        setStatus({
          loading: false,
          error: false,
        });
        setMessage(true);
      })
      .catch((err) => {
        setStatus({
          loading: false,
          error: true,
        });
        setMessage(true);
      });
  };

  if (status.loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="flex justify-center items-center  ">
      <div className="mt-8">
        {(!status.error && message && (
          <Alert severity="success">Quote created successfully !!</Alert>
        )) ||
          (status.error && message && (
            <Alert severity="error">
              Internal server error, Please try again !!
            </Alert>
          ))}
        <Typography className="flex justify-center" variant="h4" gutterBottom>
          Create New Quote!!
        </Typography>
        <div className="mb-3">
          <TextField
            className="w-96"
            id="name"
            label="New Quote"
            type="text"
            autoComplete="current-password"
            variant="filled"
            onChange={handleQuoteInput}
          />
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

export default Createquote;
