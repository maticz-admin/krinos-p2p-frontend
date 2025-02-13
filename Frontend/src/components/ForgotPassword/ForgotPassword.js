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
import { Tab, Tabs } from 'react-bootstrap';
import Images from 'Images';
const ForgotPassword = () => {
    const { t, i18n } = useTranslation();
    const { executeRecaptcha } = useGoogleReCaptcha();

    // state
    const [formType, setFormType] = useState('email')

    // function
    // const handleReCaptcha = async () => {
    //     try {
    //         if (!executeRecaptcha) {
    //             toastAlert('error', 'Recaptcha error')
    //             return '';
    //         }
    //         return await executeRecaptcha('register');
    //     } catch (err) {
    //         toastAlert('error', err.toString())
    //         return ''
    //     }
    // }

    const handleFormType = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormType(value)
    }

    useEffect(() => {
        loadScript()
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
    return (
        <div className='bannersec h-100vh bodyheight'>
        <div className='container'>
            <div className='text-center mb-5'>
                <h3 className="blackandwhite">{t("FORGOT_PASSWORD")}</h3>
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
                                <EmailForm />
                                   
                                 </Tab>
                                 <Tab eventKey="mobile" title="Mobile" className='px-3 py-3'> 
                                 <MobileForm />
                                   
                                 </Tab>
                                 </Tabs>
                    </div>
                </div>
            </div>
            </div>
            </div>

            
            <div className="row w-100 d-none">
                <div className="col-lg-4 col-md-6 m-auto">
                    <form className="login_form p-4 mb-4" data-aos="fade-up">
                        <h3 className="login_title_8">{t("FORGOT_PASSWORD")}</h3>
                        <div className="flex_inpur_sect">
                            <RadioGroup aria-label="formType" name="formType" value={formType} onChange={handleFormType}>
                                <FormControlLabel value="email" control={<Radio />} label="Email" className="radio_inp_email active" />
                                <FormControlLabel value="mobile" control={<Radio />} label="Mobile" className="radio_inp_mobile" />
                            </RadioGroup>
                        </div>


                        {
                            formType == 'email' && <EmailForm
                            // handleReCaptcha={handleReCaptcha}
                            />
                        }

                        {
                            formType == 'mobile' && <MobileForm
                            // handleReCaptcha={handleReCaptcha}
                            />
                        }


                        <div className="d-flex">
                            <Link to="/" className="mr-auto">{t('HOME')}</Link>
                            <Link to="/login" className="ml-auto">{t('LOGIN')}</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default ForgotPassword;