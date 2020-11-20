import React from "react";
import Login from "../src/UI/Components/login/Login";
import Register from "../src/UI/Components/login/Register";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

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
    width: "70%",
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

class LoginRegister extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLogginActive: true,
    };
  }

  componentDidMount() {
    //Add .right by default
    // this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState((prevState) => ({
      isLogginActive: !prevState.isLogginActive,
    }));
  }

  render() {
    const { classes } = this.props;
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <Grid
        container
        component="main"
        className={classes.root}
        ref={this.props.containerRef}
      >
        <CssBaseline />

        <Grid item xs={false} sm={4} md={7} className={classes.signupImage} />
        <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square>
            <div className={classes.paper}>

      
            <div className="container" ref={(ref) => (this.container = ref)}>
              {isLogginActive && (
                <Login containerRef={(ref) => (this.current = ref)} />
              )}
              {!isLogginActive && (
                <Register containerRef={(ref) => (this.current = ref)} />
              )}
            </div>
            {/* <RightSide
              current={current}
              currentActive={currentActive}
              containerRef={(ref) => (this.rightSide = ref)}
              onClick={this.changeState.bind(this)}
            /> */}
          </div>
     
        </Grid>
      </Grid>
    );
  }
}

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default withStyles(useStyles, { withTheme: true })(LoginRegister);
