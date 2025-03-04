
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS file
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loader from "../Loader";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../redux/reducers/userReducers";
const axiosInstance = axios.create({
  withCredentials: true,
});
const settings = ["Edit Profile", "Logout"];

const Profile = (props) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [errors, setErrors] = useState({}); // מצב לשמירת הודעות שגיאה
  const dispatch = useDispatch();
  let myUser = useSelector((state) => state.user.myUser);


  const validateFields = () => {
    const newErrors = {};

    // בדיקת תקינות למייל
    if (!updatedUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedUser.email)) {
      newErrors.email = "Invalid email format. Please include '@'.";
    }

    // בדיקת תקינות למספר טלפון
    if (!updatedUser.phone || !/^\d{10}$/.test(updatedUser.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // מחזיר true אם אין שגיאות
  };


  //להתנתק
  const handleLogoutOnClick = () => {
    const user = {
      ...myUser,
      id: -1
    };
    setIsLoading(true);
    setTimeout(() => {
      dispatch(updateUser(user));
      setIsLoading(false);
      props.setIsConnected(false);
      localStorage.setItem("user", JSON.stringify(user));
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleProfileClick = () => {
    setUpdatedUser(myUser);
    setOpenDialog(true);
    handleCloseUserMenu();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  //לעדכן את המשתמש בכל שינוי
  useEffect(() => {
    // פונקציה אסינכרונית פנימית
    const updateUserAsync = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:8080/api/Users/Usersbyid/${myUser.id}`,
          myUser, // מעביר את האובייקט המעודכן
          { headers: { 'Content-Type': 'application/json' } }
        );

        // מעדכן את ה-Redux רק לאחר שהקריאה הצליחה
        dispatch(updateUser(response.data));
      } catch (error) {
        console.error("שגיאה בעדכון המשתמש: ", error.message);
      }
    };

    if (myUser) { // לבדוק ש-myUser לא ריק
      updateUserAsync();
    }
  }, [myUser, dispatch]); // יופעל מחדש רק אם myUser או dispatch משתנים


  //שומר את הנתנונים שהתעדכנו
  const handleSave = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      dispatch(updateUser(updatedUser));
      const response = await axiosInstance.put(
        `http://localhost:8080/api/Users/UpdateUsers/${myUser.id}`,
        updatedUser,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("response ", response.data);
      setOpenDialog(false);
      alert("updete")
    } catch (error) {
      console.error("Error updating user: ", error.response);
    }
  };
  //עדכן נתנונים שהוא מכניס
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({ ...prevState, [name]: value }));
  };



  return (
    <div className="form-profile-picture">
      {isLoading && <Loader></Loader>}
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 0 }}>
          {myUser.id !== -1 && (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  aria-label="recipe"
                  style={{ width: "50px", height: "50px", marginTop: "1%" }}
                >
                  <img
                    src={`data:image/jpg;base64,${myUser.profile}`}
                    alt={`Avatar of ${myUser.profile}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
          <div variant="body1" style={{ marginLeft: "2px" }}>
            Points: {myUser.points}
          </div>
          <Menu
            sx={{ mt: "45px" }}
            id="form-menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => {
                  if (setting === "Edit Profile") {
                    handleProfileClick();
                  } else if (setting === "Logout") {
                    handleLogoutOnClick();
                  }
                }}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>

      {/* Profile Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          {/* User Avatar */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              alt={`Avatar of ${myUser.userneame}`}
              src={`data:image/jpg;base64,${myUser.profile}`}
              style={{ width: 100, height: 100 }}
            /><br></br>
            <div variant="body1" style={{ marginLeft: "2px" }}>
              Points: {myUser.points}<br></br>
              Your like you did:{myUser.like_count}
            </div>
          </Box>

          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={updatedUser.username || ""}
            onChange={handleChange}

          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={updatedUser.email || ""}
            onChange={handleChange}
            error={!!errors.email} // שדה שגיאה
            helperText={errors.email} // הודעת השגיאה
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={updatedUser.phone || ""}
            onChange={handleChange}
            error={!!errors.phone} // שדה שגיאה
            helperText={errors.phone} // הודעת השגיאה
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
