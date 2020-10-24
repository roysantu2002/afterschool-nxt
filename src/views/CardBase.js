import React from "react";
import Styles from "../utils/globalStyles";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

function CardBase(props) {
  return (
    <Card key={props.name} className={Styles.card}>
      {/* <CardMedia
        component="img"
        className={Styles.media}
        alt="Contemplative Reptile"
        image={props.img}
        title="Contemplative Reptile"
      /> */}
      <Box display="flex" alignContent="center" p={1}>
      <Avatar alt={props.name} src={props.img} className={Styles.media}/>
      </Box>
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
  );
}
//   <Card key={props.name} className={Styles.card}>{props.name}
//   <img src={props.img} alt={props.name}></img></Card>
export default CardBase;
