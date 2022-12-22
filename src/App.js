import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/errorPage";
import Loader from "./components/loader";
import Admin from "./pages/admin";
import AdminLogin from "./pages/admin/adminLogin";
import Home from "./pages/home";
import {
  HideLoading,
  SetPortfolioData,
  ShowLoading,
  ReloadData,
} from "./redux/rootSlice";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();
  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${URL}/api/portfolio/get-portfolio-data`
      );
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* <Route path="/error" element={<ErrorPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
