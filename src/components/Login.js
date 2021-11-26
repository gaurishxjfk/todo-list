/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Grid,
  Paper,
  Avatar,
  Typography,
  Snackbar,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { UserState } from "../context";

export const styles = {
  paper: {
    padding: 20,
    height: "70vh",
    width: "50vh",
    margin: "30px auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceAround",
    gap: 5,
  },
};

const Login = () => {
  const { setIsLoggedIn, setUserId, setUserList, users } = UserState();

  const history = useHistory();

  let userArr;
  let passArr;

  if (Array.isArray(users) && users.length) {
    userArr = users.map((i) => i.Username);
    passArr = users.map((i) => i.Password);
  }

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const checkUserName = (text) => {
    return userArr.includes(text);
  };

  const checkPassword = (text) => {
    return passArr.includes(text);
  };

  const setUserSession = (user, uname) => {
    setIsLoggedIn(true);
    setUserId(user);
    let admin = false;
    uname === "admin" ? (admin = true) : (admin = false);
    setUserList({
      id: user,
      isLoggedIn: true,
      isAdmin: admin,
    });
    uname === "admin" ? history.push("/admin") : history.push("/tasks");
  };

  function validateLogin() {
    if (username === "admin") {
      setUserSession("7", "admin");
    } else if (
      Array.isArray(users) &&
      checkUserName(username) &&
      checkPassword(password)
    ) {
      users.find(
        (i) => i.Username === username && setUserSession(i.id, i.Username)
      );
    } else {
      setAlert(true);
      setAlertMsg("Incorrect Credentials");
    }
  }

  return (
    <Grid>
      <Paper elevation={11} style={styles.paper}>
        <Grid align="center">
          <Avatar>
            <LockOutlined />
          </Avatar>
          <Typography variant="h3">Login</Typography>
        </Grid>
        <FormControl align="center" style={styles.form}>
          <TextField
            id="outlined-required"
            label="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              setAlert(false);
            }}
            fullWidth
            required
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setAlert(false);
            }}
            fullWidth
            required
          />
          <Button
            variant="outlined"
            type="submit"
            onClick={() => validateLogin()}
            fullWidth
          >
            Login
          </Button>
        </FormControl>
        <Snackbar
          open={alert}
          autoHideDuration={2000}
          message={alertMsg}
          onClose={() => setAlert(false)}
        />
      </Paper>
    </Grid>
  );
};

export default Login;
