import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import MyWorks from "./components/MyWorks/MyWork";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <About/>
      <Services/>
      <MyWorks/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App