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
import { fetchRegister, logout, postUsersData, signUpEmail } from '../../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const theme = createTheme()

export default function SignUp() {
  const { isAuthorized } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    console.log(data)
    const res = await dispatch(fetchRegister(data))
    if (!res.payload) {
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required={true}
                  label="First Name"
                  autoFocus
                  error={Boolean(errors.firstName?.message)}
                  helperText={errors.firstName?.message}
                  type="text"
                  fullWidth
                  {...register('firstName', { required: 'укажите имя' })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"

                  error={Boolean(errors.lastName?.message)}
                  helperText={errors.lastName?.message}
                  type="text"
                  {...register('lastName', { required: 'enter last name' })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                  type="email"
                  fullWidth
                  {...register('email', { required: 'укажите почту' })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"

                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  fullWidth
                  {...register('password', { required: 'укажите пароль' })}
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
              <Grid item >
                <Link to="/login" variant="body2">
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
