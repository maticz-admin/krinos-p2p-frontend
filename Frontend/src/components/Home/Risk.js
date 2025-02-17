

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
const Risk = (props) => {
    const { ...rest } = props;

    const [cmsdata , setCmsdata] = useState("");
    const [subject , setSubject] = useState("");
   
    useEffect(() => {
        async function fetchdata(){
            var payload = {"identifier" : "Risk_and_Disclaimer"};
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
                        {/* <h2 className='cms_h3_m'>Risk and Disclaimer</h2>
                        <p>
                        Documents posted on the website are available in English only. You acknowledge that you
have sufficient knowledge of the English language at the level necessary to understand the
information contained in the Documentation, and you fully understand the legal consequences
of the Documentation. If you do not understand or do not understand the English language,
you acknowledge that you should use the services of a professional interpreter before agreeing
to the relevant terms and conditions contained in the document. If you do not agree with the
above statements and/or documents, please leave this website immediately. Your continued
use of our website confirms your consent to the above statements and documents.</p>
<p>Krinos P2P (P2P) direct trading parties are exposed to risks such as capital loss, illiquidity,
lack of dividends and dilution and should only be undertaken as part of a diversified portfolio.
Lose risk warning before investing and trading. Only Krinos P2P (P2P) direct trading parties
who understand these risks should invest and trade. Tax treatment depends on individual
circumstances and may change in the future. Krinos P2P does not solicit investment or
trading from its members. Any communication by Krinos P2P through this website or other
media should not be construed as an investment or trading recommendation. Further, nothing
on this website constitutes an offer to sell or a solicitation to purchase securities to any person
in any jurisdiction, and any such offer, solicitation, or sale is illegal. Krinos P2P does not
provide legal, financial or tax advice of any kind. If you have any questions about any legal,
financial or tax matters related to your interactions with Krinos P2P, you should consult with
professional legal counsel in your country. Krinos P2P is not responsible for capital loss,
illiquidity, lack of dividends, etc. due to your investment or trading.</p>
<p>You should seek advice from an independent and suitably licensed financial advisor and
ensure that you have a risk appetite, relevant experience and knowledge before deciding to
trade. IN NO EVENT SHALL Krinos P2P BE LIABLE TO ANY PERSON OR ENTITY FOR
ANY DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL OR INCIDENTAL DAMAGES. The
cryptocurrency market is an unregulated service that is not governed by any specific European
regulatory framework. Therefore, when using our cryptocurrency trading services, you cannot
benefit from the protections available to clients receiving regulated investment services, such
as the Cyprus Investor Compensation Fund/Financial Services Compensation Scheme and the
use of Financial Ombudsman services for dispute resolution. These risks include the risk of
following or copying the trading decisions of inexperienced or unprofessional traders, or traders
whose ultimate purpose, intent or financial condition may differ from yours. Past performance
of Krinos P2P community members is not a reliable indicator of future performance. The
content on Krinos P2P' social trading platform is created by community members and does
not constitute advice or recommendations.</p>
<p>The Krinos P2P word and logo are EU-registered trademarks (registration numbers pending
trademark). Virtual Asset Service Provider RDWW-710. All Rights Reserved. Krinos P2P is a
joint venture consisting of several legal and natural persons (collectively Krinos P2P) whose
primary purpose is to combine marketing and other efforts to better serve potential customers
and contribute to the development of the global blockchain and fintech sector.
(Agreement/Partnership). The products and services described on this website may be
provided by the Company or its affiliates and agents subject to local regulations and
agreements with certain parties. Krinos P2P is not affiliated with any other payment
methods. We do not provide direct support as a social gateway for such services. All
trademarks and logos are the property of their respective companies. If you are interested in a
particular service, please contact our operations team for details on the exact legal entity and
each license.</p>

<p className='text-center'><b>© Copyright 2023 Krinos P2P</b> - Your P2P Investment or Trading Network, All rights
reserved.</p> */}

                     

                    </div>
                </div>

            </div>

            <Footer />

        </div>
        </>
    );
}

export default Risk;