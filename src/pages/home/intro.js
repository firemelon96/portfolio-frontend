import React from "react";
import { useSelector } from "react-redux";

function Intro() {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstname, lastname, welcomeText, caption, description } = intro;
  return (
    <div className="flex lg:bg-right overflow-hidden lg:bg-p-0 sm:flex-col">
      <div className="h-[80vh] sm:h-[60vh]  flex flex-col items-start justify-center gap-2 sm:items-center sm:gap-4 py-10 sm:w-full w-2/3 lg:w-[90%] md:gap-0 ">
        <h1 className="text-fourth">{welcomeText || ""}</h1>
        <h1 className="text-6xl sm:text-4xl text-tertiary font-semibold">
          {firstname || ""} {lastname || ""}
        </h1>
        <h1 className="text-4xl sm:text-2xl text-fourth font-semibold">
          {caption || ""}
        </h1>
        <p className="text-fourth sm:text-center w-2/3 sm:w-full">
          {description || ""}
        </p>
        <a
          className="text-fourth px-10  py-3 bg-tertiary rounded-full hover:bg-fourth hover:text-tertiary"
          href="mailto:almujahid.ibno.jamion@gmail.com"
        >
          Get in touch
        </a>
        {/* <button type="" className=" px-10 py-3 bg-tertiary rounded-full">
          
        </button> */}
      </div>
      <div className=" w-[40%] lg:hidden bg-[url('../public/img/estong.png')] bg-contain bg-no-repeat bg-right"></div>
    </div>
  );
}

export default Intro;
