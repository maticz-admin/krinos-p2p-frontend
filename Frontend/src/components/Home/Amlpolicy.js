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
const Amlpolicy = (props) => {
    const { ...rest } = props;
    const [cmsdata , setCmsdata] = useState("");
    const [subject , setSubject] = useState("");
   
    useEffect(() => {
        async function fetchdata(){
            var payload = {"identifier" : "Amlpolicy"};
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

                        {/* <h2 className='cms_h3_m'>AML Policy</h2>
                        <p>
WEME POLAND LTD is a legal entity under Polish and EU law. and Krinos P2P (individually and collectively "we") provide services through an internet-enabled "peer-to-peer" (P2P) marketplace for buying and selling digital assets.</p>
<p>Krinos P2P has anti-money laundering ("AML") policies and procedures in place to prevent illegal activity on the platform and to protect users, businesses, digital currency and financial services communities from abuse by criminals. We comply with the requirements of the Bank Secrecy Act and related FinCEN regulations and guidelines.</p>
<p>As part of its KYC and AML compliance, Krinos P2P has taken a risk-based approach to:</p>
<p>Appoint a Chief Compliance Officer (CCO) with sufficient expertise, independence and responsibility to oversee compliance with applicable laws, regulations, rules and industry guidelines.</p>
<p>Establish and maintain risk-based KYC, customer identification system (CDD) and enhanced customer identification (EDD) policies</p>
<ul>
<li>Setting up risk-based tiers for user authentication</li>
<li>Cooperate with law enforcement requests and local regulatory requirements</li>
<li>Submission of a Suspicious Transaction Report ("SAR")</li>
<li>Company-wide BSA/AML/OFAC training</li>
<li>Use of various anti-fraud systems</li>
<li>Continuous rule-based transaction monitoring</li>
<li>Investigation using blockchain analysis</li>
</ul>
<p>Submit a SAR if you know, suspect or have reason to suspect that suspicious activity has occurred on our platform. Suspicious transactions often include transactions that do not match a user's known legitimate business, personal activities, or personal means. The CCO reviews and investigates suspicious activity to ensure that sufficient information is gathered to justify filing a SAR. Our CCO maintains records and supporting documentation of all SARs submitted.</p>
<p>In addition, we have adopted ongoing OFAC sanctions policies and procedures designed to circumvent, circumvent, or circumvent global sanctions, or prevent use of the Platform by sanctioned individuals to conduct prohibited transactions.</p>
<p>"P2P AML Policy" stands for "Peer-to-Peer Anti-Money Laundering Policy." This policy is implemented within Peer-to-Peer (P2P) financial platforms to prevent money laundering activities. The policy includes measures aimed at preventing and detecting activities such as money laundering and the concealment of illegal funds within the financial system.</p>
<p>P2P financial platforms facilitate direct financial transactions between individuals. Without proper monitoring, these transactions can become vulnerable to criminal activities like money laundering. Hence, the P2P AML Policy has the following objectives:</p>
<ul>
<li>Know Your Customer (KYC): All users must undergo identity verification during the registration process. This helps verify the actual identity of customers and swiftly detect suspicious activities.</li>
<li>Transaction Monitoring: Financial transactions are monitored in real-time. Transactions exceeding a certain amount or those exhibiting unusual patterns are flagged for additional scrutiny.
User Activity Pattern Analysis: User activity patterns are analyzed to detect suspicious behavior and prevent illicit activities beforehand.</li>
<li>Ensuring Transparency: The platform provides users with information about AML policies and procedures and announces policy updates when necessary.</li>
<li>Reporting and Collaboration: In cases of suspected activities or transactions, the platform reports to relevant authorities and cooperates as required by law. It takes actions such as providing information in response to legal requests.</li>
</ul>
<p>Education and Training: The platform offers education on AML policies and money laundering prevention to its employees and customers.</p>
<p>These policies play a vital role in maintaining the safety and reliability of the financial system. Anti-money laundering measures are recognized as crucial internationally, prompting financial institutions to comply with regulations to prevent criminal activities and safeguard the integrity of the financial system.</p>

<p>Krinos P2P actively cooperates with all OFAC, Specially Designated Nationals (SDN), and sanction lists of blocked people. Please refer to the list maintained by Krinos P2P of countries that have banned the use of the platform for risk reasons.</p>

<p>If Krinos P2P provides you with a translated version of the English version of this Policy, you agree that such translation is provided for your convenience only and that the English version of this Policy shall prevail in your relationship with Krinos P2P. In the event of any conflict between the English version and any translation of this policy, the English version shall prevail.
                        </p> */}
                     

                    </div>
                </div>

            </div>

            <Footer/>

        </div>
        </>
    );
}

export default Amlpolicy;