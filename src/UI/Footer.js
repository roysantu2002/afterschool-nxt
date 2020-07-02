import React from "react";
import Link from "../../src/Link";
import { makeStyles } from "@material-ui/core/styles";
// import adornment from "../../assets/adornment.svg"
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "../UI/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.darkRed,
    width: "100%",
    zIndex: 1302,
    position: "relative",
  },
  adortnment: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em",
    },
  },
  footerContainer: {
    position: "absolute",
    // ...theme.typography.footerLink,
  },
  footerLink: {
    fontFamily: "Muli",
    textTransform: "none",
    color: "white",
    fontSize: "0.75rem",
    fontWeigth: "bold",
    textDecoration: "none",
  },
  gridItem: {
    // ...theme.typography.footerLink,
    margin: "3em",
  },
  icon: {
    height: "3em",
    width: "3em",
    [theme.breakpoints.down("xs")]: {
      width: "2em",
    },
  },
  socialIcon: {
    position: "absolute",
    marginTop: "-6em",
    right: "1.5em",
    [theme.breakpoints.down("xs")]: {
      right: "0.6em",
      marginTop: "-5em",
    },
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid container justify="center" className={classes.footerContainer}>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => {
                  props.setValue(0);
                  props.setSelectedIndex(0);
                }}
                href="/"
                className={classes.footerLink}
              >
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.footerLink}
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(1);
                }}
                href="/Who"
              >
                Who
              </Grid>
              <Grid
                item
                className={classes.footerLink}
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(1);
                }}
                href="/Writing"
              >
                Writing
              </Grid>
              <Grid
                item
                className={classes.footerLink}
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(2);
                }}
                href="/Robotics"
              >
                Robotics
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.footerLink}
                component={Link}
                onClick={() => props.setValue(2)}
                href="/About"
              >
                About Us
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.footerLink}
                component={Link}
                onClick={() => props.setValue(3)}
                href="/Contact"
              >
                Contact Us
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={"a"}
                href="https://www.freepik.com"
                rel="sponsored"
                target="_blank"
                className={classes.footerLink}
              >
                <Typography variant="caption">
                  {"Icons made by "}
                  Freepik
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <img
        alt="afterschoolapps"
        src="/assets/adornment.svg"
        className={classes.adortnment}
      />

      <Grid
        container
        justify="flex-end"
        spacing={2}
        className={classes.socialIcon}
      >
        <Grid
          item
          component={"a"}
          href="http://www.facebook.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="/assets/facebook.svg"
            alt="facebook"
            className={classes.icon}
          ></img>
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.twitter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="/assets/twitter.svg"
            alt="twitter"
            className={classes.icon}
          ></img>
        </Grid>
        <Grid
          item
          component={"a"}
          src="/assets/twitter.svg"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="/assets/instagram.svg"
            alt="instagram"
            className={classes.icon}
          ></img>
        </Grid>
      </Grid>
    </footer>
  );
}
