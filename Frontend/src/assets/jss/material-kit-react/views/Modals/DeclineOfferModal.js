import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import tickss from "../../../../images/ticks.png";
import Images from 'Images';
import spring from "../../../../images/toss/bannerbg.png";
import { useTranslation } from 'react-i18next';
const DeclineOfferModal = (props) =>{
    const [isdeclineoffermodal , setIsdeclineoffermodal] = useState(true);
  const { t, i18n } = useTranslation();


   
    return(
        <>
        <Modal show={isdeclineoffermodal} aria-labelledby="contained-modal-title-vcenter" size="lg" centered >  {/*show={created}*/}
        <img className='spring1' src={spring} alt="spring" />
        <img src={Images.connect} className='connectright1' />
                                    <div className='modalz'>
                                       {/* <img src={Images.connect} className='vv1' /> */}
                                        <span className='greengradient'></span>
                                    </div>
                                    <Modal.Header>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            <p className='mb-0'>{t("DECLINE_OFFER")}</p>
                                            {/* <p className='submod-title'>It is a long established fact that a reader</p> */}
                                        </Modal.Title>
                                        <Button variant="secondary" className='modalbtns' onClick={props?.onDismiss}> x
                                        </Button>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p className='themetext_modal text-center'>{t("OFFER_DECLINED")}</p>
                                        <p className='themetext_modal text-center'>{t("YOUR_OFFER_HAS_BEEN_DECLINED_BY")} {props?.offer?.username}.</p>

                                        <div>
                                            <button className='themebtn' onClick={() => {props.onDismiss()}}>{t("Ok")}</button>

                                        </div>
                                    </Modal.Body>
                                </Modal>
        </>
    )
}
export default DeclineOfferModal;