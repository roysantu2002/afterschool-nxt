import React, { useState, useEffect } from "react";
import Link from "../../src/Link";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { TextareaAutosize } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";


function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  toobarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "6em",
    [theme.breakpoints.down("md")]: {
      height: "5.4em",
      marginLeft: "-1.5em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5em",
      marginLeft: "-1em",
    },
    padding: ".25em",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
  },
  menu: {
    backgroundColor: theme.palette.common.darkRed,
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "30px",
    width: "30px",
  },
  drawer: {
    backgroundColor: theme.palette.common.darkRed,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  customButton: {
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamilySecondary,
    margin: theme.spacing(10),
    borderRadius: 50,
    width: 110,
    textTransform: "none",
    fontSize: ".8rem",
  },
  drawerItemLogin: {
    backgroundColor: theme.palette.common.darkGold,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (event, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };

  const menuOptions = [
    { name: "Learn", link: "/Learn", activeIndex: 2, selectedIndex: 0 },
    { name: "Computer", link: "/Computer", activeIndex: 2, selectedIndex: 1 },
    { name: "Coding", link: "/Coding", activeIndex: 2, selectedIndex: 2 },
    { name: "Robotics", link: "/Robotics", activeIndex: 2, selectedIndex: 3 },
    { name: "Baking", link: "/Baking", activeIndex: 2, selectedIndex: 4 },
    { name: "Cooking", link: "/Cooking", activeIndex: 2, selectedIndex: 5 },
    { name: "Dancing", link: "/Dancing", activeIndex: 2, selectedIndex: 6 },
    { name: "Writing", link: "/Writing", activeIndex: 2, selectedIndex: 7 },
    {
      name: "Videography",
      link: "/Videography",
      activeIndex: 2,
      selectedIndex: 8,
    },
    {
      name: "Filmmaking",
      link: "/Filmmaking",
      activeIndex: 2,
      selectedIndex: 9,
    },
  ];

  const routes = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon />,
      activeIndex: 0,
    },
    {
      name: "Who",
      link: "/Who",
      icon: <HelpIcon />,
      activeIndex: 1,
    },
    {
      name: "Learn",
      link: "/Learn",
      icon: <ThumbUp />,
      activeIndex: 2,
      ariaOwns: anchorEl ? "learn-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      onMouseOver: (event) => handleClick(event),
    },
    {
      name: "About Us",
      icon: <InfoIcon />,
      link: "/About",
      activeIndex: 3,
    },
    {
      name: "Contact Us",
      link: "/Contact",
      icon: <PhoneIcon />,
      activeIndex: 4,
    },
  ];
  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          // console.log(route.name);
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              route.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [props.value, menuOptions, props.selectedIndex, routes, props]);

  const tabs = (
    <React.Fragment>
      <Tabs
        className={classes.tabContainer}
        //color="secondary"
        value={props.value}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='on'
        // indicatorColor="primary"
        //textColor='darkBlue'
        aria-label='scrollable force tabs example'
      >
        {routes.map((route, index) => (
          <Tab
            className={classes.tab}
            key={`${route}${index}`}
            component={Link}
            href={route.link}
            label={route.name}
            aria-owns={route.ariaowns}
            aria-haspopup={route.ariahaspopup}
            icon={route.icon}
            onMouseOver={route.onMouseOver}
            {...a11yProps(route.index)}
          />
        ))}
      </Tabs>

      <Button
        component={Link}
        color='secondary'
        href='/SignUp'
        variant='contained'
        className={classes.cusmButton}
      >
        Login
      </Button>

      <Menu
        id='learn-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option}${i}`}
            component={Link}
            href={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              props.setValue(2);
              handleClose();
            }}
            selected={i === props.selectedIndex && props.value === 2}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toobarMargin} />
        <List disablePadding>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(0);
            }}
            divider
            button
            component={Link}
            href='/'
            selected={props.value === 0}
            classes={{ selecte: classes.drawerItemSelected }}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(1);
            }}
            divider
            button
            component={Link}
            href='/Who'
            selected={props.value === 1}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Who
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(2);
            }}
            divider
            button
            component={Link}
            href='/Learn'
            selected={props.value === 2}
          >
            <ListItemText
              className={
                props.value === 2
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItemSelected
              }
              className={classes.drawerItem}
              disableTypography
            >
              Learn
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(3);
            }}
            divider
            button
            component={Link}
            href='/About'
            selected={props.value === 3}
          >
            <ListItemText
              className={
                props.value === 3
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItemSelected
              }
              className={classes.drawerItem}
              disableTypography
            >
              About
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(4);
            }}
            divider
            button
            component={Link}
            href='/Contact'
            selected={props.value === 4}
          >
            <ListItemText
              className={
                props.value === 4
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItemSelected
              }
              className={classes.drawerItem}
              disableTypography
            >
              Contact
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(4);
            }}
            divider
            button
            component={Link}
            classes={{
              root: classes.drawerItemLogin,
              selected: classes.drawerItemSelected,
            }}
            href='/Login'
            selected={props.value === 4}
          >
            <ListItemText
              className={
                props.value === 4
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItemSelected
              }
              className={classes.drawerItem}
              disableTypography
            >
              Login
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>

      <IconButton
        className={classes.drawerIconContainer}
        color='secondary'
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed' className={classes.appbar}>
          <Toolbar disableGutters={false}>
            <Button
              disableRipple
              className={classes.logoContainer}
              component={Link}
              href='/'
              onClick={() => props.setValue(0)}
            >
              <img
                src='/assets/asap.svg'
                alt='logo'
                className={classes.logo}
              ></img>
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toobarMargin} />
    </React.Fragment>
  );
}
