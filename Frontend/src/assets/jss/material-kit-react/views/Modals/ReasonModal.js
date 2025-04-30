import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import tickss from "../../../../images/ticks.png";
import Images from 'Images';
import spring from "../../../../images/toss/bannerbg.png";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { updateorderstatushooks } from 'actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
import { useTranslation } from 'react-i18next';
const ResonModal = (props) =>{
    const [isrejectreasonmodal , setIsrejectreasonmodal] = useState(true);
      const { t, i18n } = useTranslation();



   
    return(
        <>
        <Modal show={isrejectreasonmodal} aria-labelledby="contained-modal-title-vcenter" size="lg" centered >  {/*show={created}*/}
        <img className='spring1' src={spring} alt="spring" />
        <img src={Images.connect} className='connectright1' />
                                    <div className='modalz'>
                                       {/* <img src={Images.connect} className='vv1' /> */}
                                        <span className='greengradient'></span>
                                    </div>
                                    <Modal.Header className='modal_header_pad_rea'>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            <p className='mb-0 pl-4'>{t("REJECTED_REASON")}</p>
                                            {/* <p className='submod-title'>It is a long established fact that a reader</p> */}
                                        </Modal.Title>
                                        <Button variant="secondary" className='modalbtns' onClick={props?.onDismiss}> x
                                        </Button>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p className='themetext_modal text-center'>{t("YOUR_KYC_HAS_BEEN_REJECTED_FOR_THE_BELOW_REASON")}</p>
                                        <p className='themetext_modal text-center resaon_wrap_tex'>{props.reason}</p>

                                       
                                    </Modal.Body>
                                </Modal>
        </>
    )
}

export default ResonModal;