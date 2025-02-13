import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import tickss from "../../../../images/ticks.png";
import Images from "../../../../../Images";
import spring from "../../../../images/toss/bannerbg.png"
import { Createp2porderhooks , Getsingleuserhook} from '../../../../../actions/P2PorderAction';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { toastAlert } from 'lib/toastAlert';
import { useSelector } from 'react-redux';
import { Getcmshooks } from 'actions/P2PorderAction';
import { kycStatus } from 'lib/displayStatus';
// import {  } from 'actions/P2PorderAction';

const CreateoffModal = (props) =>{
    const[createModal, setCreateModal] = useState(true);
    const [showmore, setShowmore] = useState(false);
    const userdata = useSelector(state => state.account);

    const [cmsdata , setCmsdata] = useState("");

    // useEffect(()=>{
    //     const heigthdiv = document.getElementById('createoffer_modal_whole').scrollHeight;
    // if(showmore)
    // {
    //     document.getElementById("vie_more_a").classList.remove("d-block");
    //     document.getElementById("vie_more_a").classList.add("d-none");
    //     document.getElementById('createoffer_modal_whole').classList.add("show_sec");
    //     document.getElementById('createoffer_modal_whole').classList.remove("hide_sec")


    // }
    // else
    // {
    //     document.getElementById("vie_more_a").classList.add("d-block");
    //     document.getElementById("vie_more_a").classList.remove("d-none");
    //     document.getElementById('createoffer_modal_whole').classList.remove("show_sec");
    //     document.getElementById('createoffer_modal_whole').classList.add("hide_sec")

    // }
    // },[])

    const handlecreate = async()=>{
        let userpayload = {
            userid :  userdata?.userId //redux usr data
          }
          var userresult = await Getsingleuserhook(userpayload);
          if(userresult?.data?.type == "success"){
            // setUserdatas(userresult?.data?.data);
            const wallet = userresult?.data?.wallet?.assets
            const balance = wallet?.find(e => e?.coin == props?.payload?.coin)
            const kyc = userresult?.data?.kyc;
            const userdata = userresult?.data?.data;
            if(props?.payload?.ordertype == "Sell"){
                if(balance?.p2pBal <= 0){
                    toastAlert("error" , "Insufficient balance!");
                }
                else if(kyc?.idProof?.status == "approved" && userdata?.firstName && userdata?.lastName){
                    var data = {
                        createdata : props?.payload
                    }
                    var result = await Createp2porderhooks(data)
                    console.log('resultresultresultresult---', result)
                    props.opencreated();
                    props.onSetresult(result?.data?.data);
                    props.onsetdata(result?.data);
                }
                else{
                    toastAlert("error" , "Complete your kyc and update fullname");
                }
            }
            else if(kyc?.idProof?.status == "approved" && userdata?.firstName && userdata?.lastName){
                var data = {
                    createdata : props?.payload
                }
                var result = await Createp2porderhooks(data)
                props.opencreated();
                props.onSetresult(result?.data?.data);
                props.onsetdata(result?.data);
            }
            else{
                toastAlert("error" , "Complete your kyc and update fullname");
            }
          }
    }

    useEffect(() => {
        async function getcms(){
            var payload1 = {"identifier" : "vendor_terms_and_conditions"};
            var result1 = await Getcmshooks(payload1);
            setCmsdata(result1?.data?.data?.content);
        }
        getcms();
    })


    return(
        <>
        <Modal  aria-labelledby="contained-modal-title-vcenter" size="lg" centered show={createModal}>
        <img className='spring1' src={spring} alt="spring" />
        <img src={Images.connect} className='connectright1' />
                                    <div className='modalz'>
                                       {/* <img src={Images.connect} className='vv1' /> */}
                                        {/* <span className='greengradient'></span> */}
                                    </div>
                                    <Modal.Header>
                                  
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            <p className='mb-0'>Vendor terms & conditions</p>
                                            <p className='submod-title'>It is a long established fact that a reader</p>
                                        </Modal.Title>
                                        <Button variant="secondary" className='modalbtns' onClick={props.onDismiss}> x
                                        </Button>
                                    </Modal.Header>
                                    <Modal.Body className='termsandcondition mdoalcs'>
                                        <div className={!showmore?'createoffer_modal_whole hide_sec':'createoffer_modal_whole'} id="createoffer_modal_whole">
                                        <div>{ReactHtmlParser(cmsdata)}</div>
                                        </div>
                                        <a id="vie_more_a" onClick={()=>{setShowmore(!showmore)}}>{!showmore?"View More":"View Less"}</a>

                                        {/* <div className='borders'>
                                            <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survivedLorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                        <div className='mt-5 lists'>
                                            <ul>
                                                <li>
                                                    <img className='tickimg' src={tickss} alt='ii' />
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                                                </li>
                                                <li>
                                                    <img className='tickimg' src={tickss} alt='ii' />
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                </li>
                                                <li>
                                                    <img className='tickimg' src={tickss} alt='ii' />
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                                                </li>
                                            </ul>
                                        </div> */}
                                        {/* <div>{}</div> */}
                                        <div className='allbtn d-flexj justify-content-between align-items-center mt-5 btn_cont_noafter'>
                                            <button type="button" class="btn vendorbtn" onClick={props.onDismiss}>I don't want to be a vendor</button>
                                            <button className='themebtn' onClick={handlecreate}>I Accept</button>
                                        </div>
                                    </Modal.Body>
                                </Modal>
        </>
    )
}

export default CreateoffModal;