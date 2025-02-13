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

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Takeatourmodal = (props) =>{
    const [isoffertagmodal , setIsoffertagmodal] = useState(true);

    const [taglist , setTaglist] = useState([]);
    const [offertag , setOffertag] = useState([]);
   

    const handleclick = (data)=>{
        var offerdata = offertag;
        if(offerdata?.length < 3){
            var index = offerdata.indexOf(data);
        if (index > -1){
            offerdata.splice(index, 1); 
        }else{
            offerdata.push(data);
        }
        setOffertag(offerdata);
        setTaglist(props?.taglist);
        props.onSet(offerdata);
        }
    } 
    const option = {
                margin:10,
                nav:true,
                dots:false,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:3
                    }
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
                                            <p className='mb-0'>Take a tour</p>
                                            {/* <p className='submod-title'>It is a long established fact that a reader</p> */}
                                        </Modal.Title>
                                        <Button variant="secondary" className='modalbtns' onClick={props?.onDismiss}> x
                                        </Button>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <OwlCarousel className='owl-theme' {...option}  margin={10} nav>
    <div class='item'>
         <div className=''>
            <img width="300" height="200" src={tour1}></img>
            <span className='title_grid'>This is where you chat with your trade partner and exchange information needed to complete the trade.</span>
        </div>
    </div>
    <div class='item'>
 <div className=''>
                                                <img width="300" height="200" src={tour2}></img>
                                                <span className='title_grid'>If you’re ever wondering whether you’re talking to an actual Paxful moderator, this is how you’ll know.</span>
                                            </div>
    </div>
    <div class='item'>
        <div>
        <img width="300" height="200" src={tour3}></img>
        <span className='title_grid'>This area shows everything you need to know about the trade and all actions you can take.</span>
        </div>
        </div>
        <div class='item'>
         <div>
         <img width="300" height="200" src={tour4}></img>
                                                <span className='title_grid'>You’ll need to click this button to let your trade partner know that you’ve made the payment for the trade.</span>
         </div>
        </div>
        <div class='item'>
          <div>
          <img width="300" height="200" src={tour5}></img>
                                                <span className='title_grid'>Having second thoughts or don’t want to continue with the trade? Just click this button to leave the trade.</span>
          </div>
        </div>
        <div class='item'>
          <div>
          <img width="300" height="200" src={tour6}></img>
                                                <span className='title_grid'>This is where you’ll see all your trade partner’s expectations. Be sure to follow these instructions exactly to complete the trade smoothly.</span>
          </div>
        </div>
        <div class='item'>
           <div>
           <img width="300" height="200" src={tour7}></img>
                                                <span className='title_grid'>If you face any issues with the trade, click this button and we’ll help you out.</span>
           </div>
        </div>
    </OwlCarousel>
   
                                       
                                  <div className='text-center'> <button className='btn themebtn' onClick={()=>props.onDismiss()}>Close</button></div> 
                                    </Modal.Body>
                                </Modal>
        </>
    )
}

export default Takeatourmodal;