import React from 'react'
import './Home.css'
import profile_img from '../../assets/profile_img.svg'
import CV from '../../assets/My_Resume.pdf'

const Hero = () => {
    return (
        <div id='home' className='hero'>
          <img src={profile_img} alt="" />
          <h1>Hi, I'm <span>Pardha Saradhi Alapati</span></h1>
          <p>I am a passionate AI/ML & Data Engineer Currently Studying BTech 3rd Year In DVR & Dr.HS MIC College Of Technology, Kanchikacherla. I have worked on various projects in the domains of Computer Vision, Natural Language Processing, and Data Engineering.</p>
          <div className="hero-action">
            <div className="hero-connect">Connect With Me</div>
            <a href={CV} download="Pardha_Saradhi_Resume.pdf" className="hero-resume">My Resume</a>
          </div>         
        </div>
    )
}

export default Hero