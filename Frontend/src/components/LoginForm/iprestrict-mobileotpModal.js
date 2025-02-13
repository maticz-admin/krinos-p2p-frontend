import React, { useEffect, useState } from 'react';
// import { FacebookShareButton, TwitterShareButton,EmailShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share'
import { Button, Modal } from 'react-bootstrap';
// import CopyToClipboard from "react-copy-to-clipboard";
// import tickss from "../../../../images/ticks.png";
import Images from 'Images';
import OtpInput from 'react-otp-input';
import spring from '../../assets/images/toss/bannerbg.png'                              //"../../../../images/toss/bannerbg.png";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
// import config from "../../../../../config/index";
// import { Getfaqhooks } from 'actions/P2PorderAction';
import { getsitesettingshook } from 'actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
import Countdown from 'react-countdown';
import {resendOtp} from 'actions/users';
import { getGeoInfoData, login, sentOTP } from '../../actions/users';
import { useTranslation } from 'react-i18next';



const IprestrictmobileModal = (props) => {
    const location = useLocation();
    const navigate = useHistory();
    const [created, setCreated] = useState(true);
    const [result, setResult] = useState({});
    const [facebook, setFacebook] = useState("");
    const [telegram, setTelegram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [email, setEmail] = useState("");
    const [user,setUser] = useState("")
    // const [otp, setOtp] = useState([0, 0, 0, 0, 0, 0])
    const [otp, setOtp] = useState('');

    const [validateError, setValidateError] = useState({});
    const [optStatus, setOtpStatus] = useState(false)
    const [buttonName, setButtonName] = useState(false)

    const [Enablebtn, setEnablebtn] = useState(false)
    const [counter, setCounter] = useState(600)
    const [Seconds, setseconds] = useState(0)
    const [Minutes, setminutes] = useState(0)
    const { t, i18n } = useTranslation();

 

    const handlesubmit = (e) => {
        props.login(e);
    }




    let tabChange = (val) => {
        let ele = document.querySelectorAll('input.otp');
        if (ele[val - 1].value != '') {
            ele[val].focus()
        } else if (ele[val - 1].value == '') {
            ele[val - 2].focus()
        }
    }


    const onTextOtp = (text, index) => {
        let data = otp;
        data[index] = text;
        setOtp(data);
        var otpstring = data[0].toString() + data[1].toString() + data[2].toString() + data[3].toString() + data[4].toString() + data[5].toString()
        props.setotp(otpstring)
    }

    const history = useHistory();
    useEffect(() => {
        setResult(props?.createdata);
        async function getcms() {
            var result = await getsitesettingshook();
            setFacebook(result?.data?.data?.facebookLink);
            setTwitter(result?.data?.data?.twitterUrl);
            setEmail(result?.data?.data?.supportMail);
        }
        getcms();
    }, [])

    useEffect(() => {
   
        if (counter == 0) {
            setEnablebtn(true);
        }
        // if(optStatus == true){
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

        const seconds = String(counter % 60).padStart(2, 0);
        setseconds(seconds)
        const minutes = String(Math.floor(counter / 60)).padStart(2, 0);
        setminutes(minutes)

        return () =>

            clearInterval(timer);

        // }

    }, [counter]);

    const handleSentOTP = async (e) => {
        e.preventDefault();
        var users = props.setData
        var phoneCode = users.phoneCode
        var phoneNo = users.phoneNo
        var password = users.password
        let reqData = {
            phoneCode,
            phoneNo,
            password,
            type: 'login',

        }
        try {
            let { status, loading, error, message } = await sentOTP(reqData);
            if (status == "success") {
                setOtpStatus(true)
                setButtonName(false)
                setCounter(600)
                toastAlert('success', message, 'mobileForm');
                setTimeout(() => {
                    setOtpStatus(false)
                    setButtonName(true)
                }, 600000)
            } else {
                if (error) {
                    setValidateError(error)
                    return
                }
                toastAlert('error', message, 'mobileForm');
                // if(error === "Max send attempts reached"){
                //     toastAlert('error', "Max send attempts reached", 'mobileForm');
                // }
            }
        } catch (err) { }
    }

    
    return (
        <>
            <Modal aria-labelledby="contained-modal-title-vcenter" size="sm" centered show={created}>
                <img className='spring1' src={spring} alt="spring" />
                <img src={Images.connect} className='connectright1' />
                <div className='modalz'>
                    {/* <img src={Images.connect} className='vv1' /> */}
                    <span className='greengradient'></span>
                </div>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <p className='mb-0'>Login New Device</p>
                        <p className='submod-title'>Please Enter OTP </p>
                    </Modal.Title>
                    <Button variant="secondary" className='modalbtns' onClick={props.onDismiss}> x
                    </Button>
                </Modal.Header>
                {/* <Countdown date={Date.now() + 300000} /> */}
                <Modal.Body>
                    <div>
                        <form action="" className   ="mt-4 mb-2 confirm d-flex flex-1 form_otp_new form_otp_sixdogit">
                            {/* <input className="otp form-control" type="text" onKeyUp={(e) => { onTextOtp(e.target.value, 0); if (e.target.value.length === 1) { tabChange(1); } }} maxlength="1" />
                            <input className="otp form-control" type="text" onKeyUp={(e) => { onTextOtp(e.target.value, 1); if (e.target.value.length === 1) { tabChange(2); } }} maxlength="1" />
                            <input className="otp form-control" type="text" onKeyUp={(e) => { onTextOtp(e.target.value, 2); if (e.target.value.length === 1) { tabChange(3); } }} maxlength="1" />
                            <input className="otp form-control" type="text" onKeyUp={(e) => { onTextOtp(e.target.value, 3); if (e.target.value.length === 1) { tabChange(4); } }} maxlength="1" />
                            <input className="otp form-control" type="text" onKeyUp={(e) => { onTextOtp(e.target.value, 4); if (e.target.value.length === 1) { tabChange(5); } }} maxlength="1" />
                            <input className="otp form-control" type="text" onKeyUp={(e) => { onTextOtp(e.target.value, 5); if (e.target.value.length === 1) { tabChange(5); } }} maxlength="1" /> */}
                          
                            <OtpInput
                                value={otp}
                                onChange={e => {setOtp(e); props.setotp(e)}}
                                numInputs={6}
                                className="otp form-control"
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                            />
                        </form>
                  {props.error && <p className="error-message">{t(props.error)}</p>}
                        <div className='text-right mb-3 mt-3 countdownspan'>

                            <p className="pr-2 mt-3"> Otp will expire in <b>  <span>{Minutes}:{Seconds}</span></b></p>


                        </div>
                      {Minutes==0 &&  Seconds==0 ? <div className='text-center'>

                            <button className='themebtn mb-3' onClick={handleSentOTP}>Resend OTP</button>
                        </div> :""}


                        <div className='text-center'>

                            {/* <button className='themebtn mb-3' onClick={(e) => { resendOTP(e) }}>Resend OTP</button> */}
                        <button className='themebtn' onClick={(e) => { handlesubmit(e) }}>Submit</button>

                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default IprestrictmobileModal;