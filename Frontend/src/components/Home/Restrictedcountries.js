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
const Restrictedcountries = (props) => {
    const { ...rest } = props;

   
    const [cmsdata , setCmsdata] = useState("");
    const [subject , setSubject] = useState("");
   
    useEffect(() => {
        async function fetchdata(){
            var payload = {"identifier" : "Restricted-countries"};
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
                        {/* <h2 className='cms_h3_m'>Restricted Countries (Locations)</h2>
                        <p>
                        Our core principle is centered on the notion that Bitcoin should be available and open to all
individuals, regardless of their geographical location. However, we recognize that in some nations,
the use of our platform, TOSSvTOSS, may be limited due to economic sanctions imposed by
governing bodies.</p>

<h5>Prohibited Countries List, OFAC</h5>
<p>We comply with the sanctions of the Office of Foreign Assets Control ("OFAC"). OFAC is a department
of the U.S. Treasury Department that administers and enforces economic and trade sanctions against
foreign countries and regimes targeted in accordance with U.S. foreign policy and national security
objectives, terrorists, international drug traffickers, and those involved in activities related to proliferation.
Weapons of mass destruction and other threats to the national security, foreign policy, or economy of
the United States. As such, some are broad and geographically oriented (eg Cuba, Iran). Others are
“targeted” and focused on specific individuals and groups.</p>
<h5>OFAC banned countries</h5>
<p>Users and traffic from the following countries are prohibited on TOSSvTOSS</p>
<ul>
<li>Belarus</li>
<li>Burundi</li>
<li>Central African Republic Sanctions</li>
<li>Cuba</li>
<li>Crimea, Donetsk, and Luhansk Regions of Ukraine</li>
<li>Iran</li>
<li>Iraq</li>
<li>Lebanon</li>
<li>Libya</li>
<li>North Korea</li>
<li>Russia</li>
<li>Somalia</li>
<li>South Sudan-related Sanctions</li>
<li>Sudan and Darfur</li>
<li>Syria</li>
<li>Venezuela</li>
<li>Yemen</li>
</ul>
<h5>OFAC grey/high-risk countries</h5>
<p>Users from these countries have to verify their ID before they can send out or sell cryptocurrency:</p>
<ul>
<li>Albania</li>
<li>Bosnia and Herzegovina</li>
<li>Bulgaria</li>
<li>Democratic Republic of Congo</li>
<li>Croatia (Hrvatska)</li>
<li>Kosovo</li>
<li>Macedonia</li>
<li>Montenegro</li>
<li>Republic of Congo</li>
<li>Romania</li>
<li>Serbia</li>
<li>Slovenia</li>
<li>Ukraine</li>
<li>Zimbabwe</li>
</ul>
<p>Additionally, as we fully cooperate with all OFAC, Specially Designated Nationals (SDN) and Blocked
Person lists, we block individuals who threaten international stabilization efforts as defined by OFAC in
the regions of:</p>
<ul>
<li>Balkans</li>
<li>The Democratic Republic of the Congo-Related</li>
<li>Western Balkans area and Belarus as part of Ukraine-/Russia-Related Sanctions</li>
<li>Venezuela-related sanctions</li>
<li>Zimbabwe-related sanctions</li>
</ul>
<h5>Restrictions for users in Canada and some US states</h5>
<p>Due to regulatory restrictions, TOSSvTOSS cannot serve individuals residing in Canada, Alaska,
Arkansas, California, Connecticut, Delaware, Florida, Hawaii, Idaho, Illinois, Kentucky, Louisiana,
Maine, Maryland, or Massachusetts. Minnesota, Nevada, New Jersey, New York, North Carolina, Ohio,
South Carolina, South Dakota, Texas, Utah, Vermont, Washington, and West Virginia (collectively
known as the "Restricted States"). If you live in any of these regions, your TOSSvTOSS account will be
banned and you will not be able to access it while there.</p>
<p>All accounts with registered IPs in Canada and restricted states and all accounts with verified addresses
within Canada and restricted states are prohibited.</p>
<p>All accounts that use a driver's license, passport or ID to verify identity in Canada and restricted states
are prohibited.</p>

<h5>USDT and USDC Restrictions</h5>
<p>Due to regulatory restrictions, we must prohibit access to Tether (USDT) and USD Coin (USDC) for
TOSSvTOSS users residing in Texas. This includes trading, withdrawing, depositing, and converting
USDT/USDC.</p>
<p>We understand that this may cause some inconvenience, and we apologize for any inconvenience this
may cause. However, we are fully committed to complying with all relevant laws and regulations and
are actively working towards further expansion. We appreciate your understanding and look forward to
serving you in the future.</p>
<h5>More information</h5>
<p>If you would like to learn more about our Restricted Countries (Locations), please contact us at the
support team</p> */}

                     

                    </div>
                </div>

            </div>

            <Footer />

        </div>
        </>
    );
}

export default Restrictedcountries;