import zIndex from "@material-ui/core/styles/zIndex";

const globalStyles = (theme) => ({
  paper: {
    width: "50%",
    height: "150%",
    backgroundColor: 'grey'
  },
  root: {
    border: `1px solid ${theme.palette.secondary[400]}`,
    padding: theme.spacing(2),
    borderRadius: "2px",
    // minWidth: 275
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  page: {
    padding: theme.spacing(10)
  },

  card: {
    padding: 8,
    margnTop: 4,
    // minWidth: 275,
    // margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  photoContainer: {
    marginBottom: theme.spacing(1)
  },
  media: {
    paddingTop: "56.25%",
    alignSelf: 'center',
    // height: '100%', 
    // width: '100%',
    display: 'flex',
    margin: "auto",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    zIndex: '-10px'
  },
  content: {
    textAlign: "left",
    padding: theme.spacing.unit * 3
  },
  header: {
    color: theme.palette.grey[400],
    height: "15px"
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  }

});

export default globalStyles;
