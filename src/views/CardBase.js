import React from "react";
import Styles from "../utils/globalStyles";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";

import {
  Typography,
  Grid,
  makeStyles,
  Button,
  Avatar,
} from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

export const CardBase = (props) => {
  return (
    // <div className={Styles.page}>
    <Paper className={Styles.paper}>
      <Grid
        container
        direction="column"
        alignItems="center"
        // className={Styles.root}
      >
        <Grid container justify="center" alignItems="center" spacing={5}>
          <div className={Styles.photoContainer}>
            <Avatar
              alt={props.name}
              src={props.img}
              className={Styles.avatar}
            />
          </div>
        </Grid>
        {/* <Card key={props.name}> */}
        <CardContent className={Styles.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          ></Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {props.title}
          </Typography>
          <Divider className={Styles.divider} light />
        </CardContent>

        <Typography className={"MuiTypography--subheading"} variant={"caption"}>
          {props.text}
        </Typography>
        {/* </Card> */}
      </Grid>
    </Paper>
    // </div>
  );
};

const Header = () => {
  return (
    <Grid container justify="flex-end">
      <Grid item xs={1}>
        <ClearIcon className={Styles.header} />
      </Grid>
    </Grid>
  );
};
