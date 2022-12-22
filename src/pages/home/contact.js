import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/sectionTitle";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contacts } = portfolioData;
  return (
    <div>
      <SectionTitle title="Hi there.." />
      <div className="flex sm:flex-col justify-between items-center bg-secondary">
        <div className="flex flex-col text-[16px] text-fourth ml-5">
          <p>{"{"}</p>
          {Object.keys(contacts).map(
            (key) =>
              key !== "_id" && (
                <p className="ml-5">
                  <span>{key} : </span>
                  <span>"{contacts[key]}",</span>
                </p>
              )
          )}
          <p>{"}"}</p>
        </div>

        <div className="h-[600px]">
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_hqrpwcwb.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
