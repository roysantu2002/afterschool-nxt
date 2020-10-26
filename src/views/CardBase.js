import React from "react";
import Styles from "../utils/globalStyles";
import ClearIcon from "@material-ui/icons/Clear";

import {
  Typography,
  Grid,
  makeStyles,
  Button,
  Avatar
} from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Box from '@material-ui/core/Box';

export const CardBase = (props) => {
  return (
    <div className={Styles.page}>
     <Grid
        container
        direction="column"
        alignItems="center"
        className={Styles.root}
      >
   {/* <Header className={Styles} /> */}
      {/* <CardMedia
        component="img"
        className={Styles.media}
        alt="Contemplative Reptile"
        image={props.img}
        title="Contemplative Reptile"
      /> */}
      <Grid container justify="center" alignItems="center" spacing={5}>
     <div className={Styles.photoContainer}>
      <Avatar alt={props.name} src={props.img} className={Styles.avatar}/>
     </div>
     </Grid>
     <Card key={props.name} className={Styles.card}>
      <CardContent className={Styles.content}>
        <Typography
          className={"MuiTypography--heading"}
          variant={"h6"}
          gutterBottom
        >
          Nature Around Us
        </Typography>
        <Typography className={"MuiTypography--subheading"} variant={"caption"}>
          We are going to learn different kinds of species in nature that live
          together to form amazing environment.
        </Typography>
        <Divider className={Styles.divider} light />
      </CardContent>
    </Card>
    </Grid>
    </div>
  );
}

const Header = () => {
  return (
    <Grid container justify="flex-end">
      <Grid item xs={1}>
        <ClearIcon className={Styles.header} />
      </Grid>
    </Grid>
  );
};