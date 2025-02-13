// import package
import React, { useEffect } from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider, useDispatch, useSelector } from "react-redux";
import { I18nextProvider } from 'react-i18next';

// import component
import ConditionRoute from './components/Route/ConditionRoute';
import i18n from './components/i18next/i18n';
import HelperRoute from './components/Route/HelperRoute';

// import Context
import SocketContext from './components/Context/SocketContext'

// pages for this product
import DashboardPage from './pages/DashboardPage';
import WalletPage from './pages/WalletPage'
import ProfilePage from './pages/ProfilePage';



import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Register from "pages/register.js";
import ForgotPwdPage from "./pages/ForgotPwdPage";
import EmailVerification from './pages/EmailVerification';

import SecurityPage from './pages/SecurityPage';


import Staking from './pages/staking';
import Spot from './pages/spot';
import Derivative from './pages/derivative';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutUsPage from './pages/AboutUsPage';
import FaqPage from './pages/FaqPage';
import Contact from './pages/contact';
import Market from './pages/market';
import Orders from './pages/orders';



import PressPage from './pages/PressPage';
import InvestorsPage from './pages/InvestorsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ApiMgmtPage from './pages/ApiMgmtPage'
import TwoFA from './pages/TwoFA'
import P2P from './pages/p2p'
import Chat from './pages/p2pChat'
import Postad from './pages/postad'
import SettingPage from './pages/SettingPage';
import Referral from './pages/referal';

import Fees from './pages/fees';
import stakeTerms from './pages/stakingTerms';
import Notification from './pages/Notification';






// import CMS Page
import BusinessPage from './pages/cms/BusinessPage';
import TokenListPage from './pages/cms/TokenListPage';
import ApiPage from './pages/cms/ApiPage';
import SupportCMS from './pages/cms/SupportCms'
import FeesPage from './pages/cms/FeesPage';
// import SecurityPage from './pages/cms/SecurityPage';
import StakingPage from './pages/cms/StakingPage';

import Launchpad from "./pages/launchpad.js";
import TokenDetailPage from "./pages/TokenDetailPage";



import ChartPage from './pages/chart'


import HistoryPage from './pages/HistoryPage';
import SupportPage from './pages/SupportPage';

// import action
import { decodeJwt } from './actions/jsonWebToken';
import { getBankDetail, logout } from './actions/users';

// import config
import { socket } from './config/socketConnectivity';

// import lib
import store from './store';
import isLogin from './lib/isLogin';
import { getAuthToken } from './lib/localStorage';

import "../src/Styles.scss";
import CreateOffer from "assets/jss/material-kit-react/views/CreateOffer";
import Viewoffer from "assets/jss/material-kit-react/views/alloffer";
import Viewoffers from "assets/jss/material-kit-react/views/allofferheader";

import Bitcoins from "assets/jss/material-kit-react/views/Buybitcoin"; 
import Sellbitcoins from "assets/jss/material-kit-react/views/sellbitcoin"; 
import Bitcoincompany from "assets/jss/material-kit-react/views/Bitcoincompany";
import Sellbitcoincompany from "assets/jss/material-kit-react/views/Sellbitcoincompany";

import "../src/help.css";

import UserDashboard from "assets/jss/material-kit-react/views/UserDashboard";
import Trade from "components/P2P/Trade";
import Displayownerdata from "./components/P2P/Displayownerdata";

import Details from "./components/Home/detail";

import Amlpolicy from "./components/Home/Amlpolicy";
import Cookiespolicy from "./components/Home/Cookiespolicy";
import Restrictedcountries from "./components/Home/Restrictedcountries";
import Risk from "./components/Home/Risk";
import Messagenotification from "./pages/MessageNotification";




