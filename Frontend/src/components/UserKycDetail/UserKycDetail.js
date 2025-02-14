// import package
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'classnames';
import { useSelector } from 'react-redux'

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import lib
import { kycStatus, userStatus } from '../../lib/displayStatus';
import isEmpty from '../../lib/isEmpty';

import ResonModal from 'assets/jss/material-kit-react/views/Modals/ReasonModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import isLogin from 'lib/isLogin';
import { Getsingleuserhook } from 'actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
import { fetchClientToken } from 'config/DiditHooks';
import { createSession } from 'config/DiditHooks';
import { getSessionDecision } from 'config/DiditHooks';

const UserKycDetail = () => {
    const { t, i18n } = useTranslation();
    const navigate = useHistory();
    const userdata = useSelector(state => state);
    const [fullview , setFullview] = useState(false)
    const [isrejectreasonmodal , setIsrejectreasonmodal] = useState(false);
    const [loader , setLoader] = useState(false);
    const [userdetail , setUserdetail] = useState({});
    const [url , setUrl] = useState();


    // redux-state
    const { idProof, addressProof } = useSelector(state => state.userKyc);
    // console.log('addressProofaddressProof----', useSelector(state => state));
    const accountData = useSelector(state => state.account);
    const { userId, firstName, lastName, email, emailStatus, phoneStatus, phoneCode, phoneNo, type, createAt, bankDetail } = accountData;

    useEffect(() => {
        handleverify();
    } , [])

    const handleverify = async () => {
        if (isLogin()) {
            let userpayload = {
                userid: userdata?.account?.userId //redux usr data
            }
            var userresult = await Getsingleuserhook(userpayload);
            console.log("userresultuserresult" , userresult?.data);
            
            if (userresult?.status) {
                setUserdetail(userresult?.result);
            }
            if (!userresult?.result?.kycId?.sessionId) { console.log("check if");
            
                let result = await fetchClientToken();
                let sessionresult = await createSession("", "https://verify.didit.me/api/session/callback", userdetail?._id);
                console.log("Result in geyt token", sessionresult);
                setUrl(sessionresult?.url);
            }
            else{console.log("check else");
                let res = await getSessionDecision(userresult?.result?.kycId?.sessionId);
                if (res?.status == "Declined" || res?.status == "Expired") {
                    let sessionresult = await createSession("", "https://verify.didit.me/api/session/callback", userdetail?._id);
                    console.log("Result in geyt token", sessionresult);
                    setUrl(sessionresult?.url);
                }
                else{
                    setUrl(res?.session_url);
                }
            }

            // setUserverification(userresult?.data?.data);
            // if (userresult?.data?.kyc?.idProof?.status == "approved") {
            //     navigate.push("/createoffer");
            // }
            // else {
            //     toastAlert("error", "Complete your kyc and update fullname");
            // }
        }
        else {
            navigate.push("/login");
        }
    }





    return (
        <div className="">
            <div className="kycTopCard">
                <h3 className='mt-3'>{firstName}{' '}{lastName}</h3>
                <p><label>{t("USER_ID")}:</label> {userId} <label>{t("MEMBER_SINCE")}:</label> {createAt} </p>
                {/* <h5>
                    <label>{t("VERIFICATION_TYPE")}</label>
                    <span className={clsx({
                        "kycTypeGreen": ['basic_verified', 'advanced', 'pro'].includes(type),
                        'kycTypeRed': ['basic_pending', 'basic_submitted', 'advanced_processing', 'pro_processing'].includes(type)
                    })}>{type && t(userStatus(type))}</span>
                </h5> */}
            </div>
            <div className="kycBottomCard">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4} lg={4}>
                        <div className="kycCardStatus">
                            <div className="profileDetailView">
                                <ul>
                                    <li><label>{t('EMAIL')}</label> 
                                    {/* <span>{email} {!email && !emailStatus ? "NOT_VERIFIED" : emailStatus == 'unverified' ? "NOT_VERIFIED" : emailStatus}<i class={clsx({ "fas fa-check-circle enableGreen pl-2": emailStatus == 'verified' }, { "fas fa-times-circle disabledRed pl-2": emailStatus == 'unverified' })}></i>
                                    </span> */}

<span>
                                            {
                                                emailStatus && emailStatus == 'unverified' && <span className='ml-0'>{t('NOT_VERIFIED')}</span>
                                            }

                                            {
                                                emailStatus && emailStatus == 'verified' && <span>{email}</span>
                                            } <i class={clsx({ "fas fa-check-circle enableGreen pl-2": emailStatus == 'verified' }, { "fas fa-times-circle disabledRed pl-2": emailStatus == 'unverified' })}></i>
                                        </span>
                                    </li>
                                    <li><label>{t('PHONE')}</label>
                                        <span>
                                            {
                                                phoneStatus && phoneStatus == 'unverified' && <span className='ml-0'>{t('NOT_VERIFIED')}</span>
                                            }

                                            {
                                                phoneStatus && phoneStatus == 'verified' && <span>+{phoneCode}{phoneNo}</span>
                                            } <i class={clsx({ "fas fa-check-circle enableGreen pl-2": phoneStatus == 'verified' }, { "fas fa-times-circle disabledRed pl-2": phoneStatus == 'unverified' })}></i>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                        <div className="kycCardStatus labelWidth">
                            <div className="profileDetailView">
                                <ul>
                                    <li>
                                        <label>Kyc</label>
                                        <div className="form-group green-button">
                                            <button
                                                type="button" className="themebtn text-uppercase py-2 my-0"
                                                // onClick={handleFormSubmit}
                                                disabled={loader}
                                            >
                                                {loader && <i class="fas fa-spinner fa-spin"></i>}
                                                {"Complete Now"}
                                            </button>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            {/* <h6>{t("ID_ADDRESS_PROOF")}f</h6> */}
                            {/* Address Proof Pending Verified */}
                            {/* Advanced user verification: Pending/Verified */}
                            {/* Pro user verification: Pending/Verified */}
                            {/* <ul>
                                <li>
                                    <label>ID document:</label><span>Not verified</span>

                                </li>
                                {
                                    idProof && idProof.status == 'new' && <li>
                                        <label>{t("NOT_APPLY")}</label>
                                    </li>
                                }



                                {
                                    idProof && idProof.status != 'new' && <li>
                                        <label>{t(documentType(idProof.type))}</label>
                                        <span>
                                            <i className={clsx({ "fas fa-check-circle enableGreen": idProof.status == 'approved' }, { "fas fa-times-circle disabledRed": ['pending', 'rejected'].includes(idProof.status) })}></i>{' '}
                                            {t(documentStatus(idProof.status))}
                                        </span>
                                    </li>
                                }


                                {
                                    addressProof && addressProof.status == 'new' && <li>
                                        <label>{t("NOT_APPLY")}</label>
                                    </li>
                                }

                                {
                                    addressProof && addressProof.status != 'new' && <li>
                                        <label>{t(documentType(addressProof.type))}</label>
                                        <span>
                                            <i className={clsx({ "fas fa-check-circle enableGreen": addressProof.status == 'approved' }, { "fas fa-times-circle disabledRed": ['pending', 'approved', 'rejected'].includes(addressProof.status) })}></i>{' '}
                                            {t(documentStatus(addressProof.status))}
                                        </span>
                                    </li>
                                }

                            </ul> */}
                        </div>
                    </GridItem>

                    
                    {/*<GridItem xs={12} sm={12} md={4} lg={4}>
                        {
                            !isEmpty(bankDetail) && <div className="kycCardStatus">
                                <h6>{t("DEFAULT_BANK_ACCOUNT_DETAIL")}</h6>
                                <ul>
                                    <li><label>{bankDetail.bankName}</label>
                                        <span><i class="fas fa-check-circle enableGreen"></i> {t('VERIFIED')}</span>
                                    </li>
                                    <li><label>{bankDetail.accountNo},</label></li>
                                    <li><label>{bankDetail.city}, {bankDetail.country}</label></li>
                                </ul>
                            </div>
                        }

                    </GridItem>*/}
                </GridContainer>
            </div>
        </div>
    )
}

export default UserKycDetail;