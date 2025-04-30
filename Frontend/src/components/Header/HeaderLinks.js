// import package
import React, { useState, useEffect } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Select, Hidden } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Button, Menu, MenuItem } from "@material-ui/core";

import Images from "Images";
import Profileicon from "../../assets/images/prifileimg.png";
import Dropdown from "react-bootstrap/Dropdown";
// import action
import { logout } from "../../actions/users";
// import { setTradeTheme, setTheme } from '../../actions/commonAction'
import { setTheme } from "../../lib/localStorage";

// import lib
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import isEmpty from "../../lib/isEmpty";
import { setLang, getLang } from "../../lib/localStorage";
import { upperCase } from "../../lib/stringCase";
import config from "../../config/index";

import { Getcoinlisthooks } from "../../actions/P2PorderAction";
const useStyles = makeStyles(styles);

const HeaderLinks = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  // const locationsss =  window.location.pathname
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    document.getElementsByTagName("body")[0].classList.add("padi_over_body");
  };

  const handleClose = () => {
    setAnchorEl(null);
    document.getElementsByTagName("body")[0].classList.remove("padi_over_body");
  };

  useEffect(() => {
    // setTimeout(logout(history, dispatch) , 1800000)
    let data = localStorage.getItem("theme");
    themechange(data);
  }, []);

  // state
  const [langOption, setLangOption] = useState([]);
  const [selLang, setSelLang] = useState("Spanish");

  // redux-state
  const { isAuth } = useSelector((state) => state.auth);
  const language = useSelector((state) => state.language);
  // const themeData = useSelector(state => state.theme);

  const [theme, settheme] = useState(false);

  const [theme1, settheme1] = useState(false);
  const [coinlist, setCoinlist] = useState([]);

  // redux-state
  const accountData = useSelector((state) => state.account);
  const {
    firstName,
    lastName,
    email,
    blockNo,
    address,
    state,
    city,
    postalCode,
    country,
  } = accountData;

  // function
  const handleLanguage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSelLang(value);
    setLang(value);
    console.log("selected lanasdfg" , value);
    
    i18n.changeLanguage(value);
    localStorage.setItem("usr-language" , value)
  };

  const locationsss = window.location.pathname;

  const themechange = (data) => {
    if (data == "dark") {
      document.getElementById("tossxt").classList.add("dark_theme");
      document.getElementById("tossxt").classList.remove("light_theme");
      // this.setState({theme:false})
      // this.state.theme === false
      setTheme("dark");
      settheme(true);
    } else {
      document.getElementById("tossxt").classList.remove("dark_theme");
      document.getElementById("tossxt").classList.add("light_theme");
      // this.state.theme === true
      // this.setState({theme:true})
      setTheme("light");
      settheme(false);
    }
  };

  // const themechange = () =>  {
  //   if (document.getElementById("tossxt").classList.contains("light_theme")) {
  //     document.getElementById("tossxt").classList.add("dark_theme")
  //     document.getElementById("tossxt").classList.remove("light_theme");
  //     // this.setState({theme:false})
  //     // this.state.theme === false

  //     settheme(true)

  //   } else {
  //     document.getElementById("tossxt").classList.remove("dark_theme")
  //     document.getElementById("tossxt").classList.add("light_theme")
  //     // this.state.theme === true
  //     // this.setState({theme:true})
  //     settheme(false)
  //   }
  // }

  useEffect(() => {
    let langs = localStorage.getItem("usr-language")
    i18n.changeLanguage(langs);
    if(langs == "en"){
      setSelLang("en")
    }
    else{
      setSelLang("sp")
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
          setLang(primaryData.code);
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
    fetchcoin();
  }, [language]);

  const fetchcoin = async () => {
    var result = await Getcoinlisthooks();
    console.log("Getcoinlisthooks----", result);
    setCoinlist(result?.data);
  };

  const [selLangg, setSelLangg] = useState("EN");
  const handleLanguagee = (event) => {
    setSelLangg(event.target.value);
  };

  return (
    <div className="home_page_menu beforelog alloffers">
      <Hidden lgUp>
        <div className="showOnlyforUsers">
          {/* <Link to="/spot">{t('SPOT')}</Link> */}
          {/* <Link to="/derivative">{t('DERIVATIVE')}</Link>
          <Link to="/p2p">{t('P2P')}</Link> */}
        </div>
      </Hidden>
      <Hidden smDown className="drream">
        <div className="mobilelog">
          <div>
            {/* {locationsss == "/viewoffers/:id/:id" ? */}
            {/* <div className="d-flex buyss">
             

             
            </div>  */}
            {/* // : ""} */}
            <List className={classes.list + " menu_main_navbar buyss"}>
              <ListItem className={classes.listItem}>
                {/* <Select
                  name="language"
                  value={selLang}
                  onChange={handleLanguage}
                >
                  {
                    langOption && langOption.length > 0 && langOption.map((item, key) => {
                      return (
                        <MenuItem value={item.code}>{upperCase(item.code)}</MenuItem>
                        // <option key={key} value={item.code}>{upperCase(item.code)}</option>
                      )
                    })
                  }
                 
                </Select> */}
{console.log("language option" , langOption)}
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

              {/* <ListItem className={classes.listItem}>
                  <NavLink to="/" exact color="transparent" className="nav-link">{t('HOME')}</NavLink>
                </ListItem> */}

              {
                <Dropdown className="headerdropdown m-left">
                  <Dropdown.Toggle
                    variant="success"
                    className="btcc"
                    id="dropdown-basic"
                  >
                    Buy
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="headerdropdown_heght_fix">
                    {coinlist?.map((data, i) => {
                      var img = "crypt" + (i + 1);
                      return (
                        <Dropdown.Item href={`/viewoffers/Buy/${data?.coin}`}>
                          <img
                            src={`${config.API_URL}/images/currency/${data?.image}`}
                            className="iconss"
                          />{" "}
                          Buy {data?.coin}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              }
              {
                <Dropdown className="headerdropdown m-left">
                  <Dropdown.Toggle
                    variant="success"
                    className="btcc"
                    id="dropdown-basic"
                  >
                    Sell
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="headerdropdown_heght_fix">
                    {coinlist?.map((data, i) => {
                      var img = "crypt" + (i + 1);
                      return (
                        <Dropdown.Item href={`/viewoffers/Sell/${data?.coin}`}>
                          <img
                            src={`${config.API_URL}/images/currency/${data?.image}`}
                            className="iconss"
                          />{" "}
                          Sell {data?.coin}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              }

              {
                <ListItem className={classes.listItem}>
                  <NavLink
                    to="/"
                    exact
                    color="transparent"
                    className="nav-link"
                  >
                    {t("HOME")}
                  </NavLink>
                </ListItem>
              }
              {isAuth && (
                <ListItem className={classes.listItem}>
                  <NavLink
                    to="/userdash"
                    color="transparent"
                    className="nav-link"
                  >
                    Dashboard
                  </NavLink>
                </ListItem>
              )}
              {/* <ListItem className={classes.listItem}>
              <NavLink to="/" color="transparent" className="nav-link">My contract</NavLink>
            </ListItem> */}
              <ListItem className={classes.listItem}>
                <NavLink
                  to="/viewoffers/Buy/BTC"
                  color="transparent"
                  className="nav-link"
                >
                  {" "}
                  Offer
                </NavLink>
              </ListItem>

              {isAuth && (
                <ListItem className={classes.listItem}>
                  <NavLink
                    to="/wallet"
                    color="transparent"
                    className="nav-link"
                  >
                    Wallet
                  </NavLink>
                </ListItem>
              )}
              {/* {
            <ListItem className={classes.listItem}>
              <NavLink to="/spot" color="transparent" className="nav-link">{t('MARKET')}</NavLink>
            </ListItem>

          } */}

              {/* {
            <ListItem className={classes.listItem}>
              <NavLink to="/api-management" color="transparent" className="nav-link">API Key</NavLink>
            </ListItem>

          } */}
              {/* <ListItem className={classes.listItem}>
            <NavLink to="/launchpad" color="transparent" className="nav-link">Launchpad</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/staking" color="transparent" className="nav-link">Staking</NavLink>
          </ListItem> */}
              {/* {
              isAuth && <ListItem className={classes.listItem}>
                <NavLink to="/wallet" color="transparent" className="nav-link">W allet</NavLink>
              </ListItem>
            } */}
              {isAuth && (
                <ListItem className={classes.listItem}>
                  <li className="li_ellipse_menu login_header1 ">
                    <Button
                      aria-controls="profile_menu1"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      {/* <div className="d-flex prof_icon_header"> */}
                      {/* <div> */}
                      <img
                        src={
                          accountData?.profileImage
                            ? accountData?.profileImage
                            : Profileicon
                        }
                        className="prof_icon_header"
                        alt=""
                      />
                      {/* </div> */}
                      {/* </div> */}

                      {/* <i className="fas fa-user"></i> */}
                      {/* <i class="fas fa-ellipsis-h"></i> */}
                    </Button>
                    <Menu
                      id="profile_menu1"
                      className="afterlogin_hr"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <NavLink to="/">
                        <MenuItem className="px-2">
                          <div className="d-flex afterlogin_profile">
                            <div>
                              <img
                                src={
                                  accountData?.profileImage
                                    ? accountData?.profileImage
                                    : Profileicon
                                }
                                alt=""
                              />{" "}
                            </div>
                            <div>
                              <p className="mx-3 mb-0 first">{`${firstName} ${lastName}`}</p>
                              <p className="second mb-0 mx-3">{email}</p>
                            </div>{" "}
                          </div>
                        </MenuItem>
                      </NavLink>
                      <NavLink to="/profile">
                        <MenuItem>
                          <i className="fa fa-user" aria-hidden="true"></i>
                          <span>Profile</span>
                        </MenuItem>
                      </NavLink>
                      <hr />

                      {/* <NavLink to="/"><MenuItem><i className="fa fa-rocket" aria-hidden="true"></i><span>Launchpad</span></MenuItem></NavLink>
                    <hr /> */}
                      {/* <NavLink to="/"><MenuItem><i class="fab fa-stack-exchange"></i><span>Staking</span></MenuItem></NavLink>
                    <hr /> */}
                      <NavLink to="/security">
                        <MenuItem>
                          <i className="fa fa-lock" aria-hidden="true"></i>
                          <span>Security</span>
                        </MenuItem>
                      </NavLink>

                      <hr />
                      <NavLink to="/setting">
                        <MenuItem>
                          <i className="fa fa-cog" aria-hidden="true"></i>
                          <span>Settings</span>
                        </MenuItem>
                      </NavLink>
                      {/* <hr />
                    <NavLink to="/">
                      <MenuItem>
                        <i className="fa fa-key" aria-hidden="true"></i><span>API Key</span>
                      </MenuItem>
                    </NavLink>
                    <hr /> */}
                      {/* <NavLink to="/">
                      <MenuItem>
                        <i className="fa fa-list" aria-hidden="true"></i><span>Orders</span>
                      </MenuItem>
                    </NavLink> */}
                      {/* <hr/> 
                  <MenuItem>
                    <Link to="/referral"><i className="fa fa-users" aria-hidden="true"></i><span>Referral</span></Link>
                  </MenuItem> */}
                      <hr />
                      {/* <MenuItem><Link to="/notification">Notifications</Link></MenuItem> */}
                      <NavLink to="/history">
                        <MenuItem>
                          <i className="far fa-clock"></i>
                          <span>History</span>
                        </MenuItem>
                      </NavLink>
                      <hr />
                      <NavLink to="/support-ticket">
                        <MenuItem>
                          <i
                            className="fa fa-question-circle"
                            aria-hidden="true"
                          ></i>
                          <span>Support</span>
                        </MenuItem>
                      </NavLink>
                      {/* <MenuItem>
                    <Link to="/orders">Orders</Link>
                  </MenuItem> */}
                      {/* <MenuItem><Link to="/api-management">API Management</Link></MenuItem> */}
                      <Link to="#" onClick={() => logout(history, dispatch)}>
                        <MenuItem>
                          <i className="fas fa-sign-out-alt"></i>{" "}
                          <span> Logout</span>
                        </MenuItem>
                      </Link>
                    </Menu>
                  </li>
                </ListItem>
              )}
              {!isAuth && (
                <ListItem className={classes.listItem}>
                  <NavLink
                  exact
                    to="/login"
                    color="transparent"
                    className="nav-link head_log_reg_btn"
                  >
                    {t("LOGIN")}
                  </NavLink>
                </ListItem>
              )}

              {!isAuth && (
                <ListItem className={classes.listItem}>
                  <NavLink
                  exact
                    to="/register"
                    color="transparent"
                    className="nav-link head_log_reg_btn"
                  >
                    {t("REGISTER")}
                  </NavLink>
                </ListItem>
              )}

              {/* <ListItem className={classes.listItem}>
              <img src={require("../../assets/images/Path 84.png")} className="img-fluid langicon" alt="hh" />

            </ListItem> */}

              <ListItem className={classes.listItem}>
                {/* <div className="toggleMode themetoggle" title="toggle dark mode">
          <label>
            <input type="checkbox" checked={themeData == 'light' ? true : false} name="" onClick={() => setTheme(dispatch, themeData == 'light' ? 'dark' : 'light')} />
            <span></span>
          </label>
        </div> */}
                <button
                  className="transbtn theme btn"
                  onClick={() =>
                    themechange(
                      localStorage.getItem("theme") == "dark" ? "light" : "dark"
                    )
                  }
                >
                  <span className={theme ? "fa fa-sun" : "fa fa-moon"}></span>
                </button>
                {/* <Link to="#" className="mode-switch" onClick={switchTheme}>
                <p className="icon-change"></p>
              </Link> */}
              </ListItem>
            </List>
          </div>
        </div>
      </Hidden>
      <div className="inner_page_menu">
        <div className="mobilelog login_header2">
          <Hidden only={["md", "lg", "xl"]}>
            <ul className="list-iline">
              {/* {
             <li>
                <div className="toggleMode" title="toggle dark mode">
                  <label>
                    <input type="checkbox" checked={themeData == 'light' ? true : false} name="" onClick={() => setTheme(dispatch, themeData == 'light' ? 'dark' : 'light')} />
                    <span></span>
                  </label>
                </div>
              </li>
            } */}

              {/*<li>
              <Link to="/derivative">Derivative</Link>
            </li>*/}

              {/* {isAuth && (
                <li>
                  <NavLink to="/wallet" color="transparent">Wal let</NavLink>
                </li>
              )} */}

              {/* <li>
                <NavLink to="/spot" color="transparent" >{t('MARKET')}</NavLink>
              </li> */}

              {/* {
            <ListItem className={classes.listItem}>
              <NavLink to="/" color="transparent" className="nav-link">{t('HOME')}</NavLink>
            </ListItem>

          } */}
              <ListItem className={classes.listItem}>
                {/* <Select
                  name="language"
                  value={selLang}
                  onChange={handleLanguage}
                >
                  {
                    langOption && langOption.length > 0 && langOption.map((item, key) => {
                      return (
                        <option key={key} value={item.code}>{upperCase(item.code)}</option>
                      )
                    })
                  }
                 
                </Select> */}

                <Select value={selLangg} onChange={handleLanguagee}>
                  <MenuItem value="EN">ENGLISH</MenuItem>
                  <MenuItem value="FR">FRENCH</MenuItem>
                </Select>
              </ListItem>

              {
                <Dropdown className="headerdropdown m-left">
                  <Dropdown.Toggle
                    variant="success"
                    className="btcc"
                    id="dropdown-basic"
                  >
                    Buy
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="headerdropdown_heght_fix">
                    {coinlist?.map((data, i) => {
                      var img = "crypt" + (i + 1);
                      return (
                        <Dropdown.Item href={`/viewoffers/Buy/${data?.coin}`}>
                          <img
                            src={`${config.API_URL}/images/currency/${data?.image}`}
                            className="iconss"
                          />{" "}
                          Buy {data?.coin}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              }
              {
                <Dropdown className="headerdropdown m-left">
                  <Dropdown.Toggle
                    variant="success"
                    className="btcc"
                    id="dropdown-basic"
                  >
                    Sell
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="headerdropdown_heght_fix">
                    {coinlist?.map((data, i) => {
                      var img = "crypt" + (i + 1);
                      return (
                        <Dropdown.Item href={`/viewoffers/Sell/${data?.coin}`}>
                          <img
                            src={`${config.API_URL}/images/currency/${data?.image}`}
                            className="iconss"
                          />{" "}
                          Sell {data?.coin}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              }

              <ListItem className={classes.listItem}>
                <NavLink to="/" exact color="transparent" className="nav-link">
                  Home
                </NavLink>
              </ListItem>
              {isAuth && (
                <ListItem className={classes.listItem}>
                  <NavLink
                  exact
                    to="/userdash"
                    color="transparent"
                    className="nav-link"
                  >
                    Dashboard
                  </NavLink>
                </ListItem>
              )}

              {/* <ListItem className={classes.listItem}>
                <NavLink to="/" color="transparent" className="nav-link">My offer</NavLink>
              </ListItem> */}
              <ListItem className={classes.listItem}>
                <NavLink
                exact
                  to="/viewoffers/Buy/BTC"
                  color="transparent"
                  className="nav-link"
                >
                  {" "}
                  Offer
                </NavLink>
              </ListItem>

              {/* <ListItem className={classes.listItem}>
                <NavLink to="/wallet" color="transparent" className="nav-link">Wallet</NavLink>
              </ListItem> */}
              {/* <li>
                <NavLink to="/api-management" color="transparent" >API Key</NavLink>
              </li> */}
              {!isAuth && (
                <li className="logg">
                  <NavLink
                  exact
                    to="/login"
                    color="transparent"
                    className="nav-link head_log_reg_btn"
                  >
                    {t("LOGIN")}
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                exact
                  to="/register"
                  color="transparent"
                  className="nav-link head_log_reg_btn"
                >
                  {t("REGISTER")}
                </NavLink>
              </li>

              {/* <ListItem className={classes.listItem}>
                <img src={require("../../assets/images/Path 84.png")} className="img-fluid langicon" alt="hh" />

              </ListItem> */}

              <ListItem className={classes.listItem}>
                <button
                  className="transbtn theme btn lightleft"
                  onClick={() =>
                    themechange(
                      localStorage.getItem("theme") == "dark" ? "light" : "dark"
                    )
                  }
                >
                  <span className={theme ? "fa fa-sun" : "fa fa-moon"}></span>
                </button>
              </ListItem>
              {/* <ListItem className={classes.listItem}>
        <div className="toggleMode themetoggle" title="toggle dark mode">
          <label>
            <input type="checkbox" checked={themeData == 'light' ? true : false} name="" onClick={() => setTheme(dispatch, themeData == 'light' ? 'dark' : 'light')} />
            <span></span>
          </label>
        </div>
      </ListItem> */}
              {/* {!isAuth && (
                <li>
                  <NavLink to="/register" color="transparent" className="nav-link home_menu_btn">{t('REGISTER')}</NavLink>
                </li>
              )} */}

              {isAuth && (
                <li>
                  <NavLink exact to="/profile">Profile</NavLink>
                </li>
              )}
              {/* {
                isAuth && <li>
                  <NavLink to="/launchpad">Launchpad</NavLink>
                </li>
              } */}
              {/* {
                isAuth &&
                <li>
                  <NavLink to="/staking">Staking</NavLink>
                </li>
              } */}

              {/* {
              isAuth && <li>
                <Link to="/profile">KYC</Link>
              </li>
            } */}

              {isAuth && (
                <li>
                  <NavLink to="/security">Security</NavLink>
                </li>
              )}

              {isAuth && (
                <li>
                  <NavLink to="setting">Settings</NavLink>
                </li>
              )}

              {isAuth && (
                <li>
                  <NavLink to="/support-ticket">Support</NavLink>
                </li>
              )}

              {/* {isAuth && (
              <li>
                <NavLink to="/referral">Referral</NavLink>
              </li>
            )} */}

              {isAuth && (
                <li>
                  <NavLink to="/history">History</NavLink>
                </li>
              )}

              {/* {isAuth && (
                <li>
                  <NavLink to="/orders">Orders</NavLink>
                </li>
              )} */}

              {/* {
              isAuth && <li>
                <Link to="/api-management">API Management</Link>
              </li>
            } */}

              {isAuth && (
                <li>
                  <Link to="#" onClick={() => logout(history, dispatch)}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </Hidden>
        </div>
      </div>
    </div>
  );
};

export default HeaderLinks;
