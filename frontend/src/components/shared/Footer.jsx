import React from 'react';
import "./footer.css";
import { Button } from '../ui/button';


const Footer = () => {
  return (

    <footer className="footerSection">
      <div className="container">
        <div className="footerGrid">
          <div className="gridItem connectionBox">
            <div className="box">
              <div className="topBox">
                {/* <p className="footerTitle">Advait</p> */}
                <div className="footerLogo">
                  <img src="/logo.png" alt="logo" />
                </div>
                <p className="address">
                  4/39-44 Dheeraj Heritage Business Centre, SV Road, On Milan Subway Signal, Santacruz - W, Mumbai 400054
                </p>
                <div className="support">
                  <div className="item">
                    <img src="/callIcon.svg" alt="callIcon" />
                    <a href="tel:+919999999999" className="link">+91xxxxxxxxx
                    </a>
                  </div>
                  <div className="item">
                    <img src="/mailIcon.svg" alt="mailIcon" />

                    <a href="mailto:support@advaittechserve.in" className="link">support@advaittechserve.in</a>
                  </div>
                </div>
              </div>
              <ul className="socialLinks">
                {/* <li>
                  <a target="_blank"
                  ><i className="icon instagramIcon"></i>
                  </a>
                </li> */}
                <li>
                  <a href="https://www.linkedin.com/company/advait-techserve-india-pvt--ltd-/" target="_blank"
                  ><i className="icon linkedinIcon"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/advaittechserve/" target="_blank"
                  ><i className="icon facebookIcon"></i>
                  </a>
                </li>
                {/* <li>
                  <a target="_blank"
                  ><i className="icon twitterIcon"></i>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="gridItem linksList">
            <div className="box">
              <ul className="list">
                <li><a href='/'>Home</a></li>
                <li><a href='/jobs'>Jobs</a></li>
                <li><a target="_blank" href='https://advaittechserve.in/about-us'>Know about Advait!</a></li>
              </ul>
            </div>
          </div>
          <div className="gridItem newsLetter">
          <div className="box">
            <div className="iconBox">
              <img src="/newspaper.svg" alt="newspaper" />
            </div>
            <p className="titleText">Become Advait insider</p>
            <div className="formBox">
              <div className="formGroup">
                <input
                  type="text"
                  className="formControl"
                  placeholder="Your Email  Address"
                  // v-model="email"
                  required
                />
                {/* <p className="errorMsg">{{ errorMessage }}</p> */}
                {/* <p className="successMsg">{{ successMessage }}</p> */}
              </div>
              <div className="formGroup">
                <Button className="bg-[#12BBB4]">
                  <span >Submit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>

  );
}

export default Footer;