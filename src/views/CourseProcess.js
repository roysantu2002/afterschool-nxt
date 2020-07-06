import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "../UI/Button/Button";
import Typography from "../UI/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = (theme) => ({
  // root: {
  //   display: 'flex',
  //   backgroundImage: "url('/assets/bg-patt.svg')",
  //   overflow: 'hidden',
  // },
  root: {
    // display: 'flex',
    // overflow: 'hidden',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    backgroundImage: "url('/assets/bg-patt.svg')",
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
    minWidth: 200,
  },
  gridControl: {
    padding: 20,
    marginTop: 15,
  },
  ico: {
    size: "3em",
    color: "#835A00",
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    color:  theme.palette.common.darkBlue,
    marginBottom: theme.spacing(5),
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    // <section className={classes.root}>
    //   <Container className={classes.container}>

    <Container className={classes.root} component='section'>
      {/* <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        /> */}
      <Container className={classes.root} component='section'></Container>
      <Typography variant='h2' marked='center' align='center' >
        How to succeed after school?
      </Typography>
      <Grid container spacing={5} className={classes.gridControl}>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
          <Typography variant='h5' marked='center' align='center' className={classes.title}>
            "FIND A GOAL"
            </Typography>
            <FontAwesomeIcon
              icon={["fa", "check-circle"]}
              size='3x'
              className={classes.ico}
            />
            <Typography variant='h5' align='center'>
              {"Every successful people have an idea, dreams and a goal."}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
          <Typography variant='h5' marked='center' align='center' className={classes.title}>
            “DECIDE TO LEARN”
            </Typography>
            <FontAwesomeIcon
              icon={["fa", "bullseye"]}
              size='3x'
              className={classes.ico}
            />
            <Typography variant='h5' align='center'>
              {"In Italian: Ancora imparo. A tiny reminder that I’m still learning, always learning."}
              
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
          <Typography variant='h5' marked='center' align='center' className={classes.title} >
            “GET A MENTOR”
            </Typography>
            <FontAwesomeIcon
              icon={["fa", "hands-helping"]}
              size='3x'
              className={classes.ico}
            />
            <Typography variant='h5' align='center'>
              {"One of the best ways to improve yourself and your career is to find a mentor. "}
              {"Your Sundays will no longer be alike."}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Button
          color='primary'
          size='large'
          variant='contained'
          className={classes.button}
          component='a'
          href='/premium-themes/onepirate/sign-up/'
        >
          Get started
        </Button>
      </Grid>
    </Container>
    // </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
