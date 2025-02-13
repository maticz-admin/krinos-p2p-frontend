import React, { useEffect, useState, useRef } from 'react';
// import { FacebookShareButton, TwitterShareButton,EmailShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share'
import { Button, Modal } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
// import CopyToClipboard from "react-copy-to-clipboard";
// import tickss from "../../../../images/ticks.png";
import Images from 'Images';
import spring from '../../assets/images/toss/bannerbg.png'                              //"../../../../images/toss/bannerbg.png";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
// import config from "../../../../../config/index";
// import { Getfaqhooks } from 'actions/P2PorderAction';
import { getsitesettingshook } from 'actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
import Countdown from 'react-countdown';
import {resendOtp} from 'actions/users';


const IprestrictModal = (props) => {
    const location = useLocation();
    const navigate = useHistory();
    const Render = useRef(false)
    const [created, setCreated] = useState(true);
    const [result, setResult] = useState({});
    const [facebook, setFacebook] = useState("");
    const [telegram, setTelegram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState('');
    // const [otp, setOtp] = useState([0, 0, 0, 0])
    const [Enablebtn, setEnablebtn] = useState(false)
    const [counter, setCounter] = useState(300)
    const [Seconds, setseconds] = useState(0)
    const [Minutes, setminutes] = useState(0)
    
    // const [next , setNext] = useState(`${config?.FRONT_URL}/bitcoincompany/${props?.createdata?._id}`);


    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoader(true)
    //     let reqData = props?.request
    //     // {
    //     //     email,
    //     //     password,
    //     //     remember,
    //     //     twoFACode,
    //     //     loginHistory,
    //     //     langCode: getLang(),
    //     //     formType
    //     // }
    //     // debugger
    //     let { status, loading, message, userSetting, error, authToken, result } = await login(reqData, dispatch);
    //     // alert(JSON.stringify({ status, loading, message, userSetting, error, authToken, result }));
    //     setLoader(loading);
    //     if (status == 'success') {
    //         setFormValue(initialFormValue)
    //         localStorage.setItem("userId",result.userId)
    //         if (remember) {
    //             localStorage.setItem("remember", true);
    //             localStorage.setItem("email_remember", email);
    //             localStorage.setItem("password_remember", password);
    //             localStorage.setItem("formType", formType);
    //         } else {
    //             localStorage.removeItem("remember");
    //             localStorage.removeItem("email_remember");
    //             localStorage.removeItem("password_remember");
    //         }

    //         toastAlert('success', message, 'login');
    //         if (userSetting && userSetting.afterLogin && userSetting.afterLogin != " ") {
    //             history.push(userSetting.afterLogin.url)
    //         } else {
    //             history.push('/profile')
    //         }
    //     } else if (status == 'TWO_FA') {
    //         setShowTowFA(true)
    //         toastAlert('error', message, 'login');
    //     } else {
    //         if (error) {
    //             setValidateError(error);
    //         }
    //         if(message == "Your Password is Old Please Reset Your Password"){
    //             toastAlert('error', message, 'login');
    //             history.push("/reset-password/"+authToken)

    //         }
    //         toastAlert('error', message, 'login');
    //     }
    // }

    const handlesubmit = (e) => {
        props.login(e);
    }


    const resendOTP = async () => {
        let data = {
            email: props.email
        }
        var otpData = await resendOtp(data)
        if (otpData.status == 'success') {
            if (otpData.message == "OTP send to your mail id") {
                toastAlert('success', otpData.message, 'login');
                setCounter(30)
            }
        }
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
        var otpstring = data[0].toString() + data[1].toString() + data[2].toString() + data[3].toString()
        props.setotp(otpstring)
    }

    const history = useHistory();



    useEffect(() => {

        if (counter == 0) {
            setEnablebtn(true);
        }
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

        const seconds = String(counter % 60).padStart(2, 0);
        setseconds(seconds)
        const minutes = String(Math.floor(counter / 60)).padStart(2, 0);
        setminutes(minutes)

        return () =>

            clearInterval(timer);



    }, [counter]);

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

                <Modal.Body>
                    <div>
                        <form action="" className="mt-4 mb-2 confirm d-flex flex-1 form_otp_new">
                            {/* <input className="otp form-control" type="text" onKeyUp={(e) => { e.preventDefault(); onTextOtp(e.target.value, 0); if (e.target.value.length === 1) { tabChange(1); } }} maxlength="1" />
                            <input className="otp form-control" type="text" onKeyUp={(e) => { e.preventDefault(); onTextOtp(e.target.value, 1); if (e.target.value.length === 1) { tabChange(2); } }} maxlength="1" />
                            <input className="otp form-control" type="text" onKeyUp={(e) => { e.preventDefault(); onTextOtp(e.target.value, 2); if (e.target.value.length === 1) { tabChange(3); } }} maxlength="1" />
                            <input className="otp form-control" type="text" onKeyUp={(e) => { e.preventDefault(); onTextOtp(e.target.value, 3) }} maxlength="1" /> */}
                            <OtpInput
                                value={otp}
                                onChange={e => {setOtp(e); props.setotp(e)}}
                                numInputs={4}
                                className="otp form-control"
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                            />
                        </form>
                        <div className='text-right mb-3 mt-3 countdownspan'>
                            {/* <Countdown date={Date.now() + 300000} /> */}
                            {/* {Render.current && <Countdown date={Date.now() + 300000} renderer={({ days, hours, minutes, seconds, completed }) => {
                                if (completed) {
                                    return <p>{0}:{0}:{0}:{0}</p>
                                } else {
                                    return <p>{hours}:{minutes}:{seconds}</p>;
                                }
                            }
                            }
                            ></Countdown>} */}

                            <p className="pr-2 mt-3"> Otp will expire in <b>  <span>{Minutes}:{Seconds}</span></b></p>


                        </div>
                      {Minutes==0 &&  Seconds==0 ? <div className='text-center'>

                            <button className='themebtn mb-3' onClick={(e) => {resendOTP(e) }}>Resend OTP</button>
                        </div> :""}
                        <div className='text-center'>

                            <button className='themebtn' onClick={(e) => { handlesubmit(e) }}>Submit</button>
                        </div>

                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default IprestrictModal;