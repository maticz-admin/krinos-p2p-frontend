import React, { useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton, EmailShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share'
import { Button, Modal } from 'react-bootstrap';
import CopyToClipboard from "react-copy-to-clipboard";
import tickss from "../../../../images/ticks.png";
import Images from 'Images';
import spring from "../../../../images/toss/bannerbg.png";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import config from "../../../../../config/index";
import { Getfaqhooks } from 'actions/P2PorderAction';
import { getsitesettingshook } from '../../../../../actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
import { Getsingleuserhook } from '../../../../../actions/P2PorderAction';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


const CreatedModal = (props) => {
    console.log('props-----', props, props?.createdata)
      const { t, i18n } = useTranslation();
    
    console.log(`${config?.FRONT_URL}/bitcoincompany/${props?.createdata?._id}`)
    const location = useLocation();
    const navigate = useHistory();
    const userdata = useSelector(state => state);

    const [created, setCreated] = useState(true);
    const [result, setResult] = useState({});
    const [facebook, setFacebook] = useState("");
    const [telegram, setTelegram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [email, setEmail] = useState("");
    const [next, setNext] = useState(`${config?.FRONT_URL}/bitcoincompany/${props?.createdata?._id}`);
    const [receive, setReceive] = useState(0);
    const [ref, setRef] = useState({});
    const [wallet, setWallet] = useState([]);
    const [warning, setWarning] = useState(false);
    const [coin, setCoin] = useState("");

    const copyUrl = (a, b) => {
        // toast.success("Profile Url Copied!", {
        //     position: position.position,
        //     style: style,
        //     iconTheme: iconTheme,
        // }
        // )
        toastAlert("success", t("COPIED_SUCCESSFULLY"));

    }

    useEffect(() => {
        setResult(props?.createdata);
        setReceive(props?.refdat)
        async function getcms() {
            var result = await getsitesettingshook();
            setFacebook(result?.data?.data?.facebookLink);
            setTwitter(result?.data?.data?.twitterUrl);
            setEmail(result?.data?.data?.supportMail);
            var payload = { userid: userdata?.account?.userId }
            var userdata = await Getsingleuserhook(payload);
            var wal = userdata?.data?.wallet?.assets;
            var singlewal = wal.find(e => e.coin == props?.refdat?.coin);
            if (parseFloat(singlewal?.p2pBal) <= parseFloat(props?.refdat?.value)) {
                setWarning(true);
                setCoin(props?.refdat?.coin);
            }
        }
        getcms();
    }, [props]);


    return (
        <>
            <Modal aria-labelledby="contained-modal-title-vcenter" size="lg" centered show={created}>
                <img className='spring1' src={spring} alt="spring" />
                <img src={Images.connect} className='connectright1' />
                <div className='modalz'>
                    {/* <img src={Images.connect} className='vv1' /> */}
                    <span className='greengradient'></span>
                </div>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <p className='mb-0'>{t("YOUR_OFFER_IS_CREATED")}</p>
                        <p className='submod-title'>{t("It is a long established fact that a reader")}</p>
                    </Modal.Title>
                    <Button variant="secondary" className='modalbtns' onClick={props.onDismiss}> x
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    {warning && <p className='balance_too_low_tex'>
                        <i class="fa fa-exclamation-triangle me-2" aria-hidden="true"></i>
                        {t("YOUR")} {coin} {t("BALANCE_IS_TOO_LOW")}</p>}
                    <div className='borders'>
                        <p className='mb-0'>{t("GO_AHEAD_AND_SHARE")}</p>
                    </div>
                    <div className='text-center'>
                        <div className='socialbtn social_btn_color'>

                            <FacebookShareButton
                                // quote={`${item.tokenName} NFT`}
                                url={next}
                            >
                                <i className="fab fa-facebook-f"></i>
                                {/* <p>Facebook</p> */}
                            </FacebookShareButton>
                            <TwitterShareButton
                                // title={`${item.tokenName}  NFT`}
                                url={next}
                            >
                                <i className="fab fa-twitter"></i>
                                {/* <p>Twitter</p> */}
                            </TwitterShareButton>

                            <EmailShareButton
                                // separator={next}
                                // url = {next}
                                subject="subject"
                                body={"hey there, pls share my link" + <a href={next}>Link</a>}
                            >
                                <i className="fa fa-envelope"></i>
                                {/* <p>Email</p> */}
                            </EmailShareButton>

                            {/* <a className='btn btn-link borderbtn' target='_blank' href={facebook}><img src={Images.fb}/></a>
                                                <a className='btn btn-link borderbtn mx-3' target='_blank' href={twitter}><img src={Images.twitter}/></a>
                                                <a className='btn btn-link borderbtn' target='_blank' href={email}><img src={Images.email}/></a> */}
                        </div>
                        <p className='blackandwhite'>{t("OR_COPY_THIS_LINK_AND_SHARE_IRECTLY")}</p>
                    </div>

                    <div className='floatinglabel my-4'>

                        {/* <input type="text" className='form-control leftspace' placeholder='Enter Amount'/> */}
                        <input
                            type="text"
                            className="form-control"
                            value={`${config?.FRONT_URL}bitcoincompany/${props?.createdata?._id}`}
                        />
                        <CopyToClipboard text={`${config?.FRONT_URL}/bitcoincompany/${props?.createdata?._id}`} onCopy={() => copyUrl()}>
                            {/* <button variant='link' className='fa fa-copy' style={{backgroundColor:"transparent", border:0, color:"#848484"}}></button> */}
                            <button className="otp_btn"> <span className='fa fa-copy mr-2'></span> {t("COPY")} </button>
                        </CopyToClipboard>
                    </div>
                    <div className='allbtn text-center mt-5'>
                        <button className='themebtn' onClick={() => navigate.push(`/bitcoincompany/${props?.createdata?._id}`)}>{t("VIEW_OFFER")}</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreatedModal