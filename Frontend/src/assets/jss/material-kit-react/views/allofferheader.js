import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
// import HeaderAfterLinks from 'components/Header/HeaderLinksAfterlogin';
import React, { useState, useEffect } from 'react';
// import Footer from "components/Footer/Footer.js";


import { Button, Dropdown } from 'react-bootstrap';
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
import isLogin from 'lib/isLogin';
import config from '../../../../config/index';
import { useSelector } from 'react-redux';
import { Getsingleuserhook } from '../../../../actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
// import HeaderLinks1 from 'components/Header/HeaderLinksAfterlogin';

const dashboardRoutes = [];
const Buybitcoin = (props) => {
    const { ...rest } = props;
    const userdata = useSelector(state => state);
    // const userdata = useSelector(state => state);
    const [createModal, setCreateModal] = useState(false);
    const [created, setCreated] = useState(false);
    const location = useLocation();
    const [offerdata, setOfferData] = useState([])
    const [coindata, setCoindata] = useState([])
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [coin, setCoin] = useState('')
    const [amount, setAmount] = useState('')
    const [loadmore, setLoadMore] = useState('Load More')
    const [loader, setLoader] = useState(true);
    const [loadbutton, setLoadbutton] = useState(true);

    const [userverification, setUserverification] = useState({});

    const navigate = useHistory();



    useEffect(() => {
        fetchData()
    }, [])


    const handleChange = async (e) => {
        setLoader(true);
        console.log('eeeeeeeeeee-----', e);
        var payload = {
            ordertype: window.location.pathname.split('/')[2]?.toString(),
            coin: e,
            amount: amount != "" ? amount : "",
            skip: 0,
            limit: 10
        }
        setCoin(e)
        let res = await Filterp2porderhooks(payload);

        if (res.data.type == "success") {
            setLoader(false)
            if (res?.data?.data?.length > 0) {
                setOfferData(res?.data?.data)
            } else {
                setOfferData([])
            }
        }

    }

    const filterbutton = async () => {
        if (amount) {
            setLoader(true)
            var payload = {
                ordertype: window.location.pathname.split('/')[2]?.toString(),
                coin: coin != "" ? coin : "",
                amount: amount,
                skip: 0,
                limit: 10
            }
            let res = await Filterp2porderhooks(payload);
            if (res.data.type == "success") {
                setLoader(false)
                if (res?.data?.data?.length > 0) {
                    setOfferData(res?.data?.data)
                } else {
                    setOfferData([])
                }
                setLoader(false)
            }
        }
    }


    const fetchData = async () => {
        setCoin(window.location.pathname.split('/')[3]?.toString())
        let res = await Getcoinlisthooks();;
        // console.log('res------', res);
        if (res?.data) {
            setCoindata(res?.data);
        }
        if (location?.state?.state) {
            setSkip(location?.state?.state?.length);
            setOfferData(location?.state?.state);
            setLoader(false)
            if (location?.state?.state?.length < 10) {
                setLoadbutton(false);
            }

            if (location?.state?.state?.length == 0) {
                setLoader(false)
                setLoadbutton(false);
            }
        }
        else {
            setLoader(true)
            var payload = {
                ordertype: window.location.pathname.split('/')[2]?.toString(),
                coin: window.location.pathname.split('/')[3]?.toString(),
                skip: skip,
                limit: limit
            }
            let res = await Filterp2porderhooks(payload);
            if (res?.data?.type == "success") {
                let concat_data = offerdata.concat(res?.data?.data);
                setOfferData(concat_data); setSkip(skip + limit);
                if (res?.data?.data?.length < 10) {
                    setLoadbutton(false)
                }
                setLoader(false)
            }
        }

    }

    const handleverify = async () => {
        if (isLogin()) {
            let userpayload = {
                userid: userdata?.account?.userId //redux usr data
            }
            var userresult = await Getsingleuserhook(userpayload);
            setUserverification(userresult?.data?.data);
            if (userresult?.data?.kyc?.idProof?.status == "approved") {
                navigate.push("/createoffer");
            }
            else {
                toastAlert("error", "Complete your kyc and update fullname");
            }
        }
        else {
            navigate.push("/login");
        }
    }


    const LoadMore = async () => {

        let datas = {
            coin: coin != '' ? coin : '',
            amount: amount != '' ? amount : '',
            ordertype: window.location.pathname.split('/')[2]?.toString(),
            skip: skip,
            limit: limit
        }
        setLoadMore('Loading ...')
        let res = await Filterp2porderhooks(datas)
        if (res?.data?.type == "success") {
            let respdata = res.data.data
            if (respdata?.length < 10) {
                setLoadbutton(false);
            }
            let concat_data = offerdata.concat(respdata)
            setLoadMore('Load More')
            setOfferData(concat_data)
            setSkip(skip + limit)

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
            {createModal && <CreateoffModal onDismiss={() => setCreateModal(false)} opencreated={() => { setCreated(true); setCreateModal(false) }} />}
            {created && <CreatedModal onDismiss={() => setCreated(false)} />}
            <Header className="header dropheader"
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


            <div className='login_container login_box'>
                <div>
                    <h1 className='blackandwhite bit_text text-center bit1'>Offer</h1>
                    <p className='roboto subhead'>Buy or Sell Bitcoin from other users using any payment<br></br>method and currency.</p>
                </div>

                <div className='container'>
                    <div className='d-flex align-items-center justify-content-end my-3'>
                        <button className='themebtn' onClick={() => handleverify()}>Create offer</button>
                    </div>
                    <div className='bitcoins'>
                        <img className='spring' src={spring} alt="spring" />
                        <img src={Images.connect} className='bannerconnect' />
                        <img src={Images.connect} className='connect' />
                        <img src={Images.connect} className='connectright' />
                        <div className='btborder d-sm-flex justify-content-between mt-5'>
                            <div className='mb-sm-0 mb-3'>


                                <div className='mb-0'>

                                    <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
                                        <Dropdown.Toggle variant="success" className='btcc  bnt_drops_btcc' id="dropdown-basic">
                                            <span>{coin}</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="iner_dropmenu_versiotwo iner_dropmenu_versiotwo_wid_frix">





                                            {coindata && coindata?.length > 0 && coindata.map((val, ind) => {
                                                return (

                                                    <Dropdown.Item>
                                                        <p onClick={async () => {
                                                            await handleChange(val.coin)
                                                        }}><span>{val.coin}</span></p></Dropdown.Item>)
                                            })}

                                        </Dropdown.Menu>
                                    </Dropdown>





                                </div>


                            </div>
                            <div className='flex_with_btn_div_ofe'>
                                <div className='floatinglabel'>
                                    <input type="number" className='form-control' readOnly={loader} placeholder='Enter Amount' name='amount' onChange={(e) => { setAmount(e.target.value) }} />
                                    <Button disabled={loader} className="themebtn ms-2 btn_filer_new_ma" onClick={filterbutton}>Filter</Button>
                                </div>
                            </div>
                        </div>


                        <div className='tableborder mt-3'>
                            <div className='tab-content'>
                                <div className='tab-content1 tradinglist_sscrl_tabcont1'>
                                    <div class="tradinglist position-relative tradinglist_sscrl">
                                        {loader && <div id='loadercontainer'>
                                            <div className='themeloader'>
                                            </div>
                                        </div>}
                                        {!loader && offerdata && offerdata?.length > 0 && offerdata?.map((item) => <> <div className='tradelists'>
                                            <div className='d-flex flex-1 jc-between align-items-center'>
                                                <div className='d-flex align-items-center profile_oofer_widt'>
                                                    <img src={item?.userdata?.profileImage ? config.API_URL + item?.userdata?.profileImage : Images.profill} className='prof prof_new_size' /> <p style={{ color: "darkgray" }}>{item?.userdata?.firstName ? (item?.userdata?.firstName + " " + item?.userdata?.lastName) : item?.userdata?.userId}</p>
                                                </div>
                                                <div style={{ maxWidth: "200px", minWidth: "200px", marginRight: "20px" }}>
                                                    {item?.paymentmethod?.map((data) => <p className='aqua badge themebadge me-1 mb-1'>{data}</p>)}
                                                </div>
                                                <div style={{ maxWidth: "250px", minWidth: "250px", marginRight: "20px" }}>
                                                    <p><span className='gray amount'>Min purchase </span> : <span className='yellow'> {item?.min} {item?.preferedcurrency}</span></p>
                                                    <p><span className='gray amount'>Max purchase </span> : <span className='yellow'> {item?.max} {item?.preferedcurrency}</span></p>
                                                </div>
                                                <div style={{ maxWidth: "250px", minWidth: "250px", marginRight: "20px" }}>
                                                    <p>
                                                        <span className='red f-12'>1{item?.coin}  = {item?.prefferedcurrencyvalue} {item?.preferedcurrency} </span>
                                                        {item?.variablepercentage ? <><span className='green f-12'>{item?.offermargin ? item?.offermargin : item?.variablepercentage}%
                                                            {(item?.offermargin ? item?.offermargin : item?.variablepercentage) > 0 ? <i className='fa fa-arrow-up'></i> : <i className='fa fa-arrow-down'></i>}</span></> : <span className='hifern_bold'></span>}
                                                    </p>
                                                </div>
                                                <div style={{ maxWidth: "135px", minWidth: "135px" }}>
                                                    {userdata?.account?.userId ? (item?.createrid != userdata?.account?.userId ? <div >
                                                        <button className='themebtn' onClick={() => {
                                                            isLogin() ?
                                                            navigate.push(`/bitcoincompany/${item?._id}`, { state: item })
                                                            : navigate.push('/login');
                                                        }}>{item?.ordertype == "Sell" ? "Buy" : "Sell"}</button>
                                                    </div> : <div >
                                                        <button className='themebtn' onClick={() => {
                                                            isLogin() ?
                                                            navigate.push(`/bitcoincompany/${item?._id}`, { state: item })
                                                            : navigate.push('/login');
                                                        }}>View</button>
                                                    </div>) : <div className='btn_div_ooder_he right_space'>
                                                        <button className='themebtn' onClick={() => {
                                                            isLogin() ?
                                                            navigate.push(`/bitcoincompany/${item?._id}`, { state: item })
                                                            : navigate.push('/login');
                                                        }}>{item?.ordertype == "Sell" ? "Buy" : "Sell"}</button>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div> </>)}

                                        {!loader && <> {!offerdata || offerdata?.length == 0 && <p className='d-flex h-254 align-items-center jc-center text-light'>No data found</p>} </>}
                                        <div className='text-center mt-3'>
                                            {!loader && <> {loadbutton && <button className='btn themebtn' onClick={() => { LoadMore() }}>{loadmore}</button>} </>}
                                        </div>


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