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
import profs from "../../assets/images/toss/prof.png";
// import spring from "../../../images/toss/bannerbg.png";
import flags from "../../assets/images/flags.png";
import Footer from "../../components/Footer/Footer";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { createroom } from 'actions/P2PorderAction';
import { getsingletradehooks } from 'actions/P2PorderAction';
import { Getcmshooks } from '../../actions/P2PorderAction';
// import { set } from 'mongoose';
const dashboardRoutes = [];
// const Displayownerdata = [];
const Details = (props) => {
    const { ...rest } = props;
    const location = useLocation();
    const navigate = useHistory();
    const [cmsdata, setCmsdata] = useState("");
    const [subject, setSubject] = useState("");
    const [video1, setVideo1] = useState("");
    const [video2, setVideo2] = useState("");
    const [video3, setVideo3] = useState("");
    const [video4, setVideo4] = useState("");
    const [video5, setVideo5] = useState("");
    const [video6, setVideo6] = useState("");
    const [video7, setVideo7] = useState("");
    const [video8, setVideo8] = useState("");

    useEffect(() => {
        async function fetchdata() {
            if (window.location.pathname.split('/')[2]?.toString() == "demo_videos") {
                let payload1 = { "identifier": "TRANSPARENT_FEES" };
                let result1 = await Getcmshooks(payload1);  
                setVideo1(result1?.data?.data?.content)

                let payload2 = { "identifier": "MARGIN_CALL" };
                let result2 = await Getcmshooks(payload2);
                setVideo2(result2?.data?.data?.content)

                let payload3 = { "identifier": "LEARN_&_PRACTICE" };
                let result3 = await Getcmshooks(payload3);
                setVideo3(result3?.data?.data?.content)

                let payload4 = { "identifier": "demo_videos4" };
                let result4 = await Getcmshooks(payload4);
                setVideo4(result4?.data?.data?.content)

                let payload5 = { "identifier": "demo_videos5" };
                let result5 = await Getcmshooks(payload5);
                setVideo5(result5?.data?.data?.content)

                let payload6 = { "identifier": "demo_videos6" };
                let result6 = await Getcmshooks(payload6);
                setVideo6(result6?.data?.data?.content)

                let payload7 = { "identifier": "demo_videos7" };
                let result7 = await Getcmshooks(payload7);
                setVideo7(result7?.data?.data?.content)

                let payload8 = { "identifier": "demo_videos8" };
                let result8 = await Getcmshooks(payload8);
                setVideo8(result8?.data?.data?.content)
            }
            else {
                var payload = { "identifier": window.location.pathname.split('/')[2]?.toString() };
                var result = await Getcmshooks(payload);
                setCmsdata(result?.data?.data?.content);
                setSubject(result?.data?.data?.subject);
            }
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

                <div className='bitcoincompany login_container login_bo bitcoincompany_deatis_contnt'>
                    {/* <div>
                    <h1 className='blackandwhite bit_text text-center bit1'>{tradedata?.ordertype?.toUpperCase()} BITCOIN With company</h1>
                    <p className='roboto subhead'>{tradedata?.ordertype} Bitcoin from other users using any payment<br></br>method and currency.</p>
                </div> */}

                    <div className='container'>
                        <div className='bitcoincompany'>
                            {/* <h5>{subject} :</h5> */}
                            {window.location.pathname.split('/')[2]?.toString() != "demo_videos" && ReactHtmlParser(cmsdata)}
                            <div className='row vide_lof_row'>
                                {window.location.pathname.split('/')[2]?.toString() == "demo_videos" &&
                                    <div className='col-12 col-md-6 mb-3'>
                                        <div className='borderbox_new_vie'>
                                            {ReactHtmlParser(video1)}

                                        </div>
                                    </div>}
                                {window.location.pathname.split('/')[2]?.toString() == "demo_videos" &&
                                    <div className='col-12 col-md-6 mb-3'>
                                        <div className='borderbox_new_vie'>
                                            {ReactHtmlParser(video2)}

                                        </div>
                                    </div>}
                                {window.location.pathname.split('/')[2]?.toString() == "demo_videos" &&
                                    <div className='col-12 col-md-6 mb-3'>
                                        <div className='borderbox_new_vie'>
                                            {ReactHtmlParser(video3)}

                                        </div>
                                    </div>}
                                {window.location.pathname.split('/')[2]?.toString() == "demo_videos" &&
                                    <div className='col-12 col-md-6 mb-3'>
                                        <div className='borderbox_new_vie'>
                                            {ReactHtmlParser(video4)}

                                        </div>
                                    </div>}
                                {window.location.pathname.split('/')[2]?.toString() == "demo_videos" &&
                                    <div className='col-12 col-md-6 mb-3'>
                                        <div className='borderbox_new_vie'>
                                            {ReactHtmlParser(video5)}

                                        </div>
                                    </div>}
                                {window.location.pathname.split('/')[2]?.toString() == "demo_videos" &&
                                    <div className='col-12 col-md-6 mb-3'>
                                        <div className='borderbox_new_vie'>
                                            {ReactHtmlParser(video6)}

                                        </div>
                                    </div>}
                                {window.location.pathname.split('/')[2]?.toString() == "demo_videos" &&
                                    <div className='col-12 col-md-6 mb-3'>
                                        <div className='borderbox_new_vie'>

                                            {ReactHtmlParser(video7)}
                                        </div>
                                    </div>}

                                {window.location.pathname.split('/')[2]?.toString() == "demo_videos" && <div className='col-12 col-md-6 mb-3'>
                                    <div className='borderbox_new_vie'>

                                        {ReactHtmlParser(video8)}

                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>

                </div>

                <Footer />

            </div>
        </>
    );
}

export default Details;