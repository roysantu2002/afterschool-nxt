import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase  from '../src/utils/config/firebase'
import Axios from '../src/utils/config/axiosConfig'
import OtpInput from 'react-otp-input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Loader from "@material-ui/core/CircularProgress";

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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  }
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
  imageURL: "/avatar.jpg",
  imageError: '',
  infoMessage: '',
  loader: false,
  radioValue: "teacher"
}

class SignUp extends Component {
  state = initialState;

  /* Basic validation on form */
  validateForm = () => {
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let passwordError = "";
    let phoneError = "";
    let imageError = "";

    if (!this.state.firstName) {
      firstNameError = 'First name cannot be empty';
    }
    if (!this.state.lastName) {
      lastNameError = 'Last name cannot be empty';
    }
    if (!this.state.email) {
      emailError = 'Email cannot be empty';
    }
    if (!this.state.email.includes('@')) {
      emailError = 'Please enter valid email address';
    }
    if (!this.state.password) {
      passwordError = 'Password cannot be empty';
    }
    if (this.state.password.length < 6) {
      passwordError = 'Password not strong'
    }
    if (!this.state.phone) {
      phoneError = 'Phone cannot be empty';
    }
    if (this.state.phone.length !== 10) {
      phoneError = 'Please enter a valid 10-digit phone number';
    }

    if (!this.state.image) {
      imageError = "Please select an Avatar image";
    }

    if (this.state.image != null && this.state.image.size > 100000) {
      imageError = 'Please upload a picture less than 100kb size';
    }

    if (firstNameError || lastNameError || emailError || passwordError || phoneError || imageError) {
      this.setState({ firstNameError, lastNameError, emailError, passwordError, phoneError, imageError });
      return false;
    }

    return true;
  }

  /* Enable typing in text boxes */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /* Handle OTP input */
  handleOtpChange = otpValue => this.setState({ otpValue });

  /* Handle Sign Up form submit */
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      this.setState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        phoneError: "",
        imageError: ""
      })
      this.handleSignUp(this);
    }
  }

  /* Generate and solve invisible recaptcha and send OTP to phone number*/
  handleSignUp = async () => {
    this.setState({ infoMessage: "Please wait..." })
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function (response) {
        // Invisible recaptcha solved
      }
    });

    var appVerifier = window.recaptchaVerifier;

    let number = '+91' + this.state.phone;

    firebase.auth().signInWithPhoneNumber(number, appVerifier).then((e) => {
      this.setState({ isOtpVisible: true, otpConfirmation: e })
      this.setState({ infoMessage: "Enter the OTP..." })
      let code = this.state.otpValue;
      if (code == null) { window.location.href = "/signup" };
    }).catch((error) => {
      alert(error.message);
      window.location.href = "/signup"
    })
  }

  /* Verify OTP. If verification successful, do the following: 
  1. Create user in firebase authentication system
  2. Save user details to firebase realtime DB
  3. Save Avatar to firebase storage
  4. Provide confirmation message and redirect to result page */
  verifyOTP = () => {
    var e = this.state.otpConfirmation;
    var code = this.state.otpValue;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email;
    var password = this.state.password;
    var phone = this.state.phone;
    var image = this.state.image;
    var userType = this.state.radioValue;

    this.setState({ loader : true })

    e.confirm(code).then(async (result) => {
      await this.createUserInFirebase(email, password);
      await this.saveDetailsToDB(firstName, lastName, email, phone, image, userType);
      /* OTP verification successful. Can be redirected to next page */
      this.setState({ loader : false })
      window.location.href = "/";
    }).catch((error) => {
      alert(error.message);
      window.location.href = "/signup";
    })
  }

  /* Create user in firebase authentication system using email and password */
  createUserInFirebase = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
      return true;
    }).catch(function (error) {
      alert(error.message);
      window.location.href = "/signup";
      return false;
    });
  }

  /* Save user details to firebase realtime DB using Axios POST
  and Avatar image to firebase storage */
  saveDetailsToDB = async (firstName, lastName, email, phone, image, userType) => {
    const Data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      userType: userType
    }
    if (userType === "student") {
      await Axios.post('/students.json', Data).then(response => {
      }).catch(error => {
        alert(error.message);
        window.location.href = "/signup";
      });
    } else if (userType === "teacher") {
      await Axios.post('/teachers.json', Data).then(response => {
      }).catch(error => {
        alert(error.message);
        window.location.href = "/signup";
      });
    }

    //Upload image
    var imageName = email.replace("@", "_");
    const uploadTask = firebase.storage().ref('avatars/' + imageName).put(image);
    await sleep(4000);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        console.log("Image uploading...")
      },
      (error) => {
        // error function ....
        console.log(error);
        alert(error.message);
        window.location.href = "/signup";
      },
      () => {
        // complete function ....
      });
  }

  /* Handle image selection for Avatar */
  handleAvatar = () => {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event) => {
      if (event.target.files[0]) {
        const image = event.target.files[0];
        this.setState(() => ({ image }));
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = (e) => {
          this.setState({ imageURL: e.target.result, imageError: "" })
        }
      }
    }
    input.click();
  }

  handleRadioButtonChange = (event) => {
    this.setState({
      radioValue: event.target.value
    })
  }

  /* Render sign up form */
  render() {
    const { classes } = this.props;
    return (
      this.state.loader === true ? <div align="center" ><Loader
        type="ThreeDots"
        color="red"
        height={100}
        width={100}

      /></div> :
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper} >
            <Avatar alt="Avatar"
              src={this.state.imageURL}
              className={classes.large}
              onClick={this.handleAvatar}
              style={{ cursor: "pointer" }} />
            <div style={{ fontSize: 12, color: "red" }}>{this.state.imageError}</div>
            <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
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
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>{this.state.firstNameError}</div>
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
                  <div style={{ fontSize: 12, color: "red" }}>{this.state.lastNameError}</div>
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
                  <div style={{ fontSize: 12, color: "red" }}>{this.state.emailError}</div>
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
                  <div style={{ fontSize: 12, color: "red" }}>{this.state.passwordError}</div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    label="Mobile number (for OTP):"
                    type="phone"
                    id="phone"
                    autoComplete="phone"
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>{this.state.phoneError}</div>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">User Type</FormLabel>
                    <RadioGroup aria-label="User Type" name="userType" value={this.state.radioValue} onChange={this.handleRadioButtonChange}>
                      <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                      <FormControlLabel value="student" control={<Radio />} label="Student" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              {
                !this.state.isOtpVisible ?
                  (<Button
                    id="sign-up-button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSubmit}
                  >
                    Sign Up with OTP
                  </Button>) : null
              }
              <h3>{this.state.infoMessage}  </h3>
              {
                this.state.isOtpVisible ? (
                  <Grid container justify="center">
                    <OtpInput
                      value={this.state.otpValue}
                      onChange={this.handleOtpChange}
                      numInputs={6}
                      otpType="number"
                      disabled={!this.state.isOtpVisible}
                      hasErrored={this.state.IsOtpError}
                      separator={<span>-</span>}
                      inputStyle={{
                        width: '2rem',
                        height: '2rem',
                        margin: '20px 1rem',
                        fontSize: '1.5rem',
                        borderRadius: 3,
                        border: '2px solid rgba(0,0,0,0.2)',
                      }}
                    />
                    <Button onClick={this.verifyOTP} variant="contained" color="primary">Verify OTP</Button>
                  </Grid>
                ) : null
              }
              <div id='sign-in-button'></div>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/SignIn" variant="body2">
                    Already have an account? Sign in
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
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default withStyles(useStyles, { withTheme: true })(SignUp);