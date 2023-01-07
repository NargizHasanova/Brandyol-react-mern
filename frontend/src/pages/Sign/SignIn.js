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
import { LockOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, fetchLogin, fetchUsersData } from '../../redux/userSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'

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
  const { isAuthorized, user } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log({ isAuthorized })


  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [isAuthorized]);

  console.log(user);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    const res = await dispatch(fetchLogin(data))
    if (!res.payload ) {
      return alert('ne udalos avtorizovatsa')
    }
    if ('token' in res.payload) {
      window.localStorage.setItem('token', res.payload.token)
    }
  }
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            {isAuthorized === false &&
              <Alert severity="error">Wrong email/password. <br />Please try again or
                <Link to="/register" > create a new account.</Link>
              </Alert>}

            <TextField
              margin="normal"
              required
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              type="email"
              fullWidth
              {...register('email', { required: 'enter your email' })}
            />
            <TextField
              error={Boolean(errors.email?.message)}
              helperText={errors.password?.message}
              type="password"
              fullWidth
              margin="normal"
              required
              name="password"
              label="Password"
              autoComplete="current-password"
              {...register('password', { required: 'укажите пароль' })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={!isValid}
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
                <Link to="/register" >
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