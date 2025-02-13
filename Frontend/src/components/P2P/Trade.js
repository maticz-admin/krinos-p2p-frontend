import Images from "Images";
import Header from "components/Header/Header";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import HeaderLinks1 from "components/Header/HeaderLinksAfterlogin";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Getorderchathook, Getsingleuserhook, canceltradehook, getcurrencydatahooks, updateAssethooks, updateorderstatushooks } from "../../actions/P2PorderAction";
import Countdown from 'react-countdown'
import { useRef } from "react";

import config from "../../config/index";
import { socket } from "../../config/socketConnectivity";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { toastAlert } from 'lib/toastAlert';



import Takeatourmodal from "./Modal/Takeatourmodal";
import Canceltrademodal from "./Modal/Canceltrademodal";
import Reviewmodal from "./Modal/Reviewmodal"
import { userStatus } from "lib/displayStatus";

const dashboardRoutes = [];
const Trade = (props) => {
  const { ...rest } = props;
  const userdata = useSelector(state => state);
  const location = useLocation();
  const navigate = useHistory();
  const [owner, setOwner] = useState({});
  const [offerdata, setOfferdata] = useState({});
  const [tradechat, setTradechat] = useState({});
  const [user, setUser] = useState({});
  const [newmessage, setNewmessage] = useState("");
  const [chatroomid, setChatroomid] = useState("");
  const [image, setImage] = useState("");
  const [imageblob, setImageblob] = useState("");

  const [offerheader, setOfferheader] = useState(true);
  const [canceltrade, setCanceltrade] = useState(true);
  const [roomid, setRoomid] = useState(window.location.pathname.split('/')[2]?.toString());
  const [tour, setTour] = useState(false);
  const [cancelmodal, setCancelmodal] = useState(false);
  const [review, setReview] = useState(false);
  const [spenderdata, setSpenderdata] = useState({});
  const [reviewtype, setReviewtype] = useState("");
  const [positive, setPositive] = useState("");
  const [negative, setNegative] = useState("");
  const [userstatus, setUserstatus] = useState("Offline")
  const [useadmin, setUseadmin] = useState(false);
  const [coindata, setCoindata] = useState({});
  const [userdatas, setUserdatas] = useState({});
  const [spenderuserdata, setSpenderuserdata] = useState({});

  const [lastseendata, setLastseendata] = useState(Date.now().toString());
  const [tag, setTag] = useState({});

  // const socket = useRef();

  const handleonset = (data) => {
    setOwner(data);
    var pos = data?.reviews?.filter(e => e?.reviewtype == "positive").length;
    var neg = data?.reviews?.filter(e => e?.reviewtype == "negative").length;
    setPositive(pos);
    setNegative(neg);
  }


  const fetchdata = async () => {
    setUser(userdata?.account);
    var payload = { roomid: roomid }
    const chatresult = await Getorderchathook(payload);
    if (chatresult?.data?.type == "success") {
      var tradedata = chatresult?.data?.data[0]; //? chatresult?.data?.data : {}
      setTradechat(tradedata)
      setOfferdata(tradedata?.tradedata);
      var ref = {
        roomid: tradedata?.roomid,
        from: atob(localStorage.getItem("xyz_cache"))
      }
      setTag(ref);
      // setOwner(tradedata?.owner[0]);
      handleonset(tradedata?.owner[0]);
      var spender = tradedata?.tradedata?.spenderid?.find(e => e?.ref == tradedata?._id);
      setSpenderdata(spender);
      var coindata = await getcurrencydatahooks({ coin: tradedata?.tradedata?.coin });
      if (coindata?.data?.type == "success") {
        setCoindata(coindata?.data?.data)
      }
      let userpayload = {
        userid: tradedata?.spender  //userdata?.account?.userId //redux usr data
      }
      var userresult = await Getsingleuserhook(userpayload);
      if (userresult?.data?.type == "success") {
        setUserdatas(userresult?.data?.data);
        var tradedata = chatresult?.data?.data[0];
        if (userresult?.data?.data?.level == "1" || userresult?.data?.data?.userId == tradedata?.spender || userresult?.data?.data?.userId == tradedata?.ordercreator) {
        }
        else {
          // navigate.push("/viewoffers/Buy/BTC")
        }
        // setUser(userresult?.data?.data);
      }
    }
  }




  useEffect(() => {
    fetchdata();
  }, []);

  // useEffect(() => {
  //   setInterval(fetchdata , 60000);
  // },[])

  const handleSend = () => {
    if (newmessage || image) {
      let payload = {
        from: userdata?.account?.userId, //user?.userId,
        to: tradechat?.ordercreator == userdata?.account?.userId ? tradechat?.spender : tradechat?.ordercreator,
        message: newmessage,
        time: Date.now()?.toString(),
        roomid: roomid,
        image: image
      };
      socket.emit("SENDMESSAGE", payload);
    }
  }

  const handlecancel = async () => {
    let payload = {
      id: tradechat?._id
    }
    var result = await canceltradehook(payload);
    if (result?.data?.type == "success") {
      setTradechat(result?.data?.data);
      toastAlert("success", "Cancelled Successfully");
      await fetchdata()
    }
  }

  const handlepaid = async () => {
    var payload = {
      id: tradechat?._id,
      status: "paid"
    }
    var result = await updateorderstatushooks(payload);
    if (result?.data?.type == "success") {
      setOfferdata(result?.data?.data);
      toastAlert("success", "Paid Successfully");
    }
  }

  const handleconfirm = async () => {
    var payload = {
      id: tradechat?._id,
      status: "confirm"
    }
    var ownr = offerdata?.ordertype == "Sell" ? offerdata?.createrid : spenderdata?.spender;
    var receiver = offerdata?.ordertype == "Sell" ? spenderdata?.spender : offerdata?.createrid;
    var ownerbalance = spenderdata?.receive;//offerdata?.ordertype == "Sell" ? parseFloat(spenderdata?.pay)+parseFloat(spenderdata?.adminfee)  : parseFloat(spenderdata?.receive) + parseFloat(spenderdata?.adminfee)
    var spenderbalance = spenderdata?.receive;//offerdata?.ordertype == "Sell" ? parseFloat(spenderdata?.receive) : parseFloat(spenderdata?.pay)
    var assetpayload = {
      ownerid: ownr,
      spenderid: receiver,
      adminid: "",
      ownerbalance: ownerbalance,
      spenderbalance: spenderbalance,
      adminbalance: spenderdata?.adminfee,
      coin: offerdata?.coin,
      roomid: tradechat?.roomid
    };
    console.log('assetpayload-----', assetpayload)
    var assetupdate = await updateAssethooks(assetpayload);
    var result = await updateorderstatushooks(payload);
    // var assetupdateresult = 
    if (result?.data?.type == "success") {
      setOfferdata(result?.data?.data);
      toastAlert("success", "Transferred Successfully");
      fetchdata();
    }
  }

  const handlereject = async () => {
    var payload = {
      id: tradechat?._id,
      status: "reject"
    }
    var result = await updateorderstatushooks(payload);
    if (result?.data?.type == "success") {
      toastAlert("success", "Rejected Successfully");
      setOfferdata(result?.data?.data);
    }
  }

  // socket.emit('USERSTATUS', () => {
  //   setTimeout(function() {
  //    PlayerSlotActions.updatePlayerAmount({
  //      playerAmount : data.cardCount,
  //      position     : data.position,
  //    });
  //  }, 5000);
  // });
  // setTimeout(socket.emit("PING" , tag , tradechat?.roomid), 1000)

  // setTimeout(socket.emit('CHECKPING' , tag) , 5000)
  // setTimeout(setUserstatus("Offline") , 5000);
  useEffect(() => {
    const dataID = setInterval(() => {
      socket.emit('CHECKPING', {
        roomid: window.location.pathname.split("/")[2],
        from: atob(localStorage.getItem("xyz_cache"))
      })
    }, 5000)
    // setTimeout(setUserstatus("Offline") , 5000);
    // socket.current = io(config.SOCKET_URL);
    // if(!tradechat){
    if (userdata?.account?.userId) {
      // const data = {
      //   roomid : tradechat?.roomid ? tradechat?.roomid : Date.now().toString(),
      //   creater :  location?.state?.state?.tradedata?.createrid,
      //   spender : userdata?.account?.userId,
      //   orderid :location?.state?.state?.tradedata?.orderid,
      // }
      // var roomid = tradechat?.roomid ? tradechat?.roomid : Date.now().toString()
      socket.emit("CREATECHATROOM", roomid);
    }

    // }
    // socket.on("connnection", () => {
    // });
    var user = {
      roomid: tradechat?.roomid,
      from: userdata?.account?.userId,
    }
    // socket.emit("CHECKPING" , user)
    // setTimeout(socket.emit("USERSTATUS" , user), 1000)
    // setTimeout(socket.emit('CHECKPING' , tag) , 5000)
    // setTimeout(setUserstatus("Offline") , 1000);
    socket.on('PING', (status) => {
      if (!status?.from) {

      }
      else
        if (status?.from != atob(localStorage.getItem('xyz_cache')).toString()) {
          setUserstatus("Online");
          setLastseendata(Date.now().toString());
          setTimeout(setUserstatus("Offline"), 5000);
        }
        else {
          // setUserstatus("Offline")
          // setTimeout(setUserstatus("Offline") , 5000);
        }

    });
    // setUserstatus("Offline")
    // setTimeout(setUserstatus("Offline") , 5000);
    setInterval(setUserstatus("Offline"), 5000);

    socket.on('REFRESH', () => {
      fetchdata();
    })

    socket.on('NEWMESSAGE', (newmessage) => {
      setNewmessage("");
      setImage("");
      setImageblob("");
      setTradechat(newmessage);
    });

    socket.on('CHAT', (newmessage) => {
      setTradechat(newmessage);
    });

    return () => {
      clearInterval(dataID)
    }
  }, [socket]);

  return (
    <>
      <Header
        className="header dropheader"
        color="transparent"
        routes={dashboardRoutes}
        brand={
          <img
            src={require("../../assets/images/logo.png")}
            alt="logo"
            className="img-fluid"
          />
        }
        rightLinks={<HeaderLinks1 />}
        fixed
        changeColorOnScroll={{
          height: 20,
          color: "dark",
        }}
        {...rest}
      />

      <div className="login_container login_box">
        <div className="container">
          <div className="row offerpage">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <h5 className="blackandwhite bit_text text-center bit1">Offer</h5>
              <div>
                {offerheader && <div className="notes mb-3">
                  <span className="fa fa-info"></span>
                  <p>
                    Keep all conversation within the trade chat. Moderator won't
                    be able assist you if something goes wrong outeside of
                    TossXToss
                  </p>
                  <button className="btn btn-link" onClick={() => setOfferheader(false)}>x</button>
                </div>}
                <div className="tableborder">
                  <div className="d-flex align-items-baseline gap-10">
                    <span className="fa fa-clock"></span>
                    <div>
                      {" "}
                      <p className="mb-2 roboto">Please make a payment of {location?.state?.state?.pay} {offerdata?.preferedcurrency} using Airtel Money.</p>
                      <p className="subhead text-left">
                        {location?.state?.state?.receive} {offerdata?.coin} will be {location?.state?.state?.tradedata?.ordertype == "Buy" ? "added" : "reduced"} to your Bitcoin Wallet
                      </p>
                    </div>
                  </div>
                  <hr />


                  {offerdata?.ordertype == "Sell" && tradechat?.spender != userdata?.account?.userId && tradechat?.paidstatus == "paid" && tradechat?.chatstatus == "Active" && (parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))) > Date.now() && <><button className="btn themebtn" onClick={() => handleconfirm()}>{console.log("countdown", parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit)))}
                    Confirm <br /> Time left  <Countdown date={parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))} />
                    <span className="fa fa-check"></span>
                  </button>

                    <button className="btn themebtn" onClick={() => handlereject()}>
                      Reject <br /> Time left  <Countdown date={parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))} />
                      <span className="fa fa-check"></span>
                    </button>

                  </>}

                  {offerdata?.ordertype == "Buy" && tradechat?.spender == userdata?.account?.userId && tradechat?.paidstatus == "paid" && tradechat?.chatstatus == "Active" && (parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))) > Date.now() && <><button className="btn themebtn" onClick={() => handleconfirm()}>{console.log("countdown", parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit)))}
                    Confirm <br /> Time left  <Countdown date={parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))} />
                    <span className="fa fa-check"></span>
                  </button>

                    <button className="btn themebtn" onClick={() => handlereject()}>
                      Reject <br /> Time left  <Countdown date={parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))} />
                      <span className="fa fa-check"></span>
                    </button>

                  </>}


                  {/* {tradechat?.spender == userdata?.account?.userId && tradechat?.paidstatus == "paid" && tradechat?.chatstatus == "Active" && (parseFloat(tradechat?.orderstarttime) +(60000 * parseFloat(offerdata?.offertimelimit))) > Date.now() && <button className="btn themebtn" onClick={handlepaid}>{console.log("countdown" , parseFloat(tradechat?.orderstarttime) +(60000 * parseFloat(offerdata?.offertimelimit)))}
                    Paid <br /> Time left  <Countdown date={parseFloat(tradechat?.orderstarttime) +(60000 * parseFloat(offerdata?.offertimelimit))}/>
                    <span className="fa fa-check"></span>
                  </button>} */}





                  {offerdata?.ordertype == "Sell" && tradechat?.spender == userdata?.account?.userId && tradechat?.paidstatus == "pending" && tradechat?.chatstatus == "Active" && (parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))) > Date.now() && <button className="btn themebtn" onClick={() => handlepaid()}>
                    Paid <br /> Time left  <Countdown date={parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))} />
                    <span className="fa fa-check"></span>
                  </button>}
                  {offerdata?.ordertype == "Buy" && tradechat?.spender != userdata?.account?.userId && tradechat?.paidstatus == "pending" && tradechat?.chatstatus == "Active" && (parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))) > Date.now() && <button className="btn themebtn" onClick={() => handlepaid()}>
                    Paid <br /> Time left  <Countdown date={parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))} />
                    <span className="fa fa-check"></span>
                  </button>}
                  {canceltrade && <div className="notes">
                    <span className="fa fa-info"></span>
                    <p>
                      Keep trades within TossVToss. Some users may ask you to trade outside the TossVToss platform. This is against our Terms of Service and likely a scam attempt. You must insist on keeping all trade conversations within TossVToss. If you choose to proceed outside TossVToss, note that we cannot help or support you if you are scammed during such trades
                    </p>
                    <button className="btn btn-link" onClick={() => setCanceltrade(false)}>x</button>
                  </div>}
                  <hr />
                  <div className="flexb canceltrade">
                    {(tradechat?.chatstatus == "Active" && tradechat?.paidstatus == "pending") && (parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))) > Date.now() && <button className="btn themebtn" onClick={() => setCancelmodal(true)}>Cancel trade</button>}
                    {tradechat?.spender == userdata?.account?.userId && <p className="roboto mb-0 paid_tetx_higghtligth"> {tradechat?.paidstatus == "pending" ? "You haven't paid yet" : `You have paid ${spenderdata?.pay} ${offerdata?.preferedcurrency}`}</p>}
                  </div>
                </div>
                <div className="secondbox">
                  <h6 className="roboto followtag">Please follow {owner?.firstName} 's Instructions</h6>
                  <p className="roboto">No verification needed</p>

                  <h6 className="roboto followtag">Trade Information</h6>
                  <p className="roboto offercontent">
                    12457.5 BTC has been reserved for this trade. This includes
                    TossvToss fee of 0 BTC.
                  </p>
                  <div className="row tradeinfo">
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                      <h6 className="roboto">Rate</h6>
                      <p className="roboto">1 {offerdata?.coin} = {parseFloat(spenderdata?.perprice).toFixed(3)}{offerdata?.preferedcurrency}</p>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                      <h6 className="roboto">Trade ID</h6>
                      <p className="roboto">
                        {tradechat?.roomid}<span className="fa fa-copy ml-2"></span>{" "}
                      </p>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                      <h6 className="roboto">Started</h6>
                      <p className="roboto">{new Date(parseFloat(tradechat?.orderstarttime))?.toString()?.slice(4, 21)}</p>
                    </div>
                    {tradechat?.chatstatus == "Inactive" || (parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))) < Date.now() && <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                      <h6 className="roboto">{tradechat?.chatstatus == "Inactive" ? "Cancelled" : "Ended"}</h6>
                      <p className="roboto">{tradechat?.orderendtime ? new Date(parseFloat(tradechat?.orderendtime))?.toString()?.slice(4, 21) : new Date(parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit)))?.toString()?.slice(4, 21)}</p>
                    </div>}
                  </div>
                  <div className="d-flex jc-between mt-3">
                    <button className="offerbtn roboto" onClick={() => navigate.push("/support-ticket", { state: tradechat?.roomid })}>Report</button>
                    <button href="#" className="offerbtn roboto" onClick={() => navigate.push(`/bitcoincompany/${offerdata?._id}`)}>
                      View offer
                    </button>
                    <button className="offerbtn roboto" onClick={() => setTour(true)}>
                      <span className="fa fa-info-circle pr-2"></span> Take a
                      tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="tableborder chattable">
                <div className="chathead flexb">
                  <div>
                    <img src={Images.prof} alt="" className="chatprof" />
                    <span className="chatname roboto">{owner?.firstName ? (owner?.firstName + " " + owner?.lastName) : owner?.userId}</span>
                    <img src={Images.prof} alt="" className="countryimg" />
                  </div>
                  <div>
                    <div className="d-flex align-items-center">
                      <a href="#">
                        <img src={Images.trade} alt="" className="tradeimg" />
                      </a>
                      {/* <a href="#">
                        <span className="fa fa-mobile mobileicon"></span>
                      </a> */}
                      {tradechat?.spender == userdata?.account?.userId && <>
                        <a href="#" onClick={() => { setReviewtype("positive"); setReview(true) }}>
                          <div className="likebox">
                            <i className="fa fa-thumbs-up"></i>
                            <span className="roboto">{positive}</span>
                          </div>
                        </a>
                        <a href="#" onClick={() => { setReviewtype("negative"); setReview(true); }}>
                          <div className="dislikebox">
                            <i className="fa fa-thumbs-down"></i>
                            <span className="roboto">{negative}</span>
                          </div>
                        </a>
                      </>}
                    </div>
                  </div>
                </div>
                <div className="flexb usertime">
                  <div>
                    <p className="roboto sidetag"> {userstatus == "Online" ? "Online" : `lastseen ${new Date(parseFloat(lastseendata))?.toString()?.slice(4, 21)}`}</p>

                    {/* <p className="roboto sidetag"> {tradechat?.ordercreator == userdata?.account?.userId ? (userdatas?.lastseen == "online" ? "Online" : `lastseen ${new Date(parseFloat(userdatas?.lastseen))?.toString()?.slice(4 , 21)}`) : (owner?.lastseen == "online" ? "Online" : `lastseen ${new Date(parseFloat(owner?.time))?.toString()?.slice(4 , 21)}`)}</p> */}
                  </div>
                  <div className="partner">
                    <i className="fas fa-info-circle"></i>
                    {tradechat && <a href={""} onClick={() => navigate.push(`/displayownerdata/${tradechat?.ordercreator == userdata?.account?.userId ? tradechat?.spender : tradechat?.ordercreator}`)} >
                      <span className="roboto">Partner details</span>
                    </a>}
                  </div>
                </div>
                <div className="unavail">
                  <p className="roboto sidetag">{userStatus == "Online" ? "Moderator available" : "Moderator Unavailable"}</p>
                </div>
                <div className="chatbox">
                  <ul>
                    {tradechat && tradechat?.message?.map((data, i) => {
                      if (data?.from != userdata?.account?.userId) {
                        return (<li className="rightmsg">
                          <div className="chatbg">

                            {data?.image && <a href={data?.image ? config?.API_URL + "/" + data?.image : ""} target="_blank"><img src={data?.image ? config?.API_URL + "/" + data?.image : ""} /></a>}
                            <p className="chatcontent roboto">
                              {data?.message}
                            </p>
                          </div>
                          <span className="lastchat roboto text-right">
                            {new Date(parseFloat(data?.time))?.toString()?.slice(4, 21)}
                          </span>
                        </li>)
                      }
                      else if (data?.from == userdata?.account?.userId) {
                        return (<li className="leftmsg">
                          <div className="chatbg">
                            {data?.image && <a href={data?.image ? config?.API_URL + "/" + data?.image : ""} target="_blank"><img src={data?.image ? config?.API_URL + "/" + data?.image : ""} /></a>}
                            <p className="chatcontent roboto">
                              {data?.message}
                            </p>
                          </div>
                          <span className="lastchat roboto">
                            {new Date(parseFloat(data?.time))?.toString()?.slice(4, 21)}
                          </span>
                        </li>)
                      }
                    })}


                  </ul>
                </div>
                {tradechat?.chatstatus == "Active" && (parseFloat(tradechat?.orderstarttime) + (60000 * parseFloat(offerdata?.offertimelimit))) > Date.now() && userdatas?.level == 0 && <div className="chatfoot">
                  <img src={imageblob ? imageblob : ""} />
                  <input
                    type="text"
                    value={newmessage}
                    onChange={(e) => setNewmessage(e?.target?.value)}
                    className="form-control roboto"
                    placeholder="Write a message..."
                  />
                  <div className="flexb">
                    <div className="uploadbtn">
                      <div className="icon">
                        <span className="fa fa-upload"></span>
                      </div>
                      <input type="file"
                        onChange={(e) => { setImage(e?.target?.files[0]); setImageblob(URL.createObjectURL(e?.target?.files[0])) }}
                      />
                    </div>
                    <div>
                      <button className="roboto btn sendbtn" onClick={handleSend}>
                        <span className="fa fa-paper-plane"></span>
                        Send
                      </button>
                    </div>
                  </div>
                </div>}

                {userdatas?.level == 1 && <button className="themebtn" onClick={() => handleconfirm()}>Paid User</button>}
                {tour && <Takeatourmodal onDismiss={() => setTour(false)} />}
                {cancelmodal && <Canceltrademodal onDismiss={() => setCancelmodal(false)} oncancel={async () => { await handlecancel(); setCancelmodal(false) }} />}
                {review && <Reviewmodal type={reviewtype} owner={tradechat?.ordercreator == userdata?.account?.userId ? tradechat?.spender : tradechat?.ordercreator} onSet={(data) => handleonset(data)} onDismiss={() => setReview(false)} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trade;

