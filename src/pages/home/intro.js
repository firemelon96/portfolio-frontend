import React from "react";
import { useSelector } from "react-redux";

function Intro() {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstname, lastname, welcomeText, caption, desciption } = intro;
  return (
    <div className="flex sm:flex-col">
      <div className="h-[80vh] sm:h-[60vh] bg-primary flex flex-col items-start justify-center gap-2 sm:items-center sm:gap-4 py-10 sm:w-full w-2/3 md:gap-0">
        <h1 className="text-fourth">{welcomeText || ""}</h1>
        <h1 className="text-6xl sm:text-3xl text-tertiary font-semibold">
          {firstname || ""} {lastname || ""}
        </h1>
        <h1 className="text-4xl sm:text-xl text-fourth font-semibold">
          {caption || ""}
        </h1>
        <p className="text-fourth sm:text-center w-2/3 sm:w-full">
          {desciption || ""}
        </p>
        <button
          type=""
          className="border-2 border-tertiary text-tertiary px-10 py-3 rounded"
        >
          <a
            className="text-tertiary"
            href="mailto:almujahid.ibno.jamion@gmail.com"
          >
            Get in touch
          </a>
        </button>
      </div>
      <div className=" w-[40%] bg-[url('../public/img/estong.png')] bg-contain bg-no-repeat bg-center "></div>
    </div>
  );
}

export default Intro;
