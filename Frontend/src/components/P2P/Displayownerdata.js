import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import React, { useEffect, useState } from 'react';
// import Footer from "components/Footer/Footer.js";

import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import tick from "../../assets/images/tick.png";
import close from "../../assets/images/close.png";
import { Link } from 'react-router-dom';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
// import { BsBoxArrowUpRight } from 'react-icons/bs';

// import Images from "../../../../Images";
import profs from   "../../assets/images/toss/prof.png";
// import spring from "../../../images/toss/bannerbg.png";
import flags from "../../assets/images/flags.png";
import Footer from  "../../components/Footer/Footer";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { createroom } from 'actions/P2PorderAction';
import { getsingletradehooks } from 'actions/P2PorderAction';
import { Getsingleuserhook } from 'actions/P2PorderAction';
import { gettradespeedhook } from 'actions/P2PorderAction';
import config from 'config';
// import { set } from 'mongoose';
const dashboardRoutes = [];
// const Displayownerdata = [];
const Displayownerdata = (props) => {
    const { ...rest } = props;
    const location = useLocation();
    const navigate = useHistory();
    const userdata = useSelector(state => state);

    const [tradedata , setTradedata] = useState({});
    const [pay , setPay] = useState(0);
    const [receive , setReceive] = useState(0);
    const [calculatedpay , setCalculatedpay] = useState(0);
    const [error , setError] = useState("");
    const [button , setButton] = useState(true);

    const [roomid , setRoomid] = useState(Date.now()?.toString());
    const [prefferedcurrencyvalue , setPrefferedcurrencyvalue] = useState("");
    const[variablepercentage , setVariablepercentage] = useState("");
    const [currentmarketvalue , setCurrentmarketvalue] = useState("");

    const [ownerdata , setOwnerdata] = useState({});
    const [kyc , setKyc] = useState({});
    const [tradespeed , setTradespeed] = useState(0);
    

const fetchdata = async() => {
    var payload = {
        userid : window.location.pathname.split('/')[2]?.toString()
    }
    var result = await Getsingleuserhook(payload);
    if(result?.data?.type == "success"){
        setOwnerdata(result?.data?.data);
        setKyc(result?.data?.kyc);
    }
    var tradespeedresult = await gettradespeedhook({userid : result?.data?.data?.createrid});
            var speed = parseFloat(tradespeedresult?.data?.data)/60000
            setTradespeed(speed);

}


    useEffect(() => {
       fetchdata();
    },[])


    const handlecalculatereceive = (val) => {
        setPay(val);
        if(!val || val==0 || isNaN(val)){
         setButton(true);
         setError("Invalid value");   
        }
        else if(val < parseFloat(tradedata?.min) || val > parseFloat(tradedata?.max)){
            setButton(true);
            setError(`Value must be > ${tradedata?.min} and < ${tradedata?.max}`);
        }
        else{ 
            setError("");
            setButton(false);
            if(tradedata?.ordertype == "Buy"){
                var calculatedvalue = (1/prefferedcurrencyvalue)*val;
                setReceive(calculatedvalue);
            }
            if(tradedata?.ordertype == "Sell"){
                var onepercent = prefferedcurrencyvalue / 100;
                var finalvalue = prefferedcurrencyvalue + onepercent;
                var calculatedvalue = (1/finalvalue)*val;
                setReceive(calculatedvalue);
                var calculateview = val - (val/100);
                setCalculatedpay(calculateview);
            }
        }
    }

    const handlebutton = async() => {
        // var payload = {
        //     pay : pay,
        //     receive : receive,
        //     tradedata : tradedata
        // }
        var data = {
            spender : userdata?.account?.userId,
            pay : pay,
            receive : receive,
            status : "pending",
            perprice : prefferedcurrencyvalue
        }
        var payload = {
            creater : ownerdata?.userId,
            spender : userdata?.account?.userId,
            orderid : tradedata?.orderid,
            roomid : roomid,
            updatedata : data
        }
        var result = await createroom(payload);
        if(result?.data?.type == "success"){
            var room = result?.data?.data?.roomid 
            navigate.push(`/trade/${result?.data?.data?.roomid }` , {state : payload});
        }
    }


    return (
        <>
        <div>
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

            <div className='bitcoincompany login_container login_box'>
                {/* <div>
                    <h1 className='blackandwhite bit_text text-center bit1'>{tradedata?.ordertype?.toUpperCase()} BITCOIN With company</h1>
                    <p className='roboto subhead'>{tradedata?.ordertype} Bitcoin from other users using any payment<br></br>method and currency.</p>
                </div> */}

                <div className='container'>
                    <div className='bitcoincompany'>
                        {/* <img className='spring' src={spring} alt="spring" />
                        <img src={Images.connect} className='bannerconnect' />
                        <img src={Images.connect} className='connect1' />
                        <img src={Images.connect} className='connect' />
                        <img src={Images.connect} className='connectright' /> */}
                        {/* <div className='mt-4'>
                            <Link to="/buybitcoin" className='back blackandwhite'><HiOutlineArrowSmLeft className='arl' /> Back to Offer</Link>
                        </div>

                        <div className='buyborder mt-3'>
                            <p className='mb-4 much'>How much do you want to Buy?</p>
                            <div className='row'>
                                <div className='col-md-6 col-sm-6'>
                                    <div className='input-group mb-1 jj floatinglabel mt-4 h-54'>
                                        <label>I will pay</label>
                                        <input
                                            className="form-control mt-0"
                                            placeholder="0"
                                            name="pay"
                                            type="number"
                                            value={pay}
                                            
                                            onChange={(e)=>handlecalculatereceive(e?.target?.value)}
                                        />
                                        <span class="input-group-text" id="basic-addon2">{tradedata?.preferedcurrency}</span>
                                    </div>
                                    <p className='get'><AiOutlineInfoCircle /> Enter amount to get started</p>
                                    <p className='error-message mb-0'>{error}</p>
                                </div>
                                <div className='col-md-6 col-sm-6'>
                                    <div className='input-group mb-1 jj floatinglabel mt-4 h-54'>
                                        <label>and receive</label>
                                        <input
                                            className="form-control mt-0"
                                            placeholder="Enter text"
                                            name="pay"
                                            type="text"
                                            value={receive}
                                            readOnly = {true}
                                        />
                                        <span class="input-group-text" id="basic-addon2">{tradedata?.coin}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='text-center'>
                                <button className='graybtn my-3' disabled = {button} onClick={async()=> await handlebutton()}>{tradedata?.ordertype} Now</button>
                            </div>

                            <div className='row'>
                                <div className='col-md-3 col-sm-6'>
                                    <div className='border1 mt-2'>
                                        <p className='amount'>Seller rate</p>
                                        <p className='btc-amount'>{prefferedcurrencyvalue}{tradedata?.preferedcurrency}</p>
                                        <p className='market'>{tradedata?.offermargin ? tradedata?.offermargin : variablepercentage}% {(tradedata?.offermargin ? tradedata?.offermargin : variablepercentage)>0 ? "above market" : "below market"}</p>
                                    </div>
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <div className='border1 mt-2'>
                                        <p className='amount'>Buy limits</p>
                                        <p className='btc-amount'>Min : {tradedata?.min} {tradedata?.coin}</p>
                                        <p className='market'>Max : {tradedata?.max} {tradedata?.preferedcurrency}</p>
                                    </div>
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <div className='border1 mt-2'>
                                        <p className='amount'>Trade time Limit</p>
                                        <p className='btc-amount'>{tradedata?.offertimelimit} min</p>

                                    </div>
                                </div>
                                <div className='col-md-3 col-sm-6'>
                                    <div className='border1 mt-2'>
                                        <p className='amount'>Toss Toss fee</p>
                                        <p className='btc-amount'>0%</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* <p className='lorem mt-4 mb-4 text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}

                        <div className='buyborder1 mt-3'>
                            <p className='mb-0 much'>About this buyer</p>

                            <div className='d-flex justify-content-between chance'>
                                <div className='one1'>
                                    <div className=''>
                                        <div className='d-flex align-items-center align-items-center uu'>
                                            <div><img src={ownerdata?.profileImage ? config.API_URL+ ownerdata?.profileImage : profs} className='prof prof_icon_sixe' /></div>
                                            <div><p className='namelist'>{ownerdata?.firstName + " " + ownerdata?.lastName} 
                                            {/* <span><img src={flags} alt='hhq' /></span>  */}
                                            </p> 
                                            {/* <p className='no1 mb-0'>Seen 1 minute ago</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='one2 one2_alig_widt'>
                                    <div className=''>
                                        <div><p className='namelist'>Id Proof</p></div>
                                        <div className='text-center'><img src={kyc?.idProof?.status == "approved" ? tick : close} className='prof1' /></div>
                                    </div>
                                </div>

                                <div className='one2 one2_alig_widt'>
                                    <div className=''>
                                        <div><p className='namelist'>Phone Verified</p></div>
                                        <div className='text-center'><img src={ownerdata?.phoneStatus == "verified" ? tick : close} className='prof1' /></div>
                                    </div>
                                </div>

                                <div className='one2 one2_alig_widt'>
                                    <div className=''>
                                        <div><p className='namelist'>Email Verified</p></div>
                                        <div className='text-center'><img src={ownerdata?.emailStatus == "verified" ? tick : close} className='prof1' /></div>
                                    </div>
                                </div>

                                <div className='one2 one2_col_wdi'>
                                    <div className=''>
                                        <div><p className='namelist'>Trade Speed</p></div>
                                        <div><button className='themebtn mt-4'>{tradespeed ? (parseFloat(tradespeed) < 5 ? "Instant" : tradespeed+"min"): "New"}</button></div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className='mt-3 reviews '>
                            <h5 className='text-light'>Reviews</h5>
                            <ul className='buyborder1 p-3'>
                                {ownerdata?.reviews?.length > 0 ? ownerdata?.reviews?.map((data , i) => <li className='mb-3'>
                                    <h5 className='text-light fw-bold mb-0'>UserId :{data?.userid}</h5>
                                    <p className='text-light f-14 roboto mb-0'>{data?.description}</p>
                                    <p className='time text-gray roboto f-12'>{new Date(parseFloat(data?.date))?.toString()?.slice(4 , 21)}</p>
                                </li>) : <p>No Reviews Found!</p>
                                    }
                            </ul>
                        </div>

                    </div>
                </div>

            </div>

            <Footer />

        </div>
        </>
    );
}

export default Displayownerdata;