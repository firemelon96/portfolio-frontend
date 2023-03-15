import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/sectionTitle";

function ProjectCard() {
  //   const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  const shortDesc = (text, n) => {
    if (text.length > n) {
      const elipsis = text.substring(0, n).concat("...");
      return elipsis;
    }
    return text;
  };

  return (
    <div>
      <SectionTitle title="Projects " />

      <div className="p-10 grid grid-cols-4 gap-5 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            class="max-w-sm rounded overflow-hidden shadow-lg bg-secondary"
          >
            <a href={project.link}>
              <img
                class="w-full"
                src={project.image.filePath}
                alt="Sunset in the mountains"
              />
            </a>
            <div class="px-6 py-4">
              <div class="font-bold text-2xl mb-2 text-tertiary ">
                {project.title}
              </div>
              <p class="text-base text-fourth ">
                {shortDesc(project.description, 100)}
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              {project.technologies.map((item, index) => (
                <span
                  key={index}
                  class="inline-block bg-fourth rounded-full px-3 py-1 text-sm text-secondary mr-2 mb-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex py-10 gap-10 sm:flex-col">
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
            src={projects[selectedItemIndex].image.filePath}
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
      </div> */}
    </div>
  );
}

export default ProjectCard;
