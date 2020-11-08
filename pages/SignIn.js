import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import firebase from '../config/firebase';

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  authenticationError: ""
}


class SignIn extends React.Component {
  state = initialState;

  /* Enable typing in text boxes */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /* Basic validations on the Sign In form*/
  validateForm = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email) {
      emailError = 'Email cannot be empty';
    }
    if (!this.state.email.includes('@')) {
      emailError = 'Please enter valid email address';
    }
    if (!this.state.password) {
      passwordError = 'Password cannot be empty';
    }
    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }
    return true;
  }

  /* Handle form submit */
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      this.signInUser();
    }
  }

  /* Sign in the user using firebase authentication system */
  signInUser = () => {
    var thisObject = this;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(response => {
      window.location.href = "/";
    }).catch(function (error) {
      // Handle Errors here.
      var errorMessage = error.message;
      thisObject.setState({
        authenticationError: "Incorrect login crendentials!"
      });
      console.log(errorMessage);
    });
  }

  /* Render sign in form */
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid>
              <Typography component="h3" variant="body2" color="error">
                {this.state.authenticationError}
              </Typography>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/password-reset" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>

            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(SignIn);