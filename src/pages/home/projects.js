import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/sectionTitle";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  return (
    <div>
      <SectionTitle title="Projects" />

      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col w-[30%] gap-10 border-l-2 sm:border-l-0 border-secondary  sm:flex-row sm:w-full sm:overflow-x-scroll sm:gap-5">
          {projects.map((project, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? " text-fourth border-fourth border-l-4 -ml-[3px] bg-secondary py-3"
                    : "text-secondary"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-5 w-3/4 sm:w-full sm:flex-col">
          <img
            src={projects[selectedItemIndex].image}
            alt=""
            className="h-60 w-72"
          />
          <div className="flex flex-col gap-5">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={projects[selectedItemIndex].link}
            >
              <h1 className="text-tertiary text-2xl">
                {projects[selectedItemIndex].title}
              </h1>
            </a>
            <p className="text-fourth">
              {projects[selectedItemIndex].technologies.join(", ")}
            </p>
            <p className="text-fourth">
              {projects[selectedItemIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
