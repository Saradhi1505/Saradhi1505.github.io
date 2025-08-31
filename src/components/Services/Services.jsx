import React from "react";
import "./Services.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import Services_Data from "../../assets/services";
import arrow_icon from "../../assets/arrow_icon.svg";
const Services = () => {
    return (
        <div id="services" className="services">
            <div className="services-title">
                <h1>My Services</h1>
                <img src={theme_pattern} alt="Theme Pattern" />
            </div>
            <div className="services-container">
                {Services_Data.map((service, index) => {
                    return (
                        <div key={index} className="services-format">
                            <a href="#contact" onClick={() => setMenu("contact")}>
                            <h3>{service.s_no}</h3>
                            <h2>{service.s_name}</h2>
                            <p>{service.s_desc}</p>
                            <div className="services-readmore">
                                <p>Learn More</p>
                                <img src={arrow_icon} alt="" />
                            </div>
                        </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;