import {Getsingleuserhook, updateuserstatushooks} from './actions/P2PorderAction'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
    const { isAuth } = store.getState().auth;
    const userdata = localStorage.getItem("userId")


    useEffect(() => {
        // console.log = () => { };
        // console.debug = () => { };
        // console.info = () => { };
        // console.warn = () => { };

        if (isAuth != true && isLogin()) {
            decodeJwt(getAuthToken(), store.dispatch)
        }
    }, []);

    useEffect(() => {
        window.addEventListener('click', (event) => {
            localStorage.setItem("ActiveTime", new Date().getTime())
        })
       async function fetchdata(){
        var payload = {userid : userdata , status : "online"}
        var result = await updateuserstatushooks(payload);
       }
       fetchdata();
       window.onbeforeunload = () =>{
        async function fetchdata(){
            var time = Date.now().toString();
            var payload = {userid : userdata , status : time}
            var result = await updateuserstatushooks(payload);
           }
           fetchdata();
       }
       
       return()=>{
            async function fetchdata(){
            var time = Date.now().toString();
            var payload = {userid : userdata , status : time}
            var result = await updateuserstatushooks(payload);
           }
           fetchdata();
       }
    },[])

    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter basename="/">
                    <SocketContext.Provider value={{ socket }}>
                        <ToastContainer />
                        <HelperRoute />
                        <Switch>

                       

                            <ConditionRoute exact path='/login' component={LoginPage} type={"auth"} />
                            <ConditionRoute exact path='/2fa' component={TwoFA} type={"auth"} />
                            <ConditionRoute exact path='/ResetPassword' component={TwoFA} type={"auth"} />
                            <ConditionRoute exact path='/register' component={Register} type={"auth"} />
                            <ConditionRoute exact path='/recover-password' component={ForgotPwdPage} type={"auth"} />
                            <ConditionRoute exact path='/reset-password/:authToken' component={ResetPasswordPage} type={"auth"} />

                            {/* PRIVATE */}
                            <ConditionRoute exact path='/profile' component={ProfilePage} type={"private"} />{/*true */}
                            <ConditionRoute exact path='/security' component={SecurityPage} type={"private"} />{/*true */}
                            <ConditionRoute exact path='/setting' component={SettingPage} type={"private"} />{/*true */}



                            <ConditionRoute exact path='/dashboard' component={UserDashboard} type={"private"} />{/*true */}
                            <ConditionRoute exact path='/wallet' component={WalletPage} type={"private"} />{/*true */}
                            <ConditionRoute exact path='/kyc' component={ProfilePage} type={"private"} />
                            <ConditionRoute exact path='/notification' component={Notification} type={"private"} />

                            <ConditionRoute exact path='/message-notification' component={Messagenotification} type={"private"} />
                            {/* PRIVATE */}


                            {/* PUBLIC */}
                            <ConditionRoute exact path='/trade/:id' component={Trade} type={"private"} />
                            <ConditionRoute exact path='/' component={HomePage} type={"public"} />
                            <ConditionRoute exact path='/home' component={HomePage} type={"public"} />
                            <ConditionRoute exact path='/history' component={HistoryPage} type={"public"} />
                            <ConditionRoute exact path='/support-ticket' component={SupportPage} type={"public"} />
                            <ConditionRoute exact path='/chat/:orderId' component={Chat} type={"public"} />
                            <ConditionRoute exact path='/contact' component={Contact} type={"public"} />


                            <ConditionRoute exact path='/email-verification/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/verify-old-email/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/verify-new-email/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/withdraw-fiat-verification/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/withdraw-coin-verification/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/withdraw-approve/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/withdraw-cancel/:authToken' component={EmailVerification} type={"public"} />
                            {/* PUBLIC */}

                
                            <ConditionRoute exact path='/createoffer' component={CreateOffer} type={"private"} />
                            <ConditionRoute exact path='/bitcoincompany/:id' component={Bitcoincompany} type={"private"} />
                            <ConditionRoute exact path='/userdash' component={UserDashboard} type={"public"} />
                            <ConditionRoute exact path='/viewoffers/:id/:id' component={Viewoffers} type={"public"} />{/*true */}
                            <ConditionRoute exact path='/displayownerdata/:id' component={Displayownerdata} type={"private"} />
                            <ConditionRoute exact path='/details/:id' component={Details} type={"public"} />
                            <ConditionRoute exact path='/amlpolicy' component={Amlpolicy} type={"public"} />
                            <ConditionRoute exact path='/cookiespolicy' component={Cookiespolicy} type={"public"} />
                            <ConditionRoute exact path='/restrictedcountries' component={Restrictedcountries} type={"public"} />
                            <ConditionRoute exact path='/risk' component={Risk} type={"public"} />
                            
                        </Switch>
                    </SocketContext.Provider>
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    )
}

export default App;