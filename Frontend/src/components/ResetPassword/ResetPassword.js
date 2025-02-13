// import package
import React, { createRef, useState, useEffect } from 'react';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Images from "Images";

import clsx from 'classnames';

// import action
import { resetPassword } from '../../actions/users';

// import lib
import validation from './validation';
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';

const initialFormValue = {
    'password': '',
    'confirmPassword': '',
    'showPassword': '',
    'showConfirmPassword': '',
}

const ResetPassword = () => {
    const history = useHistory();
    const { authToken } = useParams();
    const { t, i18n } = useTranslation();
    // states
    const [formValue, setFormValue] = useState(initialFormValue);
    const [toched, setToched] = useState({});
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();

    const { password, confirmPassword,showPassword, showConfirmPassword } = formValue;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        setValidateError(validation(formData))
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        setToched({ ...toched, ...{ [name]: true } })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        let reqData = {
            password,
            confirmPassword,
            authToken
        }
        let { status, loading, error, message } = await resetPassword(reqData);
        setLoader(loading);
        if (status == "success") {
            setFormValue(initialFormValue)
            setToched({})
            setValidateError(validation(initialFormValue))
            history.push("/login");
            toastAlert('success', message, 'resetPassword');
        } else {
            if (error) {
                setValidateError(error);
            }
            toastAlert('error', message, 'resetPassword');

        }
    }

    useEffect(() => {
        setValidateError(validation(formValue))
    }, [])

    return (
<div className='login_container login_box'>
        <div className='bannersec mt-0 h-100vh bodyheight'>
        <div className='container'>
            <div className='text-center mb-5'>
                <h3 className="blackandwhite">{t('PASSSWORD_RESET')}</h3>
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
                  
                         
        <div className="">
        {/* <h2 className="text-center mb-md-4 pb-3" data-aos="fade-up">Reset Password</h2> */}
        <div className="row w-100 mx-0">
            <div className="col-lg-12 col-md-12 m-auto">
                <form className="login_form mb-4" data-aos="fade-up">
                    {/* <p className="paraLabel text-center mb-3">Input your registered email address, we’ll send you reset password.</p> */}


                    <div className='floatinglabel my-4'>

<label>{t('NEW_PASSWORD')}</label>
{/* <input type="text" className='form-control leftspace' placeholder='Enter Amount'/> */}
<input
                                className="form-control mt-2"
                                placeholder={t('NEW_PASSWORD')}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

<Link className='right' onClick={(e) => {
                                    e.preventDefault();
                                    setFormValue((el => {
                                        return { ...el, ...{ showPassword: !el.showPassword } }
                                    }))
                                }}>
                                    <i className={clsx("fa", { "fa-eye": showPassword }, { "fa-eye-slash": !showPassword })} aria-hidden="true"></i>
                                </Link>

                                {toched.password && validateError.password && <p className="error-message">{t(validateError.password)}</p>}

</div>


<div className='floatinglabel my-4'>

<label>{t('CONFIRM_PASSWORD')}</label>
{/* <input type="text" className='form-control leftspace' placeholder='Enter Amount'/> */}
<input
                                className="form-control mt-2"
                                placeholder={t('CONFIRM_PASSWORD')}
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

<Link className="right" onClick={(e) => {
                                    e.preventDefault();
                                    setFormValue((el => {
                                        return { ...el, ...{ showConfirmPassword: !el.showConfirmPassword } }
                                    }))
                                }}>
                                    <i className={clsx("fa", { "fa-eye": showConfirmPassword }, { "fa-eye-slash": !showConfirmPassword })} aria-hidden="true"></i>
                                </Link>

                            {toched.confirmPassword && validateError.confirmPassword && <p className="error-message">{t(validateError.confirmPassword)}</p>}

</div>



                    {/* <div className="form-group">
                        <span className="login_label">{t('NEW_PASSWORD')}</span>
                        <div className="input-group regGroupInput mt-2">
                            <input
                                className="form-control mt-2"
                                placeholder={t('NEW_PASSWORD')}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
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
                        {toched.password && validateError.password && <p className="error-message">{t(validateError.password)}</p>}
                        
                    </div> */}
                    {/* <div className="form-group">
                        <span className="login_label">{t('CONFIRM_PASSWORD')}</span>
                        <div className="input-group regGroupInput mt-2">
                            <input
                                className="form-control mt-2"
                                placeholder={t('CONFIRM_PASSWORD')}
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div className="input-group-append">
                                <Link onClick={(e) => {
                                    e.preventDefault();
                                    setFormValue((el => {
                                        return { ...el, ...{ showConfirmPassword: !el.showConfirmPassword } }
                                    }))
                                }}>
                                    <i className={clsx("fa", { "fa-eye": showConfirmPassword }, { "fa-eye-slash": !showConfirmPassword })} aria-hidden="true"></i>
                                </Link>
                            </div>
                            </div>
                            {toched.confirmPassword && validateError.confirmPassword && <p className="error-message">{t(validateError.confirmPassword)}</p>}
                    </div> */}

                    <div className="form-group text-center">
                        <Button className='themebtn big my-3'
                            onClick={handleFormSubmit}
                            disabled={!isEmpty(validateError)}
                        >
                            {loader && <i class="fas fa-spinner fa-spin"></i>}{t('Submit')}
                        </Button>
                    </div>
                    {/* <div className="d-flex">
                        <Link to="/login" className="ml-auto">Login</Link>
                    </div> */}
                </form>
            </div>
        </div>
    </div>
               
                    </div>
                   
                </div>

            </div>
        </div>
        </div>
        </div>
        </div>
      
    )
}

export default ResetPassword;