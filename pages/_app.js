import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "../public/assets/styles/style.css";
import "../public/assets/styles/fontawesome.min.css";
import "../src/fontawesome";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/UI/AppTheme";
import Header from "../src/UI/Header";
import Footer from "../src/UI/Footer";
import Snackbar from "../src/UI/Snackbar";
import GoTop from "../src/UI/Components/Shared/GoTop";
import TopPanel from "../src/UI/Components/TopPanel";
import { createStore} from "redux";
import middleware from "../src/middleware";
import reducer from "../src/reducers";
import { Provider } from "react-redux";
// import FirebaseProvider from './firebase/firebase'

// require('dotenv').config()

export default function MyApp(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const store = createStore(reducer, middleware);

  // componentDidMount() {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles && jssStyles.parentNode) {
  //     jssStyles.parentNode.removeChild(jssStyles);
  //   }
  // }
  //   this.state = {value: 0, selectedIndex: 0}

  // setValue = index => {
  //   this.setState({value: index})
  // }

  // setSelectedIndex = index => {
  //   this.setState({selectedIndex: index})
  // }

  const { Component, pageProps } = props;


  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  // console.log(`env ${process.env.DB_HOST}`)
  return (

    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <TopPanel/> */}
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Provider store={store}>
        {/* <FirebaseProvider> */}
          <Component
            {...pageProps}
            setValue={setValue}
            selectedIndex={selectedIndex}
          />
          {/* </FirebaseProvider> */}
        </Provider>
        <Footer setValue={setValue} selectedIndex={selectedIndex} />
      </ThemeProvider>
      {/* <GoTop scrollStepInPx="50" delayInMs="10.50" /> */}
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
