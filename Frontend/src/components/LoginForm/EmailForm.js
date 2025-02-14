// import package
import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux'
import { Button } from "@material-ui/core";
import browser from 'browser-detect';
import Checkbox from 'rc-checkbox';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import clsx from 'classnames';

// import action
import { getGeoInfoData, login } from '../../actions/users';

// import lib
import validation from './validation';
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';
import { getLang } from '../../lib/localStorage';
import IprestrictModal from './iprestrict-otpModal';
import Images from 'Images';
import { Form } from 'react-bootstrap';

import {Checkdeposithooks} from '../../actions/P2PorderAction';
const initialFormValue = {
    'email': '',
    'formType': 'email',
    'password': '',
    'twoFACode': '',
    'remember': false,
    'showPassword': false
}


const EmailForm = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [toched, setToched] = useState({});
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();
    const [loginHistory, setLoginHistory] = useState({});
    const [showTwoFA, setShowTowFA] = useState(false);
    const [Otp, setOtp] = useState("");
    const [ipmodal, setIpmodal] = useState(false);
    const [requestdata, setRequestdata] = useState({});

    const { email, password, formType, showPassword, remember, twoFACode } = formValue;

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e?.target;

        if (name == 'twoFACode') {
            if (!(value == '' || (/^[0-9\b]+$/.test(value) && value.length <= 6))) {
                return
            }
        }

        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        setValidateError(validation(formData))
    }

    const handleBlur = (e) => {
        const { name } = e?.target;
        setToched({ ...toched, [name]: true })
    }

    const handleCheckBox = (e) => {
        const { name, checked } = e.target
        let formData = { ...formValue, [name]: checked }
        setFormValue(formData)
        setValidateError(validation(formData))
    }

    const getGeoInfo = async () => {
        try {
            let { result } = await getGeoInfoData();
            const browserResult = browser();
            if(!result.ip){
                getGeoInfo();
            }
            setLoginHistory({
                countryName: result.country_name,
                countryCode: result.country_calling_code,
                ipaddress: result.ip, //ipString
                region: result.region,
                broswername: browserResult.name,
                ismobile: browserResult.mobile,
                os: browserResult.os,
            })
            // return({
            //     countryName: result.country_name,
            //     countryCode: result.country_calling_code,
            //     ipaddress: result.ip,
            //     region: result.region,
            //     broswername: browserResult.name,
            //     ismobile: browserResult.mobile,
            //     os: browserResult.os,
            // })
        }
        catch (err) {
        }
    };

    const generateToken = (data) => {
        return new Promise((resolve, reject) => {
            const latetsBatch = document.getElementById('recaptchaValidator')
          const badge = document.querySelector('.grecaptcha-badge');
          console.log("badgebadgebadgebadge1" , document.querySelector('.grecaptcha-badge'));
          if (badge) {
            badge.style.visibility = 'visible';
          }
          console.log("badgebadgebadgebadge" , badge,window.grecaptcha);
          const script = document.createElement('script');
          script.src = `https://www.google.com/recaptcha/api.js?render=${"6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1"}`;
          script.onload = () => {
            window.grecaptcha.ready(() => {
              window.grecaptcha.execute("6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1").then((token) => {
                resolve(token);
              }).catch((error) => {
                reject(error);
              });
            });
          };
          script.onerror = (error) => {
            reject(error);
          };
          document.body.appendChild(script);
        });
      };

    const handleFormSubmit = async (e) => {
        let recaptcha = await generateToken()
        if(recaptcha){
            e.preventDefault();
        setLoader(true)
        let reqData = {
            email,
            password,
            remember,
            twoFACode,
            loginHistory,
            langCode: getLang(),
            formType : "email" //formValue.formType == "null" ? "email" : formValue.formType
        }
        if (Otp && Otp.length > 0) {
            reqData.otp = Otp;
            reqData.reftype = "ipotp"
        }
        else {
            reqData.otp = ""
            reqData.reftype = ""
        }
        let { status, loading, message, userSetting, error, authToken, result } = await login(reqData, dispatch);
        setLoader(loading);
        if (result == "otpsent") {
            setIpmodal(true);
        } else
            if (status == 'success') {
                setLoader(true);
                setFormValue(initialFormValue)
                if (remember) {
                    localStorage.setItem("remember", true);
                    localStorage.setItem("email_remember", email);
                    localStorage.setItem("password_remember", password);
                    localStorage.setItem("formType", formType);
                } else {
                    localStorage.removeItem("remember");
                    localStorage.removeItem("email_remember");
                    localStorage.removeItem("password_remember");
                }
           
                localStorage.setItem('xyz_cache', btoa(result?.userId))
                let checkdeposit  =  Checkdeposithooks();
                setLoader(false);

                toastAlert('success', message, 'login');
                if (userSetting && userSetting.afterLogin && userSetting.afterLogin != " ") {
                    history.push(userSetting.afterLogin.url)
                } else {
                    history.push('/profile')
                }
            } else if (status == 'TWO_FA') {
                setIpmodal(false);
                setOtp("");

                setShowTowFA(true)
                toastAlert('error', message, 'login');
            } else {
                if (error) {
                    setValidateError(error);
                }
                if (message == "Your Password is Old Please Reset Your Password") {
                    toastAlert('error', message, 'login');
                    history.push("/reset-password/" + authToken)

                }
                toastAlert('error', message, 'login');
            }
        }
        else {
            toastAlert('error', 'Invalid ReCaptcha', 'signup', 'TOP_RIGHT');
            return
        }
    }

    useEffect(() => {
        getGeoInfo()
        let formData = {};
        if (localStorage.getItem("remember") == "true") {
            formData = formValue
            formData['email'] = localStorage.getItem("email_remember");
            formData['password'] = localStorage.getItem("password_remember");
            formData['remember'] = true;
            formData['formType'] = localStorage.getItem("formType");
            setFormValue(formData);
        } else {
            formData = {
                'email': '',
                'password': '',
                'twoFACode': '',
                'remember': false,
                'formType': 'email'
            }
            setFormValue(formData);
        }
        // setValidateError(validation(formData))

    }, [])
    var india = <img src={Images.india} />
    return (
        <Fragment>



            <div className='floatinglabel my-4'>

                <label>{t('EMAIL_PLACEHOLDER')}</label>
                {/* <input type="text" className='form-control leftspace' placeholder='Enter Amount'/> */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email ID"
                    name="email"
                    value={email}
                    // autoComplete="off"
                    autoComplete="new-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <span className='fa fa-envelope right'></span>
                {toched.email && validateError?.email && <p className="error-message">{t(validateError?.email)}</p>}
            </div>
            <div className='floatinglabel my-4'>
                <label>{t('PASSWORD')}</label>
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control mt-2"
                    placeholder={t('PASSWORD_PLACEHOLDER')}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                />
                <Link className='right' onClick={(e) => {
                    e.preventDefault();
                    setFormValue((el => {
                        return { ...el, ...{ showPassword: !el.showPassword } }
                    }))
                }}>
                    <span className={clsx("fa", { "fa-eye": showPassword }, { "fa-eye-slash": !showPassword })} aria-hidden="true"></span>
                </Link>
                {toched.password && validateError?.password && <p className="error-message">{t(validateError?.password)}</p>}
                {/* <span className='fa fa-eye'></span> */}
            </div>
            {/* <div className="form-check">
                    <Checkbox className='custom_checkbox'
                        name="remember"
                        onChange={handleCheckBox}
                        checked={remember} 
                    />
                    <label className="ml-2 blackandwhite f-12" for="flexCheckDefault">
                        {t('KEEP_SIGN_COMPUTER')}
                    </label>
                </div> */}
            <label class="custcheck ml-2 blackandwhite f-12">
                <input type="checkbox"
                    onChange={handleCheckBox}
                //   checked={remember} 
                />
                <span class="checkmark"></span> {t('KEEP_SIGN_COMPUTER')}
            </label>
            {
                showTwoFA &&

                <div className='floatinglabel my-4'>
                    <label>{t('ENTER_TWO_FA_CODE')}</label>
                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder={t('ENTER_TWO_FA_CODE')}
                        name="twoFACode"
                        value={twoFACode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <span className='fa fa-lock right'></span>
                    {validateError?.twoFACode && <p className="error-message">{t(validateError?.twoFACode)}</p>}
                    {/* <span className='fa fa-eye'></span> */}
                </div>
            }
            <div className='text-center'>
                <button className='themebtn big my-3'
                    onClick={handleFormSubmit}
                    // disabled={!isEmpty(validateError) || loader}
                >
                    {loader && <i class="fas fa-spinner fa-spin"></i>} Login
                </button>
                {/* <button className='graybtn my-3'>View Offer</button> */}

            </div>



            <div className="form-group d-none">

                <span className="login_label">{t('EMAIL_PLACEHOLDER')}</span>
                <input
                    type="text"
                    className="form-control mt-2"
                    placeholder={t('EMAIL_PLACEHOLDER')}
                    name="email"
                    value={email}
                    // autoComplete="off"
                    autoComplete="new-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {toched?.email && validateError?.email && <p className="error-message">{t(validateError?.email)}</p>}
                {/* <span style={{ color: 'red' }}>{validateError && t(validateError.email)}</span>          */}
            </div>
            <div className="form-group d-none">
                <span className="login_label">{t('PASSWORD')}</span>
                <div className="input-group regGroupInput mt-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control mt-2"
                        placeholder={t('PASSWORD_PLACEHOLDER')}
                        name="password"
                        value={password}
                        // autoComplete= "new-password" //"off"
                        autoComplete="new-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className="input-group-append">
                        <Link onClick={(e) => {
                            e.preventDefault();
                            setFormValue((el => {
                                return { ...el, ...{ showPassword: !el.showPassword } }
                            }))
                        }}>
                            <i className={clsx("fa", { "fa-eye": showPassword }, { "fa-eye-slash": !showPassword })} aria-hidden="true"></i>
                        </Link>
                    </div>
                </div>
                {toched?.password && validateError?.password && <p className="error-message">{t(validateError?.password)}</p>}
                {/* <span style={{ color: 'red' }}>{validateError && validateError.password}</span>   */}
            </div>





            <div className="form-group d-none">
                {/* <div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="customCheck1" />
  <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>
</div> */}
                {/* <div className="form-check">
                    <Checkbox className='custom_checkbox'
                        name="remember"
                        onChange={handleCheckBox}
                        checked={remember} 
                    />
                    <label className="ml-2 blackandwhite f-12" for="flexCheckDefault">
                        {t('KEEP_SIGN_COMPUTER')}
                    </label>
                </div> */}
                <label class="custcheck ml-2 blackandwhite f-12">
                    <input type="checkbox"
                        onChange={handleCheckBox}
                    //   checked={remember} 
                    />
                    <span class="checkmark"></span> {t('KEEP_SIGN_COMPUTER')}
                </label>
            </div>
            {/* <div className="form-group">

                <Button
                    onClick={handleFormSubmit}
                    disabled={!isEmpty(validateError) || loader}
                >
                    {loader && <i class="fas fa-spinner fa-spin"></i>} {t('SIGN_IN_BUTTON')}
                </Button>
            </div> */}
            {ipmodal && <IprestrictModal login={(e) => handleFormSubmit(e)} setotp={(data) => setOtp(data)} request={requestdata} email={email} onDismiss={() => { setIpmodal(false); setOtp("") }} />}
        </Fragment>
    )
}

export default EmailForm;