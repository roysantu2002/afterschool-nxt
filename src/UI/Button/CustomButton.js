import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const useStyles = theme => ({
  root: {
    borderRadius: 0,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamilySecondary,
    padding: theme.spacing(2, 4),
    fontSize: theme.typography.pxToRem(14),
    boxShadow: 'none',
    '&:active, &:focus': {
      boxShadow: 'none',
    },
  },
});

function CustomButton(props) {
  const classes = useStyles();
  return <Button variant="contained"  className={classes.root}/>;
}

// CustomButton.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default CustomButton

