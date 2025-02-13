// import package
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Hidden, Button, Menu, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { TimeAgo } from "@n1ru4l/react-time-ago";
import SocketContext from "../Context/SocketContext";
import Profileicon from "../../assets/images/prifileimg.png"
import mesicon from "../../assets/images/mesicon.png"

import Dropdown from 'react-bootstrap/Dropdown';
// import action
import { logout } from "../../actions/users";
// import { setTradeTheme, setTheme } from "../../actions/commonAction";
import {setTheme} from "../../lib/localStorage"
// import {
//   SET_UNREAD_NOTICE,
//   UPDATE_NOTICE_POPUP
// } from '../constant';
import Images from 'Images';
import {
  readNotification,
  FetchunReadNotice,
  noticePopup,
} from "../../actions/notificationAction";

//lib
import { momentFormat } from "../../lib/dateTimeHelper";
import isEmpty from "lib/isEmpty";
import { updateuserstatushooks } from "actions/P2PorderAction";
import { Getmessagenotificationhooks } from "actions/P2PorderAction";
import { markasreadallhooks } from "actions/P2PorderAction";
import { socket } from "config/socketConnectivity";
import { Getunreadmessagenotificationhooks } from "actions/P2PorderAction";
import { Checkdeposithooks } from "actions/P2PorderAction";

