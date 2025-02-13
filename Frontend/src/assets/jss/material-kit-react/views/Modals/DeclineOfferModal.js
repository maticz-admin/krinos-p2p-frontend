import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import tickss from "../../../../images/ticks.png";
import Images from 'Images';
import spring from "../../../../images/toss/bannerbg.png";
const DeclineOfferModal = (props) =>{
    const [isdeclineoffermodal , setIsdeclineoffermodal] = useState(true);


   
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
                                            <p className='mb-0'>Decline Offer</p>
                                            {/* <p className='submod-title'>It is a long established fact that a reader</p> */}
                                        </Modal.Title>
                                        <Button variant="secondary" className='modalbtns' onClick={props?.onDismiss}> x
                                        </Button>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p className='themetext_modal text-center'>Offer declined</p>
                                        <p className='themetext_modal text-center'>Your offer has been declined by {props?.offer?.username}.</p>

                                        <div>
                                            <button className='themebtn' onClick={() => {props.onDismiss()}}>Ok</button>

                                        </div>
                                    </Modal.Body>
                                </Modal>
        </>
    )
}
export default DeclineOfferModal;