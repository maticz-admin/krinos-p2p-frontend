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
import { useTranslation } from 'react-i18next';

const Takeatourmodal = (props) =>{
    const { t, i18n } = useTranslation();
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
                                            <p className='mb-0'>{t("TAKE_A_TOUR")}</p>
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
            <span className='title_grid'>{t("TOUR_1")}</span>
        </div>
    </div>
    <div class='item'>
 <div className=''>
                                                <img width="300" height="200" src={tour2}></img>
                                                <span className='title_grid'>{t("TOUR_2")}</span>
                                            </div>
    </div>
    <div class='item'>
        <div>
        <img width="300" height="200" src={tour3}></img>
        <span className='title_grid'>{t("TOUR_3")}</span>
        </div>
        </div>
        <div class='item'>
         <div>
         <img width="300" height="200" src={tour4}></img>
                                                <span className='title_grid'>{t("TOUR_4")}</span>
         </div>
        </div>
        <div class='item'>
          <div>
          <img width="300" height="200" src={tour5}></img>
                                                <span className='title_grid'>{t("TOUR_5")}</span>
          </div>
        </div>
        <div class='item'>
          <div>
          <img width="300" height="200" src={tour6}></img>
                                                <span className='title_grid'>{t("TOUR_6")}</span>
          </div>
        </div>
        <div class='item'>
           <div>
           <img width="300" height="200" src={tour7}></img>
                                                <span className='title_grid'>{t("TOUR_7")}</span>
           </div>
        </div>
    </OwlCarousel>
   
                                       
                                  <div className='text-center'> <button className='btn themebtn' onClick={()=>props.onDismiss()}>{t("CLOSE")}</button></div> 
                                    </Modal.Body>
                                </Modal>
        </>
    )
}

export default Takeatourmodal;