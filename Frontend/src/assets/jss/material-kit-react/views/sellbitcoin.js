import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import React, { useState } from 'react';
// import Footer from "components/Footer/Footer.js";

import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Images from "../../../../Images";
import profs from "../../../images/toss/prof.png";
import spring from "../../../images/toss/bannerbg.png";
import tickss from "../../../images/ticks.png";
import Termss from "./termsmodal";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrFormClose } from 'react-icons/gr';
import { TiTick } from 'react-icons/ti';

import CreateoffModal from './Modals/CreateoffModal';
import CreatedModal from './Modals/CreatedModal';
import Footer from '../../../../components/Footer/Footer';

const dashboardRoutes = [];
const Buybitcoin = (props) => {

    const { ...rest } = props;

    const [createModal, setCreateModal] = useState(false);
    const[created, setCreated] = useState(false);

    return (
        <>
            {createModal && <CreateoffModal onDismiss={() => setCreateModal(false)} opencreated= {() => {setCreated(true);setCreateModal(false)}}/>}
            {created && <CreatedModal onDismiss={() => setCreated(false)}/>}

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
                <div className='login_container login_box'>
                    <div>
                        <h1 className='blackandwhite bit_text text-center bit1'>Sell Bitcoin</h1>
                        <p className='roboto subhead'>Buy Bitcoin from other users using any payment<br></br>method and currency.</p>
                    </div>

                    <div className='container'>
                        <div className='bitcoins'>
                            <img className='spring' src={spring} alt="spring" />
                            <img src={Images.connect} className='bannerconnect' />
                            <img src={Images.connect} className='connect' />
                            <img src={Images.connect} className='connectright' />
                            <div className='btborder d-flex justify-content-between mt-5'>
                                <div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
                                            BTC
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Option</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Option</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Option</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div>
                                    <div className='floatinglabel'>
                                        <input type="number" className='form-control' placeholder='Enter Amount' />
                                        <p className='btc-name'>BTC</p>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex align-items-center justify-content-between mt-5'>
                                <button className='graybtn my-3'>How to start</button>
                                {/* <button className='themebtn' onClick={() => setCreateModal(true)}>Create offer</button> */}
                               <Link to="/createoffer"><button className='themebtn'>Create offer</button></Link> 

                            </div>

                            <div className='tableborder'>
                                <div className='tab-content'>
                                    <div className='tab-content1'>
                                        <div class="tradinglist">
                                            <div className='d-flex flex-1 jc-between align-items-center table-header'>
                                                <div><p className='amount'>Buyer</p></div>
                                                <div><p className='amount'>Price</p></div>
                                                <div><p className='amount'>Limits</p></div>
                                                <div><p className='amount'>Offer Details</p></div>
                                            </div>
                                            <Link to="/sellbitcoincompany" className="buyhover">  <div className='tradelists mt-4'>
                                                
                                                <div className='d-flex flex-1 jc-between align-items-center'>
                                                    <div className='d-flex align-items-center align-items-center'>
                                                        <div><img src={profs} className='prof' /></div>
                                                        <div><p className='namelist'>James</p> <p className='no mb-0'>#EC668BC9</p></div>

                                                        <p></p>
                                                    </div>
                                                    <div>
                                                        <p className='aqua'>2,706,00.13 BTC</p>

                                                    </div>
                                                    <div>
                                                        <p className='limits'>10,000 - 2,928,977.13 BTC</p>
                                                        <p className='limits2'>0.00341416 - 1 BTC</p>
                                                    </div>
                                                    <div>
                                                        <p className='limits2 tww'>24/7 Service</p>
                                                    </div>

                                                </div>
                                            </div></Link>
                                            <Link to="/sellbitcoincompany" className="buyhover"> 
                                            <div className='tradelists mt-4'>
                                                <div className='d-flex flex-1 jc-between align-items-center'>
                                                    <div className='d-flex align-items-center align-items-center'>
                                                        <div><img src={profs} className='prof' /></div>
                                                        <div><p className='namelist'>James</p> <p className='no mb-0'>#EC668BC9</p></div>

                                                        <p></p>
                                                    </div>
                                                    <div>
                                                        <p className='aqua'>2,706,00.13 BTC</p>

                                                    </div>
                                                    <div>
                                                        <p className='limits'>10,000 - 2,928,977.13 BTC</p>
                                                        <p className='limits2'>0.00341416 - 1 BTC</p>
                                                    </div>
                                                    <div>
                                                        <p className='limits2 tww'>24/7 Service</p>
                                                    </div>
                                                </div>
                                            </div>
                                            </Link>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />


            </div >
        </>
    )
}

export default Buybitcoin;