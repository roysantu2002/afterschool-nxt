import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Firebase from "../../../../src/utils/config/firebase";
import Axios from "../../../../src/utils/config/axiosConfig";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Typography from "../../../../src/UI/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import * as getDataApi from "../../../../src/utils/getDataApi";

const useStyles = (theme) => ({
  root: {
    height: "90%",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    alignItems: "center",
    width: "90%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    padding: 15,
    boxShadow: 2,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  photoContainer: {
    Zindex: -20,
  },
  main: {
    marginTop: 20,
    padding: 10,
  },
  teacher: {
    marginTop: 20,
  },
  signupImage: {
    backgroundImage: "url(https://source.unsplash.com/random?computer?coding)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  linkText: { textdecoration: "none" },
});

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
  phoneError: "",
  otpValue: "",
  isOtpVisible: false,
  IsOtpError: false,
  otpConfirmation: null,
  image: null,
  imageURL: "/assets/avatar.png",
  imageError: "",
  infoMessage: "",
  loader: false,
  userType: "Student",
  teacherStudent: false,
  setAlert: { open: false, color: "" },
  alertMessage: "",
  createUserWithEmail: false,
  savetoDB: false,
  numInputs: 6,
  uid: "",
  buttonState: false,
  isLogginActive: true,
};

class Register extends Component {
  constructor(props) {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    // this.state.teacherStudent ? this.setState({ userType: "Teacher" }) : this.setState({ userType: "Student" })
    // console.log(`at mount : ${this.state.userType}`)
  }
  /* Basic validation on form */
  validateForm = () => {
    const emailError = this.state.emailError;
    const passwordError = this.state.passwordError;

    if (emailError === "" && passwordError === "") {
      return true;
    } else {
      return false;
    }
  };

  /* Enable typing in text boxes */
  handleChange = (event) => {
    let valid;
    let validOne, validfName, validlName;

    // console.log(this.validateForm());

    this.setState({
      [event.target.name]: event.target.value,
    });

    switch (event.target.name) {
      case "firstName":
        validfName = /^[a-zA-Z]*$/.test(event.target.value);
        if (!validfName || event.target.value.length < 2) {
          this.setState({
            firstNameError: "First Name!!",
          });
        } else {
          this.setState({
            firstNameError: "",
          });
        }
        break;

      case "lastName":
        validlName = /^[a-zA-Z]*$/.test(event.target.value);
        if (!validlName || event.target.value.length < 2) {
          this.setState({
            lastNameError: "Last Name!!",
          });
        } else {
          this.setState({
            lastNameError: "",
          });
        }
        break;

      case "email":
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );
        if (!valid) {
          this.setState({
            emailError: "Invalid email",
          });
        } else {
          this.setState({
            emailError: "",
          });
        }
        break;
      case "password":
        valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(
          event.target.value
        );
        if (!valid) {
          this.setState({
            passwordError:
              "Password max 15, one uppercase, numeric and a special character",
          });
        } else {
          this.setState({
            passwordError: "",
          });
        }
        break;
      case "teacherStudent":
        // this.setState(prevState => ({
        //  if()
        // }));

        // const tF = event.target.checked
        console.log(`on change Switch: ${event.target.checked}`);
        this.setState({ teacherStudent: event.target.checked });
        console.log(this.state.teacherStudent);
        // // this.setState({ teacherStudent: event.target.checked })
        // // console.log(this.state.teacherStudent )

        // // this.setState({ teacherStudent: tF })
        // console.log(`teacherStudent: ${this.state.teacherStudent}`)
        this.state.teacherStudent
          ? this.setState({ userType: "Teacher" })
          : this.setState({ userType: "Student" });
        //   // setState({ this.state.teacherStudent: event.target.checked })
        //   // this.setState({ teacherStudent :  event.target.checked })

        //   // if (this.state.teacherStudent) {
        //   //   this.setState({ userType: "Student" });
        //   // } else this.setState({ userType: "Teacher" });
        //   console.log(`UserType ${this.state.userType}`);
        break;

      case "phone":
        function uniqueDigit(str) {
          var a = 0;
          for (var i = 0; i < 10; i++) {
            new RegExp(i, "g").test(str) && a++;
          }
          return a;
        }
        valid = /^[3-9]\d\d*$/.test(event.target.value);
        validOne = /^(\d)(?=(?:\d*\1){3})/.test(event.target.value);
        // console.log(validOne);
        if (!event.target.value) {
          this.setState({ phoneError: "Phone cannot be empty" });
        }
        if (
          event.target.value.length !== 10 ||
          !valid ||
          uniqueDigit(event.target.value) < 4
        ) {
          this.setState({ phoneError: "Invalid mobile number !!" });
        } else {
          this.setState({
            phoneError: "",
          });
          this.validateForm()
            ? this.setState({ buttonState: true })
            : this.setState({ buttonState: false });
        }

        break;
      default:
        break;
    }
  };

  /* Handle OTP input */
  handleOtpChange = (otpValue) => this.setState({ otpValue });

  /* Handle Sign Up form submit */
  handleSubmit = (event) => {
    event.preventDefault();
    const phoneError = this.state.phoneError;
    if (phoneError !== "") {
      return false;
    }
    const isValid = this.validateForm();
    if (isValid) {
      this.setState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        phoneError: "",
      });
      this.handleSignUp(this);
    }
  };

  /* Generate and solve invisible recaptcha and send OTP to phone number*/
  handleSignUp = async () => {
    var email = this.state.email;
    var password = this.state.password;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var phone = this.state.phone;

    // this.state.teacherStudent ? this.setState({ userType: "Student" }) : this.setState({ userType: "Teacher" })

    console.log(`handleSignup : ${this.state.userType}`);
    this.setState({ loader: true });
    await this.createUserInFirebase(email, password);

    if (this.state.createUserWithEmail) {
      this.setState({ loader: false });
      await this.saveDetailsToDB(firstName, lastName, email, phone);
    }
  };

  /* Create user in firebase authentication system using email and password */
  createUserInFirebase = async (email, password) => {
    await Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        this.setState({ uid: cred.user.uid });
        // console.log(`user id created ${cred.user.uid}`);
        this.setState({ createUserWithEmail: true });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          this.setState({ alertMessage: "Email address is already in use!" });
          // console.log("That email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          // console.log("That email address is invalid!");
          this.setState({ alertMessage: "Email  address is invalid!" });
        }
        this.setState({ loader: false });
        this.setState({ setAlert: { open: true, color: "#FF3232" } });
      });
  };

  /* Save user details to firebase realtime DB using Axios POST
  and Avatar image to firebase storage */
  saveDetailsToDB = async (firstName, lastName, email, phone) => {
    const Data = {
      uid: this.state.uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };
    console.log(`saveDetailsToDB ${this.state.userType}`);
    if (this.state.userType === "Student") {
      getDataApi
        .saveStudent(this.state.uid, firstName, lastName, email, phone)
        .then((querySnapshot) => {
          if (querySnapshot === "Done") {
          } else {
            this.setState({
              alertMessage: querySnapshot,
            });
            this.setState({ setAlert: { open: true } });
            this.setState({ buttonState: false });
          }
          console.log(querySnapshot);
        });
      // await Axios.post(`/students/${this.state.uid}.json`, Data)
      //   .then((response) => {
      //     // window.location.href = "/Login";
      //   })
      //   .catch((error) => {
      //     this.setState({
      //       alertMessage: "Something went wrong, please try again!",
      //     });
      //     this.setState({ setAlert: { open: true } });
      //     // window.location.href = "/Login";
      //   });
    }
    if (this.state.userType === "Teacher") {
      getDataApi
        .saveTeacher(this.state.uid, firstName, lastName, email, phone)
        .then((querySnapshot) => {
          if (querySnapshot === "Done") {
          } else {
            this.setState({
              alertMessage: querySnapshot,
            });
            this.setState({ setAlert: { open: true } });
            this.setState({ buttonState: false });
          }
          console.log(querySnapshot);
        });
      // await Axios.post(`/teachers/${this.state.uid}`, Data)
      //   .then((response) => {
      //     window.location.href = "/Login";
      //   })
      //   .catch((error) => {
      //     this.setState({
      //       alertMessage: "Something went wrong, please try again!",
      //     });
      //     this.setState({ setAlert: { open: true } });
      //   });
    }
  };

  /* Handle image selection for Avatar */
  handleAvatar = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = (event) => {
      if (event.target.files[0]) {
        const image = event.target.files[0];
        this.setState(() => ({ image }));
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = (e) => {
          this.setState({ imageURL: e.target.result, imageError: "" });
        };
      }
    };
    input.click();
  };

  handleRadioButtonChange = (event) => {
    this.setState({
      radioValue: event.target.value,
    });
  };

  /* Render sign up form */
  render() {
    const { classes } = this.props;

    const buttonContents = (
      <React.Fragment>
        Sign Up
        <img
          src="/assets/send.svg"
          alt="paper airplane"
          style={{ marginLeft: "1em" }}
        />
      </React.Fragment>
    );

    return (
      <>
       <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
 
              <div className="header">Register</div>
         
              <form
                className={classes.form}
                onSubmit={this.handleSubmit}
                noValidate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={this.state.firstName}
                      autoFocus
                      onChange={this.handleChange.bind(this)}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.firstNameError}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      value={this.state.lastName}
                      name="lastName"
                      autoComplete="lname"
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.lastNameError}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      value={this.state.email}
                      name="email"
                      autoComplete="email"
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.emailError}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      value={this.state.password}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.passwordError}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      value={this.state.phone}
                      name="phone"
                      label="Mobile number (for OTP):"
                      type="phone"
                      id="phone"
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.phoneError}
                    </div>
                  </Grid>
                  <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                      <Grid container justify="center" spacing={2}>
                        {/* <Paper className={classes.paper}> */}
                        <div className={classes.teacher}>
                          <Grid key="teacher" item>
                            <Typography
                              component="h3"
                              variant="h6"
                              color="inherit"
                            >
                              Teacher
                            </Typography>
                          </Grid>
                        </div>
                        <Grid key="switch" item>
                          <Switch
                            checked={this.state.teacherStudent}
                            onChange={this.handleChange}
                            name="teacherStudent"
                            color="default"
                            inputProps={{
                              "aria-label": "checkbox with default color",
                            }}
                          />
                        </Grid>
                        <div className={classes.teacher}>
                          <Grid key="student" item>
                            <Typography
                              component="h3"
                              variant="h6"
                              color="inherit"
                            >
                              Student
                            </Typography>
                          </Grid>
                        </div>
                        {/* </Paper> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* </Grid> */}

                <Button
                  id="sign-up-button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!this.state.buttonState}
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  {buttonContents}
                  {this.state.loader ? <CircularProgress size={30} /> : ""}
                </Button>

                <h3>{this.state.infoMessage} </h3>
                <div id="sign-in-button"></div>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      href="/SignIn"
                      variant="body2"
                      className={classes.linkText}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            </div>
        <Snackbar
          autoHideDuration={8000}
          open={this.state.setAlert.open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => this.setState({ setAlert: false })}
        >
          <Alert severity="error">{this.state.alertMessage}</Alert>
        </Snackbar>
      </>
    );
  }
}

/* Sleep function to wait for Avatar image upload */
function sleep(ms) {
  console.log("Waiting for image upload");
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default withStyles(useStyles, { withTheme: true })(Register);
