import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
const axiosInstance = axios.create({
  withCredentials: true,
});

const LeaderList = () => {
  const [users, setUsers] = useState([]);
  const [topLikes, setTopLikes] = useState([]);//שמירת המובלים בלייקים
  const [topPoints, setTopPoints] = useState([]);//שמירת המובלים ביניקוד

  useEffect(() => {
    // פונקציה להבאת המשתמשים ועדכון הרשימות
    const fetchUsers = () => {
      console.log("enter")
      axiosInstance
        .get("http://localhost:8080/api/Users/Users")
        .then((response) => {
          const usersData = response.data;
          setUsers(usersData);

          // מיון לשלושת המובילים לפי לייקים
          const sortedLikes = [...usersData]
            .sort((a, b) => b.like_count - a.like_count)
            .slice(0, 3);

          // מיון לשלושת המובילים לפי ניקוד
          const sortedPoints = [...usersData]
            .sort((a, b) => b.points - a.points)
            .slice(0, 3);

          setTopLikes(sortedLikes); // עדכון מובילים בלייקים
          setTopPoints(sortedPoints); // עדכון מובילים בניקוד

        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };

    fetchUsers(); // קריאה ראשונה לפונקציה
    const interval = setInterval(fetchUsers, 5000); // רענון כל 5 שניות

    return () => clearInterval(interval); // ניקוי ה-interval כשמתנתק
  }, []); // תלות ריקה - רץ פעם אחת בהתחלה




  return (
    <Box p={4}>
      <Grid container spacing={2} style={{ marginTop: "7%" }}>
        {/* חצי ראשון - תמונה */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <img
              src="images/איש לבן 3 מקומות.jpeg"
              alt="Trophy"
              style={{ width: "80%", height: "20%" }}
            />
          </Box>
        </Grid>

        {/* חצי שני - טקסט המנצחים */}
        <Grid item xs={12} md={6}>
          <div variant="h7" style={{ marginLeft: "100px", fontSize: "70px" }}>
            Our Leaders
          </div>

          {/* שתי הרשימות זו לצד זו */}
          <Box display="flex" justifyContent="space-around" mt={3}>
            <Box>
              <div variant="h5" style={{ fontSize: "25px" }}>
                Top 3 in  likes
              </div>
              <List>
                {topLikes.map((user, index) => (
                  <ListItem key={user.id}>
                    <Avatar
                      src={`data:image/jpg;base64,${user.profile}`}
                      alt={user.username}
                      style={{ marginRight: "10px" }}
                    />
                    <ListItemText

                      primary={`${index + 1}. ${user.username}`}
                      secondary={`Likes: ${user.like_count}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box>
              <div variant="h5" style={{ fontSize: "25px" }}>
                Top 3 in scoring
              </div>
              <List>
                {topPoints.map((user, index) => (
                  <ListItem key={user.id}>
                    <Avatar
                      src={`data:image/jpg;base64,${user.profile}`}
                      alt={user.username}
                      style={{ marginRight: "10px" }}
                    />
                    <ListItemText
                      primary={`${index + 1}. ${user.username}`}
                      secondary={`Points: ${user.points}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LeaderList