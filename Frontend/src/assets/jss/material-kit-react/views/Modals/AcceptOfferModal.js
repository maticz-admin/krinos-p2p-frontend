import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import tickss from "../../../../images/ticks.png";
import Images from 'Images';
import spring from "../../../../images/toss/bannerbg.png";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { updateorderstatushooks } from 'actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
const AcceptOfferModal = (props) =>{
    const [isacceptoffermodal , setIsacceptoffermodal] = useState(true);
    const navigate = useHistory();

    const handlereject = async() => {
        var payload = {
          id : props?.offer?.refid,
          status : "reject"
        }
        var result = await updateorderstatushooks(payload);
        if(result?.data?.type == "success"){
        //   toastAlert("success" , "Rejected Successfully");
          props.onDismiss()
        }
      }
    


   
    return(
        <>
        <Modal show={isacceptoffermodal} aria-labelledby="contained-modal-title-vcenter" size="lg" centered >  {/*show={created}*/}
        <img className='spring1' src={spring} alt="spring" />
        <img src={Images.connect} className='connectright1' />
                                    <div className='modalz'>
                                       {/* <img src={Images.connect} className='vv1' /> */}
                                        <span className='greengradient'></span>
                                    </div>
                                    <Modal.Header>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            <p className='mb-0'>Offer creator</p>
                                            {/* <p className='submod-title'>It is a long established fact that a reader</p> */}
                                        </Modal.Title>
                                        <Button variant="secondary" className='modalbtns' onClick={props?.onDismiss}> x
                                        </Button>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p className='themetext_modal text-center'>{props.offer?.username} is waiting to connect with you</p>
                                        <div className='text-center pb-3 pt-3'>
                                            <button className='themebtn' onClick={()=>{navigate.push(`/trade/${props?.offer?.roomid}`)}}>Accept</button>
                                            <button className='themebtn ms-3' onClick={() =>handlereject()}>Decline</button>

                                        </div>
                                    </Modal.Body>
                                </Modal>
        </>
    )
}

export default AcceptOfferModal;