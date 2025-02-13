// import package
import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom"
import isEmpty from "is-empty";

// import component
import HomeBanner from './HomeBanner';
import MarketTrend from './MarketTrend';
import { Tabs, Tab, Dropdown, Form, Accordion } from 'react-bootstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import Images from "../../Images";
import { Link } from 'react-router-dom';
import { Getcoinlisthooks  , Getpreferedcurrency, Filterp2porderhooks , Getcmshooks} from 'actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
import { COUNTRYLIST } from 'config/country';
import { emailValidation } from 'components/LoginForm/validation';
import { subscribe } from 'actions/newsLetterAction';
import { Getfaqhooks } from 'actions/P2PorderAction';
import { getpaymenttypeshook } from 'actions/P2PorderAction';
import config from '../../config';

import btcicon from "../../../src/assets/images/btcIcon.png"

import axios from 'axios';

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
  
var img1 = <img src={Images.tab1} />
var img2 = <img src={Images.tab2} />
var img3 = <img src={Images.tab3} />
var img4 = <img src={Images.tab4} />
var img5 = <img src={Images.tab5} />
var img6 = <img src={Images.tab6} />

const Home = (props) => {
    const [coinlist , setCoinlist] = useState([]);
    const [coin , setCoin] = useState("");
    const [ordertype , setOrdertype] = useState("Buy");
    const [amount , setAmount] = useState("");
    const [prefferedcurrency , setPrefferedcurrency] = useState("");
    const [prefferedcurrencylist , setPrefferedcurrencylist] = useState([]);
    const [paymenttypelist , setPaymenttypelist] = useState([
        // { value: 'Banktransfer', label: 'Banktransfer' },
        // { value: 'Upitransfer', label: 'Upitransfer' },
        // { value: 'Netbanking', label: 'Netbanking' }
    ]);
    const [paymenttype , setPaymenttype] = useState("");
    const [errors , setErrors] = useState({});
    const [email , SetEmail] = useState("");


    //CMS
    const [transparentfee , setTransparentfee] = useState("");
    const [marginhall , setMarginhall] = useState("");
    const [learnandpractice, setLearnandpractice] = useState("");
    const [faq , setFaq] = useState([]);
    const [loading , setLoading] = useState(false);
    const [coinimg , setCoinimg] = useState("");

    const [preimage , setPreimg] = useState("");


    const navigate = useHistory();

    const OnSubmit =async (e)=>{
        e.preventDefault()
        var letter = {email : email}
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
       var validateError = emailRegex.test(email);//await  emailValidation(letter)
       if(!email){
        toastAlert('error', "Email required!")
       }else
        if (validateError) {
          var res = await subscribe(letter)
          if (res.status) {
            toastAlert('success', res.message, 'newLetter')
            SetEmail("");
          }
          else {
            toastAlert('error', res.message, 'newsLetter')
          }
        }
        else{
          toastAlert('error', "Invalid Email!")
        }  
      }

    useEffect(()=>{
        async function fetchdata(){
            
            var result = await Getcoinlisthooks();
           
            setCoinlist(result?.data);
            setCoin(result?.data[0]?.symbol);
            var precurrency = await Getpreferedcurrency();
            

            setPrefferedcurrencylist(precurrency?.data);
            setPrefferedcurrency(precurrency?.data[0]?.symbol);
            setPreimg(`${config.API_URL}/images/currency/${precurrency?.data[0]?.image}`)
            var paytype = await getpaymenttypeshook();
            setPaymenttypelist(paytype?.data);
            setCoinimg(`${config.API_URL}/images/currency/${precurrency?.data[0]?.image}`);
            setPaymenttype(paytype?.data[0]?.value);
            // var ofrtg = await Getalloffertaghook();
            // setOffertaglist(ofrtg?.data?.data);
        }
        fetchdata();
    } , [])

   
    useEffect(() => {
        async function getcms(){
            var payload1 = {"identifier" : "TRANSPARENT_FEES"};
            var result1 = await Getcmshooks(payload1);
            setTransparentfee(result1?.data?.data?.content);

            var payload2 = {"identifier" : "MARGIN_CALL"};
            var result2 = await Getcmshooks(payload2);
            setMarginhall(result2?.data?.data?.content);

            var payload3 = {"identifier" : "LEARN_&_PRACTICE"};
            var result3 = await Getcmshooks(payload3);
            setLearnandpractice(result3?.data?.data?.content);

            var result4 = await Getfaqhooks();
            setFaq(result4?.data?.data);

        }
        getcms();
    },[])


    const handleviewoffer = async () => {
        var data = {}
        if (isNaN(amount) || parseFloat(amount) == 0 || !amount) {
            data.amount = "Invalid value"
        }
        if(coin == prefferedcurrency){
            data.preferedcurrency = "cryptocurrency and prefered currency must be differ"
        }
        if (isEmpty(data)) {
            setLoading(true);
            var payload = {
                coin: coin,
                ordertype: ordertype,
                preferedcurrency: prefferedcurrency,
                amount: amount,
                paymenttype: paymenttype,
                skip : 0,
                limit : 10
            }
            setErrors({})

            let res = await Filterp2porderhooks(payload);
            if (res.data.type == "success") {
                setLoading(false);
                navigate.push(`/viewoffers/${ordertype}/${coin}`, {state : res?.data?.data })
            } else {
                toastAlert('error', res.data.message, 'filterp2porder', 'TOP_RIGHT');
                setLoading(false);
            }
        }
        else {
            setErrors(data);
        }
    }


    return (
        <>
            {/* <HomeBanner /> */}
            <div className='bannersec h-100vh bodyheight heigh_unst_home'>
                <div className='container'>
                    <div className='bannercont'>
                        <img src={Images.connect} className='bannerconnect' />
                        <img src={Images.eth} className='bannereth' />

                        <div className='row jc-center text-center'>
                            <div className='col-lg-6'>
                                <div className='banner_ad_wrapper'>

                                    <div>
                                        <h1 className='blackandwhite'>Welcome to TOSSvTOSS</h1>
                                        <p className='roboto subhead'>Anonymous P2P deals on your teams. Trade globaly using for any payment system for any currency. </p>
                                        {/* <button className='mt-3 borderbtn'><i class="fa fa-video-camera" aria-hidden="true"></i> Learn To Trade</button> */}
                                        <Link to="/details/demo_videos" className="navlink_pos_zin borderbtn mt-3 d-block"><i class="fa fa-video-camera" aria-hidden="true"></i> Learn To Trade</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='buyselltab'>
                        <img src={Images.bitcoin} className='bannerbitcoin' />
                        <img src={Images.bannerbg} className='bannerbg' />
                        <img src={Images.connect} className='grayconnect' />
                        <img src={Images.connect1} className='tgrayconnect' />
                        <img src={Images.connectx} className='connectx' />
                        <div className='row jc-center'>
                            <div className='col-lg-7'>
                                <div className="themenav">
                                    <img src={Images.connect} className='connect' />

                                    <Tabs eventKey="Buy" id="uncontrolled-tab-example" onSelect={(e) => setOrdertype(e)}>
                                        <Tab eventKey="Buy" title="BUY" className='px-3 py-3' >
                                        <div className='row mt-3'>
                                                <div className='col-md-6'>
                                                    <div className='themeselect mb-3 themeselct_home_se'>
                                                        <label>Select Crypto</label>
                                                       

                                                        <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
           <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
           <img src={coinimg} className="iconss" /><span>{coin}</span>
           </Dropdown.Toggle>

           <Dropdown.Menu className="iner_dropmenu_versiotwo">

          



             {coinlist?.map((data , i) => {
             return(
             
             <Dropdown.Item  
             >
                <p onClick={() =>{
                    setCoin(data?.coin);
                    setCoinimg(`${config?.API_URL}/images/currency/${data?.image}`);
                }}><img src={`${config?.API_URL}/images/currency/${data?.image}`} className="iconss" /> 
             <span>{data?.coin}</span></p></Dropdown.Item>)})}
           
           </Dropdown.Menu>
         </Dropdown>

</div>
                                                        {/* <select onChange={(e) => {
                                                            var index = e.target.selectedIndex;
                                                            var optionElement = e.target.childNodes[index]
                                                            var option =  optionElement.getAttribute('img');
                                                            setCoin(e.target.value);
                                                            setCoinimg(option);
                                                            }} value = {coin} className="form-control h-45 mt-2 pl-5">
                                            {coinlist?.map((data , i) => <>
                                                <option value={data?.coin} img = {`${config?.API_URL}/images/currency/${data?.image}`}>{data?.coin}</option>
                                            </>)}
                                        </select> */}
                                                            {/* {coinlist?.map((data , i) => <>
                                                                <button className={data?.coin == coin ? 'active' : ""}  onClick={()=>setCoin(data?.coin)}>{data?.coin}</button>
                                                            </>)} */}
                                                            {/* <button>USEURD</button>
                                                            <button>+34</button> */}
                                                        {/* </div> */}
                                                        {/* <Select value={names}  className='bg_unset_blk'>
                                                    {names.map((i) =>{
                                                    return <MenuItem value="jkg">{i}</MenuItem>
                                                    })} 
                                                </Select> */}


                                                    {/* </div> */}
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='themeselect themeselct_home_se mb-3 p-0'>
                                                        <label>Preferred Currency</label>

                                                        
                                                        <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
           <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
           <img src={preimage} className="iconss" /><span>{prefferedcurrency}</span>
           </Dropdown.Toggle>

           <Dropdown.Menu className="iner_dropmenu_versiotwo">

          



             {prefferedcurrencylist?.map((data , i) => {
             return(
             
             <Dropdown.Item  
             ><p onClick={() =>{
                setPrefferedcurrency(data?.symbol);
                setPreimg(`${config?.API_URL}/images/currency/${data?.image}`);
            }}><img src={`${config?.API_URL}/images/currency/${data?.image}`} className="iconss" /> 
             <span>{data?.symbol}</span></p></Dropdown.Item>)})}
           
           </Dropdown.Menu>
         </Dropdown>
                                            
                                                            {/* <Form.Control size="sm" as="select" className='bg-dark kr_selectpadnet selct_padd_ned'
                                                             onChange={(e) => setPrefferedcurrency(e.target.value)} 
                                                             value = {prefferedcurrency}
                                                            >
                                                            {prefferedcurrencylist?.map((data , i) => <>
                                                                    <option value={data?.symbol}>{data?.symbol}</option>
                                                                </>)}
                                                               
                                                            </Form.Control> */}
                                                            
                                                        {/* <div className=''>
                                                            <button>USD</button>
                                                            <button>USEURD</button>
                                                            <button>+34</button>
                                                        </div> */}
                                                        {/* <Select value={names}  className='bg_unset_blk'>
                                                    {names.map((i) =>{
                                                    return <MenuItem value="jkg">{i}</MenuItem>
                                                    })} 
                                                </Select> */}

                                                    </div>
                                                    <p className='text-danger error-message mb-3'> {errors?.preferedcurrency}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                     
                                                <div className='col-md-6'>
                                                    <div className='themeselect themeselct_home_se p-0 mb-3'>
                                                        <label>Payment Method</label>
                                                        <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
           <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
           <span className='pl-2'>{paymenttype}</span>
           </Dropdown.Toggle>

           <Dropdown.Menu className="iner_dropmenu_versiotwo">

          



             {paymenttypelist?.map((data , i) => {
             return(
             
             <Dropdown.Item  
             >
             <p onClick={() => {
                setPaymenttype(data?.value)
             }}><span className='pl-0'>{data?.value}</span></p></Dropdown.Item>)})}
           
           </Dropdown.Menu>
         </Dropdown>


                                                            {/* <Form.Control size="sm" as="select"
                                                             className='bg-dark selct_padd_ned kr_selectpadnet'
                                                             onChange={(e) => setPaymenttype(e.target.value)} 
                                                             value = {paymenttype}
                                                            >
                                                            {paymenttypelist?.map((data , i) => <>
                                                                    <option value={data?.value}>{data?.value}</option>
                                                                </>)}
                                                               
                                                            </Form.Control> */}
                                                        {/* <div className=''>
                                                            <button>USD</button>
                                                            <button>USEURD</button>
                                                            <button>+34</button>
                                                        </div> */}
                                                        {/* <Select value={names}  className='bg_unset_blk'>
                                                    {names.map((i) =>{
                                                    return <MenuItem value="jkg">{i}</MenuItem>
                                                    })} 
                                                </Select> */}

                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                <div className='floatinglabel mb-3'>
                                                    <label>Amount</label>
                                                    <input type="text" className='form-control' placeholder='Enter Amount' value={amount}
                                                     onChange={(e)=>setAmount(e?.target?.value)}
                                                     />
                                                </div>
                                                <p className='text-danger error-message'> {errors?.amount}</p>
                                                </div>
                                                
                                            </div>

                                            <div className=''>
                                              
                                                {/* <div className='text-center'>
                                     <Link to={{ pathname: `/createoffer`, location: "Buy" }}>  <button className='graybtn my-3'>View Offer </button></Link>
                                    </div> */}
                                                <div className='text-center'>
                                                    {/* <Link to="/buybitcoin">   */}
                                                    <button className='graybtn my-3' onClick={()=> handleviewoffer()}>{loading ? "Loading..." : "View Offer"}</button>
                                                    {/* </Link> */}
                                                </div>
                                            </div>

                                        </Tab>
                                        <Tab eventKey='Sell' title="SELL" className='px-3 py-3'  >
                                        <div className='row mt-3'>
                                                <div className='col-md-6'>
                                                    <div className='themeselect themeselct_home_se mb-3'>
                                                        <label>Select Crypto</label>
                                                        {/* <div className='mb-2'> */}
                                                            {/* <Form.Control size="sm" as="select" className='bg-dark'>
                                                                <option >BTC</option>
                                                                <option>ETH</option>
                                                                <option>+34</option>
                                                            </Form.Control> */}
                                                        {/* </div> */}
                                                        <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
           <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
           <img src={coinimg} className="iconss" /><span>{coin}</span>
           </Dropdown.Toggle>

           <Dropdown.Menu className="iner_dropmenu_versiotwo">

          



             {coinlist?.map((data , i) => {
             return(
             
             <Dropdown.Item  
             ><p onClick={() =>{
                setCoin(data?.coin);
                setCoinimg(`${config?.API_URL}/images/currency/${data?.image}`);
            }}><img src={`${config?.API_URL}/images/currency/${data?.image}`} className="iconss" /> 
             <span>{data?.coin}</span></p></Dropdown.Item>)})}
           
           </Dropdown.Menu>
         </Dropdown>

         
                                                        {/* <select onChange={(e) => {
                                                            var index = e.target.selectedIndex;
                                                            var optionElement = e.target.childNodes[index]
                                                            var option =  optionElement.getAttribute('img');
                                                            setCoin(e.target.value);
                                                            setCoinimg(option);
                                                            }} value = {coin} className="form-control h-45 mt-2 pl-5">
                                            {coinlist?.map((data , i) => <>
                                                <option value={data?.coin} img = {`${config?.API_URL}/images/currency/${data?.image}`}>{data?.coin}</option>
                                            </>)}
                                        </select> */}

                                                        {/* <div className=''>
                                                            {coinlist?.map((data , i) => <>
                                                                <button className={data?.coin == coin ? 'active' : ""}  onClick={()=>setCoin(data?.coin)}>{data?.coin}</button>
                                                            </>)} */}
                                                            {/* <button>USEURD</button>
                                                            <button>+34</button> */}
                                                        {/* </div> */}
                                                        {/* <Select value={names}  className='bg_unset_blk'>
                                                    {names.map((i) =>{
                                                    return <MenuItem value="jkg">{i}</MenuItem>
                                                    })} 
                                                </Select> */}


                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='themeselect themeselct_home_se mb-3 p-0'>
                                                        <label>Preferred Currency</label>
                                            

                                                        <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
           <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
           <img src={preimage} className="iconss" /><span>{prefferedcurrency}</span>
           </Dropdown.Toggle>

           <Dropdown.Menu className="iner_dropmenu_versiotwo">

          



             {prefferedcurrencylist?.map((data , i) => {
             return(
             
             <Dropdown.Item  
             ><p onClick={() =>{
                setPrefferedcurrency(data?.symbol);
                setPreimg(`${config?.API_URL}/images/currency/${data?.image}`);
            }}><img src={`${config?.API_URL}/images/currency/${data?.image}`} className="iconss" /> 
             <span>{data?.symbol}</span></p></Dropdown.Item>)})}
           
           </Dropdown.Menu>
         </Dropdown>


                                                            {/* <Form.Control size="sm" as="select" className='bg-dark '
                                                             onChange={(e) => setPrefferedcurrency(e.target.value)} 
                                                             value = {prefferedcurrency}
                                                            >
                                                            {prefferedcurrencylist?.map((data , i) => <>
                                                                    <option value={data?.symbol}>{data?.symbol}</option>
                                                                </>)}
                                                              
                                                            </Form.Control> */}
                                                        {/* <div className=''>
                                                            <button>USD</button>
                                                            <button>USEURD</button>
                                                            <button>+34</button>
                                                        </div> */}
                                                        {/* <Select value={names}  className='bg_unset_blk'>
                                                    {names.map((i) =>{
                                                    return <MenuItem value="jkg">{i}</MenuItem>
                                                    })} 
                                                </Select> */}

                                                    </div>
                                                    <p className='text-danger error-message mb-3'> {errors?.preferedcurrency}</p>
                                                </div>
                                            </div>
                                            <div className='row'>
                                     
                                                <div className='col-md-6'>
                                                    <div className='themeselect themeselct_home_se p-0 mb-3'>
                                                        <label>Payment Method</label>
                                             

                                                        <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
           <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
           <span className='pl-2'>{paymenttype}</span>
           </Dropdown.Toggle>

           <Dropdown.Menu className="iner_dropmenu_versiotwo">

          



             {paymenttypelist?.map((data , i) => {
             return(
             
             <Dropdown.Item  
             >
             <p onClick={()=>{
            setPaymenttype(data?.value)
           }}><span className='pl-0'>{data?.value}</span></p></Dropdown.Item>)})}
           
           </Dropdown.Menu>
         </Dropdown>


                                                            {/* <Form.Control size="sm" as="select" className='bg-dark'
                                                             onChange={(e) => setPaymenttype(e.target.value)} 
                                                             value = {paymenttype}
                                                            >
                                                            {paymenttypelist?.map((data , i) => <>
                                                                    <option value={data?.value}>{data?.value}</option>
                                                                </>)}
                                                               
                                                            </Form.Control> */}
                                                        {/* <div className=''>
                                                            <button>USD</button>
                                                            <button>USEURD</button>
                                                            <button>+34</button>
                                                        </div> */}
                                                        {/* <Select value={names}  className='bg_unset_blk'>
                                                    {names.map((i) =>{
                                                    return <MenuItem value="jkg">{i}</MenuItem>
                                                    })} 
                                                </Select> */}

                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                <div className='floatinglabel mb-3'>
                                                    <label>Amount</label>
                                                    <input type="text" className='form-control' placeholder='Enter Amount' value={amount}
                                                     onChange={(e)=>{setAmount(e?.target?.value); setOrdertype('Sell')}}
                                                     />
                                                </div>
                                                <span className='text-danger'> {errors?.amount}</span>
                                                </div>
                                                
                                            </div>

                                            <div className=''>
                                              
                                                {/* <div className='text-center'>
                                     <Link to={{ pathname: `/createoffer`, location: "Buy" }}>  <button className='graybtn my-3'>View Offer </button></Link>
                                    </div> */}
                                                {/* <div className='text-center'>
                                                    <Link to="/buybitcoin">  <button className='graybtn my-3' >View Offer </button></Link>
                                                </div> */}
                                                <div className='text-center'>
                                                    {/* <Link to="/buybitcoin">   */}
                                                    <button className='graybtn my-3' onClick={()=> handleviewoffer()}>{loading ? "Loading..." : "View Offer"} </button>
                                                    {/* </Link> */}
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* <section className="whyUs pb-0 " id="careprivacy">

                <div className="container-fluid">
                    <img src={Images.connect} className='bannerconnect' />
                    <img src={Images.connect} className='connectr' />
                    <h2 className="title1 heads">WE CARE ABOUT YOUR PRIVACY.</h2>
                    <p className="mb-0 roboto text-center subhead" >In publishing and graphic design, <br></br>Lorem ipsum is a placeholder text commonly</p>
                    <div className="row row_why_choose mt-lg-0 mt-3">
                        <div className="col-lg-4  mb-lg-4 mb-0">
                            <div className="card calc_card">
                                <div className="card-body pt-3 pb-0">
                                    <div className="feature_list feature_list1 text-center">
                                        <div className="feature_text mt-lg-4 mt-0">
                                            <div>  <img src={Images.secure} alt="Secure Storage" className="img-fluid" /></div>
                                            <div>
                                                <h5>SECURE</h5>
                                                <p className="heading-text px-lg-0 roboto">
                                                    Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-4  mb-lg-4 mb-0" >
                           
                            <div className="card calc_card">
                                <div className="card-body pt-3 pb-0">
                                    <div className="feature_list feature_list1 text-center">
                                        <div className="feature_text mt-lg-4 mt-0">
                                            <div><img src={Images.key} alt="Optimized User Experience" className="img-fluid" /></div>
                                            <div>
                                                <h5>NON-CUSTODIAL</h5>
                                                <p className="heading-text px-lg-0 roboto">
                                                    Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4  mb-lg-4 mb-0">
                            <div className="card calc_card">
                                <div className="card-body pt-3 pb-0">
                                    <div className="feature_list feature_list1 text-center">
                                        <div className="feature_text mt-lg-4 mt-0">
                                            <div>  <img src={Images.hack} alt="Technical Stability" className="img-fluid" /></div>
                                            <div>
                                                <h5>ANONYMOUS</h5>
                                                <p className="heading-text px-lg-0 roboto">
                                                    Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing.Lorem Ipsum is simply dummy text of the printing
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mb-lg-5 mb-3 mt-3'>
                        <button className='themebtn'>View offer</button>
                    </div>
                </div>
            </section> */}
            {/* <section id='tablesec'>
                <div className='container'> */}

                    {/* <div className='row jc-center mb-4'>
                        <div className='col-md-6'>
                            <h1 className="mb-4 title1 heads mt-5">Trade like a pro</h1>
                            <p className='roboto subhead'> In publishing and graphic design, Lorem ipsum is a placeholder text commonly</p>
                        </div>
                    </div> */}
                    {/* <div className='tradetab'> */}
                        {/* <div className='d-flex tradesearch align-items-center'>
                            <div className='selectoption'>
                                <div className='floatinglabel'>
                                    <p className='online'>Online Payment</p>
                                    <label>Amount</label>
                                        <input type="text" className='form-control' placeholder='select'/>
                                    <select class="form-select form-control" aria-label="Default select example">
                                        <option selected>Select</option>
                                        <option value="1">Option</option>
                                        <option value="2">Option</option>
                                    </select>
                                </div>


                            </div>
                            <button className='themebtn esbtn'>
                                <img src={Images.excrow} /><br />
                                <p className='ess'>Escrow</p>
                            </button>
                        </div>
                        <div className='tablebg'> <img src={Images.bannerbg} className='bannerbg' /></div>
                        <img src={Images.connect} className='bannerconnect' />
                        <img src={Images.connect} className='connectrigth' /> */}
                        {/* <Tabs defaultActiveKey="bitcoin" id="uncontrolled-tab-example"> */}
                            {/* <Tab eventKey="bitcoin" title={img1} className='px-3 py-3'>
                                <div className='tradinglist'>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /><p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span> </p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/sellbitcoin">  <button className='themebtn'>Sell</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span> </p>
                                            </div>
                                            
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/buybitcoin">  <button className='themebtn buys'>Buy</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                <Link to="/viewoffer"><button className='graybtn my-4'>View Offer</button></Link>
                                </div>
                            </Tab> */}
                            {/* <Tab eventKey="busd" title={img2} className='px-3 py-3'>
                                <div className='tradinglist'>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/sellbitcoin"> <button className='themebtn'>Sell</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/buybitcoin">  <button className='themebtn buys'>Buy</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='graybtn my-4'>View Offer</button>
                                </div>
                            </Tab> */}
                            {/* <Tab eventKey="eth" title={img3} className='px-3 py-3'>
                                <div className='tradinglist'>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/sellbitcoin">    <button className='themebtn'>Sell</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/buybitcoin"> <button className='themebtn buys'>Buy</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='graybtn my-4'>View Offer</button>
                                </div>
                            </Tab> */}
                            {/* <Tab eventKey="douge" title={img4} className='px-3 py-3'>
                                <div className='tradinglist'>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/sellbitcoin"><button className='themebtn'>Sell</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <button className='themebtn buys'><Link to="/buybitcoin">Buy</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='graybtn my-4'>View Offer</button>
                                </div>
                            </Tab>
                            <Tab eventKey="usdt" title={img5} className='px-3 py-3'>
                                <div className='tradinglist'>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/sellbitcoin"> <button className='themebtn'>Sell</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span> </p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <button className='themebtn buys'><Link to="/buybitcoin">Buy</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='graybtn my-4'>View Offer</button>
                                </div>
                            </Tab>
                            <Tab eventKey="binance" title={img6} className='px-3 py-3'>
                                <div className='tradinglist'>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/sellbitcoin"> <button className='themebtn'>Sell</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p>James</p>
                                            </div>
                                            <div>
                                                <p className='aqua'>12.88 BTC</p>
                                                <p><span className='gray'>Limit</span> : <span className='gray gray1'>834.75 BTC</span></p>
                                            </div>
                                            <div>
                                                <p><span className='gray amount'>Amount</span> : <span className='yellow'> 834.75 BTC</span></p>
                                            </div>
                                            <div >
                                                <button className='greenbtn'>Payment : UPi</button>
                                            </div>
                                            <div>
                                                <p><span className='red'> 85 Traders</span> <span className='green'>- 100.00%</span></p>
                                            </div>
                                            <div >
                                                <Link to="/buybitcoin">   <button className='themebtn buys'>Buy</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='graybtn my-4'>View Offer</button>
                                </div>
                            </Tab> */}
                        {/* </Tabs> */}
                    {/* </div> */}
                {/* </div>
            </section> */}
            <section id="statusssec">
                <div className='container'>
                    <img src={Images.connect} className='bannerconnect' />
                    <img src={Images.connect} className='connectrigth' />

                    <div className='row'>
                        <div className='col-sm-4'>
                            <h3>44+</h3>
                            <p>Millions of Users</p>
                        </div>
                        <div className='col-sm-4'>
                            <h3>$3,364,238,100</h3>
                            <p>24h Trading Volume</p>
                        </div>
                        <div className='col-sm-4'>
                            <h3>700+</h3>
                            <p>Prime Virtual Asset</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="faqsec">
                <div className='container-fluid'>
                    <img src={Images.connect} className='bannerconnect' />
                    <div className='row flex-lg-row'>
                        <div className='col-xl-12 col-lg-12 mt-lg-0 mt-4'>
                            <div className='row borderbox_img_wi'>
                                <div className='col-12 col-md-4'>
                                <div className='borderbox'>
                                <img src={Images.homefaq1} />
                                <h3>SAFE TRANSACTION</h3>
                                <p>Bitcoins are held in safe escrow until the transaction is fully concluded</p>
                                {/* <p>{ReactHtmlParser(transparentfee)}</p> */}

                            </div>
                                </div>

                                <div className='col-12 col-md-4'>
                                <div className='borderbox'>
                                <img src={Images.homefaq2} />
                                <h3>INVITE FRIENDS </h3>
                                <p>Help your friends and family <Link to="/register">Sign up for TOSSvTOSS</Link></p>

                                {/* <p>{ReactHtmlParser(marginhall)}</p> */}
                            </div> 
                                </div>

                                <div className='col-12 col-md-4'>
                                <div className='borderbox'>
                                <img src={Images.homefaq3} />
                                <h3>VALUABLE FEEDBACK</h3>
                                <p>TOSSvTOSS's feedback system highlights reliable and experienced users, helping you trade smoothly</p>

                                {/* <p>{ReactHtmlParser(learnandpractice)}</p> */}
                            </div>
                                </div>

                            </div>
                           
                            
                           
                        </div>
                        <div className='col-xl-12 col-lg-12 mt-4'>
                            <div className=' '>
                                <div className='text-start'>
                                    <h1 className="mb-4 title1 heads mt-0 text-lg-left">FAQ</h1>
                                    {/* <p className='roboto text-lg-left subhead'> In publishing and graphic design, Lorem ipsum is a placeholder text commonly</p> */}
                                </div>

                                <div>
                                    <div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true" >
                                        {faq?.map((data , i) => <>
                                            <div class="card">
                                            <div class="card-header" role="tab" id={`heading${i}`}>
                                                <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href={`#collapse${i}`} 
                                                    aria-controls={`collapse${i}`} >
                                                    <h5 class="mb-0 d-flex jc-between" >{data?.question}<i class="fas fa-plus rotate-icon"></i> </h5>
                                                </a>
                                            </div>
                                            <div id={`collapse${i}`} class="collapse " role={`tabpanel${i}`} aria-labelledby={`heading${i}`}
                                                data-parent="#accordionEx">
                                                <div class="card-body">
                                                    <p>{data?.answer}</p>
                                                    {/* <ul>
                                                        <li> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p></li>
                                                        <li> <p>Lorem Ipsum is simply dumm</p></li>
                                                        <li> <p> The printing and typesetting industry. Lorem Ipsum has been the industry's</p></li>
                                                    </ul> */}
                                                </div>
                                            </div>

                                        </div>
                                        </>)}

                                        {/* <div class="card">
                                            <div class="card-header" role="tab" id="heading2">
                                                <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapse2" aria-expanded='false'
                                                    aria-controls="collapse2" >
                                                    <h5 class="mb-0 d-flex jc-between" >Which problems are we solving?<i class="fas fa-plus rotate-icon"></i> </h5>
                                                </a>
                                            </div>
                                            <div id="collapse2" class="collapse" role="tabpanel" aria-labelledby="heading2"
                                                data-parent="#accordionEx">
                                                <div class="card-body">
                                                    <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                        industry's standard dummy text ever since the 1500s,
                                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                    <ul>
                                                        <li> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p></li>
                                                        <li> <p>Lorem Ipsum is simply dumm</p></li>
                                                        <li> <p> The printing and typesetting industry. Lorem Ipsum has been the industry's</p></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="card">
                                            <div class="card-header" role="tab" id="heading3">
                                                <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapse3" aria-expanded='false'
                                                    aria-controls="collapse3" >
                                                    <h5 class="mb-0 d-flex jc-between" >Which problems are we solving?<i class="fas fa-plus rotate-icon"></i> </h5>
                                                </a>
                                            </div>
                                            <div id="collapse3" class="collapse" role="tabpanel" aria-labelledby="heading3"
                                                data-parent="#accordionEx">
                                                <div class="card-body">
                                                    <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                                        industry's standard dummy text ever since the 1500s,
                                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                    <ul>
                                                        <li> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p></li>
                                                        <li> <p>Lorem Ipsum is simply dumm</p></li>
                                                        <li> <p> The printing and typesetting industry. Lorem Ipsum has been the industry's</p></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div> */}
                                    </div>
                                </div>
                                {/* <div className='d-flex jc-between align-items-center mt-md-5 mt-3 viewallfaq'>
                                    <h3>ANSWERS TO ALL YOUR<br /> QUESTIONS ON OUR FAQ h3AGE</h3>
                                    <div> <button className='themebtn py-2 px-4'>View all</button></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div id="footer">
                <div className="container">
                    <img src={Images.connect} className='bannerconnect' />
                    {/* <img src={bannn} className='connectr'/> */}
                    <img src={Images.connect} className='connectr' />
                    <div className="row jc-center text-center">
                        <div className="col-md-6">
                            <h2>Start Your Crypto Journey Now!</h2>
                            {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p> */}
                            <div className="input-group">
                                <input type="email" autoComplete="off" className="form-control" placeholder="Email" name="email"
                                  onChange={(e)=>{SetEmail(e?.target?.value)}}
                                />
                                <div className="input-group-append">
                                    <button className="themebtn" //href="/"
                                    onClick={(e)=>{OnSubmit(e)}}
                                    >Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <MarketTrend /> */}

        </>
    )
}

export default Home;