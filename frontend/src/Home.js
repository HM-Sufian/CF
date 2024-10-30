import React from 'react';
import { Link } from 'react-router-dom';
import Navigationn from './Navigationn';
import About from './About';
import CampaignCards from './CampaignCards';
import s from './Home.module.css';
import Gallery from './Gallery';
function Homee() {
  return (
    <>
      <div className={s.mainhome} id="home">
        <Navigationn />
        <div className={s.outercontainer}>
          <div className={`${s.container} ${s.flex} ${s.maincontainer}`} >
            <p>Give Hope For Homeless</p>
            <h1>Helping Each Other Can Make World Better</h1>
            <p>
              We Seek Out World Changers And Difference Makers Around The Globe,
              And Equip Them To Fulfill Their Unique Purpose.
            </p>
            <div className={`${s.flex} ${s.btngap}`}>
              <Link to="/campaignlist" className={`${s.primarybutton}`}>
                Donate Now
              </Link>
              <Link to="/campaignform" className={`${s.secondarybutton}`}>
                Raising Funds
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section id="about">
        <About />
      </section>
      <section id="causes"><CampaignCards /></section>
      <section id="gallery"><Gallery /></section>
      <div className={s.footer}>
        <div>
          <h2>Helping Hub</h2>
        </div>
        <div className={s.linkColumn}>
          <h4>Quick Links</h4>
          <a href='#home' className={s.hoverlinks}>Home</a>
          <a href='#about' className={s.hoverlinks}>About Us</a>
          <a href='#causes' className={s.hoverlinks}>Causes</a>
          <a href='#gallery' className={s.hoverlinks}>Gallery</a>
        </div>
        <div className={s.linkColumn}>
          <h4>Contact Us</h4>
          <p  className={s.cont}><img src="./location.svg"></img> India Office Address, <br></br>
            C-79 SJP Nagar Alankar Plaza, 8th Phase, J. P. Nagar,<br></br>
            Bangalore, Karnataka, India 560078</p>
          <a href='#contact@helpinghub.in' className={`${s.hoverlink} ${s.cont}`}><img src="./email.svg"></img> contact@helpinghub.in</a>
          <p className={s.cont}><img src="./phone.svg"></img> +91 8768412857</p>
        </div>
        <div className={s.linkColumn}>
          <h4>Follow Us</h4>
          <div className={s.l1}><img src='./group-3247.svg'></img>
          <img src='./group-3248.svg'></img></div>
     <div className={s.l1}><img src='./group-3249.svg'></img>
     <img src='./group-3250.svg'></img></div>
        </div>
      </div>
    </>

  );
}
export default Homee;
