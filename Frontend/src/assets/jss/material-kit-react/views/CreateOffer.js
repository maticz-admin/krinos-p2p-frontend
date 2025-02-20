import Images from 'Images';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import CheckBox from 'rc-checkbox';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { useLocation } from 'react-router-dom';
import CreateoffModal from './Modals/CreateoffModal';
import CreatedModal from './Modals/CreatedModal';
import Footer from '../../../../components/Footer/Footer';
import { COUNTRYLIST } from "../../../../config/country";
import OffertagModal from "./Modals/offertagModal";
// import isEmpty from 'lib/isEmpty';
import isEmpty from "is-empty";
import { useSelector } from 'react-redux';
import { Getcoinlisthooks } from '../../../../actions/P2PorderAction';
import { Getpreferedcurrency } from '../../../../actions/P2PorderAction';
import { Getalloffertaghook } from 'actions/P2PorderAction';
// import { Select } from '@matnpm i --save react-selecterial-ui/core';
// import { CMultiSelect } from '@coreui/react-pro';
import Select from 'react-select'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { MultiSelect } from "react-multi-select-component";
import { PAYMENT } from '../../../../config/paymenttypes';
import { getpaymenttypeshook } from 'actions/P2PorderAction';
import config from '../../../../config';

import btcicon from "../../../images/btcIcon.png"

