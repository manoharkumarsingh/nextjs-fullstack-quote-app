import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ result: { quote: Quote[] } }>(
          "/api/quotes"
        );
        const quotesData: Quote[] = response.data.result.quote;
        setQuotes(quotesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
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
