import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
// import tickss from "../../../../images/ticks.png";
import Images from 'Images';
import tour1 from "../../../assets/images/take_a_tour/tour1.png"
import tour2 from "../../../assets/images/take_a_tour/tour2.png"
import tour3 from "../../../assets/images/take_a_tour/tour3.png"
import tour4 from "../../../assets/images/take_a_tour/tour4.png"
import tour5 from "../../../assets/images/take_a_tour/tour5.png"
import tour6 from "../../../assets/images/take_a_tour/tour6.png"
import tour7 from "../../../assets/images/take_a_tour/tour7.png"
import { Adduserreviewhooks } from 'actions/P2PorderAction';
import { useSelector } from 'react-redux';
// import spring from "../../../../images/toss/bannerbg.png";
const Reviewmodal = (props) =>{
    const userdata = useSelector(state => state);
    const [isoffertagmodal , setIsoffertagmodal] = useState(true);

    const [taglist , setTaglist] = useState([]);
    const [userreview , setUserreview] = useState("");

    const handleclick = async(data)=>{
        var data = {
            reviewtype : props?.type,
            userid : userdata?.account?.userId,
            description : userreview,
            date : Date.now()
        }
        var payload = {
            review : data,
            owner : props?.owner
        }
        var result = await Adduserreviewhooks(payload);
        if(result?.data?.type == "success"){
            props.onSet(result?.data?.data);
            props.onDismiss();
        }
    } 
    return(
        <>
        <Modal show={isoffertagmodal} aria-labelledby="contained-modal-title-vcenter" size="lg" centered >  {/*show={created}*/}
        {/* <img className='spring1' src={spring} alt="spring" /> */}
        <img src={Images.connect} className='connectright1' />
                                    <div className='modalz'>
                                       {/* <img src={Images.connect} className='vv1' /> */}
                                        <span className='greengradient'></span>
                                    </div>
                                    <Modal.Header>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            <p className='mb-0'>Review</p>
                                            {/* <p className='submod-title'>It is a long established fact that a reader</p> */}
                                        </Modal.Title>
                                        <Button variant="secondary" className='modalbtns' onClick={props?.onDismiss}> x
                                        </Button>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className='py-4'>
                                            <div className=''>
                                               <textarea   className="form-control" rows={4} onChange={(e) => setUserreview(e?.target?.value)}/>
                                            </div>
                                            {/* <div className='scroll_div_table'>
                                        {taglist?.map((data , i) =>  <div className={offertag.includes(data) ? 'grid_div py-3 bordered_div_each active' : 'grid_div py-3 bordered_div_each'} onClick={()=>handleclick(data)}>
                                        <p className='mb-0 content_grid'>{data.Name}</p>{console.log("Mappingdata" , offertag.includes(data))}
                                        <p className='mb-0 content_grid'>{data.Description}</p>
                                        </div>)}
                                        </div> */}
                                        
                                        </div>
                                  <div className='text-center'> <button className='btn themebtn' onClick={()=> handleclick()}>Submit</button></div> 
                                    </Modal.Body>
                                </Modal>
        </>
    )
}

export default Reviewmodal;