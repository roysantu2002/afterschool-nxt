import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import * as getDataApi from "../../src/utils/getDataApi";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing.unit * 3,
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.unit,
    },
  },
}));
export default function WhoList() {
  const [influencerList, setinfluencerList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getDataApi.getInfluencerAction().then((querySnapshot) => {
      setinfluencerList(querySnapshot);
    });
    influencerList.map((influencer) => {
      console.log("----" + influencer.name);
    });
  });

  return (
    <Container className={classes.root} component='section'>
      {influencerList.map((influencer) => (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={influencer.img}
        />
        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            {influencer.name}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
           {influencer.contributions}
          </Typography>
          <Divider className={classes.divider} light />
        </CardContent>
      </Card>
        ))}
    </Container>
  );
}