const dashboardRoutes = [];
const CreateOffer = (props) => {
    const navigate = useHistory();
    const userdata = useSelector(state => state.account);
    const location = useLocation();
    const { ...rest } = props;
    const [steps, setSteps] = useState(1)
    const [createModal, setCreateModal] = useState(false)
    const [created, setCreated] = useState(false)
    let locationpath = location.location

    const [offerbitcoin, setofferbitcoin] = useState("Sell");
    const [cryp1, setCryp1] = useState("BTC");
    const [cryp2, setCryp2] = useState("ETH");
    const [cryp3, setCryp3] = useState("USDT");
    const [cryp4, setCryp4] = useState("RIPPLE")
    const [crypto, setCrypto] = useState(["BTC", "ETH", "USDT", "RIPPLE"]);
    const [cimage, setcimage] = useState("crypt1");
    const [coinimg, setCoinimg] = useState("");
    // const []
    // const myData = PAYMENT
    // [
    //     { value: 'Banktransfer', label: 'Banktransfer' },
    //     { value: 'Upitransfer', label: 'Upitransfer' },
    //     { value: 'Netbanking', label: 'Netbanking' }
    // ];
    const [myData, setMydata] = useState([]);

    //createdata
    const [coin, setCoin] = useState("");
    const [preimage, setPreimage] = useState("");
    const [ordertype, setOrdertype] = useState("Sell");
    const [prefferedcurrency, setPrefferedcurrency] = useState("");
    const [pricetype, setPricetype] = useState("Market Price");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [offerlimit, setOfferlimit] = useState("");
    const [timelimit, setTimelimit] = useState("");
    const [offertag, setOffertag] = useState([]);
    const [offerlabel, setOfferlabel] = useState("");
    const [offerterm, setOfferterm] = useState("");
    const [tradeinstruction, setTradeinstruction] = useState("");
    const [verifyid, setVerifyid] = useState(false);
    const [verifyfullname, setVerifyfullname] = useState(false);
    const [offermargin, setOffermargin] = useState(1);
    const [offertimelimit, setOffertimelimit] = useState(30);
    const [offertaglist, setOffertaglist] = useState([]);
    // {name : "photoid required" , description : "valid govt id reqireed"},
    //             {name : "No receipt needed" , description : "Receipt not required for this trade."},
    //             {name : "Invoices are accepted" , description : "Get your invoice paid"}
    const [fixedmarketrate, setFixedmarketrate] = useState(0);
    const [isoffertagmodal, setIsoffertagmodal] = useState(false);
    const [errors, setErrors] = useState({});
    const [payload, setPayload] = useState({});
    const [createddata, setCreateddata] = useState({});
    const [preferedcurrencylist, setPrefferedcurrencylist] = useState([]);
    const [paymentmethod, setPaymentmethod] = useState([]);
    // const []
    // const [country , setCountry] = useState()
    const [selected, setSelected] = useState([]);
    const [userwallet, setUserwallet] = useState([]);
    const [refdata, setRefdata] = useState({});
    const [local, setLocal] = useState(false);

    const stylesgraybg = {
        option: (styles, { isFocused, isSelected, isHovered }) => ({
            ...styles,
            color: "#6C6A81",
            background: isFocused ? "#F5F6F7" : isSelected ? "#F5F6F7" : isHovered ? "red" : "#F5F6F7",

            zIndex: 1,
            cursor: "pointer",
            fontSize: "13px"
        }),

        option: (styles, { isFocused, isSelected, isHovered }) => {
            // const color = chroma(data.color);


            return {
                ...styles,
                backgroundColor: isHovered ? "#ecff03" : isSelected ? "#ecff03" : isFocused ? "#ecff03" : "",
                cursor: "pointer",
                color: isHovered ? "#000" : isSelected ? "#000" : isFocused ? "#000" : "",
                fontSize: "13px"

            };
        },
        valueContainer: (provided, state) => ({
            ...provided,
            minHeight: "40px",
            padding: "0 40px 0px 20px",
            backgroundColor: "transperant ",
            border: "1px solid lightgray",
            borderRadius: 10,
            fontSize: "13px",


        }),
        control: (provided, state) => ({
            ...provided,
            height: "40px",
            borderRadius: 10,
            backgroundColor: "#fff",
            border: "none",
            outline: "none",
            boxShadow: "none"

        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: "40px",
            position: "absolute",
            right: 0,
            top: 0,
            color: "#6C6A81",

        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "#6C6A81",

        }),
        menuList: (base) => ({
            ...base,
            // kill the white space on first and last option
            padding: 0,
            maxHeight: "100px",
            overflowY: "auto"
        }),
    };

    var image = ["crypt1", "crypt2", "crypt3", "crypt4"]

    useEffect(() => {
        async function fetchdata() {
            var result = await Getcoinlisthooks();
            setCrypto(result?.data);
            setCoin(result?.data[0].symbol)
            var precurrency = await Getpreferedcurrency()
            setPrefferedcurrencylist(precurrency?.data);
            setPrefferedcurrency(precurrency?.data[0]?.symbol)
            setPreimage(`${config.API_URL}/images/currency/${precurrency?.data[0]?.image}`)
            setCoinimg(`${config.API_URL}/images/currency/${precurrency?.data[0]?.image}`);
            var ofrtg = await Getalloffertaghook();
            setOffertaglist(ofrtg?.data?.data);
            var paytype = await getpaymenttypeshook();
            setMydata(paytype?.data);
            // setPaymentmethod(paytype?.data?.data[0]?.value);
        }
        fetchdata();
    }, [])

    const handleselect = async (data) => {
        var pay = []
        data.map((i, index) => {
            pay.push(i?.value)
        })
        setPaymentmethod(pay);
    }

    const handlestep1 = async () => {
        var data = {};
        if (paymentmethod?.length == 0 || !paymentmethod) {
            data.paymentmethod = "Payment method field is required";
        }
        if (coin == prefferedcurrency) {
            data.prefferedcurrency = "cryptocurrency and prefered currency must be differ"
        }

        if (isEmpty(data)) {
            let cur1 = crypto.find(e => e.coin == coin)
            let cur2 = crypto.find(e => e.coin == prefferedcurrency);

            if (cur1?.depositType == "local" || cur2?.depositType == "local") {
                setPricetype("Fixed Price");
                setLocal(true);
                setOffermargin(0)
                // if(cur1.api || cur2.api){
                // setLocal(false);
                // }
                // else{
                // setPricetype("Fixed Price");
                // setLocal(true);
                // }
            }
            else {
                setLocal(false);
            }
            setSteps(2);
        }
        setErrors(data)
    }

    const handlestep2 = async () => {
        var data = {}
        if (isNaN(min) || min == 0) {
            data.min = "Invalid value"
        }
        if (isNaN(max) || max == 0) {
            data.max = "Invalid value"
        }
        if (parseFloat(max) < parseFloat(min) || parseFloat(min) > parseFloat(max)) {
            data.max = "Max value must be greater than Min value"
        }
        if (isEmpty(data)) {
            setSteps(3);
        } else {
            setErrors(data);
        }
    }

    const handlestep3 = async () => {
        var data = {};
        if (!offertag || offertag?.length == 0) {
            data.offertag = "Field is required!";
        }
        if (!offerlabel || offerlabel?.length == 0) {
            data.offerlabel = "Field is required";
        }
        if (!offerterm || offerterm?.length == 0) {
            data.offerterm = "Field is required!";
        }
        if (!tradeinstruction || tradeinstruction?.length == 0) {
            data.tradeinstruction = "Field is required!";
        }

        if (isEmpty(data)) {
            var payload = {
                coin: coin,
                ordertype: ordertype,
                preferedcurrency: prefferedcurrency,
                pricetype: pricetype,
                min: parseFloat(min),
                max: parseFloat(max),
                offermargin: offermargin,
                fixedmarketrate: fixedmarketrate,
                offertimelimit: offertimelimit,
                offertags: offertag,
                yourofferlable: offerlabel,
                offerterms: offerterm,
                tradeinstruction: tradeinstruction,
                verifiyid: verifyid,
                verifiyfullname: verifyfullname,
                createrid: userdata?.userId,
                paymentmethod: paymentmethod
            }
            setPayload(payload);
            setCreateModal(true)
        }
        else {
            setErrors(data)
        }
    }


    return (
        <div className='page_wrap home_page_header_banner beforelog alloffers'>
            {createModal && <CreateoffModal
                onSetresult={(data) => setCreateddata(data)}
                onsetdata={(data) => setRefdata(data)}
                payload={payload} onDismiss={() => setCreateModal(false)} opencreated={() => { setCreated(true); setCreateModal(false) }} />}
            {created && refdata && <CreatedModal
                refdat={refdata}
                createdata={createddata} onDismiss={() => { setCreated(false); window.location.reload() }} />}
            {isoffertagmodal && <OffertagModal
                onSet={(data) => { setOffertag((input) => { return data; }); }}
                taglist={offertaglist}
                ofrtag={offertag}
                data={createddata}
                onDismiss={() => setIsoffertagmodal(false)} />}

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
            <div className='login_container login_box createoff'>
                <div className='text-center mb-5'>
                    {/* <h3 className='blackandwhite'>{`Create Offer to ${locationpath} Bitcoin`}</h3> */}
                    {<h3 className='blackandwhite'>{`Create Offer to ${offerbitcoin} Bitcoin`}</h3>}

                    {/* {<h3 className='blackandwhite'>Create Offer to Buy Bitcoin</h3>} */}

                    <p className='subhead'>Buy/Sell Bitcoin from other users using any payment method and currency</p>
                </div>
                <div className='container-fluid themecontainer'>
                    <div className='row mb-md-5 mb-4 steps'>
                        <img src={Images.connect} className='stepsimg' />
                        <div className='col-md-12'>
                            <div className='bordbox p-sm-4'>
                                <div className='d-flex jc-between stepbtns'>
                                    <button className='active'
                                    // onClick={() => setSteps(1)}
                                    > <span className='fa fa-circle mr-2'></span>Payment method</button>
                                    <button
                                    // onClick={() => setSteps(2)}
                                    ><span className='fa fa-circle mr-2'></span>Price</button>
                                    <button
                                    // onClick={() => setSteps(3)}
                                    ><span className='fa fa-circle mr-2'></span>Other settings</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={steps == 1 ? 'row paymentmethod' : "d-none"}>
                        <img src={Images.bannerbg} className='positionimg' />
                        <div className='col-lg-6'>
                            <div className='bordbox borderbox_no_max_hei py-4'>
                                <h5 className='blackandwhite'>Choose your cryptocurrency</h5>
                                {/* <div className='d-sm-flex d-grid mb-5 mt-4 choosecrypt jc-between'> */}
                                {/* {crypto?.map((data , i) => <>
                                    <button className={coin === data?.coin ? 'graybtn text-start mb-sm-0 mb-3 d-flex gap-10 active' :'graybtn text-start mb-sm-0 mb-3 d-flex gap-10'}  onClick={()=>setCoin(data?.coin)}>
                                        <img src={`${config?.API_URL}/images/currency/${data?.image}`} /> <h6>{data?.coin}</h6>
                                    </button>
                                </>)} */}

                                <div className='floatinglabel my-xl-4 my-3 select_option'>
                                    {/* <label>What would you like to do?</label> */}

                                    <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
                                        <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
                                            <img src={coinimg} className="iconss" /> {coin}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="iner_dropmenu_versiotwo">
                                            {crypto?.map((data, i) => {
                                                return (

                                                    <Dropdown.Item  >
                                                        <p onClick={() => {
                                                            setCoin(data?.coin);
                                                            setCoinimg(`${config?.API_URL}/images/currency/${data?.image}`);
                                                        }}><img src={`${config?.API_URL}/images/currency/${data?.image}`} className="iconss" /> {data?.coin}</p></Dropdown.Item>)
                                            })}

                                        </Dropdown.Menu>
                                    </Dropdown>


                                    {/* <select onChange={(e) => {
                                            var index = e.target.selectedIndex;
                                            var optionElement = e.target.childNodes[index]
                                            var option =  optionElement.getAttribute('img');
                                            console.log("data in target" , option);
                                            setCoin(e.target.value);
                                            setCoinimg(option);
                                            }} value = {coin} className="form-control h-45 mt-2 pl-5">
                                            {crypto?.map((data , i) => <>
                                                <option value={data?.coin} img = {`${config?.API_URL}/images/currency/${data?.image}`}>{data?.coin}</option>
                                            </>)}
                                        </select> */}
                                    {/* <img src={coinimg} className='left'/> */}
                                </div>

                                {/* <button className={coin === cryp2 ? 'graybtn text-start mb-sm-0 mb-3 d-flex gap-10' : 'graybtn text-start mb-sm-0 mb-3 d-flex gap-10'} onClick={()=>setCoin(cryp2)}>
                                 <img src={Images.crypt2} />  <h6>{cryp2}</h6>
                                </button>
                                <button className={coin === cryp3 ?'graybtn text-start d-flex gap-10' : 'graybtn text-start d-flex gap-10'} onClick={()=>setCoin(cryp3)}>
                                 <img src={Images.crypt3} />  <h6>{cryp3}</h6>
                                </button>
                                <button className={coin == cryp4 ? 'graybtn text-start d-flex gap-10' : 'graybtn text-start d-flex gap-10'} onClick={()=>setCoin(cryp4)}>
                                 <img src={Images.crypt4} />  <h6>{cryp4}</h6> 
                                </button> */}
                                {/* </div> */}
                                <hr className='themehr mt-4' />
                                <div className='row'>
                                    <div className='col-xl-6'>
                                        <div className='floatinglabel my-xl-4 my-3 select_option'>
                                            <label>What would you like to do?</label>

                                            <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
                                                <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
                                                    <img src={Images.ticket} className="iconss iconss_wid_dd" />{ordertype}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="iner_dropmenu_versiotwo">




                                                    <Dropdown.Item
                                                    ><p onClick={() => {
                                                        setOrdertype("Sell")
                                                    }}><img src={Images.ticket} className="iconss iconss_wid_dd" />Sell</p></Dropdown.Item>
                                                    <Dropdown.Item
                                                    ><p onClick={() => {
                                                        setOrdertype("Buy")
                                                    }}>
                                                            <img src={Images.ticket} className="iconss iconss_wid_dd" />Buy</p></Dropdown.Item>

                                                </Dropdown.Menu>
                                            </Dropdown>

                                            {/* <select onChange={(e) => setOrdertype(e.target.value)} value = {ordertype} className="form-control h-45 mt-2 pl-5">
                                            <option value="Sell">Sell</option>
                                            <option value="Buy">Buy</option>
                                        </select> */}
                                        </div>
                                    </div>
                                    <div className='col-xl-6'>
                                        <div className='floatinglabel my-xl-4 my-3 select_option'>
                                            <label>Preferred Currency</label>

                                            <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
                                                <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
                                                    <img src={preimage} className="iconss" /> {prefferedcurrency}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="iner_dropmenu_versiotwo">



                                                    {preferedcurrencylist?.map((data, i) => {
                                                        return (

                                                            <Dropdown.Item
                                                            ><p onClick={() => {
                                                                setPrefferedcurrency(data?.symbol);
                                                                setPreimage(`${config?.API_URL}/images/currency/${data?.image}`);
                                                            }}><img src={`${config?.API_URL}/images/currency/${data?.image}`} className="iconss" /> {data?.symbol}</p></Dropdown.Item>)
                                                    })}

                                                </Dropdown.Menu>
                                            </Dropdown>

                                            {/* 
                                        <select className="form-control h-45 mt-2 pl-5" 
                                        onChange={(e) => {
                                            var index = e.target.selectedIndex;
                                            var optionElement = e.target.childNodes[index]
                                            var option =  optionElement.getAttribute('img');
                                            console.log("data in target" , option);
                                            setPrefferedcurrency(e.target.value);
                                            setPreimage(option);
                                            }} value = {prefferedcurrency}>
                                            {preferedcurrencylist?.map((data , i) => <>
                                                <option value={data?.symbol}  img = {`${config?.API_URL}/images/currency/${data?.image}`} onClick= {()=> setcimage("crypt"+(i+1))}>{data?.symbol}</option>
                                            </>)}
                                          
                                        </select> */}
                                            <p className='error-message mb-0'>{errors?.prefferedcurrency}</p>
                                        </div>
                                    </div>


                                    <div className='col-xl-12 pb-3'>
                                        <div className='floatinglabel  my-xl-4 my-3 select_option'>

                                            <label>Payment Method:       </label>
                                            <Select
                                                styles={stylesgraybg}
                                                onChange={(e) => handleselect(e)} isMulti="true" options={myData} className='multiselect select_oofer_multisel' />

                                            <p className='error-message mb-0'>{errors?.paymentmethod}</p>
                                            {/* <pre>{JSON.stringify(selected)}</pre> */}
                                            {/* <MultiSelect
        options={myData}
        // value={selected}
        // onChange={setSelected}
        labelledBy="Select"
      /> */}
                                            {/* <CMultiSelect className='form-control'
    options={myData}
    label="Preferred Currency:  "
    text="Please select your user."
    virtualScroller
  /> */}
                                            {/* <input mbsc-input id="my-input" data-dropdown="true" data-tags="true" /> */}

                                            {/* <Select className='viji'
                                            data={myData}
                                            selectMultiple={true}
                                            touchUi={false}
                                        /> */}

                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 '>
                            <div className="rightptag">
                                <img src={Images.connect} className='rightimg1' />
                                <img src={Images.connect} className='rightimg' />
                                <h5 className='blackandwhite'>About This Step</h5>
                                <hr className='themehr mt-3 mb-4' />
                                <p className='grayandblack'>Start creating your offer by selecting the cryptocurrency you want to trade, whether or not you want to buy or sell, and the payment method you want to use.</p>
                                <ul className='pl-3'>
                                    <li>
                                        <p className='grayandblack'>You want to {ordertype} {coin}</p>
                                    </li>
                                    <li>
                                        <p className='grayandblack'>And get paid in {prefferedcurrency}</p>
                                    </li>
                                </ul>
                                <div>
                                    {/* <button className='bordbtn'>Previous</button> */}
                                    <button className='themebtn ml-3' onClick={() => handlestep1()}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={steps == 2 ? 'row tradeprice' : "d-none"}>
                        <img src={Images.bannerbg} className='positionimg' />

                        <div className='col-xl-6 col-lg-7'>
                            <div className='bordbox borderbox_no_max_hei py-4'>
                                <h5 className='blackandwhite'>Trade Pricing</h5>
                                <p className='subhead text-left f-12'>Choose Bitcoin rate you want to use</p>
                                {local && <p className='balance_too_low_tex'>
                                    <i class="fa fa-exclamation-triangle me-2" aria-hidden="true"></i>
                                    Your can set only Fixed Price </p>}
                                <div className='d-sm-flex my-5 choosecrypt jc-between gap-10'>
                                    <button className={pricetype === "Market Price" ? 'graybtn mb-sm-0 mb-2 text-start d-flex align-items-center gap-10 active' : 'graybtn mb-sm-0 mb-2 text-start d-flex align-items-center gap-10'} onClick={() => { if (!local) { setPricetype("Market Price"); setOffermargin(1) } }}>
                                        <img src={Images.tag} />
                                        <div>
                                            <h6 className='m-0'>Market Price</h6>
                                            <p className='m-0'>Your offer’s selling price will change according to the market price of Bitcoin.</p>

                                        </div>
                                    </button>
                                    <button className={pricetype === "Fixed Price" ? 'graybtn mb-sm-0 mb-2 text-start d-flex align-items-center gap-10 active' : 'graybtn mb-sm-0 mb-2 text-start d-flex align-items-center gap-10'} onClick={() => { setPricetype("Fixed Price"); setOffermargin(1) }}>
                                        <img src={Images.fixedprice} />
                                        <div>
                                            <h6 className='m-0'>Fixed Price</h6>
                                            <p className='m-0'>Your offer’s selling price is locked when you create it, and won’t change with the market price.</p>
                                        </div>
                                    </button>

                                </div>
                                <hr className='themehr mt-4' />
                                <h6 className='blackandwhite'>Offer trade Limits</h6>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='floatinglabel my-3'>
                                            <label>Min</label>
                                            {/* <select className="form-control h-45 mt-2">
                                            <option>244</option>
                                        </select> */}
                                            <input className="form-control h-45 mt-2" type="text"
                                                onChange={(e) => {
                                                    setMin(e?.target?.value);
                                                }}
                                            />
                                        </div>
                                        <p className='error-message mb-0'>{errors?.min}</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='floatinglabel my-3'>
                                            <label>Max</label>
                                            {/* <select className="form-control h-45 mt-2">
                                            <option>242</option>
                                        </select> */}
                                            <input className="form-control h-45 mt-2" type="text"
                                                onChange={(e) => {
                                                    setMax(e?.target?.value);
                                                }}
                                            />
                                        </div>
                                        <p className='error-message mb-0'>{errors?.max}</p>
                                    </div>
                                </div>
                                <hr className='themehr mt-4' />
                                <div className='row'>
                                    {pricetype === "Fixed Price" ? <div className='col-sm-6'>
                                        <h6 className='blackandwhite'>Fixed price market rate your offer will list at</h6>
                                        <div className='d-flex incrementbtn'>
                                            <button disabled={fixedmarketrate == 1} onClick={() => setFixedmarketrate(fixedmarketrate - 1)}>-</button> <input type="text" placeholder={fixedmarketrate} value={fixedmarketrate} onChange={(e) => setFixedmarketrate(e?.target?.value)} />
                                            <button onClick={() => setFixedmarketrate(fixedmarketrate + 1)}>+</button>  <span style={{ textTransform: "lowercase" }}>{prefferedcurrency}</span>
                                        </div>
                                    </div> :

                                        <div className='col-sm-6'>
                                            <h6 className='blackandwhite'>Offer margin</h6>
                                            <div className='d-flex incrementbtn'>
                                                <button disabled={offermargin == 1} onClick={() => setOffermargin(offermargin - 1)}>-</button><input type="text" placeholder={offermargin} value={offermargin} onChange={(e) => setOffermargin(e?.target?.value)} />
                                                <button onClick={() => setOffermargin(offermargin + 1)}>+</button> <span>%</span>
                                            </div>
                                        </div>
                                    }
                                    <div className='col-sm-6'>
                                        <h6 className='blackandwhite'>Offer Time Limits</h6>
                                        <div className='d-flex incrementbtn'>
                                            <button disabled={offertimelimit == 30} onClick={() => setOffertimelimit(offertimelimit - 1)}>-</button><input type="text" placeholder={offertimelimit} value={offertimelimit} onChange={(e) => setOfferlimit(e?.target?.value)} />
                                            <button onClick={() => setOffertimelimit(offertimelimit + 1)}>+</button> <span>min</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 col-lg-5 '>
                            <div className="rightptag">
                                <img src={Images.connect} className='rightimg1' />
                                <img src={Images.connect} className='rightimg' />
                                <h5 className='blackandwhite'>About This Step</h5>
                                <hr className='themehr mt-3 mb-4' />
                                <p className='grayandblack'>Decide the price you want to trade at, and set the limits for your offer.</p>
                                <ul className='pl-3'>
                                    <li>
                                        <p className='grayandblack'>You want to {ordertype} {coin}</p>
                                    </li>
                                    <li>
                                        <p className='grayandblack'>And get paid in {prefferedcurrency}</p>
                                    </li>
                                    {min && max &&
                                        <li>
                                            <p className='grayandblack'>People can trade between{min} {prefferedcurrency} and {max} {prefferedcurrency}</p>
                                        </li>
                                    }
                                </ul>
                                <div>
                                    <button className='bordbtn' onClick={() => setSteps(1)}>Previous</button>
                                    <button className='themebtn ml-3' onClick={() => handlestep2()}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={steps == 3 ? 'row tradeinstruction form_padding_top_inipt' : "d-none"}>
                        <img src={Images.bannerbg} className='positionimg' />

                        <div className='col-lg-6'>
                            <div className='bordbox borderbox_no_max_heipy-4'>
                                <h5 className='blackandwhite'>Trade Instructions</h5>
                                <p className='subhead text-left f-12'>Choose Bitcoin rate you want to use</p>

                                <hr className='themehr mt-4' />
                                <h6 className='blackandwhite'>Offer trade Limits</h6>
                                <div className='floatinglabel my-3' onClick={() => { setIsoffertagmodal(true) }}>
                                    <label>Offer Tags</label>
                                    {/* <select className="form-control h-45 mt-2">
                                    <option>Search for tags</option>
                                </select> */}

                                    <p className="form-control offertag_formcontrol">
                                        {offertag.length > 0 ? offertag?.map((data) => <>
                                            {/* <div className='card card_off_tyag my-2 mx-2'>
                                    <div className='card-body p-1'> */}
                                            <span className='mb-0 badge themebadge me-1 mb-1'>{data?.Name}</span>
                                            {/* </div>
                                </div> */}
                                        </>) : <span className='mb-0 badge themebadge themebadge_notagss me-1 mb-1'>Select Offer tags</span>}
                                        {/* <div className='card card_off_tyag my-2 mx-2'>
                                    <div className='card-body p-1'>
                                        <p className='mb-0'>Name</p>
                                    </div>
                                </div>

                                <div className='card card_off_tyag my-2 mx-2'>
                                    <div className='card-body p-1'>
                                        <p className='mb-0'>Name</p>
                                    </div>
                                </div> */}
                                    </p>
                                </div>
                                <p className='error-message mb-0'>{errors?.offertag}</p>
                                <div className='floatinglabel my-3'>
                                    <label>Your Offer Label</label>
                                    <input type="text" className="form-control h-45 mt-2" value={offerlabel} onChange={(e) => setOfferlabel(e.target?.value)} />
                                    {/* <select className="form-control h-45 mt-2">
                                    <option>Maximum 25 characters. Only letters, numbers and dashes.</option>
                                </select> */}
                                </div>
                                <p className='error-message mb-0'>{errors?.offerlabel}</p>
                                <div className='floatinglabel my-3'>
                                    <label>Offer Terms</label>
                                    <textarea className="form-control mt-2" row="10" value={offerterm}
                                        onChange={(e) => setOfferterm(e.target.value)}
                                    ></textarea>
                                    {/* <span className='subhead f-12'>Lorem Ipsum is simply dummy</span> */}
                                </div>
                                <p className='error-message mb-0'>{errors?.offerlabel}</p>

                                <div className='floatinglabel my-3'>
                                    <label>Trade Instructions</label>
                                    <textarea className="form-control mt-2" row="10" value={tradeinstruction}
                                        onChange={(e) => setTradeinstruction(e?.target?.value)}
                                    ></textarea>
                                    {/* <span className='subhead f-12'>Lorem Ipsum is simply dummy</span> */}
                                </div>
                                <p className='error-message mb-0'>{errors?.tradeinstruction}</p>
                                <div>
                                    <h6 className='blackandwhite'>Verification</h6>
                                    {/* <div className="form-check d-flex align-items-center">
                                        <CheckBox
                                            name="remember"
                                        
                                        />
                                        <label className="ml-2 f-12 mb-0 grayandblack subhead text-left" for="flexCheckDefault">
                                            Require your trade partner to have verified their ID
                                        </label>
                                    </div> */}
                                    <label class="custcheck ml-2 blackandwhite f-12">
                                        <input type="checkbox"
                                            onChange={(e) => setVerifyid(e.target.checked)}
                                            checked={verifyid}
                                        />
                                        <span class="checkmark"></span>  Require your trade partner to have verified their ID

                                    </label>
                                    <label class="custcheck ml-2 blackandwhite f-12">
                                        <input type="checkbox"
                                            onChange={(e) => {
                                                console.log("e.target.value", e.target.checked);
                                                setVerifyfullname(e.target.checked);
                                            }}
                                            checked={verifyfullname}
                                        />
                                        <span class="checkmark"></span> Require your trade partner to show their full name

                                    </label>
                                    {/* <div className="form-check d-flex align-items-center">
                                        <CheckBox
                                            name="remember"
                                        
                                        />
                                        <label className="ml-2 f-12 mb-0 grayandblack subhead text-left" for="flexCheckDefault">
                                        Require your trade partner to show their full name
                                        </label>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='rightptag'>
                                <img src={Images.connect} className='rightimg1' />
                                <img src={Images.connect} className='rightimg' />
                                <h5 className='blackandwhite'>About This Step</h5>
                                <hr className='themehr mt-3 mb-4' />
                                <p className='grayandblack'>Set the terms, instructions, and limitations for people to trade on this offer.</p>
                                <ul className='pl-3'>
                                    <li>
                                        <p className='grayandblack'>You want to {ordertype} {coin}</p>
                                    </li>
                                    <li>
                                        <p className='grayandblack'>And get paid in {prefferedcurrency}</p>
                                    </li>
                                    {min && max &&
                                        <li>
                                            <p className='grayandblack'>People can trade between{min} {prefferedcurrency} and {max} {prefferedcurrency}</p>
                                        </li>
                                    }
                                </ul>
                                <div>
                                    <button className='bordbtn' onClick={() => setSteps(2)}>Previous</button>
                                    <button className='themebtn ml-3' onClick={() => handlestep3()}>Create Offer</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default CreateOffer