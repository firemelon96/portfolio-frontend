import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/sectionTitle";

function Experience() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  return (
    <div>
      <SectionTitle title="Experiences" />

      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col w-[30%] gap-10 border-l-2 sm:border-l-0 border-secondary  sm:flex-row sm:w-full sm:overflow-x-scroll sm:gap-5">
          {experiences.map((experience, index) => (
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
                {experience.period}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-3/4 sm:w-full ">
          <h1 className="text-tertiary text-2xl">
            {experiences[selectedItemIndex].title}
          </h1>
          <h1 className="text-fourth text-xl">
            {experiences[selectedItemIndex].company}
          </h1>
          <p className="text-fourth">
            {experiences[selectedItemIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
