// import package
import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Checkbox from 'rc-checkbox';
import clsx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";

// import action
import { createUser } from '../../actions/users';

// import lib
import validation from './validation';
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';
import { getLang } from '../../lib/localStorage';
import config from '../../config/index';
import { toast } from 'react-toastify';

const initialFormValue = {
    'email': '',
    'formType': 'email',
    'password': '',
    'confirmPassword': '',
    'referenceCode': '',
    'isTerms': false,
    'showPassword': false,
    'showConfirmPassword': false
}

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

const EmailForm = () => {
    const { t, i18n } = useTranslation();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const query = useQuery();

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    // const [reCaptcha, setReCaptcha] = useState('');
    const [toched, setToched] = useState({});
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();
    const [isShow, setShow] = useState(false);
    const { email, formType, password, confirmPassword, isTerms, showPassword, showConfirmPassword, referenceCode } = formValue;
    const [emailchecked, setemailchecked] = useState(true);
    const [mobilechecked, setmobilechecked] = useState(false);
    //recaptcha
    const [token, setToken] = useState("");
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
    //

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        // setValidateError(validation(formData,t))
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        setToched({ ...toched, ...{ [name]: true } })
    }

    const handleCheckBox = (e) => {
        const { name, checked } = e.target
        let formData = { ...formValue, [name]: checked }
        setFormValue(formData)
        // setValidateError(validation(formData,t))
    }

    const generateToken = (data) => {
        return new Promise((resolve, reject) => {
            const badge = document.querySelector('.grecaptcha-badge');
            console.log("badgebadgebadge", badge);

            if (badge) {
                console.log("badge visible", badge, badge.style);

                badge.style.visibility = 'visible';
            };

            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${config.RECAPTCHA_SITE_KEY}`;
            script.onload = () => {
                window.grecaptcha.ready(() => {
                    window.grecaptcha.execute(config.RECAPTCHA_SITE_KEY).then((token) => {
                        localStorage.setItem('captcha_token', token)
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
        // setValidateError()
        var err = validation(formValue, t);
        if (isEmpty(err)) { }
        if ((isTerms == false)) {
            // setValidateError({ 'isTerms': 'ACCEPT_TERMS_MESSAGE' })
            // return
            err.isTerms = 'ACCEPT_TERMS_MESSAGE'
        }
        setValidateError(err);
        if (isEmpty(err)) {
            e.preventDefault();
            // let reCaptcha = await handleReCaptcha()
            

            // if (isEmpty(reCaptcha)) {
            //     toastAlert('error', 'Invalid ReCaptcha', 'signup', 'TOP_RIGHT');
            //     return
            // }
            let recaptcha = await generateToken();
            if (!recaptcha) {
                toast.error(t("RECPTCHA_VERIFICATION_FAILED"));
                return;
            }

            setLoader(true)

            let reqData = {
                email,
                formType,
                password,
                confirmPassword,
                recaptcha: JSON.stringify(recaptcha),
                isTerms,
                langCode: getLang(),
                referenceCode
            }
            let { status, loading, message, error } = await createUser(reqData);
            setLoader(loading);
            // setReCaptcha('')
            if (status == 'success') {
                setFormValue(initialFormValue)
                toastAlert('success', t(message), 'signup', 'TOP_RIGHT');
            } else {
                if (error) {
                    setValidateError(error);
                    setRefreshReCaptcha(!refreshReCaptcha);
                }
                toastAlert('error', t(message), 'signup', 'TOP_RIGHT');
            }
        }

    }

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

    const handleClick = (e) => {
        const { name, checked } = e.target

        if (name == "email") {

            // setmobilechecked(false);
            // setemailchecked(true);

        }
        else if (name == "mobile") {

            // setmobilechecked(true);
            // setemailchecked(false);

        }

        // if()

    }



    useEffect(() => {
        generateToken()
        // setValidateError(validation(formValue,t))
        // if (query && query.get('referenceCode')) {
        //     setFormValue((prev) => {
        //         return { ...prev, 'referenceCode': query.get('referenceCode') }
        //     })
        // }
    }, [])


    const setTokenFunc = (getToken) => {
        setToken(getToken);
    };





    return (

        <div
            className="g-recaptcha"
            data-sitekey={config.RECAPTCHA_SITE_KEY}
            data-size="invisible"
        >
            <Fragment>
                <div className='floatinglabel my-4'>

                    <label>{t("EMAIL_PLACEHOLDER")}</label>
                    {/* <input type="text" className='form-control leftspace' placeholder='Enter Amount'/> */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t("EMAIL_PLACEHOLDER")}
                        name="email"
                        value={email}
                        onChange={handleChange}
                    // onBlur={handleBlur}
                    />
                    <i className="fa fa-envelope right" aria-hidden="true"></i>
                    {validateError.email && <p className="error-message">{t(validateError.email)}</p>}
                </div>

                <div className='floatinglabel my-4'>
                    <label>{t('PASSWORD')}</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder={t('PASSWORD')}
                        name="password"
                        value={password}
                        onChange={handleChange}
                    // onBlur={handleBlur}
                    />
                    <Link className='right' onClick={(e) => {
                        e.preventDefault();
                        setFormValue((el => {
                            return { ...el, ...{ showPassword: !el.showPassword } }
                        }))
                    }}>
                        <i className={clsx("fa", { "fa-eye": showPassword }, { "fa-eye-slash": !showPassword })} aria-hidden="true"></i>
                    </Link>
                    {validateError.password && <p className="error-message">{t(validateError.password)}</p>}
                    {/* <span className='fa fa-eye'></span> */}
                </div>



                <div className='floatinglabel my-4'>
                    <label>{t('CONFIRM_PASSWORD')}</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder={t('CONFIRM_PASSWORD')}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                    // onBlur={handleBlur}
                    />
                    <Link className='right' onClick={(e) => {
                        e.preventDefault();
                        setFormValue((el => {
                            return { ...el, ...{ showConfirmPassword: !el.showConfirmPassword } }
                        }))
                    }}>
                        <i className={clsx("fa", { "fa-eye": showConfirmPassword }, { "fa-eye-slash": !showConfirmPassword })} aria-hidden="true"></i>
                    </Link>
                    {validateError.confirmPassword && <p className="error-message">{t(validateError.confirmPassword)}</p>}
                    {/* <span className='fa fa-eye'></span> */}
                </div>


                {/* <div className="form-group">
                <span className="login_label">{t('REFERRAL_CODE')}</span>
                <div className="input-group regGroupInput mt-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('REF_CODE_OPTION')}
                        name="referenceCode"
                        value={referenceCode}
                        onChange={handleChange}
                    />
                </div>
                {validateError.referenceCode && <p className="error-message">{t(validateError.referenceCode)}</p>}
            </div> */}

                {/* <div className="form-group">
                <div className="form-check d-flex">
                    <Checkbox
                        name="isTerms"
                        onChange={handleCheckBox}
                        checked={isTerms}
                    />
                    <label className="form-check-label grayandblack  font_siz f-12" for="flexCheckDefault">
                       {t('I_AGREE')} <Link to="/terms" className="color_lonks">{t('TERMS')}</Link> {t('AND')} <Link to="/privacy-policy" className="color_lonks">{t('PRIVACY')}</Link>
                    </label>
                    {validateError.isTerms && <p className="error-message">{t(validateError.isTerms)}</p>}
                </div>
            </div> */}
            <>
            <label class="custcheck ml-2 blackandwhite f-12">
                    <input type="checkbox"
                     onChange={handleCheckBox}
                       checked={isTerms} 
                       name = "isTerms"
                      />
                    <span class="checkmark"></span> {t('I_AGREE')} <a target = "_blank" href="/details/termsandcondition" className="color_lonks">{t('TERMS')}</a> {t('AND')} <a target = "_blank" href="/details/privacypolicy" className="color_lonks">{t('PRIVACY')}</a>
                
                </label>
                {validateError.isTerms && <p className="error-message">{t(validateError.isTerms)}</p>}
                </>
                <div className="form-group text-center">
                    <button className='themebtn big my-3'
                        onClick={handleFormSubmit}
                        // disabled={!isEmpty(validateError) || loader}
                        disabled={loader}
                    >
                        {loader && <i class="fas fa-spinner fa-spin"></i>} {t('REGISTER')}
                    </button>
                    <br />
                    <Link to="/login" className="mr-auto linkclr">
                        {t('ALREADY_HAVE_ACCOUNT')}?
                    </Link>



                    {/* <GoogleReCaptchaProvider reCaptchaKey={"6Lfa3NYqAAAAAOPNURwGG_sO4YqgDX5iwJZmj7T1"}>
          <GoogleReCaptcha
            className="google-recaptcha-custom-class"
            onVerify={setTokenFunc}
            refreshReCaptcha={refreshReCaptcha}
          />
        </GoogleReCaptchaProvider> */}
                </div>
            </Fragment>

        </div>
    )
}

export default EmailForm;