/*eslint-disable*/
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";


// import component
import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';
import { NavLink } from "react-router-dom";
import Images from "Images";
import bannn from '../../assets/images/lightthemes/45.png'
import { newsLetter } from "actions/spotTradeAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getsitesettingshook } from "actions/P2PorderAction";

export default function Footer(props) {
  const { type } = props;
  const navigate = useHistory();

    const [facebook , setFacebook] = useState("");
    const [telegram , setTelegram] = useState("");
    const [twitter , setTwitter] = useState("");
    const [email , setEmail] = useState("");
  const OnSubmit =async (e)=>{
    e.preventDefault()
   var validateError =await  emailValidation(letter)
    if (isEmpty(validateError)) {
      var res = await newsLetter(letter)
      if (res.status) {
        toastAlert('success', res.message, 'newLetter')
      }
      else {
        toastAlert('error', res.message, 'newsLetter')
      }
    }
    else{
      toastAlert('error', validateError, 'newsLetter')
    }  
  }

  useEffect(()=>{
    async function getcms(){
      var result = await getsitesettingshook();
      setFacebook(result?.data?.data?.facebookLink);
      setTwitter(result?.data?.data?.twitterUrl);
      setEmail(result?.data?.data?.supportMail);
      setTelegram(result?.data?.data?.telegramlink)
  }
  getcms();
  })
  return (
    <Fragment>
      {/* {type == 'beforeLogin' && <BeforeLogin />}
      {type == 'afterLogin' && <AfterLogin />} */}
      <div id="footer">
         <div className="container d-none">
         <img src={Images.connect} className='bannerconnect'/>
         {/* <img src={bannn} className='connectr'/> */}
         <img src={Images.connect} className='connectr'/>
              <div className="row jc-center text-center">
                <div className="col-md-6">
                  <h2>Start Your Crypto Journey Now!</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
                  <div className="input-group">
                      <input type="email" autoComplete="off" className="form-control" placeholder="Email" name="email" onChange={(e)=>{onInputchage(e)}}/>
                      <div className="input-group-append">
                        <button className="themebtn" href="/" onClick={(e)=>{OnSubmit(e)}}>Subscribe</button>
                      </div>
                  </div>
                </div>
              </div>
         </div>
         <div className="linksec">

         <div className="footerMidd wow fadeIn" data-wow-delay=".5s">
          <div className="footerMidd_left">
            <ul className="footer_links">
            <li><NavLink to="/details/privacypolicy">Privacy Policy</NavLink></li>
            <li><NavLink to="/details/termsandcondition">Terms & Conditions</NavLink></li>
            <li><NavLink to="/amlpolicy">AML Policy</NavLink></li>
            <li><NavLink to="/cookiespolicy">Public Cookies Policy</NavLink></li>
            <li><NavLink to="/restrictedcountries">Restricted Countries (Locations)</NavLink></li>


            <li><NavLink to="/risk">Risk & Disclaimer</NavLink></li>

              <li><NavLink to="/details/aboutus">About us</NavLink></li>
              {/* <li><NavLink to="/">FAQs</NavLink></li> */}
              <li><NavLink to="/contact">Contact Us</NavLink></li> 



            </ul>
            {/* <p class="mt-2 cpy_txt">&copy; Copyright 2022 <NavLink to="/home">Aurex</NavLink> All rights reserved</p> */}
          </div>  
          <div className="footerMidd_right">
            <h3>Social Media With Us:</h3>
            <ul className="socialLinks">

              {/* <li><a href={facebook} target="_blank"><i className="fab fa-youtube"></i></a></li>
              <li><a href={twitter} target="_blank"><i className="fab fa-twitter"></i></a></li>
              <li><a href={telegram} target="_blank"><i class="fab fa-instagram"></i></a></li> */}

              <li><a href="https://www.youtube.com/@myctos_info" target="_blank"><i className="fab fa-youtube"></i></a></li>
              <li><a href="https://twitter.com/myctos_info" target="_blank"><i className="fab fa-twitter"></i></a></li>
              <li><a href="https://intagram.com/myctos_info" target="_blank"><i class="fab fa-instagram"></i></a></li>
              {/* <li><a href={socialMedia && socialMedia.twitterUrl} target="_blank"><i className="fab fa-twitter"></i></a></li>
              <li><a href={socialMedia && socialMedia.facebookLink} target="_blank"><i className="fab fa-facebook"></i></a></li>
              <li><a href={socialMedia && socialMedia.linkedinLink} target="_blank"><i class="fab fa-linkedin"></i></a></li> */}
              {/*<li><a href="#" target="_blank"><i class="fab fa-medium-m"></i></a></li>*/}
            </ul>
          </div>        
        </div>  
         </div>
      </div>
    </Fragment>
  )
}

Footer.propTypes = {
  type: PropTypes.string
};

Footer.defaultProps = {
  type: 'beforeLogin'
};


// /details/contactus