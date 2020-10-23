import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Typography from "../UI/Typography";
import * as getDataApi from "../utils/getDataApi";
import data from "../data/courseCat.json";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover": {
      zIndex: 1,
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15,
    },
    "&:hover $imageMarked": {
      opacity: 0,
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor",
    },
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
});

class CourseCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseCat: [],
      loading: false,
    };
  }
  componentDidMount() {
    const courseLocalData = [];
    const courseRemoteData = [];

    //to be removed
    // console.log("Axios")
    // axios
    //   .get("https://us-central1-react-19b73.cloudfunctions.net/sendMail")
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    data.map((postData) => {
      if (postData !== "") {
        // console.log(`local:${data}`);
        courseLocalData.push(postData);
      }
    });

    getDataApi.getCourseAction().then((querySnapshot) => {
      console.log(`querySnapshot: ${querySnapshot}`);
      try {
        if (querySnapshot !== null) {
          querySnapshot.map((query) => {
            if (query.title !== "") {
              courseRemoteData.push(query);
            }
          });
        }
        this.setState(() => ({
          courseCat: courseRemoteData,
        }));
        this.setState(() => ({
          loading: true,
        }));
      } catch (exception_var) {
        console.log(exception_var);
        this.setState(() => ({
          courseCat: courseLocalData,
        }));
        this.setState(() => ({
          loading: true,
        }));
      }
    });
  }

  // {
  //   data.map((postData) => {
  //     influencerLocalData.push(postData);
  //   });
  // }

  // const images = [
  //   {
  //     url: "/assets/Computer.jpg",
  //     title: "Computer",
  //     width: "40%",
  //   },
  //   {
  //     url: "/assets/Coding.jpg",
  //     title: "Coding",
  //     width: "20%",
  //   },
  //   {
  //     url: "/assets/Robotics.jpg",
  //     title: "Robotics",
  //     width: "40%",
  //   },
  //   {
  //     url: "/assets/Baking.jpg",
  //     title: "Baking",
  //     width: "38%",
  //   },
  //   {
  //     url: "/assets/Cooking.jpg",
  //     title: "Cooking",
  //     width: "38%",
  //   },
  //   {
  //     url: "/assets/Dancing.jpg",
  //     title: "Dancing",
  //     width: "24%",
  //   },
  //   {
  //     url: "/assets/Writing.jpg",
  //     title: "Writing",
  //     width: "40%",
  //   },
  //   {
  //     url: "/assets/Videography.jpg",
  //     title: "Videography",
  //     width: "20%",
  //   },
  //   {
  //     url: "/assets/Filmmaking.jpg",
  //     title: "Filmmaking",
  //     width: "40%",
  //   },
  // ];

  // useEffect(() => {
  //   getCourseAction()
  //   .then((querySnapshot) => {
  //     console.log(`From ${querySnapshot}`)
  //       setcourseCat(querySnapshot)
  //   })
  // })
  render() {
    const { classes } = this.props;
    const courseCat = this.state.courseCat;

    const loadingDeatils = (
      <Container className={classes.loading} component="section">
        <Typography variant="h2" marked="center" align="center">
          For all your dreams and all desires
        </Typography>
        <CircularProgress color="secondary" align="center" />
      </Container>
    );

    const courseDetails = (
      <Container className={classes.root} component="section">
        <Typography variant="h2" marked="center" align="center">
          For all your dreams and all desires
        </Typography>
        <div className={classes.images}>
          {courseCat &&
            courseCat.map((image) => (
              <ButtonBase
                href="/Learn"
                key={image.title}
                className={classes.imageWrapper}
                style={{
                  width: image.width,
                }}
              >
                <div
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${image.url})`,
                  }}
                />
                <div className={classes.imageBackdrop} />
                <div className={classes.imageButton}>
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {image.title}
                    <div className={classes.imageMarked} />
                  </Typography>
                </div>
              </ButtonBase>
            ))}
        </div>
      </Container>
    );

    // console.log(this.state.influencerList);
    return this.state.loading ? courseDetails : loadingDeatils;
  }
}

CourseCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CourseCategories);
