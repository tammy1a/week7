import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import users from "../assets/users.json";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { setState } from "../store/slices/tasksSlice";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="./">
        TODO App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function LogIn() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [credentialError, setCredentialError] = useState(false);
  const dispatch = useDispatch();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const found = users.users.some(
      (user) => user.username === email && user.password === password
    );
    setCredentialError(!found);
    if (found) {
      localStorage.setItem("LoggedIn", true);
      dispatch(setState("idle"));
      localStorage.setItem("CurrentUser", email.split("@")[0]);
      window.location.href = "./profile";
    }

    console.log({
      email,
      password,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          {credentialError ? (
            <Alert severity="error">Email or Password not matched</Alert>
          ) : (
            ""
          )}
          <Box
            component="form"
            onSubmit={!emailError ? handleSubmit : undefined}
            noValidate={false}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={handleEmailChange}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              helperText={emailError ? "Please type a valid email" : ""}
              error={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 0, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
