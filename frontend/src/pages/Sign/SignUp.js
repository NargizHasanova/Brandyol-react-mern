import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { LockOutlined } from '@material-ui/icons'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router';
import { logout, postUsersData, signUpEmail } from '../../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { useState } from 'react'

const theme = createTheme()

export default function SignUp() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
  })

  //sil bunu sonra
  // useEffect(() => {
  //   users.signedIn && navigate("/")
  // }, [users.signedIn]);


  useEffect(() => {
    if (user.firstName.trim().length <= 1 || typeof (Number(user.firstName)) === "number") {
      setError(prev => ({ ...prev, firstNameError: true }))
    }
    if (user.firstName.trim().length > 1 ||
      typeof (Number(user.firstName)) !== "number" ||
      user.firstName.trim().length === 0) {
      setError(prev => ({ ...prev, firstNameError: false }))
    }
    if (user.lastName.trim().length <= 1 || typeof (Number(user.lastName)) === "number") {
      setError(prev => ({ ...prev, lastNameError: true }))
    }
    if (user.lastName.trim().length > 1 ||
      typeof (Number(user.lastName)) !== "number" ||
      user.lastName.trim().length === 0) {
      setError(prev => ({ ...prev, lastNameError: false }))
    }
    if (!user.email.includes('@')) {
      setError(prev => ({ ...prev, emailError: true }))
    }
    if (user.email.includes('@') || user.email.trim().length === 0) {
      setError(prev => ({ ...prev, emailError: false }))
    }
    if (user.password.trim().length < 4) {
      setError(prev => ({ ...prev, passwordError: true }))
    }
    if (user.password.trim().length >= 4 || user.password.trim().length === 0) {
      setError(prev => ({ ...prev, passwordError: false }))
    }
  }, [user.firstName, user.lastName, user.email, user.password]);

  function onInputChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  console.log(user);
  async function handleSubmit(event) {
    event.preventDefault()
    // bu yoxlamalari reduxa sal burda yazma
    if (
      error.firstNameError ||
      user.firstName.trim().length === 0) {
      setError(prev => ({ ...prev, firstNameError: true }))
      return
    }
    if (
      error.lastNameError ||
      user.lastName.trim().length === 0
    ) {
      setError(prev => ({ ...prev, lastNameError: true }))
      return
    }
    if (
      error.emailError ||
      user.email.trim().length === 0
    ) {
      setError(prev => ({ ...prev, emailError: true }))
      return
    }
    if (
      error.passwordError ||
      user.password.trim().length === 0
    ) {
      setError(prev => ({ ...prev, passwordError: true }))
      return
    }

    if (Object.values(user).filter(item => item.length === 0).length > 0) {
      console.log('kecmedi');
      return
    }
    const data = new FormData(event.currentTarget)
    console.log({
      // firstName: data.get('firstName'),
      // lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    })
    const signUpData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    dispatch(postUsersData(signUpData))
    dispatch(signUpEmail(signUpData.email))
    navigate("/")
  }

  function quit() {
    dispatch(logout())
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={user.firstName}
                  onChange={onInputChange}
                  error={error.firstNameError}
                  id={error.firstNameError ? "outlined-error-helper-text" : "firstName"}
                  helperText={error.firstNameError ? "Incorrect name." : ""}
                  autoComplete="given-name"
                  name="firstName"
                  required={true}
                  fullWidth
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={user.lastName}
                  onChange={onInputChange}
                  error={error.lastNameError}
                  id={error.lastNameError ? "outlined-error-helper-text" : "lastName"}
                  helperText={error.lastNameError ? "Incorrect last name." : ""}
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={user.email}
                  onChange={onInputChange}
                  error={error.emailError}
                  id={error.emailError ? "outlined-error-helper-text" : "email"}
                  helperText={error.emailError ? "Incorrect email." : ""}
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={user.password}
                  onChange={onInputChange}
                  error={error.passwordError}
                  id={error.passwordError ? "outlined-error-helper-text" : "password"}
                  helperText={error.passwordError ? "Incorrect password." : ""}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive news via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item onClick={quit}>
                <Link to="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
