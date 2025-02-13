// import package
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import $ from "jquery";
// import component
import EmailForm from './EmailForm';
import MobileForm from './MobileForm';

// import modals
import { getCmsData } from '../../actions/homeAction';

// import lib
import { toastAlert } from '../../lib/toastAlert'
import { Tab, Tabs } from 'react-bootstrap';
import Images from 'Images';

const RegisterForm = () => {
    const { t, i18n } = useTranslation();
    const { executeRecaptcha } = useGoogleReCaptcha();

    // state
    const [formType, setFormType] = useState('email')
    const [cmsData, setCmsData] = useState([])

    // function
    const handleReCaptcha = async () => {
        try {
            if (!executeRecaptcha) {
                toastAlert('error', 'Recaptcha error')
                return '';
            }
            return await executeRecaptcha('register');
        } catch (err) {
            toastAlert('error', err.toString())
            return ''
        }
    }
    const fetchCmsData = async () => {
        try {
            let reqData = {

            }
            const { status, loading, result } = await getCmsData();
            if (status == 'success') {
                let loginArray = [];
                result && result.map((item, i) =>{
                    if(item && item.title == "Login_Register"){
                        loginArray.push(item)
                    }
                })
                setCmsData(loginArray)
            }
        } catch (err) { }
    }
    const handleFormType = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormType(value)
    }

    useEffect(() => {
        loadScript()
        fetchCmsData()
      }, []);

    function loadScript() {
        $(".radio_inp_email").click(function () {      
          $(".radio_inp_email").addClass('active');
          $(".radio_inp_mobile").removeClass('active');    
        });
        $(".radio_inp_mobile").click(function () {      
            $(".radio_inp_mobile").addClass('active');
            $(".radio_inp_email").removeClass('active');    
        }); 
      }
    const createMarkup = (a) => {
          return { __html: a };
    }
    return (

        <>
        
            <div className='bannersec mt-0 h-100vh bodyheight'>
            <div className='container'>
                <div className='text-center mb-5'>
                    <h3 className="blackandwhite">{t("REGISTER")}</h3>
                    <p className='subhead'>Anonymous P2P deals on your terms. Trade globally.</p>
                </div>
            <div className='buyselltab'>
            <img src={Images.bitcoin} className='bannerbitcoin'/>
            <img src={Images.bannerbg} className='bannerbg'/>
            <img src={Images.connect} className='grayconnect'/>
            <img src={Images.connect1} className='tgrayconnect'/>
            <img src={Images.connectx} className='connectx'/>
                <div className='row jc-center'>
                    <div className='col-lg-7'>
                        <div  className="themenav">
                        <img src={Images.connect} className='connect'/>
                        <Tabs defaultActiveKey="email" id="uncontrolled-tab-example">
                                    <Tab eventKey="email" title="EMAIL" className='px-3 py-3'> 
                                    <EmailForm handleReCaptcha={handleReCaptcha} />
                                    </Tab>
                                    <Tab eventKey="mobile" title="MOBILE" className='px-3 py-3'> 
                                    <MobileForm handleReCaptcha={handleReCaptcha} />
                                    </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>


            <div className="formBox form_left mt-5 mt-md-5 mb-0 mb-md-0  d-none">
                <img src={require("../../assets/images/logo.png")} alt="Banner" className="img-fluid logo_200" />
                {
                        cmsData && cmsData.map((item, i) =>{
                            return(
                                <p dangerouslySetInnerHTML={createMarkup(item.content)} className="mt-4"></p>
                            )
                        })
                }
            </div>
            <form className="formBox login_form mb-5 mb-md-0 d-none">

                <h3 className="login_title_8">{t('REGISTER')}</h3>
                <div className="flex_inpur_sect">
                    <RadioGroup aria-label="formType" name="formType" value={formType} onChange={handleFormType}>
                        <FormControlLabel value="email" control={<Radio />} label="Email" className="radio_inp_email active" />
                        <FormControlLabel value="mobile" control={<Radio />} label="Mobile" className="radio_inp_mobile" />
                    </RadioGroup>

                </div>

                {
                    formType == 'email' && <EmailForm
                        handleReCaptcha={handleReCaptcha}
                    />
                }

                {
                    formType == 'mobile' && <MobileForm
                        handleReCaptcha={handleReCaptcha}
                    />
                }

                <div className="d-flex">
                    <Link to="/login" className="ml-auto">{t('ALREADY_HAVE_ACCOUNT')}</Link>
                </div>
            </form>
        </>
    )
}

export default RegisterForm;