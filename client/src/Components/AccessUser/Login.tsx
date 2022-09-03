import React, { useEffect } from 'react';
import { useAuth, useModal, useSnackBar } from '../../Hooks';
import classes from './AccessUser.module.css';
import { Form, Input, Submit } from '../FormUI';
import { IUserInfo, IAccessUserProperties } from './Interfaces';
import { loginSchema } from '../../Validation';
import {
  Button,
  DialogTitle,
  DialogContent,
  Grid,
  DialogContentText,
  Typography,
  InputAdornment,
  EmailIcon,
  VisibilityIcon,
  GoogleIcon,
  VisibilityOffIcon,
} from '../../mui';

function Login({
  passwordsType,
  setPasswordsType,
}: IAccessUserProperties) {
  const { showSnackBar } = useSnackBar();
  const { login, role } = useAuth();
  const { setAuthModal } = useModal();

  const initialValues = { email: '', password: '', role };
  const loginSubmit = (userInfo: IUserInfo) => login(userInfo);

  return (
    <Form
      onSubmit={loginSubmit}
      initialValues={initialValues}
      validationSchema={loginSchema}
    >
      <DialogTitle
        textAlign="center"
        padding="30px"
        fontWeight="600"
        fontSize="30px"
      >
        Log into Quizzer
      </DialogTitle>
      <DialogContent style={{ alignItems: 'center', textAlign: 'center' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              color="info"
              className={classes.googleEmail}
              variant="contained"
              startIcon={<GoogleIcon />}
              style={{ width: '100%' }}
            >
              Continue with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Input
              name="email"
              variant="outlined"
              placeholder="Enter your email"
              label="Email"
              type="text"
              margin="dense"
              style={{ width: '100%', marginTop: '30px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="password"
              variant="outlined"
              placeholder="Enter your password"
              label="Password"
              type={passwordsType ? 'password' : 'text'}
              margin="dense"
              style={{ width: '100%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {
                    passwordsType ? (
                      <VisibilityOffIcon
                        onClick={() => { setPasswordsType(!passwordsType); }}
                        style={{ cursor: 'pointer' }}
                      />
                    )
                      : (
                        <VisibilityIcon
                          onClick={() => { setPasswordsType(!passwordsType); }}
                          style={{ cursor: 'pointer' }}
                        />
                      )
                    }
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs>
            <Submit color="primary" className={classes.accessSubmit} variant="contained" style={{ alignSelf: 'center' }}>Log in</Submit>
          </Grid>
        </Grid>
        <Grid container className={classes.access}>
          <DialogContentText paddingBottom="50x">
            Don’t have an account?
          </DialogContentText>
          <Typography color="secondary" style={{ cursor: 'pointer' }} onClick={() => setAuthModal('signup')}>&nbsp;Sign up</Typography>
        </Grid>
      </DialogContent>
    </Form>
  );
}

export default Login;
