import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../UI/Typography";
import CardBase from './CardBase'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = (theme) => ({
  root: {
    // display: 'flex',
    // overflow: 'hidden',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    backgroundImage: "url('/assets/bg-patt.svg')",
    
  },
  // container: {
  //   marginTop: theme.spacing(15),
  //   marginBottom: theme.spacing(30),
  //   display: 'flex',
  //   position: 'relative',

  // },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2em",
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    color:  theme.palette.common.darkBlue,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
  ico: {
    size: "3em",
    color: "#835A00",
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
    <Container  component="section">
      {/* </Container><Container className={classes.root} component='section'> */}
       <Typography variant="h2" marked="center" align="center">
        Use your imagination, plan your success
      </Typography>
      {/* <img
          src="/static/assets/bubble.png"
          className={classes.curvyLines}
          alt="curvy lines"
        /> */}
      <Grid container spacing={5}>
    
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <FontAwesomeIcon icon={["fa", "thumbtack"]} size='3x' className={classes.ico}/>
            {/* <img
                className={classes.image}
                src="/assets/push.svg"
                alt="suitcase"
              /> */}
            <Typography variant='h5' className={classes.title}>
             CHALLENGE YOURSELF
             <CardBase name="challenge" img='/assets/challenge.svg'></CardBase>
            </Typography>
            <Typography variant='h5'>
              {"Why Challenge Yourself?"} <br />
              {"achiever went little far from the comfort zone."}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <FontAwesomeIcon icon={["fa", "link"]} size='3x'
              color='#835A00' className={classes.ico} />
            {/* <img
                className={classes.image}
                src="/assets/connect.svg"
                alt="graph"
              /> */}
            <Typography variant='h5' className={classes.title}>
              CONNECT
            </Typography>
            <Typography variant='h5'>
              {"Why Connect Afterschool?"} <br />
              {"as we understand you better."}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <FontAwesomeIcon
              icon={["fa", "crosshairs"]}
              size='3x'
              color='#835A00'
            />
            <Typography variant='h5' className={classes.title}>
              ACHIEVE
            </Typography>
            <Typography variant='h5'>
              {"You'll no more feel stuck in life."}
              {"as you learn, you achieve what you want."}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
