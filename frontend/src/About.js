import React from 'react';
import { Link } from 'react-router-dom';
import s from './About.module.css';
const About = () => {
  return (
    <div>
      <div className={`${s.container} ${s.flex} ${s.aboutsection}`}>
        <div className={`${s.flex} ${s.desc}`}>
          <h4>About Us</h4>
          <h3>Let Us Come Together To Make a Difference</h3>
          <p>We invite you to join us in our mission to make a difference. Whether through donations, volunteering, or spreading the word, your support helps us continue our work and reach more people in need. Together, we can create positive change and build a better future for all.</p>
          <div className={`${s.flex} `}>
            <div>
            <div className={s.logo}>
                <img src="/group-3181.svg"></img>   
                <b>Our Mission</b>
            </div>
            <p>Our mission is to provide financial assistance to individuals and families in need through a transparent and effective crowdfunding platform. We aim to empower those facing financial hardships by connecting them with compassionate donors and supporters who believe in their cause.</p>
            </div>
            <div>
            <div className={s.logo}>
                <img src="/group-3180.svg"></img>
                <b>Our Vision</b>
            </div>
            <p>We envision a world where every individual has access to the resources they need to overcome financial challenges and achieve their dreams. Our goal is to create a supportive community that helps transform lives and fosters hope for a brighter future.</p>
                </div>
          </div>       
        </div>
        <div className={`${s.aboutimage}`}>
          <img src='/coin.jpg' alt='about us image' />          
          <div className={s.dn}>
            <img src='/money.jpg' alt='about us image' />
          </div>
        </div>
      </div>
      <div className={`${s.container} ${s.flex} ${s.aboutsection}`}>
        <div className={`${s.aboutimage}`}>
      <img src='/donate.jpg' alt='about us image' />
          <div className={s.dn}><img src='/image-placeholder@2x.png' alt='about us image' /></div>
        </div>
        <div className={`${s.flex} ${s.desc}`}>
          <h4>Make a Difference Today</h4>
          <h3>Your Support Is Really Powerful.</h3>
          <p>The secret to happiness lies in helping others. Never underestimate the difference YOU can make in the lives of the poor, the abused and the helpless.</p>
          <Link to="/campaignlist" className={`${s.primarybutton}`}>
                Donate Now
              </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
