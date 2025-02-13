import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
// import context
import SocketContext from '../components/Context/SocketContext'
// import lib
import { dateTimeFormat, momentFormat } from '../lib/dateTimeHelper';
import { getNotification, unReadNotice, readNotification, noticePopup, readsingelNotification } from '../actions/notificationAction'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Header from "components/Header/Header.js";
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import { Getmessagenotificationhooks } from 'actions/P2PorderAction';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { markasreadallhooks } from 'actions/P2PorderAction';
import { markasreadonehooks } from 'actions/P2PorderAction';

const dashboardRoutes = [];


function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const Messagenotification = () => {
  const socketContext = useContext(SocketContext)
  let dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [messagenotity, setMessagenotify] = useState([]);

  const navigate = useHistory();

  // function
  const fetchNotificationHistory = async () => {
    try {
      const { status, loading, ReadMsg } = await getNotification();
      setLoader(loading)
      if (status == 'success') {
        setData(ReadMsg)
      }
    } catch (err) { }
  }
  const readMess = async (id) => {
    let data = { id: id }
    let { staus, message } = await readsingelNotification(data);
    //noticePopup(dispatch, false);

  };

  const readAllMsg = async () => {
    let { staus, message } = await readNotification();
    noticePopup(dispatch, false);
  };
  useEffect(() => {
    fetchNotificationHistory()
    socketContext.socket.on('read', (data) => {
      setData(data)
    })
    document.title = "TOSSVTOSS"
  }, [socketContext])

  async function fetchdata() {
    var result = await Getmessagenotificationhooks();
    setMessagenotify(result?.data?.data);
  }

  useEffect(() => {
    fetchdata();
  }, [])
  const handlemarkasreadall = async () => {
    var result = await markasreadallhooks();
    fetchdata();
    socketContext.socket.emit('MSG_RD', "new")
  }

  const handlemarkasreadone = async (val) => {
    let data = { id: val }
    var result = await markasreadonehooks(data);
    socketContext.socket.emit('MSG_RD', "new")
    fetchdata();
  }



  return (
    <>

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
            />

            <div className="settingsContent userPages">
              <div className="container">
                <div className="p2p_card p2p_card1 border-none min-h-auto">
                  <div className="container">
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12}>
                        <h3 className="dash_title login_title_8">Message Notifications</h3>
                      </GridItem>

                    </GridContainer>
                    <GridContainer className="new_faq_img_sectio mt-3 notify-table">
                      <GridItem xs={12} sm={10} md={7} lg={12} className="m-auto">
                        <div className='newnotify'>
                          <button className="btn btn-link ml-auto text-capital f-12 py-0 pr-2 shrink-0 pl-2 d-sm-block d-none" onClick={(e) => { handlemarkasreadall() }}>
                            Mark all as read</button>
                          <ul className='pl-0'>
                            {messagenotity && messagenotity.length > 0 ? (
                              <>
                                {messagenotity.map((val, index) => (
                                  <div> <li className={val.isRead ? 'read' : 'unread'} onClick={(e) => { readMess(val._id) }}>
                                    <div className='d-flex align-items-center pl-sm-2'>
                                      <span className='stat mr-2 shrink-0'></span>
                                      <div onClick={() => navigate.push(`/trade/${val?.roomid}`)} className="hover_pou_car">
                                        <p className='f-12 lighttxt descc'>{val.description}</p>
                                        <p className='text-muted f-12 dateformat'>{momentFormat(val.createdAt, 'YYYY-MM-DD HH:mm')}</p>
                                      </div>
                                      <button className='btn btn-link ml-auto text-capital f-12 py-0 pr-2 shrink-0 pl-2 d-sm-block d-none' onClick={(e) => { handlemarkasreadone(val._id) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M374.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7 86.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" /></svg>
                                        Mark as read</button>
                                    </div>
                                  </li>
                                  </div>
                                ))}
                              </>
                            ) : (<p>There is no data</p>)}
                          </ul>
                        </div>
                      </GridItem>
                    </GridContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>



    </>)
}

export default Messagenotification;
