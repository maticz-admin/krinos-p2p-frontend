import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'classnames';
import { useTranslation } from 'react-i18next';
import Images from './../Images';
import spring from "../assets/images/toss/bannerbg.png";
import { MdRadioButtonChecked } from 'react-icons/md';
// import component
import Header from "components/Header/Header.js";
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ProfileDetail from '../components/ProfileDetail/ProfileDetail';
import BankAccount from '../components/BankAccount/BankAccount';
import Announcement from '../components/Announcement/Announcement';
import EmailChange from '../components/EmailChange/EmailChange';
import PhoneNoChange from '../components/PhoneNoChange/PhoneNoChange';
import UserKycDetail from '../components/UserKycDetail/UserKycDetail'
import IDProof from '../components/IDProof/IDProof';
import AddressProof from '../components/AddressProof/AddressProof';
import Footer from "../components/Footer/Footer"

// import action
import { getKycDetail } from '../actions/userKyc'
import { updateuserprofilepichooks } from "../actions/P2PorderAction";
import { Getsingleuserhook } from "../actions/P2PorderAction";
import config from "../config/index";
import { toastAlert } from "lib/toastAlert";
import { updateAcctData } from "actions/users";
import isEmpty from "lib/isEmpty";

const dashboardRoutes = [];

function ScrollToTopOnMount() {
  useEffect(() => {
    if(window.location.href.split('#')[1]== "reviews"){
      const reviewsec = document.getElementById("reviews").offsetTop;
      window.scrollTo(0, reviewsec);
    }
    
  }, []);
  return null;
}
const ProfilePage = (props) => {
  const userdata = useSelector(state => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const { ...rest } = props;

  const [steps, setSteps] = useState(1);
  const [image , setImage] = useState("");
  const [imageblob , setImageblob] = useState("");
  const [userdatas , setUserdata] = useState({});

  const [review , setReview] = useState([]);
  const [imgerror , setImgerror] = useState("");


  useEffect(() => {
    fetchdata()
    getKycDetail(dispatch)
    document.title = "TOSSVTOSS"
  }, [])

  const fetchdata = async() => {
    var payload = {userid : userdata?.account?.userId}
    var result = await Getsingleuserhook(payload);
    setReview( result?.data?.data?.reviews)
    if(result?.data?.type == "success"){
      setUserdata(result?.data?.data);
      if(result?.data?.data?.profileImage){
        setImageblob(config.API_URL + result?.data?.data?.profileImage);
      }
    }
    
  }

  const handleupdate = async() => {
    if(image){
      const formdata = new FormData();
      // formdata.append("userid" , userdata?.account?.userId);

      formdata.append("userid" , userdata?.auth?.uniqueId);
      formdata.append("image" , image);
      var payload = {
        userid : userdata?.account?.userId,
        image : image
      }
      // console.log('image-----', image, formdata, userdata);
      var result = await updateuserprofilepichooks(formdata);
      // console.log('result------', result);
      if(result?.data?.profileImage){
      toastAlert("success" , "Profileimage updated successfully!");
      result.data.profileImage = config.API_URL + result?.data?.profileImage
      // updateAcctData(result?.data?.data)
      window.location.reload();
      }
      if(result?.status == "failed"){
        toastAlert("error" , "Invalid image");
      }
    }
    // else if(result?.data?.data?.profileImage !== ""){
    //   toastAlert("success" , "Profileimage updated successfully!");
    // }
    else{
      toastAlert("error" , "Profileimage is required!");
    }
  }
  const handleFile = async (e) => {

    let imageFormat = /\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF)$/;

    const { name, files } = e.target;
    let fileSize = files[0].size
    let filesize = Math.round(( fileSize/ 1024));
    const maxsize = 9*1024
    if(filesize > maxsize  ){
      setImgerror("image size is large")
        return false
    }
    else if (filesize > 10000000) {  // 10 MB
      setImgerror("TOO_LARGE")
        return false
    } else if (!imageFormat.test(files[0].name)) {
      setImgerror("INVALID_IMAGE")
        return false
    }
    else{
      setImgerror("")
    }
    setImage(files[0])
    setImageblob(URL.createObjectURL(files[0]));
    // let formData = { ...formValue, ...{ [name]: files[0] } }
    // setFormValue(formData)
    // if (!isEmpty(validateError)) {
    //   setImgerror("")
    // }
}

  return (
    <div className="dashboard_container page_wrap">
      <ScrollToTopOnMount />
      <div className="dashboardMain">
        <div className="dashboardRight afterLoginHeader">
          <Header className="header"
            color="transparent"
            routes={dashboardRoutes}
            brand={<img src={require("../assets/images/logo.png")} alt="logo" className="img-fluid" />}
            rightLinks = {<HeaderLinksAfterlogin />}
            fixed
            changeColorOnScroll={{
              height: 20,
              color: "dark",
            }}
            {...rest} />
          <div className="profileContent userPages px-3">
            <div className="container-fluid p2p_card border-none">
            <img className='spring' src={spring} alt="spring spring11"/>
            <span className="fullgradient"></span>
            <span className="fullgradient1"></span>
            <img src={Images.connect} className='bannerconnect bannerconnect11'/>
              <div className="">
             
                <GridContainer>
             
                  <GridItem xs={12} sm={12} md={5} lg={5}>
                    <h3 className="dash_title login_title_8">{t("PROFILE")}</h3>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={7} lg={7}>
                    <Announcement />
                  </GridItem>
                </GridContainer>
                <div className="table_p2p_section inprofile gk">
                
                  <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" className={clsx({ "active": location.pathname == '/profile' })} href="#Profile">{t("PERSONAL")}</a></li>
                    {/* <li><a data-toggle="tab" className={clsx({ "active": location.pathname == '/bank' })} href="#Bank">{t("Bank")}</a></li> */}
                    <li><a data-toggle="tab" className={clsx({ "active": location.pathname == '/kyc' })} href="#KYC">{t("KYC")}</a></li>
                  </ul>

                  <div class="tab-content">
                    <div id="Profile" class="tab-pane fade in active show">
                      <ProfileDetail />
                      <div className="row align-items-center">
                        <div className="col-lg-12">
                          <h3 className="dash_title mb-3">{t("CONTACT_DETAILS")}</h3>
                        </div>
                      </div>
                      <div className="">
                        <div className="contact_form">
                          <GridContainer>
                            <EmailChange />
                            <PhoneNoChange />
                            <GridItem xs={12} sm={12} md={4} lg={4} className="text-center">
                            {/* src={imageblob ? imageblob : Images.user} */}
                              <img src={imageblob ? imageblob : Images.user} className="mb-3 img-fluid img_prof_runded"/>
                              <div className="d-flex gap-2 justify-content-center align-items-center">
                                <div> <div className="browse brpowe_hover brow_nut_ye">
                                  <input type="file"
                                  onChange={(e) => {
                                    handleFile(e)
                                    // setImage(e?.target?.files[0])
                                    // setImageblob(URL.createObjectURL(e?.target?.files[0]));
                                  }}
                                  ></input>
                                  <button className="themebtn">Choose</button>
                                  </div></div> 
                                  <button className="themebtn" onClick={() => handleupdate()}>Update</button>
                              </div>

                              <p className="text-danger error-message mt-3">{imgerror}</p>

      
                            </GridItem>
                          </GridContainer>
                        </div>

                      </div>
                      <div className='mt-3 reviews' id="reviews">
                            <h5 className='text-light' >Reviews</h5>
                            <ul className='buyborder1 p-3'>
                                {review?.length > 0 ? review?.map((data , i) => 
                                <li class="mb-3">
                                  <h5 class="text-light fw-bold mb-0">UserId :{data?.userId}</h5>
                                  <p class="text-light f-14 roboto mb-0">{data?.description}</p>
                                  <p class="time text-gray roboto f-12">{new Date(parseFloat(data?.date))?.toString()?.slice(4 , 21)}</p>
                                  </li>
                                 ) : <p className="text-center">No Reviews Found!</p>
                                    } 
                            </ul>
                        </div>

                        
                    </div>
                    {/* <div id="Bank" class="tab-pane fade pt-2">
                      <div className="row align-items-center">
                        <div className="col-lg-12">
                          <h3 className="dash_title mb-3">{t("BANK_ACCOUNT_DETAIL")}</h3>
                        </div>
                      </div>
                      <BankAccount />
                    </div> */}
                    <div id="KYC" class="tab-pane fade">
                      <UserKycDetail/>
                      {/* <IDProof /> */}
                      {/* <AddressProof /> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div >

  );
}

export default ProfilePage;