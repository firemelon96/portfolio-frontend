import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/sectionTitle";

function About() {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { image, description1, description2, skills } = about;
  return (
    <div>
      <SectionTitle title="About" />

      <div className="flex w-full items-center sm:flex-col lg:flex-col lg:w-full gap-10">
        <div className="h-[70vh] w-1/2 lg:w-full sm:w-full">
          <lottie-player
            src={image}
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
        </div>
        <div className="flex flex-col gap-5 lg:w-full w-1/2 sm:w-full text-center">
          <p className="text-fourth text-xl">{description1 || ""}</p>
          <p className="text-fourth text-xl">{description2 || ""}</p>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-tertiary text-xl">
          Here are the few of technologies I've been working on recently :
        </h1>
        <div className="flex flex-wrap gap-10 mt-5 justify-center">
          {skills.map((skill, index) => (
            <div className="border border-tertiary py-3 px-10">
              <h1 className="text-tertiary my-0">{skill}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
