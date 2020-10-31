import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import Typography from "../UI/Typography";
import TextField from "../UI/Input/TextField";
import Snackbar from "../UI/Snackbar";
import Button from "../UI/Button/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Firebase from "../../src/utils/firebase";
// import * as admin from "firebase-admin";
import * as getDataApi from "../utils/getDataApi";


const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: "flex",
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.warning.main,
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: "100%",
  },
  imagesWrapper: {
    position: "relative",
  },
  imageDots: {
    position: "absolute",
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: "100%",
    background: "url('/assets/onepirate/productCTAImageDots.png')",
  },
  image: {
    position: "absolute",
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: 600,
  },
});

function ProductCTA(props) {
  const { classes } = props;
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMesssage] = useState("");
  const [inquiry, setInquiry] = useState("");

  const onChange = (event) => {
    let inquiryList = [];
    let valid;
    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );

        if (!valid) {
          setEmailHelper("Invalid email");
        } else {
          // console.log(event.target.value)
          const email = event.target.value
          setEmailHelper("");
          getDataApi.getInquiry(email).then((querySnapshot) => {
            setEmailHelper(querySnapshot)
          });
        }
        break;
      default:
        break;
    }
  };

  const buttonContents = (
    <React.Fragment>
      Keep Me Updated!!
      <img
        src="/assets/send.svg"
        alt="paper airplane"
        style={{ marginLeft: "1em" }}
      />
    </React.Fragment>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    setLoading(true);

    // const firestore = Firebase.firestore();
    // // Create a reference to the cities collection
    // const emailRef = firestore.collection("inquiry");

    // // Create a query against the collection
    // const date = emailRef.where("email", "==", email).get();

    // console.log("test",date)
    // admin.auth
    //   .listUsers(1)
    //   .then((userRecords) => {
    //     userRecords.users.forEach((user) => console.log(user.toJSON()));
    //   })
    //   .catch((error) => console.log(error));

    // Firebase
    //   .getUserByEmail(email)
    //   .then(function (userRecord) {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log("Successfully fetched user data:", userRecord.toJSON());
    //   })
    //   .catch(function (error) {
    //     console.log("Error fetching user data:", error);
    //   });

    // axios
    //   .get(
    //     "https://us-central1-react-19b73.cloudfunctions.net/sendMail",
    //     {
    //       params: {
    //         email: email,
    //       }
    //     }
    //   )
    //   .then(res => {
    //     setLoading(false);
    //     setOpen(false);
    //     setEmail("");
    //     setAlert({ open: true, color: "#4BB543" });
    //     setAlertMesssage("Message sent successfully!");
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     setAlert({ open: true, color: "#FF3232" });
    //     setAlertMesssage("Something went wrong! Please try again.");
    //     console.error(err);
    //   });
  };

  return (
    <Container className={classes.root} component="section">
      <Grid container>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <form onSubmit={handleSubmit} className={classes.cardContent}>
              <Typography variant="h2" component="h2" gutterBottom>
                Can we help you?
              </Typography>
              <Typography variant="h5">
                We'll try to find a best mentor
              </Typography>
              <TextField
                noBorder
                className={classes.textField}
                placeholder="Your email"
                error={emailHelper.length !== 0}
                helperText={emailHelper}
                id="email"
                fullWidth
                value={email}
                onChange={onChange}
              />
              <Button
                disabled={emailHelper.length !== 0 || email.length === 0}
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={() => setOpen(true)}
              >
                {buttonContents}
              </Button>
            </form>
          </div>
        </Grid>

        <Dialog
          style={{ zIndex: 1302 }}
          open={open}
          fullScreen={matchesXS}
          onClose={() => setOpen(false)}
          PaperProps={
            {
              // style: {
              //   paddingTop: matchesSM ? "1em" : "5em",
              //   paddingBottom: matchesSM ? "1em" : "5em",
              //   paddingLeft: matchesSM
              //     ? 0
              //     : matchesSM
              //     ? 0
              //     : matchesSM
              //     ? "15em"
              //     : "25em",
              //   paddingRight: matchesSM
              //     ? 0
              //     : matchesSM
              //     ? 0
              //     : matchesSM
              //     ? "15em"
              //     : "25em",
              // },
            }
          }
        >
          <DialogContent>
            <Grid container direction="column">
              <Grid item>
                <Typography align="center" variant="h4" gutterBottom>
                  Confirm Message
                </Typography>
              </Grid>

              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Email"
                  error={emailHelper.length !== 0}
                  helperText={emailHelper}
                  id="email"
                  fullWidth
                  value={email}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction={matchesXS ? "column" : "row"}
              style={{ marginTop: "2em" }}
              alignItems="center"
            >
              <Grid item>
                <Button
                  style={{ fontWeight: 300 }}
                  color="primary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={emailHelper.length !== 0 || email.length === 0}
                  variant="contained"
                  className={classes.sendButton}
                  onClick={() => {
                    onConfirm();
                    // ReactGA.event({
                    //   category: "Message",
                    //   action: "Message Sent",
                    // });
                  }}
                >
                  {loading ? <CircularProgress size={30} /> : buttonContents}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <Snackbar
          open={alert.open}
          ContentProps={{
            style: {
              backgroundColor: alert.color,
            },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          message={alertMessage}
          autoHideDuration={4000}
          onClose={() => setAlert(false)}
        />
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            <div className={classes.imageDots} />
            <img
              src="/assets/start.jpg"
              alt="call to action"
              className={classes.image}
            />
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}

ProductCTA.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCTA);
