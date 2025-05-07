import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Button, List, ListItem, MenuItem, Select } from "@material-ui/core";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import styles from "assets/jss/material-kit-react/components/headerStyle.js";
import { Link } from "react-router-dom";
import { Dropdown, NavLink } from "react-bootstrap";

import AcceptOfferModal from "assets/jss/material-kit-react/views/Modals/AcceptOfferModal";
import DeclineOfferModal from "assets/jss/material-kit-react/views/Modals/DeclineOfferModal";
import { socket } from "config/socketConnectivity";
import { useSelector } from "react-redux";
import { GetUserId } from "lib/userdata";
import isEmpty from "is-empty";
import { getLang } from "lib/localStorage";
import { setLang } from "lib/localStorage";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const userdata = useSelector((state) => state);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isacceptoffermodal, setIsacceptoffermodal] = useState(false);
  const [isdeclineoffermodal, setIsdeclineoffermodal] = useState(false);
  const [offerdata, setOfferdata] = useState({});
  const [declinedata , setDeclinedata] = useState({});
  const [selLang, setSelLang] = useState("Spanish");

  const routeMatch = useRouteMatch();
  const { t, i18n } = useTranslation();
  const language = useSelector((state) => state.language);
  const [langOption, setLangOption] = useState([]);
  // const [selLang, setSelLang] = useState("Spanish");




  const handleLanguage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSelLang(value);
    setLang(value);
    console.log("selected lanasdfg" , value);
    
    i18n.changeLanguage(value);
    localStorage.setItem("usr-language" , value)
  };


  useEffect(() => {
    let langs = localStorage.getItem("usr-language")
    console.log("langslangsheader" , langs , langs == "en");
    
    if(langs == "en"){
      setSelLang("en")
      i18n.changeLanguage("en");
    }
    else{
      setSelLang("sp")
      i18n.changeLanguage("sp");
    }
    if (!isEmpty(language)) {
      setLangOption(language);
      let lang = getLang();
      // console.log("language on header" , lang);
      if (isEmpty(lang)) {
        let primaryData =
          language &&
          language.length > 0 &&
          language.find((el) => el.isPrimary == true);
        if (primaryData) {
          // setSelLang(primaryData.code);
          // setLang(primaryData.code);
          // i18n.changeLanguage(primaryData.code);
        }
      } else {
        // setSelLang(lang);
      }
    }
    else{
      setLangOption([{
        "name" : "English",
        "code" : "en",
        "isPrimary" : true,
        "status" : "active"
    },
    {
        "name" : "Spanish",
        "code" : "sp",
        "isPrimary" : true,
        "status" : "active"
    }])
    }
    // fetchcoin();
  }, [language]);



  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  }, []);

  useEffect(() => {
    socket.on("REQUEST", (data) => {
      console.log("REQUESTdata" , data , );
      if (data?.ordercreator == GetUserId()) {
        setOfferdata(data);
        setIsacceptoffermodal(true);
      }
    });

    socket.on("DECLINE", (data) => {
      console.log("DECLINE data" , data);
      
      if (GetUserId() === data?.user) {
        setDeclinedata(data);
        setIsdeclineoffermodal(true);
      }
    });

    socket.on("messagenotice", (data) => {});
  }, [socket]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;

  console.log("rightlink", rightLinks);

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  const brandComponent = (
    <>
      <Link to="/" className="logo_div ">
        {/* {brand} */}
        <img
          src={require("../../assets/images/logo.png")}
          alt="logo"
          className="img-fluid black"
        />
        <img
          src={require("../../assets/images/blck.png")}
          alt="logo"
          className="img-fluid white"
        />
      </Link>
    </>
  );

  const viji = (
    <>
      <button>kjhdgu</button>
    </>
  );

  return (
    <>
      {isacceptoffermodal && (
        <AcceptOfferModal
          onDismiss={() => {
            setIsacceptoffermodal(false);
          }}
          offer={offerdata}
        />
      )}
      {isdeclineoffermodal && (
        <DeclineOfferModal
          onDismiss={() => setIsdeclineoffermodal(false)}
          offer={declinedata}
        />
      )}

      <AppBar className={appBarClasses + " " + " common_header"}>
        <Toolbar className={classes.container + " container-fluid-full"}>
          {leftLinks !== undefined ? brandComponent : null}
          <div className={classes.flex + " jhdgj"}>
            {leftLinks !== undefined ? (
              <Hidden smDown implementation="css">
                {leftLinks}
              </Hidden>
            ) : (
              brandComponent
            )}

            <Hidden mdDown>
              <div className="showOnlyforUsers">
                {/* <Link to={routeMatch.path === "/spot/:tikerRoot?" ? routeMatch.url : "/spot"}>{t('SPOT')}</Link> */}
                
                {/* <Link to="/derivative">{t('DERIVATIVE')}</Link>
            <Link to="/p2p">{t('P2P')}</Link> */}
              </div>
            </Hidden>
          </div>
          <Hidden mdDown implementation="css">
            {rightLinks}
          </Hidden>

          <Hidden smDown className="drream">
        {/* <div className="mobilelog"> */}
         
            
            <List className={classes.list + " menu_main_navbar buyss"}>
              <ListItem className={classes.listItem}>
               

                <Select
                name="language"
                value={selLang}
                onChange={handleLanguage}
                >

                  {langOption && langOption.length > 0 && langOption.map((item, key) => {
                      return (
                        <MenuItem value={item?.code}>{item?.name}</MenuItem>
                      )
                    })}
                </Select>
              </ListItem>

              
            </List>
          
        {/* </div> */}
      </Hidden>


          <Hidden lgUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className="hamburger_btn"
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden lgUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper + " mobile_nav",
            }}
            onClose={handleDrawerToggle}
          >
            <div className={classes.appResponsive}>
              <div className="hidden_nav_logo">
                <img
                  src={require("../../assets/images/logo.png")}
                  alt="logo"
                  className="img-fluid black imgSrc"
                />
                <img
                  src={require("../../assets/images/blck.png")}
                  alt="logo"
                  className="img-fluid white imgSrc"
                />
              </div>
              {leftLinks}
              {rightLinks}
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
    </>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};
