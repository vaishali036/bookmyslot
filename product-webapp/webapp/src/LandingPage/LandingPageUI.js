import React,{useEffect} from "react";
import "./LandingPageUI.css";
import CardSection from "./Sections/AboutUs";
import Features from "./Sections/Features";
import Footer from "./components/Footer";
import Header from "./Sections/Header";
import Responsibilities from "./Sections/Responsibilities";
import { OuterLayout } from "./styles/Layout1";
import aos from 'aos'
import 'aos/dist/aos.css'

function LandingPageUI() {


  useEffect(()=>{
    aos.init({duration: 3000})
  },[])

  return (
    <div className="App">
      <Header />
      <OuterLayout>
        <main>
          <CardSection />
          <Features />
          <Responsibilities />
        </main>
      </OuterLayout>
      <Footer />
    </div>
  );
}

export default LandingPageUI;
