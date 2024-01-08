import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/loader";
import Error from "@/components/error";
interface User {
  _id: String;
  firstName: String;
}
interface Quote {
  _id: number;
  name: string;
  user: User;
}

const Home: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [status, setStatus] = useState({
    loading: false,
    error: false,
  });

  useEffect(() => {
    setStatus({
      loading: true,
      error: false,
    });
    const fetchData = async () => {
      try {
        const response = await axios.get<{ result: { quote: Quote[] } }>(
          "/api/quotes"
        );
        const quotesData: Quote[] = response.data.result.quote;
        setStatus({
          loading: false,
          error: false,
        });
        setQuotes(quotesData);
      } catch (error) {
        setStatus({
          loading: false,
          error: true,
        });
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (status.loading) {
    return <Loader></Loader>;
  } else if (status.error) {
    return <Error></Error>;
  }
  return (
    <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
      {quotes &&
        quotes.length > 0 &&
        quotes.map((quote) => {
          return (
            <>
              <ListItem alignItems="flex-start">
                <Image
                  src={`https://robohash.org/${quote.user.firstName}.png?size=50x50`}
                  width={50}
                  height={50}
                  alt="Picture of the author"
                />

                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <Link
                          className="text-blue-600"
                          href={"/userprofile/" + quote.user._id}
                        >
                          ~{quote.user.firstName}
                        </Link>
                      </Typography>
                      — {quote.name}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
    </List>
  );
};

export default Home;
