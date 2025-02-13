import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import React, { useEffect, useState } from 'react';
// import Footer from "components/Footer/Footer.js";

import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import tick from "../../../images/tick.png";
import close from "../../../images/close.png";

import { Link } from 'react-router-dom';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsBoxArrowUpRight } from 'react-icons/bs';

import Images from "../../../../Images";
import profs from "../../../images/toss/prof.png";
import spring from "../../../images/toss/bannerbg.png";
import flags from "../../../images/flags.png";
import Footer from '../../../../components/Footer/Footer';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { createroom } from 'actions/P2PorderAction';
import { getsingletradehooks } from '../../../../actions/P2PorderAction';
import { Getsingleuserhook } from 'actions/P2PorderAction';
import { getcurrencydatahooks } from 'actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
import { gettradespeedhook } from 'actions/P2PorderAction';
import config from 'config';

const dashboardRoutes = [];
const Bitcoincompany = (props) => {
    const { ...rest } = props;
    const location = useLocation();
    const navigate = useHistory();
    const userdata = useSelector(state => state);

    const [tradedata, setTradedata] = useState({});
    const [pay, setPay] = useState(0);
    const [receive, setReceive] = useState(0);
    const [calculatedpay, setCalculatedpay] = useState(0);
    const [error, setError] = useState("");
    const [button, setButton] = useState(true);

    const [roomid, setRoomid] = useState(Date.now()?.toString());
    const [prefferedcurrencyvalue, setPrefferedcurrencyvalue] = useState("");
    const [variablepercentage, setVariablepercentage] = useState("");
    const [currentmarketvalue, setCurrentmarketvalue] = useState("");

    const [ownerdata, setOwnerdata] = useState({});
    const [ownerkyc, setOwnerkyc] = useState({});
    const [getuser, setGetuser] = useState(0);
    const [adminprofit, setAdminprofit] = useState(0);
    const [paydb, setPaydb] = useState("");
    const [receivedb, setReceivedb] = useState("");
    const [currencies, setCurrencies] = useState({});
    const [userdatas, setUserdatas] = useState({});
    const [userdataskyc, setUserdataskyc] = useState({});
    const [ownerwallet, setOwnerwallet] = useState({});
    const [userwallet, setUserwallet] = useState({});
    const [tradespeed, setTradespeed] = useState(0);


    const [loader, setLoader] = useState(true);





    useEffect(() => {
        async function fetchdata() {
            setLoader(true);
            var payload = { id: window.location.pathname.split('/')[2]?.toString() }
            let result = await getsingletradehooks(payload);
            // console.log('resultresult-----', result)
            let ownerdata = await Getsingleuserhook({ userid: result?.data?.data?.createrid })
            setOwnerdata(ownerdata?.data?.data);
            setOwnerkyc(ownerdata?.data?.kyc);
            var tradespeedresult = await gettradespeedhook({ userid: result?.data?.data?.createrid });
            var speed = parseFloat(tradespeedresult?.data?.data) / 60000
            setTradespeed(speed);
            var wallets = ownerdata?.data?.wallet?.assets?.find(e => e.coin == result?.data?.data?.coin);
            setOwnerwallet(wallets);
            setTradedata(result?.data?.data);
            setPrefferedcurrencyvalue(result?.data?.prefferedcurrencyvalue)
            setVariablepercentage(result?.data?.variablepercentage);
            setCurrentmarketvalue(result?.data?.currentmarketvalue);
            var payloads = { symbol: result?.data?.data?.coin }
            var currencydatas = await getcurrencydatahooks(payloads);
            setCurrencies(currencydatas?.data?.data);


            let userpayload = {
                userid: userdata?.account?.userId //redux usr data
            }
            var userresult = await Getsingleuserhook(userpayload);
            if (userresult?.data?.type == "success") {
                setUserdatas(userresult?.data?.data);
                setUserdataskyc(userresult?.data?.kyc);
                var usewallets = userresult?.data?.wallet?.assets?.find(e => e.coin == result?.data?.data?.coin);

                setUserwallet(usewallets);
            }
            setLoader(false);
        }
        fetchdata();
        // setTradedata(location?.state?.state);
    }, []);


    const handlecalculatereceive = (val) => {
        setPay(val);
        if (!val || val == 0 || isNaN(val)) {
            setButton(true);
            setError("Invalid value");
        }
        else if (val < parseFloat(tradedata?.min) || val > parseFloat(tradedata?.max)) {
            setButton(true);
            setError(`Value must be > ${tradedata?.min} and < ${tradedata?.max}`);
        }
        else {
            setError("");
            setButton(false);
        }

        if (tradedata?.ordertype == "Sell") {

            var onepercent = prefferedcurrencyvalue / 100;
            var uservalonepercent = val / 100;
            var margin = tradedata?.offermargin ? tradedata?.offermargin : variablepercentage;
            var offerpercentage = uservalonepercent * margin;
            var userval = val - offerpercentage;
            var calculatedvalue = ((1 / prefferedcurrencyvalue) * val).toFixed(8);
            setReceive(calculatedvalue);
            setGetuser(userval);
            var adminvalue = (calculatedvalue / 100) * (1 + (parseFloat(currencies?.commisionfee)))
            setAdminprofit(adminvalue)
        }
        if (tradedata?.ordertype == "Buy") {
            var onepercent = prefferedcurrencyvalue / 100;
            var finalvalue = prefferedcurrencyvalue + onepercent;
            var margin = tradedata?.offermargin ? tradedata?.offermargin : variablepercentage;
            var offerpercentage = uservalonepercent * margin;
            var uservalonepercent = val / 100;
            var userval = (uservalonepercent * margin);
            setGetuser(userval);
            var calculatedvalue = (1 / prefferedcurrencyvalue) * val;
            setReceive(calculatedvalue);
            var calculateview = val - (val / 100);
            setCalculatedpay(calculateview);
            var adminvalue = (calculatedvalue / 100) * (1 + (parseFloat(currencies?.commisionfee)))
            setAdminprofit(adminvalue)
        }
        // }
    }

    const handletrade = async () => {
        var ownersdata = await Getsingleuserhook({ userid: tradedata?.createrid });
        var wallets = ownersdata?.data?.wallet?.assets?.find(e => e.coin?.toUpperCase() == tradedata?.coin?.toUpperCase());
        if (tradedata?.ordertype == "Sell") {
            if (parseFloat(wallets?.p2pBal) > (parseFloat(receive) + parseFloat(adminprofit))) {
                var data = {
                    spender: userdata?.account?.userId,
                    pay: pay,
                    receive: receive,
                    adminfee: adminprofit,
                    status: "pending",
                    perprice: prefferedcurrencyvalue
                }
                var payload = {
                    creater: ownerdata?.userId,
                    spender: userdata?.account?.userId,
                    orderid: tradedata?.orderid,
                    roomid: Date.now()?.toString(),
                    updatedata: data
                }
                var result = await createroom(payload);
                if (result?.data?.type == "success") {
                    var room = result?.data?.data?.roomid
                    navigate.push(`/trade/${result?.data?.data?.roomid}`, { state: payload });
                }
            }
            else {
                toastAlert("error", "Trade owner have Insufficient funds");
            }
        }
        else if (tradedata?.ordertype == "Buy") {
            if (parseFloat(userwallet?.p2pBal) > (parseFloat(receive) + parseFloat(adminprofit))) {
                var data = {
                    spender: userdata?.account?.userId,
                    pay: pay,
                    receive: receive,
                    adminfee: adminprofit,
                    status: "pending",
                    perprice: prefferedcurrencyvalue
                }
                var payload = {
                    creater: ownerdata?.userId,
                    spender: userdata?.account?.userId,
                    orderid: tradedata?.orderid,
                    roomid: Date.now()?.toString(),
                    updatedata: data
                }
                var result = await createroom(payload);
                if (result?.data?.type == "success") {
                    var room = result?.data?.data?.roomid
                    navigate.push(`/trade/${result?.data?.data?.roomid}`, { state: payload });
                }
            }
            else {
                toastAlert("error", "Trade owner have Insufficient funds");
            }
        }




        // if(parseFloat(ownerwallet?.p2pBal) > (parseFloat(receive)+parseFloat(adminprofit))){console.log("inside api");
        //     var data = {
        //         spender : userdata?.account?.userId,
        //         pay : pay,
        //         receive : receive,
        //         adminfee : adminprofit,
        //         status : "pending",
        //         perprice : prefferedcurrencyvalue
        //     }
        //     var payload = {
        //         creater : ownerdata?.userId,
        //         spender : userdata?.account?.userId,
        //         orderid : tradedata?.orderid,
        //         roomid : roomid,
        //         updatedata : data
        //     }
        //     var result = await createroom(payload);
        //     if(result?.data?.type == "success"){
        //         var room = result?.data?.data?.roomid 
        //         navigate.push(`/trade/${result?.data?.data?.roomid }` , {state : payload});
        //     }
        // }
        // else{
        //     toastAlert("error" , "Trade owner have Insufficient funds");
        // }
    }

    const handlebutton = async () => {
        // var payload = {
        //     pay : pay,
        //     receive : receive,
        //     tradedata : tradedata
        // }
        if (userdata?.account?.userId == ownerdata?.userId) {
            toastAlert("error", "You can't trade this order")
        }
        else {
            // if()
            if (tradedata?.verifiyfullname) {
                if (tradedata?.verifiyid) {
                    if (userdatas?.firstName && userdatas?.lastName && userdataskyc?.idProof?.status == "approved") {
                        var result = await handletrade();
                    }
                    else {
                        toastAlert("error", "You must complete kyc and update name for this trade")
                    }
                }
                else if (userdatas?.firstName && userdatas?.lastName) {
                    var result = await handletrade();
                }
                else {
                    toastAlert("error", "You must update your full name for this trade");
                }
            }
            // else if(!tradedata?.verifiyid && !tradedata?.verifiyfullname){}
            else if (tradedata?.verifiyid) {
                if (userdataskyc?.idProof?.status == "approved") {
                    var result = await handletrade();
                }
                else {
                    toastAlert("error", "You must update your kyc for this trade");
                }
            }
            else {
                var result = await handletrade();
            }
        }


    }


    return (
        <div>
            <Header className="header"
                color="transparent"
                routes={dashboardRoutes}
                brand={<img src={require("../../../../assets/images/logo.png")} alt="logo" className="img-fluid" />}
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 20,
                    color: "dark",
                }}
                {...rest} />

            <div className={loader ? "bitcoincompany login_container login_box logi_show_div_bc_company" : "bitcoincompany login_container login_box"}>

                {loader && <div id='loadercontainer'>
                    <div className='themeloader'>
                    </div>
                </div>}
                <div className='loader_hide_op'>

                    <div>
                        <h1 className='blackandwhite bit_text text-center bit1'>{tradedata?.ordertype?.toUpperCase()} BITCOIN With company</h1>
                        <p className='roboto subhead'>{tradedata?.ordertype == "Sell" ? "Buy" : "Sell"} Bitcoin from other users using any payment<br></br>method and currency.</p>
                    </div>

                    <div className='container'>
                        <div className='bitcoincompany'>
                            <img className='spring' src={spring} alt="spring" />
                            <img src={Images.connect} className='bannerconnect' />
                            <img src={Images.connect} className='connect1' />
                            <img src={Images.connect} className='connect' />
                            <img src={Images.connect} className='connectright' />
                            {/* <div className='mt-4'>
                            <Link to="/buybitcoin" className='back blackandwhite'><HiOutlineArrowSmLeft className='arl' /> Back to Offer</Link>
                        </div> */}

                            <div className='buyborder mt-3'>
                                {tradedata?.createrid != userdata?.account?.userId && <div>
                                    <p className='mb-4 much'>How much do you want to {tradedata?.ordertype == "Sell" ? "Buy" : "Sell"}?</p>
                                    <div className='row'>
                                        <div className='col-md-6 col-sm-6'>
                                            <div className='input-group mb-1 jj floatinglabel mt-4 h-54'>
                                                <label>I will {tradedata?.ordertype == "Sell" ? "pay" : "receive"}</label>
                                                <input
                                                    className="form-control mt-0"
                                                    placeholder="0"
                                                    name="pay"
                                                    type="number"
                                                    value={pay}

                                                    onChange={(e) => handlecalculatereceive(e?.target?.value)}
                                                />
                                                <span class="input-group-text" id="basic-addon2">{tradedata?.preferedcurrency}</span>
                                            </div>
                                            <p className='get'><AiOutlineInfoCircle /> Enter amount to get started</p>
                                            <p className='get'><AiOutlineInfoCircle /> You get {getuser} {tradedata?.preferedcurrency} worth of {tradedata?.coin}{tradedata?.ordertype == "Buy" && "+ escrow fee 1%"}</p>

                                            <p className='error-message mb-0'>{error}</p>
                                        </div>
                                        <div className='col-md-6 col-sm-6'>
                                            <div className='input-group mb-1 jj floatinglabel mt-4 h-54'>
                                                <label>and {tradedata?.ordertype == "Sell" ? "receive" : "pay"}</label>
                                                <input
                                                    className="form-control mt-0"
                                                    placeholder="Enter text"
                                                    name="pay"
                                                    type="text"
                                                    value={receive}
                                                    readOnly={true}
                                                />
                                                <span class="input-group-text" id="basic-addon2">{tradedata?.coin}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>}

                                {tradedata?.createrid != userdata?.account?.userId && <div className='text-center'>
                                    <button className='graybtn my-3' disabled={button} onClick={async () => await handlebutton()}>{tradedata?.ordertype == "Sell" ? "Buy" : "Sell"} Now</button>
                                </div>}

                                {<div className='row'>
                                    <div className='col-md-3 col-sm-6'>
                                        <div className='border1 mt-2'>
                                            <p className='amount'>Seller rate</p>
                                            <p className='btc-amount'>{parseFloat(prefferedcurrencyvalue).toFixed(8)}{tradedata?.preferedcurrency}</p>
                                            {variablepercentage && <p className='market'>{tradedata?.offermargin ? tradedata?.offermargin : variablepercentage}% {(tradedata?.offermargin ? tradedata?.offermargin : variablepercentage) > 0 ? "above market" : "below market"}</p>}
                                        </div>
                                    </div>
                                    <div className='col-md-3 col-sm-6'>
                                        <div className='border1 mt-2'>
                                            <p className='amount'>Buy limits</p>
                                            <p className='btc-amount'>Min : {tradedata?.min} {tradedata?.preferedcurrency}</p>
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
                                            <p className='amount'>TossVToss fee</p>
                                            <p className='btc-amount'>{currencies?.commisionfee}%</p>
                                        </div>
                                    </div>
                                </div>}
                            </div>

                            {/* <p className='lorem mt-4 mb-4 text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}

                            <div className='buyborder1 mt-3'>
                                <p className='mb-0 much'>About this {tradedata?.ordertype == "Sell" ? "seller" : "buyer"}</p>

                                <div className='d-flex justify-content-between chance'>
                                    <div className='one1'>
                                        <div className=''>
                                            <div className='d-flex align-items-center align-items-center uu'>
                                                <div><img src={ownerdata?.profileImage ? config.API_URL + ownerdata?.profileImage : profs} className='prof prof_icon_sixe' /></div>
                                                <div><p className='namelist'>{ownerdata?.firstName ? (ownerdata?.firstName + " " + ownerdata?.lastName) : ownerdata?.userId}
                                                    {/* <span><img src={flags} alt='hhq' /></span>  */}
                                                </p>
                                                    {/* <p className='no1 mb-0'>{userdatas?.lastseen == "online" ? userdatas?.lastseen : new Date(parseFloat(userdatas?.lastseen))?.toString()?.slice(4 , 21)}</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='one2 one2_alig_widt'>
                                        <div className=''>
                                            <div><p className='namelist'>Id Proof</p></div>
                                            <div className='text-center'><img src={ownerkyc?.idProof?.status == "approved" ? tick : close} className='prof1' /></div>
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
                                            <div><button className='themebtn mt-4'>{tradespeed ? (parseFloat(tradespeed) < 5 ? "Instant" : tradespeed + "min") : "New"}</button></div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
}

export default Bitcoincompany;