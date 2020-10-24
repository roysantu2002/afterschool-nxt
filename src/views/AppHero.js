
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../UI/Button/Button'
import Typography from '../UI/Typography';
import AppHeroLayout from './AppHeroLayout';

const backgroundImage =
  'https://images.pexels.com/photos/159823/kids-girl-pencil-drawing-159823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

const styles = (theme) => ({
  background: {
   backgroundImage: `url(${backgroundImage})`,
    //backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
    maxwidth: "80%",

  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
  },
  more: {
    marginTop: theme.spacing(3),
  },
  head:{
    marginTop: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  }
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <AppHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="Learning afterschool" />
      <Typography color="inherit" align="center" variant="h1" className={classes.head}>
        AfterSchool Learning Centre
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Why Afterschooolapp? <br/>
        Oneroof Learning Guidance Centre

      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/premium-themes/onepirate/sign-up/"
      >
        Register
      </Button>
      <Typography variant="subtitle1" color="inherit" className={classes.more}>
        Discover your true talent
      </Typography>
    </AppHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProductHero);