import React, { useEffect } from "react";
import "./homepage.scss";
import { setSidebar } from "../../reducers/sidebarSlice";
import { useDispatch } from "react-redux";
import Footer from "../../components/footer/Footer";
import Hero from "./hero/Hero";

const HomePage: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(setSidebar("home"))
    },[])

  return (
    <section className="home-page">
      <Hero/>
      <Footer/>
    </section>
  );
};

export default HomePage;
