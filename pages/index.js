import React, { Component } from "react";
import AppHero from "../src/views/AppHero"
import AppValues from "../src/views/AppValues";
import Courses from "../src/views/CourseCategories";
import Process from "../src/views/CourseProcess";
import AppCTA from "../src/views/AppCTA";
import GetHelp from "../src/views/GetHelp";
import { Container } from "@material-ui/core";

function Home() {
  return (
    <React.Fragment>
  
        <AppHero />
        <AppValues />
        <Courses />
        <Process />
        <AppCTA />
        <GetHelp />
  
    </React.Fragment>
  );
}
export default Home;
