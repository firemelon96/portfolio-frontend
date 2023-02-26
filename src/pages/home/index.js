import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import About from "./about";
import Contact from "./contact";
import Experience from "./experiences";
import Footer from "./footer";
import Intro from "./intro";
import LeftIcon from "./leftIcon";
import ProjectCard from "./projectCard";
// import Projects from "./projects";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      <Header />
      {portfolioData && (
        <div className="bg-primary px-40 sm:px-5">
          <Intro />
          <About />
          <ProjectCard />
          <Experience />
          {/* <Projects /> */}
          <Contact />
          <Footer />
          <LeftIcon />
        </div>
      )}
    </div>
  );
}

export default Home;
