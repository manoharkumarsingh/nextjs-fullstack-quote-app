import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Profile = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("/api/users/userId", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setUser(response.data.result.user);
          }
        })
        .catch((error) => {
          console.log("Internal server error");
        });
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="profile-details">
        {user && user.length > 0 && (
          <div>
            <Image
              src={`https://robohash.org/${user[0].firstName}.png?size=200x200`}
              width={200}
              height={200}
              alt="Picture of the author"
            />

            <Typography variant="h6">
              Name : {user[0].firstName + " " + user[0].lastName}
            </Typography>
            <Typography variant="h6">Email : {user[0].email}</Typography>
          </div>
        )}
      </div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {user &&
          user.length > 0 &&
          user.map((ur) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={ur.firstName}
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
                          ~{ur.firstName}
                        </Typography>
                        — {ur.quotes.name}
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

export default Profile;
