import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import React, { useState } from 'react';
// import Footer from "components/Footer/Footer.js";

import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import tick from "../../../images/tick.png";

import { Link } from 'react-router-dom';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { AiOutlineInfoCircle } from 'react-icons/ai'; 
import { BsBoxArrowUpRight } from 'react-icons/bs';

import Images from "../../../../Images";
import profs from "../../../images/toss/prof.png";
import spring from "../../../images/toss/bannerbg.png";
import flags from "../../../images/flags.png";
import Footer from '../../../../components/Footer/Footer';

const dashboardRoutes = [];
const Bitcoincompany = (props) => {
    const { ...rest } = props;
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

            <div className='bitcoincompany login_container login_box'>
                <div>
                    <h1 className='blackandwhite bit_text text-center bit1'>Sell BITCOIN With Company</h1>
                    <p className='roboto subhead'>Buy Bitcoin from other users using any payment<br></br>method and currency.</p>
                </div>

                <div className='container'>
                <div className='bitcoincompany'>
                    <img className='spring' src={spring} alt="spring" />
                    <img src={Images.connect} className='bannerconnect' />
                    <img src={Images.connect} className='connect1' />
                    <img src={Images.connect} className='connect' />
                    <img src={Images.connect} className='connectright' />
                    <div className='mt-4'>
                        <Link to="/sellbitcoin" className='back blackandwhite'><HiOutlineArrowSmLeft className='arl' /> Back to Offer</Link>
                    </div>

                    <div className='buyborder mt-3'>
                        <p className='mb-4  much'>How much do you want to Buy?</p>
                        <div className='row'>
                            <div className='col-md-6 col-sm-6'>
                                <div className='input-group mb-1 jj floatinglabel mt-4 h-54'>
                                    <label>I will pay</label>
                                    <input
                                        className="form-control mt-0"
                                        placeholder="99.99 BTC"
                                        name="pay"
                                        type="number"
                                    />
                                    <span class="input-group-text" id="basic-addon2">ETH</span>
                                </div>
                                <p className='get'><AiOutlineInfoCircle/> Enter amount to get started</p>
                            </div>
                            <div className='col-md-6 col-sm-6'>
                                <div className='input-group mb-1 jj floatinglabel mt-4 h-54'>
                                    <label>and receive</label>
                                    <input
                                        className="form-control mt-0"
                                        placeholder="Enter text"
                                        name="pay"
                                        type="text"
                                    />
                                    <span class="input-group-text" id="basic-addon2">BTC</span>
                                </div>
                            </div>
                        </div>

                        <div className='text-center'>
                            <button className='graybtn my-3'>Sell Now</button>
                        </div>

                        <div className='row'>
                            <div className='col-md-3 col-sm-6'>
                                <div className='border1 mt-2'>
                                    <p className='amount'>Seller rate</p>
                                    <p className='btc-amount'>2,304,506.84 BTC</p>
                                    <p className='market'>2% above market</p>
                                </div>
                            </div>
                            <div className='col-md-3 col-sm-6'>
                                <div className='border1 mt-2'>
                                    <p className='amount'>Buy limits</p>
                                    <p className='btc-amount'>Min : 250 BTC</p>
                                    <p className='market'>Max : 1000 INR</p>
                                </div>
                            </div>
                            <div className='col-md-3 col-sm-6'>
                                <div className='border1 mt-2'>
                                    <p className='amount'>Trade time Limit</p>
                                    <p className='btc-amount'>30 min</p>

                                </div>
                            </div>
                            <div className='col-md-3 col-sm-6'>
                                <div className='border1 mt-2'>
                                    <p className='amount'>Toss Toss fee</p>
                                    <p className='btc-amount'>0%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className='lorem mt-4 mb-4 text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                    <div className='buyborder1 mt-3'>
                        <p className='mb-0 much'>About this buyer</p>

                        <div className='d-flex justify-content-between chance'>
                            <div className='one1'>
                                <div className=''>
                                    <div className='d-flex align-items-center align-items-center uu'>
                                        <div><img src={profs} className='prof prof_icon_sixe' /></div>
                                        <div><p className='namelist'>David 
                                        <span><img src={flags} alt='hhq'/></span> 
                                        </p> <p className='no1 mb-0'>Seen 1 minute ago</p></div>
                                    </div>
                                </div>
                            </div>

                            <div className='one2 one2_alig_widt'>
                                <div className=''>
                                    <div><p className='namelist'>Id Proof</p></div>
                                    <div className='text-center'><img src={tick} className='prof1' /></div>
                                </div>
                            </div>

                            <div className='one2 one2_alig_widt'>
                                <div className=''>
                                    <div><p className='namelist'>Phone Verified</p></div>
                                    <div className='text-center'><img src={tick} className='prof1' /></div>
                                </div>
                            </div>

                            <div className='one2 one2_alig_widt'>
                                <div className=''>
                                    <div><p className='namelist'>Email Verified</p></div>
                                    <div className='text-center'><img src={tick} className='prof1' /></div>
                                </div>
                            </div>

                            <div className='one2 one2_col_wdi'>
                                <div className=''>
                                    <div><p className='namelist'>Trade Speed</p></div>
                                    <div><button className='themebtn mt-4'>Instant</button></div>
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