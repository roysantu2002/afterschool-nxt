import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "../src/utils/config/firebase";
import Axios from "../src/utils/config/axiosConfig";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import loginAction from "../src/actions/loginAction";
import Router from 'next/router'

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
});

const initialState = {
  email: "",
  password: "",
};

class Login extends Component {
  state = initialState;

  /* Basic validation on form */
  validateForm = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email) {
      emailError = "Email cannot be empty";
    }
    if (!this.state.email.includes("@")) {
      emailError = "Please enter valid email address";
    }
    if (!this.state.password) {
      passwordError = "Password cannot be empty";
    }
    if (this.state.password.length < 6) {
      passwordError = "Password not strong";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  /* Enable typing in text boxes */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /* Handle Sign Up form submit */
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      this.setState({
        emailError: "",
        passwordError: "",
      });
      this.handleSignUp(this);
    }
  };

  /* Render sign up form */
  render() {
    const { classes, uid } = this.props;

    {console.log("Local Storage"+localStorage.getItem('afterSchoolUser'))}

    // if(uid) Router.push('/Learn')
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.imageError}
          </div>
          <form
            className={classes.form}
            onSubmit={this.handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email'
                value={this.state.email}
                name='email'
                autoComplete='email'
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.emailError}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                value={this.state.password}
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.passwordError}
              </div>
            </Grid>

            {!this.state.isOtpVisible ? (
              <Button
                id='sign-up-button'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={() =>
                  this.props.loginAction(this.state.email, this.state.password)
                }

                // onClick={this.handleSubmit}
              >
                Sign Up with OTP
              </Button>
            ) : null}
            {/* {console.log("ERRROR" +this.props.authState.error)} */}
            {/* {console.log("STATE" +this.props.authState.uid)} */}
            <h3>{this.state.infoMessage} </h3>
            {this.state.isOtpVisible ? (
              <Grid container justify='center'>
                <OtpInput
                  value={this.state.otpValue}
                  onChange={this.handleOtpChange}
                  numInputs={6}
                  otpType='number'
                  disabled={!this.state.isOtpVisible}
                  hasErrored={this.state.IsOtpError}
                  separator={<span>-</span>}
                  inputStyle={{
                    width: "2rem",
                    height: "2rem",
                    margin: "20px 1rem",
                    fontSize: "1.5rem",
                    borderRadius: 3,
                    border: "2px solid rgba(0,0,0,0.2)",
                  }}
                />
                <Button
                  onClick={this.verifyOTP}
                  variant='contained'
                  color='primary'
                >
                  Verify OTP
                </Button>
              </Grid>
            ) : null}
            <div id='recaptcha-container'></div>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='/Signup' variant='body2'>
                  Dont't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

/* Sleep function to wait for Avatar image upload */
function sleep(ms) {
  console.log("Waiting for image upload");
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mapStateToProps = (state) => {
  const uid = state.authState.uid
  return {
    uid: uid
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginAction: (email, password) =>
    dispatch(loginAction(email, password)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Login));
