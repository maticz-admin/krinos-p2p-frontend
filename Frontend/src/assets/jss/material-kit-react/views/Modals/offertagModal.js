import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import tickss from "../../../../images/ticks.png";
import Images from 'Images';
import spring from "../../../../images/toss/bannerbg.png";
const OffertagModal = (props) =>{
    const [isoffertagmodal , setIsoffertagmodal] = useState(true);

    const [taglist , setTaglist] = useState([]);
    const [offertag , setOffertag] = useState([]);
    const [update,OnUpdate]= useState(false);
    useEffect(()=>{
        setTaglist(props?.taglist);
        setOffertag(props?.ofrtag)
    },[])

    useEffect(()=>{
    },[update])

    const handleclick = (data)=>{
        var offerdata = offertag;
        // if(offerdata?.length < 3){
            var index = offerdata.indexOf(data);
        if (index > -1){
            offerdata.splice(index, 1); 
        }else{
            offerdata.push(data);
        }
        setOffertag(offerdata);
        OnUpdate(true);
        setTimeout(()=>OnUpdate(false),500)
        setTaglist(props?.taglist);
        props.onSet(offerdata);
        // }
    } 
    return(
        <>
        <Modal show={isoffertagmodal} aria-labelledby="contained-modal-title-vcenter" size="md" centered >  {/*show={created}*/}
        <img className='spring1' src={spring} alt="spring" />
        <img src={Images.connect} className='connectright1' />
                                    <div className='modalz'>
                                       {/* <img src={Images.connect} className='vv1' /> */}
                                        <span className='greengradient'></span>
                                    </div>
                                    <Modal.Header className='modal_title_off_tag_odal'>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            <p className='mb-0'>Offer Tags</p>
                                            {/* <p className='submod-title'>It is a long established fact that a reader</p> */}
                                        </Modal.Title>
                                        <Button variant="secondary" className='modalbtns' onClick={props?.onDismiss}> x
                                        </Button>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className='py-4'>
                                            <div className='grid_div'>
                                                <p className='title_grid'>Name</p>
                                                <p className='title_grid'>Description</p>
                                            </div>
                                            <div className='scroll_div_table'>
                                        { offertag && taglist?.map((data , i) =>  <div className={offertag.includes(data) ? 'grid_div py-3 bordered_div_each active' : 'grid_div py-3 bordered_div_each'} onClick={()=>handleclick(data)}>
                                        <p className='mb-0 content_grid'>{data.Name}</p>
                                        <p className='mb-0 content_grid'>{data.Description}</p>
                                        </div>)}
                                        </div>
                                        
                                        </div>
                                  <div className='text-center'> <button className='btn themebtn' onClick={props?.onDismiss}>Close</button></div> 
                                    </Modal.Body>
                                </Modal>
        </>
    )
}

export default OffertagModal;