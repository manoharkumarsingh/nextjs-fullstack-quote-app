import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const Userprofile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("/api/quotes/quoteByUserid/" + userId)
        .then((response) => {
          if (response.status == 200) {
            setQuotes(response.data.result.quote);
          }
        })
        .catch((error) => {
          console.log("Internal server error");
        });
    };

    fetch();
  }, [userId]);

  return (
    <div>
      <div className="profile-details">
        {quotes && quotes.length > 0 && (
          <div className="border-2 border-black ">
            <Image
              src={`https://robohash.org/${quotes[0].user.firstName}.png?size=200x200`}
              width={200}
              height={200}
              alt="Picture of the author"
              className="ml-28 mb-6"
            />

            <Typography variant="h6">
              Name : {quotes[0].user.firstName + " " + quotes[0].user.lastName}
            </Typography>
            <Typography variant="h6">Email : {quotes[0].user.email}</Typography>
          </div>
        )}
      </div>
      <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
        {quotes &&
          quotes.length > 0 &&
          quotes.map((quote) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={quote.user.firstName}
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          ~{quote.user.firstName}
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
    </div>
  );
};

export default Userprofile;
