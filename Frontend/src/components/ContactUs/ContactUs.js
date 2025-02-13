// import package
import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import action
import { newContact } from '../../actions/commonAction'

// import lib
import validation from './validation'
import isEmpty from '../../lib/isEmpty'
import { toastAlert } from '../../lib/toastAlert'

const initialFormValue = {
    'name': '',
    'email': '',
    'subject': '',
    'message': '',
}

const ContactUs = (props) => {
    const { t, i18n } = useTranslation();

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();
    const [messerror , setmesserror] = useState("");

    const { name, email, subject, message } = formValue;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, [name]: value }
        setFormValue(formData)
        if(name == "message"){
            let str1= value;
            //exclude  start and end white-space
            str1 = str1.replace(/(^\s*)|(\s*$)/gi,"");
            //convert 2 or more spaces to 1  
            str1 = str1.replace(/[ ]{2,}/gi," ");
            // exclude newline with a start spacing  
            str1 = str1.replace(/\n /,"\n");
            if(str1.split(' ').length > 200){
                setmesserror("Exceed the limit")
            }
            else{
                setmesserror("")
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)

        let reqData = {
            name,
            email,
            subject,
            message:formValue.message
        }
        if(!messerror){
            let validationError = validation(reqData)
        if (!isEmpty(validationError)) {
            setValidateError(validationError)
            setLoader(false)
            return
        }

        let { status, loading, message, error } = await newContact(reqData);
        setLoader(loading);
        if (status == 'success') {
            setFormValue(initialFormValue)
            setValidateError({})
            toastAlert('success', message, 'contactus');
        } else {
            if (error) {
                setValidateError(error);
                return
            }
            toastAlert('error', message, 'contactus');
        }
        }
        setLoader(false)
    }

    return (
        <div className="p2p_card min-h-auto">
            <h3 className="login_title_8 mb-3">{t('CONTACT_US')}</h3>
            <div dangerouslySetInnerHTML={{ '__html': props.content }} />
            <GridItem xs={12} sm={12} md={12} lg={12}>
                <GridContainer className="contact_form px-0">
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <div className="form-group contacy_s">
                            <label>{t('YOUR_FULL_NAME')}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                            {
                                validateError.name && <p className="error-message">{t(validateError.name)}</p>
                            }
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <div className="form-group contacy_s">
                            <label>{t('EMAIL_PLACEHOLDER')}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                            {
                                validateError.email && <p className="error-message">{t(validateError.email)}</p>
                            }
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                        <div className="form-group contacy_s">
                            <label>{t('SUBJECT')}</label>
                            <input
                                type="text"
                                className="form-control"
                                name="subject"
                                value={subject}
                                onChange={handleChange}
                            />
                            {
                                validateError.subject && <p className="error-message">{t(validateError.subject)}</p>
                            }
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                        <div className="form-group contacy_s">
                            <label>{t('MESSAGE')}</label>
                            <textarea
                                name="message"
                                value={message}
                                onChange={handleChange}
                            />
                            {
                                validateError.message && <p className="error-message">{t(validateError.message)}</p>
                            }
                            {
                            messerror && <p className="error-message">{messerror}</p>
                            }
                        </div>
                    </GridItem>
                </GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    <div className="submit_btn w70_i w-30 for_conatnt_btn">
                        <Button
                            onClick={handleSubmit}
                            disabled={loader}
                        >
                            {loader && <i class="fas fa-spinner fa-spin"></i>}{t('Submit')}
                        </Button>
                    </div>
                </GridItem>

              <p className='contavt_et'>Contact us on <a href="mailto:support@ctoshub.com">support@ctoshub.com</a></p>

            </GridItem>
        </div>
    )
}

export default ContactUs