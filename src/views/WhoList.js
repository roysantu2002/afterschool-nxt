import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import data from "../../src/data/influencer";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    display: "flex",
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
    margnTop: 4,
    maxWidth: 300,
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
});

class WhoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { influencerList: [] };
  }
  componentDidMount() {
    const influencerData = [];
    {
      data.map((postData) => {
        influencerData.push(postData);
      });
    }
    //console.log(influencerData)
    this.setState(() => ({
      influencerList: influencerData,
    }));
    //this.setState({ influencerList: influencerData });

    // getDataApi.getInfluencerAction().then((querySnapshot) => {
    //   console.log(querySnapshot)
    //   this.setState({ influencerList: querySnapshot });
    // });
  }
  // export default function WhoList() {
  // const [influencerList, setinfluencerList] = useState([]);
  // const classes = useStyles();

  // useEffect(() => {
  //   getDataApi.getInfluencerAction().then((querySnapshot) => {
  //     setinfluencerList(querySnapshot);
  //   });
  //   influencerList.map((influencer) => {
  //     console.log("----" + influencer.name);
  //   });
  // });

  render() {
    const { classes } = this.props;
    console.log(this.state.influencerList);
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h1' marked='center' align='center'>
            Be Inspired
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {/* // <div className={classes.root}>
      //    <GridList cellHeight={180} className={classes.gridList}> */}
            {/* <Container className={classes.root} component='section'> */}
            {this.state.influencerList.map((influencer) => (
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={influencer.img} />
                <CardContent className={classes.content}>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h5"}
                    gutterBottom
                  >
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
                    variant={"caption"}
                  >
                    {influencer.contributions}
                  </Typography>
                  <Divider className={classes.divider} light />
                  <Grid
                    item
                    rel='noopener noreferrer'
                    target='_blank'
                    href={influencer.ref}
                  >
                    <button
                    >Know More</button>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(WhoList);
