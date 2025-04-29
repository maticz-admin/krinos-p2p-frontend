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
import { useTranslation } from 'react-i18next';

const dashboardRoutes = [];
const Bitcoincompany = (props) => {
        const { t, i18n } = useTranslation();
    
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
                    <h1 className='blackandwhite bit_text text-center bit1'>{t("SELL_BITCOIN_WITH_COMPANY")}</h1>
                    <p className='roboto subhead'>{t("BUY_BITCOIN_PAYMENT_CURRENCY")}<br></br>{t("METHOD_AND_CURRENCY")}</p>
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
                        <p className='mb-4  much'>{t("HOW_MUCH_DO_YOU_WANT_BUY")}</p>
                        <div className='row'>
                            <div className='col-md-6 col-sm-6'>
                                <div className='input-group mb-1 jj floatinglabel mt-4 h-54'>
                                    <label>{t("I_WILL_PAY")}</label>
                                    <input
                                        className="form-control mt-0"
                                        placeholder="99.99 BTC"
                                        name="pay"
                                        type="number"
                                    />
                                    <span class="input-group-text" id="basic-addon2">ETH</span>
                                </div>
                                <p className='get d-flex align-items-center'><AiOutlineInfoCircle/> {t("ENTER_AMOUNT_TO_GET_STARTED")}</p>
                            </div>
                            <div className='col-md-6 col-sm-6'>
                                <div className='input-group mb-1 jj floatinglabel mt-4 h-54'>
                                    <label>{t("AND_RECEIVE")}</label>
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
                            <button className='graybtn my-3'>{t("SELL_NOW")}</button>
                        </div>

                        <div className='row'>
                            <div className='col-md-3 col-sm-6'>
                                <div className='border1 mt-2'>
                                    <p className='amount'>{t("SELLER_RATE")}</p>
                                    <p className='btc-amount'>2,304,506.84 BTC</p>
                                    <p className='market'>2% {t("ABOVE_MARKET")}</p>
                                </div>
                            </div>
                            <div className='col-md-3 col-sm-6'>
                                <div className='border1 mt-2'>
                                    <p className='amount'>{t("BUY_LIMITS")}</p>
                                    <p className='btc-amount'>Min : 250 BTC</p>
                                    <p className='market'>Max : 1000 INR</p>
                                </div>
                            </div>
                            <div className='col-md-3 col-sm-6'>
                                <div className='border1 mt-2'>
                                    <p className='amount'>{t("TRADE_TIME_LIMIT")}</p>
                                    <p className='btc-amount'>30 min</p>

                                </div>
                            </div>
                            <div className='col-md-3 col-sm-6'>
                                <div className='border1 mt-2'>
                                    <p className='amount'>{t("TOSS_TOSS_FEE")}</p>
                                    <p className='btc-amount'>0%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className='lorem mt-4 mb-4 text-center'>{t("LOREM_IPSUM")}</p>

                    <div className='buyborder1 mt-3'>
                        <p className='mb-0 much'>{t("ABOUT_THIS_BUYER")}</p>

                        <div className='d-flex justify-content-between chance'>
                            <div className='one1'>
                                <div className=''>
                                    <div className='d-flex align-items-center align-items-center uu'>
                                        <div><img src={profs} className='prof prof_icon_sixe' /></div>
                                        <div><p className='namelist'>David 
                                        <span><img src={flags} alt='hhq'/></span> 
                                        </p> <p className='no1 mb-0'>{t("SEEN_1_MINUTE_AGO")}</p></div>
                                    </div>
                                </div>
                            </div>

                            <div className='one2 one2_alig_widt'>
                                <div className=''>
                                    <div><p className='namelist'>{t("ID_PROOF")}</p></div>
                                    <div className='text-center'><img src={tick} className='prof1' /></div>
                                </div>
                            </div>

                            <div className='one2 one2_alig_widt'>
                                <div className=''>
                                    <div><p className='namelist'>{t("PHONE_VERIFIED")}</p></div>
                                    <div className='text-center'><img src={tick} className='prof1' /></div>
                                </div>
                            </div>

                            <div className='one2 one2_alig_widt'>
                                <div className=''>
                                    <div><p className='namelist'>{t("EMAIL_VERIFIED")}</p></div>
                                    <div className='text-center'><img src={tick} className='prof1' /></div>
                                </div>
                            </div>

                            <div className='one2 one2_col_wdi'>
                                <div className=''>
                                    <div><p className='namelist'>{t("TRADE_SPEED")}</p></div>
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