import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
// import HeaderAfterLinks from 'components/Header/HeaderLinksAfterlogin';
import React, { useState, useEffect } from 'react';
// import Footer from "components/Footer/Footer.js";

import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Images from "../../../../Images";
import profs from "../../../images/toss/prof.png";
import spring from "../../../images/toss/bannerbg.png";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import CreateoffModal from './Modals/CreateoffModal';
import CreatedModal from './Modals/CreatedModal';
import Footer from '../../../../components/Footer/Footer';
import { Getcoinlisthooks, Filterp2porderhooks } from '../../../../actions/P2PorderAction';
import { setCurrencyOption } from 'actions/commonAction';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toastAlert } from 'lib/toastAlert';

// import HeaderLinks1 from 'components/Header/HeaderLinksAfterlogin';

const dashboardRoutes = [];
const Buybitcoin = (props) => {
    const { ...rest } = props;

    const [createModal, setCreateModal] = useState(false);
    const[created, setCreated] = useState(false);


    const location = useLocation();
    const [offerdata, setOfferData] = useState(location?.state?.state)
    const [coindata, setCoindata] = useState([])
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [coin, setCoin] = useState('')
    const [amount, setAmount] = useState('')
    const [loadmore, setLoadMore] = useState('Load More')
    const [loader, setLoader] = useState(false);
    const [loadbutton , setLoadbutton] = useState(true)

    const navigate = useHistory();



    useEffect(() => {
    fetchData()
    },[])

    useEffect(() => {
        // (async () => {
            if (location?.state?.state?.length < 10) {
                setLoadbutton(false);
            }

            if (location?.state?.state?.length == 0) {
                setLoader(false)
                setLoadbutton(false);
            }

        // })();
    }, [])


    const fetchData = async () =>{
        let res = await Getcoinlisthooks();
        if(res?.data){
            setCoindata(res?.data);
            setCoin(res?.data[0])

        }

        
        var payload = {
            coin: res?.data[0],
            skip : 0,
            limit : 10
        }

        let filt = await Filterp2porderhooks(payload);
        console.log('filtfilt----', filt);
        if (filt.data.type == "success") {
            setOfferData(filt?.data?.data)
            // navigate.push("/viewoffers", {state : filt?.data?.data })
        } else {
            toastAlert('error', filt.data.message, 'filterp2porder', 'TOP_RIGHT')
        }
    }
    

    const LoadMore = async () => {

        let datas = {
            coin : coin != '' ? coin : '',
            amount : amount != '' ? amount : '',
            skip: skip,
            limit: limit
        }
        setLoadMore('Loading ...')
        let res = await Filterp2porderhooks(datas)
        if (res?.data?.type == "success") {
            let respdata = res.data.data
            if(respdata?.length < 10){
                setLoadbutton(false);
            }
            let concat_data = offerdata.concat(respdata)
            setLoadMore('Load More')
            setOfferData(concat_data)
            // if (res?.data?.data.length >= 10) {
            setSkip(skip + limit)
            // }

        }
    }
    const showloader = () => {
        document.getElementById("loadercontainer").classList.add("d-flex")
        document.getElementById("loadercontainer").classList.remove("d-none")
    }
    const hideloader = () => {
        document.getElementById("loadercontainer").classList.remove("d-flex")
        document.getElementById("loadercontainer").classList.add("d-none")
    }

    return (

        <div className='page_wrap alloffers'>
            {createModal && <CreateoffModal onDismiss={() => setCreateModal(false)} opencreated= {() => {setCreated(true);setCreateModal(false)}}/>}
            {created && <CreatedModal onDismiss={() => setCreated(false)}/>}
            <Header className="header dropheader"
                color="transparent"
                routes={dashboardRoutes}
                brand={<img src={require("../../../../assets/images/logo.png")} alt="logo" className="img-fluid" />}
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 20,
                    color: "dark",
                }}
                {...rest} />
            <div className='login_container login_box'>
                <div>
                    <h1 className='blackandwhite bit_text text-center bit1'>Offer</h1>
                    <p className='roboto subhead'>Buy Bitcoin from other users using any payment<br></br>method and currency.</p>
                </div>

                <div className='container'>
                    <div className='bitcoins'>
                           <img className='spring' src={spring} alt="spring"/>
                           <img src={Images.connect} className='bannerconnect'/>
                           <img src={Images.connect} className='connect'/>
                           <img src={Images.connect} className='connectright'/>
                        <div className='btborder d-flex justify-content-between mt-5'>
                            <div>
                                {/* <Dropdown>
                                    <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
                                        BTC
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Option</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Option</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Option</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                                <select className='btcc' name='coin' value={coin} onChange={(e) => { setCoin(e.target.value)}}>
                                    {coindata && coindata?.length > 0 && coindata.map((val, ind) => <>
                                    {/* <option hidden> select coin</option> */}
                                    <option value={val.coin}> {val.coin}</option>
                                    </>)}
                                 </select>
                            </div>
                            <div>
                                <div className='floatinglabel'>
                                    <input type="number" className='form-control' placeholder='Enter Amount' name='amount' onChange={(e) => {setAmount(e.target.value); }}/>
                                    <p className='btc-name'>BTC</p>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-end mt-5 mb-3'>
                            {/* <button className='graybtn my-3'>How to start</button> */}
                            {/* <button className='themebtn' onClick={() => setCreateModal(true)}>Create offer</button> */}
                           <Link to="/createoffer"><button className='themebtn'>Create offer</button></Link>
                        </div>

                        <div className='tableborder'>
                            <div className='tab-content'>
                            <div className='tab-content1'>
                            <div class="tradinglist position-relative">
                             {loader  && <div id='loadercontainer'> 
                              <div className='themeloader'> 
                              </div>
                              </div> }
                                   {/* <Link to="/bitcoincompany" className="buyhover"> */}
                             {offerdata && offerdata?.length > 0 && offerdata?.map((item) => <> <div className='tradelists'>
                                            <div className='d-flex flex-1 jc-between align-items-center'>
                                                <div className='d-flex align-items-center'>
                                                    <img src={Images.prof} className='prof' /> <p style={{ color: "darkgray" }}>{item?.userdata?.firstName +" " + item?.userdata?.lastName}</p>
                                                </div>
                                                <div>
                                                    {item?.paymentmethod ?. map((data) => <p className='aqua'>{data}</p>)}
                                                    {/* <p><span className='gray'>Limit</span> : <span className='gray gray1'>{item?.coin}</span></p> */}
                                                </div>
                                                <div>
                                                    <p><span className='gray amount'>Min purchase </span> : <span className='yellow'> {item?.min}</span></p>
                                                    <p><span className='gray amount'>Max purchase </span> : <span className='yellow'> {item?.max}</span></p>
                                                </div>
                                                <div>
                                                    <p><span className='red'>1{item?.coin}  = {item?.prefferedcurrencyvalue} {item?.preferedcurrency}</span> <span className='green'>{item?.offermargin ? item?.offermargin : item?.variablepercentage}% {(item?.offermargin ? item?.offermargin : item?.variablepercentage)>0 ? "above market price" : "below market price"}</span></p>
                                                </div>
                                                <div >
                                                    {/* <Link to="/sellbitcoin">  */}
                                                    <button className='themebtn' onClick={() => {
                                                        navigate.push(`/bitcoincompany/${item?._id}`, {state : item })
                                                    }}>{item?.ordertype}</button>
                                                    {/* </Link> */}
                                                </div>
                                            </div>


                                        </div> </>)}

                                        {!offerdata || offerdata?.length == 0 && <p>No data found</p>}
                             <div className='text-center mt-3'> 
                                {loadbutton && <button className='btn themebtn' onClick={()=>{LoadMore()}}>{loadmore}</button>}
                            </div>
                            {/* <div className='d-flex flex-1 jc-between align-items-center table-header'>
                                <div><p className='amount'>Seller</p></div>
                                <div><p className='amount'>Price</p></div>
                                <div><p className='amount'>Limits</p></div>
                                <div><p className='amount'>Offer Details</p></div>
                            </div> */}
                        
                                        
                             {/* <div className='tradelists'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof'/> <p style={{ color:"darkgray" }}>James</p>
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
                                    </div> */}
                             {/* </Link> */}
                            {/* <Link to="/bitcoincompany" className="buyhover"> */}
                            {/* <div className='tradelists mt-3'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof'/> <p style={{ color:"darkgray" }}>James</p>
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
                                    </div> */}
                                    {/* <div className='tradelists mt-3'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof'/> <p style={{ color:"darkgray" }}>James</p>
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
                                    </div> */}
                                    {/* <div className='tradelists mt-3'>
                                        <div className='d-flex flex-1 jc-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <img src={Images.prof} className='prof' /> <p style={{ color:"darkgray" }}>James</p>
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
                                    </div> */}
                                {/* </Link> */}
                                </div>
                            </div>
                            </div>             
                        </div>
                        <div className='d-flex align-items-center justify-content-end mt-5 mb-3'> 
                        {/* {skip >= 10 && <div> <button className='themebtn' onClick={()=>{LoadMore()}}>Load More</button> </div>} */}
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Buybitcoin;