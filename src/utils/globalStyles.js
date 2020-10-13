const globalStyles = (theme) => ({
  loading: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
});

export default globalStyles;
