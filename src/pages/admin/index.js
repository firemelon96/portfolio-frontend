import React, { useEffect } from "react";
import Header from "../../components/header";
import { Tabs } from "antd";
import AdminIntro from "./adminIntro";
import AdminAbout from "./adminAbout";
import { useSelector } from "react-redux";
import AdminExperiences from "./adminExperiences";
import AdminProjects from "./adminProjects";
import AdminContact from "./adminContact";
function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex gap-10 items-center px-5 py-2 justify-between">
        <div className="flex gap-10 items-center">
          <h1 className="text-3xl text-tertiary mt-5">Protfolio Admin</h1>
          <div className="w-60 h-[1px] bg-secondary "></div>
        </div>
        <h1
          className="text-primary text-xl cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </h1>
      </div>

      {portfolioData && (
        <div className="mt-5 p-5">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Intro" key="1">
              <AdminIntro />
            </Tabs.TabPane>
            <Tabs.TabPane tab="About" key="2">
              <AdminAbout />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Experiences" key="3">
              <AdminExperiences />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Projects" key="4">
              <AdminProjects />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Contact" key="5">
              <AdminContact />
            </Tabs.TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Admin;
