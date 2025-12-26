import React, { useEffect } from "react";
import "./homepage.scss";
import { setSidebar } from "../../reducers/sidebarSlice";
import { useDispatch } from "react-redux";
import Footer from "../../components/footer/Footer";
import Hero from "./hero/Hero";
import { setAllowQrCode } from "../../reducers/identitySlice";
import JobOffer from "../../components/job-offer/JobOffer";

const HomePage: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(setSidebar("home"))
      dispatch(setAllowQrCode(true))

    return ()=>{
      dispatch(setAllowQrCode(false))
    }
    },[])

  return (
    <section className="home-page">
      <Hero/>
      <JobOffer/>
      <Footer/>
    </section>
  );
};

export default HomePage;
