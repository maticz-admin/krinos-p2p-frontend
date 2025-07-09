// import package
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

// import component
import Header from "components/Header/Header.js";
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import WalletList from '../components/WalletList/WalletList'
import WalletBalance from '../components/WalletBalance/WalletBalance';
import Footer from "../components/Footer/Footer"
import { useState } from "react";
// import { useTranslation } from "react-i18next";



const dashboardRoutes = [];

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title="KrinosP2P"
  }, []);
  return null;
}

async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); } 
function getWallet(t){
  console.log("sleepppppp");
  // setShow(show+1)
    sleep(2000).then(() => {
            return( <> <h3>{t("WALLET_BAL")}</h3>
                  <WalletBalance trans = {t}/> </>)
    });
                  
}
 

const WalletPage = (props) => {

  const { ...rest } = props;
  const [show , setShow]= useState(1) 

  
  const { t, i18n } = useTranslation();

//   useEffect(() => {
//   const timeoutId = setTimeout(() => {
//     setShow(prev => prev + 1); // safer way to update state based on previous value
//   }, 100);

//   return () => {
//     clearTimeout(timeoutId); // this stops the timeout if the component unmounts or effect re-runs
//   };
// }, []);


  return (
    <div className="dashboard_container page_wrap">
      <ScrollToTopOnMount />
      <div className="dashboardMain">
        <div className="dashboardRight afterLoginHeader">
          <Header className="header"
            color="transparent"
            routes={dashboardRoutes}
            brand={<img src={require("../assets/images/logo.png")} alt="logo" className="img-fluid" />}
            rightLinks={<HeaderLinksAfterlogin />}
            fixed
            changeColorOnScroll={{
              height: 20,
              color: "dark",
            }}
            {...rest} />
          <div className="profileContent userPages padin_p2p">
            <div className="container-fluid">
              <GridContainer>
                <GridItem xs={12} sm={12} lg={12} xl={12}>
                  {/* {
                   
                   getWallet(t)
          } */}

          {/* {show && <WalletBalance trans = {t}/>} */}
        <WalletBalance trans = {t}/>
          
          <></>
                </GridItem>
                <WalletList trans = {t}/>
              </GridContainer>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;