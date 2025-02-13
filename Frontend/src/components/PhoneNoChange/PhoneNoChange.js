// import package
import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import component
import GridItem from "components/Grid/GridItem.js";

// import action
import { changeNewPhone, verifyNewPhone } from '../../actions/users';

// import lib
import { toastAlert } from "../../lib/toastAlert";
import isEmpty from '../../lib/isEmpty';
import validation from './validation';
import {COUNTRY} from "../../config/countrycode";
const initialFormValue = {
    'newPhoneCode': '1',
    'newPhoneNo': '',
    'otp': ''
}

const mobileInitialValue = {
    isLoading: false,
    type: 'send',  // send or resend,
    timer: 600, //sec,
    isDisable: false,
    timerStart: false
}

const PhoneNoChange = () => {
    const { t, i18n } = useTranslation();
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
    ]
    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [toched, setToched] = useState({});
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();
    const [mobileDetail, setMobileDetail] = useState(mobileInitialValue);
    const [disablePh, setDisablePh] = useState(false)

    const { newPhoneCode, newPhoneNo, otp } = formValue;

    // redux-state
    const accountData = useSelector(state => state.account);
    const { phoneCode, phoneNo } = accountData;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (!(value == '' || (/^[0-9\b]+$/.test(value) && value.length <= 6))) {
            return
        }
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        if (value) {
            setValidateError({})
        }
        // setValidateError(validation(formData))
    }

    const handlePhoneNumber = (value, country) => {
        const { dialCode } = country;
        let newPhoneNo = value;
        let formData = formValue;
        if (dialCode) {
            formData = {
                ...formData, ...{
                    newPhoneCode: dialCode,
                    newPhoneNo: newPhoneNo.slice(dialCode.length),
                }
            }
        } else if (value) {
            formData = { ...formData, ...{ newPhoneNo } }
        }
        if (!isEmpty(value && country)) {
            setValidateError({})
        }
        setFormValue(formData)
        // setValidateError(validation(formData))

    }

    const handlecode = (e) => {
        // const { dialCode } = country;
        // let newPhoneNo = value;
        let formData = formValue;
        formData = {
            ...formData, ...{
                newPhoneCode: e
                // newPhoneNo: newPhoneNo.slice(dialCode.length),
            }}
        setFormValue(formData)
        // setValidateError(validation(formData))

    }

    const handleNumber = (e) => {
        // const { dialCode } = country;
        let newPhoneNo = e;
        let formData = formValue;
            formData = { ...formData, ...{ newPhoneNo } }
        
        if (!isEmpty(e)) {
            setValidateError({})
        }
        setFormValue(formData)
        // setValidateError(validation(formData))

    }

    const handleBlurPhone = (e) => {
        setToched({ ...toched, ...{ 'newPhoneNo': true, 'newPhoneCode': true } })
    }


    const handleBlur = (e) => {
        const { name } = e.target;
        setToched({ ...toched, ...{ [name]: true } })
    }

    const handleMobileSubmit = async (e) => {
        setMobileDetail({ ...mobileDetail, ...{ 'isLoading': true, 'isDisable': true } })

        let reqData = {
            newPhoneCode,
            newPhoneNo
        }
        try {
            let { status, loading, error, message } = await changeNewPhone(reqData);

            if (status == "success") {
                setMobileDetail({
                    ...mobileDetail, ...{
                        'isLoading': false,
                        'isDisable': true,
                        'timer': mobileDetail.timer - 1,
                        'timerStart': true,
                        'type': 'resend'
                    }
                })
                setDisablePh(true)
                toastAlert('success', message, 'editPhoneNumber');
            } else {
                setMobileDetail({
                    ...mobileDetail, ...{
                        'isLoading': false,
                        'isDisable': false
                    }
                })
                if (!isEmpty(error)) {
                    setValidateError(error);
                    return
                }
                toastAlert('error', message, 'editPhoneNumber');
            }
        } catch (err) { }
    }

    const handleFormSubmit = async (e) => {
        // debugger
        e.preventDefault();
        try {
            setLoader(true)

            let reqData = {
                newPhoneCode,
                newPhoneNo,
                otp
            }
            let { status, loading, error, message, result } = await verifyNewPhone(reqData);
            setLoader(loading)
            if (status == "success") {
                setDisablePh(true)
                // setFormValue({
                //     'newPhoneCode': result?.phoneCode,
                //     'newPhoneNo': result?.phoneNo,
                //     'otp': ''
                // })
                setMobileDetail(mobileInitialValue)
                toastAlert('success', message, 'editPhoneNumber');
            } else {
                setValidateError(error);
            }
        }
        catch (err) {
        }
    }

    // useEffect(() => {
    // }, [])

    useEffect(() => {
        if (phoneNo) {
            setFormValue({
                'newPhoneCode': phoneCode,
                'newPhoneNo': phoneNo,
            })
        }

    }, [phoneNo])

    useEffect(() => {
        if (mobileDetail.timer > 0 && mobileDetail.timerStart == true) {
            const intervalId = setInterval(() => {
                setMobileDetail({ ...mobileDetail, ...{ 'timer': mobileDetail.timer - 1 } })
            }, 1000);

            return () => clearInterval(intervalId);
        } else if (mobileDetail.timer == 0 && mobileDetail.timerStart == true) {
            setMobileDetail({
                ...mobileDetail, ...{
                    'timer': 600,
                    'timerStart': false,
                    'isDisable': false
                }
            })
        }
    }, [mobileDetail.timer])

    return (
        <GridItem xs={12} sm={12} md={4} lg={4}>
            <div className="form-group floatinglabel">
                {/* <label>{t("PHONE_NUMBER")}<span class="textRed">*</span></label> */}
                <div class="input-group mb-0 otp_inp_grp">
                    {/* <PhoneInput
                        country='us'
                        placeholder={t("PHONE_NUMBER")}
                        value={newPhoneCode + newPhoneNo}
                        onChange={handlePhoneNumber}
                        onBlur={handleBlurPhone}
                        specialLabel={false}
                    // disabled={disablePh}
                    /> */}
                    <div className='countrylist phonenumber'>
                     <Autocomplete value={newPhoneCode}
                    //  open={open}
      disablePortal
      id="combo-box-demo"
      options={COUNTRY}
      onChange={(e , val) => handlecode(val?.dial_code)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="CODE" />}
    /></div>
                    <div class="input-group-append append_dir_mov">
                        <input 
                     placeholder={t("PHONE_NUMBER")}
                        
                     value={newPhoneNo}
                        onChange = {(e) => handleNumber(e?.target?.value)}
                        type="text" className='form-control ml-2 mobile_nout_f'/>
                       
                        <button
                            type="button"
                            className="btn btn-primary text-uppercase py-2 my-0"
                            disabled={mobileDetail.isDisable || !isEmpty(validateError.newPhoneCode) || !isEmpty(validateError.newPhoneNo)}
                            onClick={handleMobileSubmit}
                        >
                            {mobileDetail.isLoading && <i class="fas fa-spinner fa-spin mr-2"></i>}
                            {mobileDetail.type == 'send' ? t("SEND_OTP") : t("RESEND_OTP")}
                        </button>


                    </div>
                </div>
                <p className="error-message" style={{ color: 'red' }}>{validateError?.newPhoneNo}</p>

            </div>
            <div className="form-group floatinglabel otp_inp_grp mt-4">
                <label className='otp_lable_float_zind'>{t("ENTER_OTP")}</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        name="otp"
                        value={otp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        pattern="[0-9]*"
                    />
                    <div className="input-group-append">
                        <span className="input-group-text themebtn text-uppercase py-2 my-0">
                            {
                                (mobileDetail.timer != 0 && mobileDetail.timer != 120) && <small className="textBlue">
                                    {mobileDetail.timer} {t("SEC")}
                                </small>
                            }
                        </span>
                    </div>
                    {/* 
                    {
                        toched.otp && validateError.otp && <span className="error_text">{t(validateError.otp)}</span>
                    } */}


                </div>
                <p style={{ color: 'red' }} className="error-message">{validateError.otp}</p>

            </div>
            <div className="form-group green-button">
                <button
                    type="button"
                    className="themebtn text-uppercase py-2 my-0"
                    disabled={!isEmpty(validateError)}
                    onClick={handleFormSubmit}
                >
                    {loader && <i class="fas fa-spinner fa-spin"></i>}
                    {t("UPDATE_PHONE_NO")}
                </button>
            </div>
        </GridItem>
    )
}

export default PhoneNoChange;