export default function HeaderLinks1(props) {
  const userdata = localStorage.getItem("userId")
  const dispatch = useDispatch();
  const socketContext = useContext(SocketContext);
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { t, i18n } = useTranslation();
  const [theme, settheme] = useState(false);

  // state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const [anchorElNoti1, setAnchorElNoti1] = React.useState(null);
  const navigate = useHistory();


  // redux state
  const themeData = useSelector((state) => state.theme);
  const { isAuth } = useSelector((state) => state.auth);
  // const [isAuth,setisAuth] = useState(true)
  const { unread, isOpen } = useSelector((state) => state.notice);

  // redux-state
  const accountData = useSelector(state => state.account);
  const { firstName, lastName, email, blockNo, address, state, city, postalCode, country } = accountData;
  const [messagenotify , setMessagenotify] = useState([]);
  const [unreadmsg , setUnreadmsg] = useState(0);
  const [popupdata , setPopupdata] = useState([]);


  useEffect(() => {
    setTimeout(() => {
      if(parseFloat(localStorage.getItem("ActiveTime")+1800000) < Date.now())
      logout(history, dispatch)
    } , 180000)
    let data = localStorage.getItem("theme")
  themechange(data)
  },[])



  // function'
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    document.getElementsByTagName("body")[0].classList.add("padi_over_body");

  };

  const handleClickNotification = async (event, val) => {
    // alert(1);
    if (val == "readall") {
      let { staus, message } = await readNotification();
    }
    setAnchorElNoti(event.currentTarget);
    // document.getElementsByTagName("body")[0].style.overflow ="auto";
    document.getElementsByTagName("body")[0].classList.add("padi_over_body");


  };


  const handleClickNotification1 = async (event, val) => {
    // alert(1);
    if (val == "readall") {
      let { staus, message } = await readNotification();
    }
    setAnchorElNoti1(event.currentTarget);
    // document.getElementsByTagName("body")[0].style.overflow ="auto";
    document.getElementsByTagName("body")[0].classList.add("padi_over_body");


  };
  const locationsss = window.location.pathname

  const handleClose = () => {
    setAnchorEl(null);
    document.getElementsByTagName("body")[0].classList.remove("padi_over_body");

  };


  const handleCloseNotification = () => {
    setAnchorElNoti(null);
    document.getElementsByTagName("body")[0].classList.remove("padi_over_body");

    // document.getElementsByTagName("body")[0].style.overflow ="auto";
    // document.getElementsByTagName("body")[0].style.paddingRight ="0px";

  };

  const handleCloseNotification1 = () => {
    setAnchorElNoti1(null);
    document.getElementsByTagName("body")[0].classList.remove("padi_over_body");

    // document.getElementsByTagName("body")[0].style.overflow ="auto";
    // document.getElementsByTagName("body")[0].style.paddingRight ="0px";

  };





  const readAllMsg = async () => {
    let { staus, message } = await readNotification();
    noticePopup(dispatch, false);
  };

  const closeBox = (event) => {
    // event.stopPropogation();
    noticePopup(dispatch, true);
  };

  // document.getElementsByTagName("body")[0].onclick(function(event)
  // {
  // });

  const themechange = (data) => {
    if (data == "dark") {
    
      document.getElementById("tossxt").classList.add("dark_theme")
      document.getElementById("tossxt").classList.remove("light_theme");
      // this.setState({theme:false})
      // this.state.theme === false
      setTheme('dark')
      settheme(true)

    } else {
      document.getElementById("tossxt").classList.remove("dark_theme")
      document.getElementById("tossxt").classList.add("light_theme")
      // this.state.theme === true
      // this.setState({theme:true})
      setTheme('light')
      settheme(false)
    }

  }

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
    socketContext.socket.on("notice", (result) => {
      FetchunReadNotice(dispatch, result);
    });

    socketContext.socket.on("MSG_RD", () => {
      fetchdata();
    });
  }, [socketContext.socket]);

  useEffect(() => {
    return () => {
      if (isOpen) {
        readAllMsg();
      }
    };
  }, [isOpen]);


  useEffect(() => {
    socket.on('messagenotice' , (data) =>{
      fetchdata();
    })
    // socket.on('MSG_RD' , ()=>{
    //   fetchdata();
    // })
    
  },[socket])

  useEffect(()=>{
    
    fetchdata();
  } , []);
  async function fetchdata(){
    var result = await Getmessagenotificationhooks();
    var unreadresult = await Getunreadmessagenotificationhooks();
    var unreaddata = unreadresult?.data?.data;
    setUnreadmsg(unreaddata?.length)
    setPopupdata(unreaddata)
    setMessagenotify(result?.data?.data);
    // let checkdeposit  = await Checkdeposithooks();
  }

  const handlemarkasreadall = async()=>{
    var result = await markasreadallhooks();
    fetchdata();
  }

  return (
    <div>
    <div className="inner_page_menu">
      {/* <div className="">
                <NavLink to="/viewoffer">Hari</NavLink>
              </div> */}
      <div className="dashboard_login">
      {/* {locationsss == "/viewoffer"  ?
              <div className="d-flex buyss">
                

               
              </div> : ""} */}

              

        <Hidden smDown>
          <ul className="list-iline">
          {locationsss == "/viewoffer" ? <> 
           {isAuth && (<Dropdown>
                  <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
                    Buy
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1"><img src={Images.crypt1} className="iconss" /> Buy BTC</Dropdown.Item>
                    <Dropdown.Item href="#/action-2"><img src={Images.crypt2} className="iconss" /> Buy ETH</Dropdown.Item>
                    <Dropdown.Item href="#/action-3"><img src={Images.crypt3} className="iconss" /> Buy USDT</Dropdown.Item>
                    <Dropdown.Item href="#/action-3"><img src={Images.crypt4} className="iconss" /> Buy RIPPLE</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
          )}
  {isAuth && (
     <Dropdown className="m-left">
     <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
       Sell
     </Dropdown.Toggle>

     <Dropdown.Menu>
     <Dropdown.Item href="#/action-1"><img src={Images.crypt1} className="iconss" /> Sell BTC</Dropdown.Item>
       <Dropdown.Item href="#/action-2"><img src={Images.crypt2} className="iconss" /> Sell ETH</Dropdown.Item>
       <Dropdown.Item href="#/action-3"><img src={Images.crypt3} className="iconss" /> Sell USDT</Dropdown.Item>
       <Dropdown.Item href="#/action-3"><img src={Images.crypt4} className="iconss" /> Sell RIPPLE</Dropdown.Item>
     </Dropdown.Menu>
   </Dropdown> 
          )} </>: ""}
          
            {isAuth && (
              <li>
                <NavLink to="/userdash">{t("DASHBOARD")}</NavLink>
              </li>
            )}
            {isAuth && (
              <li>
                <NavLink to="/viewoffers/Buy/BTC">Offer</NavLink>
              </li>
            )}

            {/* {isAuth && (
              <li>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </li>
                 )} */}
            {/* {
              <li>
                <NavLink to="/spot">{t("MARKET")}</NavLink>
              </li>
            } */}
            {/* {
              <li>
                <NavLink to="/api-management">API Key</NavLink>
              </li>
            } */}
            {isAuth && (
              <li>
                <NavLink to="/wallet">{t("WALLET")}</NavLink>
                {/* <Link to="/walletnew">Wallet</Link> */}
              </li>
            )}
            
            {/* {isAuth && (
              <li>
                <NavLink to="/launchpad">Launchpad</NavLink>
                
              </li>
            )} */}
            {/* {
              isAuth && <li>
                <NavLink to="/staking">{t('STAKING')}</NavLink>
              </li>
            } */}

            {isAuth && (
              <>
                <li className="noti_parent_po notiification_link_for_web">
                  {unread && unread.length > 0 ? (
                    <span className="notify_count">
                      {unread && unread.length}
                    </span>
                  ) : null}
                  {isOpen == false ? (
                    // <Button
                    //   class="btn btnNotification"
                    //   type="button"
                    //   data-toggle="collapse"
                    //   data-target="#notificationDropdown"
                    //   onClick={closeBox}
                    //   aria-expanded="false"
                    //   aria-controls="notificationDropdown"
                    // >
                    <Button
                      aria-controls="notificationDropdown"
                      aria-haspopup="true"
                      onClick={handleClickNotification}
                    >
                      <i className="fas fa-bell"></i>
                    </Button>
                  ) : (
                    <Button
                      aria-controls="notificationDropdown"
                      aria-haspopup="true"
                      onClick={() => { handleClickNotification("readall") }}
                    >
                      <i className="fas fa-bell"></i>
                    </Button>
                  )}
                  <Menu
                    id="notificationDropdown"
                    className="afterlogin_hr"
                    anchorEl={anchorElNoti}
                    keepMounted
                    open={Boolean(anchorElNoti)}
                    onClose={handleCloseNotification}
                  >
                    <div className="notificationDropdown noti_child_po">
                      {!isEmpty(unread) && unread.length > 0 ? (
                        <>
                          <div className="text-right">
                            <button onClick={() => { readAllMsg() }} className="mark_read_link mark_read_link_new">Mark all as read </button>
                          </div>
                          <ul>
                            {unread &&
                              unread.length > 0 &&
                              unread.map((item) => {
                                return (
                                  <li onClick={() => {
                                    if(item?.description == "You received one review"){
                                      window.location.href = window?.location?.origin +"/profile#reviews";
                                    }
                                  }}>
                                    <p>
                                      {/* <TimeAgo date={new Date(item.createdAt)}>
                                      {({ value }) => value}
                                    </TimeAgo> */}
                                    </p>
                                    <h5>{item.description}</h5>
                                  </li>
                                );
                              })}
                          </ul>
                        </>
                      ) : (
                        <>
                          <ul>
                            <li className="nomore_ul_li">
                              <h5>No more unread Notifications ...</h5>
                            </li>
                          </ul>
                        </>
                      )}

                      <p className="text-center pb-3 pt-2">
                        <Link to="/notification" className="all_noti_link_green all_noti_link_green_new">All Notifications</Link>
                        {/* <Link to="/" className="all_noti_link_green">All Notifications</Link> */}
                      </p>
                    </div>

                  </Menu>

                </li>

                {/* <li className="notiification_link_for_mob">
                  <a href="/notification">Notifications</a>
                </li> */}

                {/* <li className="notiification_link_for_mob">
                  <a href="/notification">Messages</a>
                </li> */}

               
              </>
            )}



{isAuth && (
              <>
                <li className="noti_parent_po notiification_link_for_web">
                  {unreadmsg && unreadmsg> 0 ? (
                    <span className="notify_count">
                      {unreadmsg && unreadmsg}
                    </span>
                  ) : null}
                  {isOpen == false ? (
                    // <Button
                    //   class="btn btnNotification"
                    //   type="button"
                    //   data-toggle="collapse"
                    //   data-target="#notificationDropdown"
                    //   onClick={closeBox}
                    //   aria-expanded="false"
                    //   aria-controls="notificationDropdown"
                    // >
                    <Button
                      aria-controls="notificationDropdown1"
                      aria-haspopup="true"
                      onClick={handleClickNotification1}
                    >
                  <img src={mesicon} className="mes_icon_header"  />

                      {/* <i className="fas fa-message"></i> */}
                    </Button>
                  ) : (
                    <Button
                      aria-controls="notificationDropdown1"
                      aria-haspopup="true"
                      onClick={() => { handleClickNotification1("readall") }}
                    >
                  <img src={mesicon} className="mes_icon_header"  />

                      {/* <i className="fas fa-message"></i> */}
                    </Button>
                  )}
                  <Menu
                    id="notificationDropdown1"
                    className="afterlogin_hr"
                    anchorEl={anchorElNoti1}
                    keepMounted
                    open={Boolean(anchorElNoti1)}
                    onClose={handleCloseNotification1}
                  >
                    <div className="notificationDropdown noti_child_po">
                      {!isEmpty(popupdata) && popupdata.length > 0 ? (
                        <>
                          <div className="text-right">
                            <button onClick={() => { handlemarkasreadall() }} className="mark_read_link mark_read_link_new">Mark all as read </button>
                          </div>
                          <ul>
                            {popupdata &&
                              popupdata.length > 0 &&
                              popupdata.map((item , i) => {
                                if(i<5){
                                  return (//navigate.push(`/trade/${item?.roomid }`)
                                    <div onClick={()=> window.location.href = window.location.origin + `/trade/${item?.roomid}`}>
                                    <li>
                                      <p>
                                        {/* <TimeAgo date={new Date(item.createdAt)}>
                                        {({ value }) => value}
                                      </TimeAgo> */}
                                      </p>
                                      <h5>{item.description}</h5>
                                    </li></div>
                                  );
                                }
                              })}
                          </ul>
                        </>
                      ) : (
                        <>
                          <ul>
                            <li className="nomore_ul_li">
                              <h5>No more unread Notifications ...</h5>
                            </li>
                          </ul>
                        </>
                      )}

                      <p className="text-center pb-3 pt-2">
                        <Link to="/message-notification" className="all_noti_link_green all_noti_link_green_new">All Messages</Link>
                        {/* <Link to="/" className="all_noti_link_green">All Notifications</Link> */}
                      </p>
                    </div>

                  </Menu>

                </li>

                <li className="notiification_link_for_mob">
                  <a href="/notification">Notifications</a>
                </li>

                <li className="notiification_link_for_mob">
                  <a href="/message-notification">Messages</a>
                  {/* <a href="/">Notifications</a> */}
                </li>
              </>
            )}



            {isAuth && (
              <li className="li_ellipse_menu ">
                <Button
                  aria-controls="profile_menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  {/* <div className="d-flex prof_icon_header"> */}
                  {/* <div> */}
                  <img src={accountData?.profileImage ? accountData?.profileImage : Profileicon} className="prof_icon_header"  />
                  {/* alt="profileicon" */}
                  {/* </div> */}
                  {/* </div> */}

                  {/* <i className="fas fa-user"></i> */}
                  {/* <i class="fas fa-ellipsis-h"></i> */}
                </Button>
                <Menu
                  id="profile_menu"
                  className="afterlogin_hr"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                  <NavLink to="/profile"><MenuItem className="px-2">
                    <div className="d-flex afterlogin_profile"><div><img src={accountData?.profileImage ? accountData?.profileImage : Profileicon}  /> </div><div><p className="mx-3 mb-0 first">{`${firstName} ${lastName}`}</p>
                      <p className="second mb-0 mx-3">{email}</p></div> </div>
                      {/* alt="profileicon" */}
                  </MenuItem></NavLink>

                  <NavLink to="/profile">
                    <MenuItem>
                      <i className="fa fa-user" aria-hidden="true"></i><span>Profile</span>
                    </MenuItem>
                  </NavLink>
                  <hr />
                  {/* <NavLink to="/launchpad"><MenuItem><i className="fa fa-rocket" aria-hidden="true"></i><span>Launchpad</span></MenuItem></NavLink> */}
                  {/* <hr/>  */}
                  {/* <NavLink to="/staking"><MenuItem><i class="fab fa-stack-exchange"></i><span>Staking</span></MenuItem></NavLink> */}
                  {/* <hr/>  */}
                  <NavLink to="/security"><MenuItem>
                    <i className="fa fa-lock" aria-hidden="true"></i><span>Security</span>
                  </MenuItem></NavLink>

                  <hr />
                  <NavLink to="/setting">
                    <MenuItem>
                      <i className="fa fa-cog" aria-hidden="true"></i><span>Settings</span>
                    </MenuItem>
                  </NavLink>
                  <hr />
                  {/* <NavLink to="/api-management">
                  <MenuItem>
                    <i className="fa fa-key" aria-hidden="true"></i><span>API Key</span>
                  </MenuItem>
                  </NavLink> */}

                  {/* <hr/>  */}
                  {/* <NavLink to="/orders">
                  <MenuItem>
                    <i className="fa fa-list" aria-hidden="true"></i><span>Orders</span>
                  </MenuItem>
                  </NavLink> */}
                  {/* <hr/> 
                  <MenuItem>
                    <Link to="/referral"><i className="fa fa-users" aria-hidden="true"></i><span>Referral</span></Link>
                  </MenuItem> */}
                  {/* <hr/>  */}
                  {/* <MenuItem><Link to="/notification">Notifications</Link></MenuItem> */}
                  <NavLink to="/history"><MenuItem>
                    <i className="far fa-clock"></i><span>History</span>
                  </MenuItem>
                  </NavLink>
                  <hr />
                  <NavLink to="/support-ticket">
                    <MenuItem>
                      <i className="fa fa-question-circle" aria-hidden="true"></i><span>Support</span>
                    </MenuItem>
                  </NavLink>
                  {/* <MenuItem>
                    <Link to="/orders">Orders</Link>
                  </MenuItem> */}
                  {/* <MenuItem><Link to="/api-management">API Management</Link></MenuItem> */}
                  <Link to="#" onClick={() => logout(history, dispatch)}>
                    <MenuItem>

                      <i className="fas fa-sign-out-alt"></i> <span> Logout</span>

                    </MenuItem>
                  </Link>
                </Menu>
              </li>
            )}

            {


              <li>
                {/* <div className="toggleMode" title="toggle dark mode">
                  <label>
                    <input type="checkbox" checked={themeData == 'light' ? true : false} name="" onClick={() => setTheme(dispatch, themeData == 'light' ? 'dark' : 'light')} />
                    <span></span>
                  </label>
                </div> */}
                <button className='transbtn theme btn lightleft' onClick={() => themechange(localStorage.getItem("theme") == "dark" ? "light" : "dark")}><span className={theme ? 'fa fa-sun' : 'fa fa-moon'} ></span></button>
              </li>
            }
          </ul>
        </Hidden>
        <Hidden only={["md", "lg", "xl"]}>

          <ul className="list-iline">
            {
              <li>
                {/* <div className="toggleMode" title="toggle dark mode">
                  <label>
                    <input type="checkbox" checked={themeData == 'light' ? true : false} name="" onClick={() => setTheme(dispatch, themeData == 'light' ? 'dark' : 'light')} />
                    <span></span>
                  </label>
                </div> */}
                <button className='transbtn theme btn lightleft' onClick={() => themechange(localStorage.getItem("theme") == "dark" ? "light" : "dark")}><span className={theme ? 'fa fa-sun' : 'fa fa-moon'} ></span></button>
              </li>
            }

            {/* <li>
              <NavLink to="/spot">Spot</NavLink>
            </li>
            <li>
              <NavLink to="/api-management">API Key</NavLink>
            </li> */}
            {/*<li>
              <Link to="/derivative">Derivative</Link>
            </li>*/}

            {isAuth && (
              <li>
                <NavLink to="/userdash">Dashboard</NavLink>
              </li>
            )}

            {isAuth && (
              <li>
                <NavLink to="/viewoffers/Buy/BTC">Offer</NavLink>
                {/* <Link to="/walletnew">Wallet</Link> */}
              </li>
            )}

            {/*{
              isAuth && <li>
                <Link to="/p2p">P2P</Link>
              </li>
            }*/}
            {isAuth && (
              <li>
                <NavLink to="/wallet">Wallet</NavLink>
                {/* <Link to="/walletnew">Wallet</Link> */}
              </li>
            )}


            {isAuth && (
              <>
              <li>
                <NavLink to="/notification">Notifications</NavLink>
                {/* <NavLink to="/">Notifications</NavLink> */}
              </li>

               <li>
                <NavLink to="/message-notification">Messages</NavLink>
                {/* <NavLink to="/">Notifications</NavLink> */}
              </li>
              </>
            )}

            {isAuth && (
              <li>
                <NavLink to="/profile">Profile</NavLink>
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
                <Link to="#" onClick={async() => {var time = Date.now().toString();
            var payload = {userid : userdata , status : time}
            var result = await updateuserstatushooks(payload);
            logout(history, dispatch)
            }}>
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
}
