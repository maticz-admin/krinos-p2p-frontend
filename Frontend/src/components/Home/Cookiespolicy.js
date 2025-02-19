import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import React, { useEffect, useState } from 'react';
// import Footer from "components/Footer/Footer.js";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import tick from "../../assets/images/tick.png";
import close from "../../assets/images/close.png";
import { Link } from 'react-router-dom';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsBoxArrowUpRight } from 'react-icons/bs';

// import Images from "../../../../Images";
import profs from   "../../assets/images/toss/prof.png";
// import spring from "../../../images/toss/bannerbg.png";
import flags from "../../assets/images/flags.png";
import Footer from  "../Footer/Footer";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { createroom } from 'actions/P2PorderAction';
import { getsingletradehooks } from 'actions/P2PorderAction';
import { Getcmshooks } from 'actions/P2PorderAction';
// import { set } from 'mongoose';
const dashboardRoutes = [];
// const Displayownerdata = [];
const Cookiespolicy = (props) => {
    const { ...rest } = props;

   
    const [cmsdata , setCmsdata] = useState("");
    const [subject , setSubject] = useState("");
   
    useEffect(() => {
        async function fetchdata(){
            var payload = {"identifier" : "Cookies-policy"};
            var result = await Getcmshooks(payload);
            setCmsdata(result?.data?.data?.content);
            setSubject(result?.data?.data?.subject);
        }
        fetchdata();
    })
    




    return (
        <>
        <div className='page_wrap' id="aboutsec">
            <Header className="header"
                color="transparent"
                routes={dashboardRoutes}
                brand={<img src={require("../../assets/images/logo.png")} alt="logo" className="img-fluid" />}
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 20,
                    color: "dark",
                }}
                {...rest} />

            <div className='bitcoincompany login_container login_box bitcoincompany_static_cms'>
             
                <div className='container'>
                    <div className='bitcoincompany'>
                    {ReactHtmlParser(cmsdata)}
                        {/* <h2 className='cms_h3_m'>Public Cookies Policy</h2>
                        <p>
At Krinos P2P. ("Krinos P2P", "we", "we", or "us") we take all necessary steps to protect your
privacy. In this Cookie Policy ("Policy"), we aim to explain what cookies are and how we handle cookies
on our web platforms, online wallets, mobile applications, social media pages, or other online properties
and services. This policy has been written so that you can easily understand our cookie-handling
process and the decisions you make regarding the protection of your personal information when you
use our website and services. Please note that the services we offer may vary from region to region.</p>
<p>The English language version of this Cookie Policy is the primary and original document for all cookie-
related information and guidelines. In the event of any conflict between the English version of this
Cookie Policy and subsequent translations into other languages, the English version shall prevail.</p>
<h5>Definition of Cookie</h5>
<p>Cookies are small text files that are placed on your computer or mobile device when you visit a website.
These cookies usually contain website visit information.</p>
<h5>How We Use Cookies</h5>
<p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no
industry standard options for how to disable cookies without completely disabling the functions and
features they add to your website. We recommend that you leave cookies enabled if you are not sure
whether cookies are required to provide you with the services you use.</p>
<h5>How can the use of cookies be permitted or prohibited</h5>
<p>The majority of browsers automatically accept cookies. You can delete saved cookies on your device
at any time. You can find further details in the manual on use of your browser or manufacturer's device.
Please note that some browsers are automatically set to accept cookies and if you wish to cancel them,
please change your settings. The site may work differently for you in the event of this change.</p>
<p>You can also prohibit all cookies or only some of them in your browser settings. Deleting cookie consent
does not automatically delete cookies that have been stored on your device based on your previous
consent. You will need to delete them for the specific browser you are using to access our website. The
browsers may differ from each other, and therefore you can find more detailed information on the
settings of cookies in the "Help" section of your browser.</p>
<p>Please note that you won't be able to use some features, services, tools, and apps on our website if
cookies are turned off.</p>
<h5>Disable Cookies</h5>
<p>You can disable cookies by editing your browser settings. Please note that disabling cookies may affect
the functionality of Krinos P2P and other websites you visit. In this context, we recommend that you
do not disable cookies.</p>
<h5>Third Party Cookies</h5>
<p>In special cases, we also use cookies provided by trusted third parties. The following section details the
third-party cookies you may experience on this website.</p>
<p>Our website uses third party analytics tools such as Google Analytics to help us understand how you
use Krinos P2P and how we can improve your experience. These cookies can track information such
as how long you have been on the website and which pages you have visited. For more information on
Google Analytics cookies, please visit the Google Analytics official page.</p>
<p>From time to time we test new features on our website and make small changes to the way our website
is displayed. While new features are still being tested, these cookies help us achieve a consistent
experience on our website and understand which optimizations our users appreciate most.</p>
<p>As a marketplace, it's important to understand statistics about how many website visitors actually make
a purchase. Therefore, we use cookies to track this data. This is also important to you, as it allows us
to make accurate business forecasts, monitor advertising and product costs, and give you the best
possible price estimate.</p>
<p>Sometimes third parties (third parties) run advertisements on our behalf. Affiliate cookies allow us to
verify that you have visited our website through one of these third-party websites, so we can properly
credit you and, where applicable, these third parties may, at their discretion, award you a bonus in
connection with your purchase. can provide. Decision</p>
<h5>More information</h5>
<p>If you would like to learn more about our cookie policy, please contact us at the support team</p> */}

                     

                    </div>
                </div>

            </div>

            <Footer />

        </div>
        </>
    );
}

export default Cookiespolicy;