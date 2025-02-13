import React, { useEffect } from "react";
import Images from './../Images';
import spring from "../assets/images/toss/bannerbg.png";
// import component
import Header from "components/Header/Header.js";
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import TransactionHistory from '../components/TransactionHistory';
import Footer from "components/Footer/Footer.js";

const dashboardRoutes = [];

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title="TOSSVTOSS"
  }, []);
  return null;
}

const HistoryPage = (props) => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { ...rest } = props;

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
          <div className="dashboardContent userPages">
          <img className='spring' src={spring} alt="spring spring11"/>
            <span className="fullgradient"></span>
            <span className="fullgradient1"></span>
            <img src={Images.connect} className='bannerconnect bannerconnect11'/>
            <TransactionHistory />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;