import * as React from 'react';
import { useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LockOutlined, TrendingUpOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, fetchUsersData } from '../../redux/userSlice';
import { useEffect } from 'react';
import { useState } from 'react';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);

  useEffect(() => {
    if (!userEmail.includes('@')) {
      setUserEmailError(true)
    }
    if (userEmail.includes('@') || userEmail.trim().length === 0) {
      setUserEmailError(false)
    }
    if (userPassword.trim().length < 4) {
      setUserPasswordError(true)
    }
    if (userPassword.trim().length >= 4 || userPassword.trim().length === 0) {
      setUserPasswordError(false)
    }
  }, [userEmail, userPassword]);

  useEffect(() => {
   if(users.signedIn) {
    navigate("/")
   }
  }, [users.signedIn]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      userEmailError ||
      userEmail.trim().length === 0
    ) {
      setUserEmailError(true)
      return
    }
    if (userPasswordError ||
      userPassword.trim().length === 0
    ) {
      setUserPasswordError(true)
      return
    }
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const signInData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    await dispatch(fetchUsersData(signInData))
    await dispatch(checkUser(signInData))
    // console.log(users.signedIn);
    // users.signedIn && navigate("/")
  };


  console.log(users.data);
  // useEffect(() => {
  //   users.signedIn && navigate("/")
  // }, [users.signedIn]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {users.signedIn === false &&
              <Alert severity="error">Wrong email/password. <br />Please try again or
                <Link to="/sign-up" > create a new account.</Link>
              </Alert>}

            <TextField
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              error={userEmailError}
              id={userEmailError ? "outlined-error-helper-text" : "email"}
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              error={userPasswordError}
              id={userPasswordError ? "outlined-error-helper-text" : "password"}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}