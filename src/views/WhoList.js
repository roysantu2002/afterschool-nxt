import React, { useState, useEffect } from "react";
import Styles from "../utils/globalStyles";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import data from "../data/influencer.json";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import * as getDataApi from "../utils/getDataApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "react-reveal/Fade";
import nextId from "react-id-generator";
import {setWithExpiry, getWithExpiry} from '../utils/helpers'
const styles = (theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  card: {
    padding: 8,
    marginLeft: 8,
    margnTop: 8,
    minWidth: 185,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  caption: {
    maxWidth: "60%",
  },
  media: {
    width: "100%",
    margnTop: "5em",
    paddingTop: "100%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing.unit * 3,
  },
  divider: {
    margin: theme.spacing(3),
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
});

class WhoList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      influencerList: [],
      localStorageList: [],
      loading: false,
    };
  }
  componentDidMount() {
    const influencerLocalData = []
    const influencerRemoteData = []
    const howLong = 259200000
    // const localStorageInfluenceData = localStorage.getItem("influencerList")
    const localStorageInfluenceData = getWithExpiry("influencerList")
    // console.log(localStorageInfluenceData)
    // localStorageInfluenceData ? localStorage.getItem('user') : '';
    // this.setState({ user, rememberMe });

    if (localStorageInfluenceData === null) {
      console.log("Local Storage Null")
      data.map((postData) => {
        influencerLocalData.push(postData);
      });

      getDataApi.getInfluencerAction().then((querySnapshot) => {
        try {
          if (querySnapshot !== null) {
            querySnapshot.map((query) => {
              if (query.title !== "") {
                influencerRemoteData.push(query);
              }
            });
          }
          this.setState(() => ({
            influencerList: influencerRemoteData,
          }));
          setWithExpiry("influencerList", JSON.stringify(influencerRemoteData), howLong)
          this.setState(() => ({
            loading: true,
          }));
        } catch (exception_var) {
          this.setState(() => ({
            influencerList: influencerLocalData,
          }));
          this.setState(() => ({
            loading: true,
          }));
          setWithExpiry("influencerList", JSON.stringify(influencerLocalData), howLong)
    
        }
      });
    } else {
      const localData = JSON.parse(localStorageInfluenceData)
      this.setState(() => ({
        loading: true,
      }));
        this.setState(() => ({
        influencerList: localData,
      }))
    }
  }

  render() {
    const { classes } = this.props
    const influencerList = this.state.influencerList
    const loadingDeatils = (
      <Container className={classes.loading} component="section">
        <Typography variant="h2" marked="center" align="center">
          Be Inspired
        </Typography>
        <CircularProgress color="secondary" align="center" />
      </Container>
    );

    const influencerDetails = (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" marked="center" align="center">
            Be Inspired
          </Typography>
        </Grid>
        <Fade bottom cascade={true}>
          <Grid item xs={12}>
            <Grid container className={classes.root} spacing={4}>
              {influencerList &&
                influencerList.map((influencer) => (
                  <Grid key={nextId()} item xs={8} md={4} sm={6} xl={3}>
                    <Card key={nextId()} className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image={influencer.img}
                      />
                      <CardContent className={classes.content}>
                        <Typography variant="h5" gutterBottom>
                          {influencer.name}
                        </Typography>
                        <Typography
                          className={"MuiTypography--heading"}
                          variant={"h6"}
                          gutterBottom
                        >
                          {influencer.birthplace}
                        </Typography>
                        <Typography
                          className={"MuiTypography--subheading"}
                          variant="subtitle1"
                        >
                          {influencer.contributions}
                        </Typography>
                        <Divider className={classes.divider} light />
                        <Grid
                          item
                          component={"a"}
                          rel="noopener noreferrer"
                          target="_blank"
                          href={influencer.ref}
                        >
                          <button>Know More</button>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container className={classes.root} spacing={4}>
              <Grid item>
                {" "}
                <Typography>Test</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Grid>
    );

    return this.state.loading ? influencerDetails : loadingDeatils;
  }
}
export default withStyles(styles)(WhoList);
