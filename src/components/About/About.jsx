import React, { useState } from "react";
import "./About.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import about_profile from "../../assets/about_profile.svg";

const About = () => {
  const [activeTab, setActiveTab] = useState("skills");

  const opentab = (tabname) => {
    setActiveTab(tabname);
  };

  return (
    <div id="about" className="about">
      <div className="about-title">
        <h1>About Me</h1>
        <img src={theme_pattern} alt="Theme Pattern" />
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img src={about_profile} alt="Profile" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p className="about-para-intro">
              Hi there! 👋
              I’m Pardha Saradhi Alapati, an AI/ML Engineer and Data Engineer
              passionate about building intelligent solutions. With expertise in
              machine learning, deep learning, and computer vision.
            <p className="about-para-middle">I have worked on projects like employee burnout prediction and smart traffic management (ANPR & ATCC) using YOLO, OpenCV, and OCR.</p>            </p>
            <p className="about-para-ending">
              My passion lies in leveraging AI and data-driven solutions to
              solve real-world problems efficiently. Whether it's designing
              intelligent automation systems or improving model accuracy, I am
              always eager to push the boundaries of what AI can achieve.
            </p>
          </div>
          <div className="tab-titles">
            <p
              className={`tab-links ${activeTab === "skills" ? "active-link" : ""}`}
              onClick={() => opentab("skills")}
            >
              Skills
            </p>
            <p
              className={`tab-links ${activeTab === "experience" ? "active-link" : ""}`}
              onClick={() => opentab("experience")}
            >
              Experience
            </p>
            <p
              className={`tab-links ${activeTab === "education" ? "active-link" : ""}`}
              onClick={() => opentab("education")}
            >
              Education
            </p>
          </div>
          <div
            className={`tab-contents ${activeTab === "skills" ? "active-tab" : ""}`}
            id="skills"
          >
            <ul>
              <li>
                <span>HTML/CSS</span>
                <br />
                Designing Webpages
              </li>
              <li>
                <span>Python</span>
                <br />
                Backend Development
              </li>
              <li>
                <span>Data Science & Analytics</span>
                <br />
                Data Preprocessing & EDA
              </li>
            </ul>
          </div>
          <div
            className={`tab-contents ${activeTab === "experience" ? "active-tab" : ""}`}
            id="experience"
          >
            <ul>
              <li>
                <span>2024 - 2025</span>
                <br />
                ANPR & ATCC FOR STMS
              </li>
              <li>
                <span>2024 - 2025</span>
                <br />
                Employee Burnout Analysis & Prediction
              </li>
              <li>
                <span>2024 - 2025</span>
                <br />
                Employee Burnout Prediction & UI Development
              </li>
            </ul>
          </div>
          <div
            className={`tab-contents ${activeTab === "education" ? "active-tab" : ""}`}
            id="education"
          >
            <ul>
              <li>
                <span>SSC Education [Year Passed: 2020]</span>
                <br />
                S K V H SCHOOL, Vijayawada
              </li>
              <li>
                <span>Intermediate [2020-2022]</span>
                <br />
                Sri Sarada Junior College, Vijayawada
              </li>
              <li>
                <span>BTech [2022-2026]</span>
                <br />
                DVR & Dr. HS MIC College Of Technology, Kanchikacherla
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;