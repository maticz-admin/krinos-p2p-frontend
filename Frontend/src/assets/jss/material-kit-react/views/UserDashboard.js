import Images from 'Images';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Tab, Tabs } from 'react-bootstrap';
import ReactDatatable from '@ashvin27/react-datatable';
import Footer from '../../../../components/Footer/Footer';

import HeaderLinksAfterlogin from "../../../../components/Header/HeaderLinksAfterlogin";
import { useSelector, useDispatch } from 'react-redux';
import { Getuserp2pcreateorderhooks } from '../../../../actions/userdashboardAction';
import { getuserofferhooks } from '../../../../actions/P2PorderAction';
import { Getuserp2pviewofferhooks } from '../../../../actions/userdashboardAction';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Getsingleuserhook } from '../../../../actions/P2PorderAction';
import { gettradehistoryhook } from '../../../../actions/P2PorderAction';
import { getyourrequesthook } from '../../../../actions/P2PorderAction';
import { momentFormat } from 'lib/dateTimeHelper';
import { cancelofferhooks } from '../../../../actions/P2PorderAction';
import { toastAlert } from 'lib/toastAlert';
import { GetUserId } from '../../../../lib/userdata';

const dashboardRoutes = [];
var img1 = <img src={Images.tab1} />
var btc = <img src={Images.orangecoin} />



const UserDashboard = (props) => {
    const { ...rest } = props;
    const userdata = useSelector(state => state);
    const navigate = useHistory()

    const [records, setRecords] = useState([]);
    const [count, setCount] = useState(0)
    const [offercount, setOfferCount] = useState(0)
    const [buyorsell, setBuyorSell] = useState("");
    const [buyorsell1, setBuyorSell1] = useState("");
    const [tradehistory, setTradehistory] = useState([]);
    const [tradehistorycount, setTradehistorycount] = useState(0);

    const [yourrequest, setYourrequest] = useState([]);
    const [yourrequestcount, setYourrequestcount] = useState(0);

    const [filterdata, setFilterData] = useState({
        'page': 1,
        'limit': 10
    })
    const [offerrecords, setOfferrecords] = useState([]);

    const [user, setUser] = useState({});
    const [kyc, setKyc] = useState({});
    const [wallet, setWallet] = useState({});
    const [activekey, setActivekey] = useState(localStorage.getItem("tab") ? localStorage.getItem("tab") : "history");

    useEffect(() => {
        fetchuserp2porderData(filterdata);
        fetchoffers(filterdata);
        fetchuserdata();
        fetchtradehistory();
        fetchyourrequest();
    }, [buyorsell, buyorsell1])


    const fetchuserdata = async () => {
        // if(localStorage.getItem("tab")){
        //     setActivekey(localStorage.getItem("tab"))
        // }
        // else{
        //     setActivekey("history");
        // }
        var payload = { userid: GetUserId() }  //userdata?.account?.userId //redux usr data
        var result = await Getsingleuserhook(payload);
        // console.log('result-----', result.data.data)
        if (result?.data?.type == "success") {
            setUser(result?.data?.data);
            setKyc(result?.data?.kyc);
            setWallet(result?.data?.wallet);
        }
    }

    const fetchyourrequest = async () => {
        try {
            let userId = GetUserId();
            //userdata?.account?.userId //localStorage.getItem("userId")
            let filter = filterdata;
            filter['userId'] = userId;
            // filter['buyorsell'] = buyorsell;
            let res = await getyourrequesthook(filter);

            if (res?.data?.type == "success") {
                setYourrequest(res?.data?.data)
                setYourrequestcount(res?.data?.count)
            }
        } catch (err) {
        }
    }
    const fetchtradehistory = async (data) => {
        let userId = GetUserId()
        let filter = filterdata;
        filter['userId'] = userId;
        // filter['buyorsell'] = buyorsell1
        var result = await gettradehistoryhook(filter);
        // console.log('result-----', result)
        if (result?.data?.type == "success") {
            setTradehistory(result?.data?.data);
            setTradehistorycount(result?.data?.count);
        }
    }


    const fetchuserp2porderData = async (filterdata) => {
        try {
            let userId = GetUserId() //userdata?.account?.userId
            let filter = filterdata;
            filter['userId'] = userId;
            filter['buyorsell'] = buyorsell;
            let res = await Getuserp2pcreateorderhooks(filter);
            setCount(res.count)

            if (res.status == "success") {
                setRecords(res.result)
                setCount(res.count)
            }


        } catch (err) {
        }

    }

    const fetchoffers = async (filterdata) => {
        let userId = GetUserId()
        let filter = filterdata;
        filter['userId'] = userId;
        filter['buyorsell'] = buyorsell1
        // let userId = userdata?.account?.userId;
        // var payload = {userid : userId};

        var result = await Getuserp2pviewofferhooks(filter);
        // console.log('result-----', result.data)
        setOfferrecords(result?.data);
        setOfferCount(result.count)
    }



    const handlePagination = (index) => {

        let filterData = { ...filterdata, ...{ page: index.page_number, limit: index.page_size } }
        setFilterData(filterData)
        fetchuserp2porderData(filterData)
    }

    const handlePaginationview = (index) => {

        let filterData = { ...filterdata, ...{ page: index.page_number, limit: index.page_size } }
        setFilterData(filterData)
        fetchoffers(filterData)
    }

    const handletradehistoryPagination = (index) => {

        let filterData = { ...filterdata, ...{ page: index.page_number, limit: index.page_size } }
        setFilterData(filterData)
        // var payload = {
        //     filter : filterData,
        //     userid : userdata?.account?.userId
        // }
        fetchtradehistory(filterData)
    }

    const handleyourrequestPagination = (index) => {

        let filterData = { ...filterdata, ...{ page: index.page_number, limit: index.page_size } }
        setFilterData(filterData)
        // var payload = {
        //     filter : filterData,
        //     userid : userdata?.account?.userId
        // }
        fetchyourrequest(filterData)
    }

    const handleSelect = (e) => {
        let type = e;
        if (type == "Buy") {
            setBuyorSell(type)
        } else {
            setBuyorSell(type)
        }

    }

    const handleSelect1 = (e) => {
        let type = e.target.value;
        if (type == "Buy") {
            setBuyorSell1(type)
        } else {
            setBuyorSell1(type)
        }
    }

    //  const momentFormat = (dateTime,format='YYYY-MM-DD HH:mm') => {
    //     try{
    //         if (!isEmpty(dateTime)) {
    //             let newDateTime = new Date(dateTime);
    //             return momen(newDateTime).utc().format(format)
    //         }
    //         return ''
    //     } catch(err){
    //         return ''
    //     }
    // }

    const columns = [
        // {
        //     // key: "name",
        //     text: "UserId",
        //     className: "name w-175",
        //     align: "left",
        //     cell: record => {
        //         return (
        //             <>
        //                 <span>{record.createrid}</span>
        //             </>
        //         )
        //     }
        // },
        {
            // key: "name",
            text: "Order Type",
            className: "name w-175",
            align: "left",
            cell: record => {
                return (
                    <>
                        <span>{record.ordertype}</span>
                    </>
                )
            }
        },
        {
            // key: "name",
            text: "Created Date",
            className: "name w-175",
            align: "left",
            cell: record => {
                return (
                    <>
                        <span>{momentFormat(record.createdAt, 'YYYY-DD-MM HH:mm')}</span>
                    </>
                )
            }
        },
        // {
        //     // key: "name",
        //     text: "receive",
        //     className: "name w-175",
        //     align: "left",
        //     cell: record => {
        //         return (
        //             <>
        //                 <span>{record.min} {record.coin}</span> <br></br>
        //                 <span> {parseInt(record.min) * parseInt(record.currencyvalue)} {record.preferedcurrency}</span>
        //             </>
        //         )
        //     }
        // },
        // {
        //     key: "address",
        //     text: "Date/Time",
        //     className: "address red",
        //     align: "left",
        //     cell: record => {
        //         return (
        //             <>
        //                 <span>{record.createdAt}</span>
        //             </>
        //         )
        //     }
        // },
        {
            // key: "postcode",
            text: "Symbol",
            className: "postcode w-100px",
            className: "address red",
            align: "left",
            cell: record => {
                return (
                    <>
                        <span>{record.coin}</span>
                    </>
                )
            }

        },
        {
            key: "rating",
            text: "Trade ID",
            className: "rating aqua",
            align: "left",
            cell: record => {
                return (
                    <>
                        <span>{record._id}</span>
                    </>
                )
            }
        },
        // {
        //     key: "type_of_food",
        //     text: "Offer ID",
        //     className: "type_of_food red",
        //     align: "left",
        //     cell: record => {
        //         return (
        //             <>
        //                 <span>{record._id}</span>
        //             </>
        //         )
        //     }
        // },
        // {
        //     key: "amount",
        //     text: "Amount",
        //     className: "type_of_food w-100px",
        //     align: "left"
        // },
        // {
        //     key: "type_of_food",
        //     text: "Status",
        //     className: "type_of_food",
        //     align: "left"
        // },
        {
            // key: "name",
            text: "Status",
            className: "name w-175",
            align: "left",
            cell: record => {
                return (
                    <>
                        <span>{record.offerstatus}</span>
                    </>
                )
            }
        },
        {
            // key: "type_of_food",
            text: "Action",
            className: "actionbtn w-175",
            align: "left",
            cell: record => {
                return (
                    <>
                        {record?.offerstatus == "created" ? <button className='export' style={{ marginRight: '5px' }}
                            onClick={async () => {
                                var payload = { orderid: record?.orderid }
                                var result = await cancelofferhooks(payload);
                                await fetchuserp2porderData(filterdata);
                                toastAlert("success", "Offer Closed successfully!")
                            }}
                        >
                            <i className="fa fa-trash text-danger"></i>
                        </button> : <p>-</p>}
                        {/* <button className='copy'>
                            <i className="fa fa-copy"></i> Copy
                        </button> */}
                    </>
                );
            }
        },
    ];
    const data = [
        {
            "id": "55f14312c7447c3da7051b26",
            "address": "27/2023",
            "name": "Richard Parker",
            prof: img1,
            coin: btc,
            coinname: "btc",
            "postcode": "3JH",
            "rating": 500,
            "type_of_food": "39deAXgqL12",
            amount: "200 BTC"
        },
        {
            "id": "55f14312c7447c3da7051b27",
            "address": "27/2023",
            "name": "Richard Parker",
            coin: btc,
            prof: img1,
            coinname: "btc",

            "postcode": "5PT",
            "rating": 5.5,
            "type_of_food": "Thai",
            amount: "200 BTC"
        }
    ]


    const columns1 = [

        {
            key: "orderid",
            text: "Order Id",
            className: "address",
            align: "left",
        },
        // {
        //     // key: "orderid",
        //     text: "Order Id",
        //     className: "address",
        //     align: "left",
        //     ell: record => {
        //         return (
        //             <>
        //                 <span>{new Date(record.createdAt).toLocaleDateString()}</span>
        //             </>
        //         )
        //     }
        // },
        {
            key: "coin",
            //     (record?.orderdata?.createrid == userdata?.account?.userId) ? record?.orderdata?.ordertype : record?.orderdata?.ordertype == "Buy" ? "Buy" : "Sell",
            text: "Crypto",
            className: "address",
            align: "left",
            cell: record =>
                (record?.orderdata?.createrid == userdata?.account?.userId) ? record?.orderdata?.ordertype : record?.orderdata?.ordertype == "Buy" ? "Buy" : "Sell",
        },
        {
            key: "status",
            // record =>
            //     (record?.orderdata?.createrid == userdata?.account?.userId) ? record?.orderdata?.ordertype : record?.orderdata?.ordertype == "Buy" ? "Buy" : "Sell",
            text: "Status",
            className: "address",
            align: "left",
            // cell : record =>
            // (record?.orderdata?.createrid == userdata?.account?.userId) ? record?.orderdata?.ordertype : record?.orderdata?.ordertype == "Buy" ? "Buy" : "Sell",
        },
        {
            text: "Admin fee",
            className: "address",
            align: "left",
            cell: record =>
                record?.orderdata?.ordertype == "Sell" ? (record?.orderdata?.createrid == userdata?.account?.userId) ? parseFloat(record?.adminfee)?.toFixed(8) : 0
                    : record?.spender == userdata?.account?.userId ? parseFloat(record?.adminfee)?.toFixed(8) : 0,
        },
        {
            text: "Receive",
            className: "address",
            align: "left",
            cell: record =>
                record?.orderdata?.ordertype == "Sell" ? (record?.orderdata?.createrid == userdata?.account?.userId) ? 0 : (parseFloat(record?.receive))?.toFixed(8)
                    : record?.spender == userdata?.account?.userId ? 0 : (parseFloat(record?.receive))?.toFixed(8),
        },
        {
            text: "Pay",
            className: "address",
            align: "left",
            cell: record =>
                record?.orderdata?.ordertype == "Sell" ? (record?.orderdata?.createrid == userdata?.account?.userId) ? (parseFloat(record?.receive))?.toFixed(8) : 0
                    : record?.spender == userdata?.account?.userId ? (parseFloat(record?.receive))?.toFixed(8) : 0,
        },
        // {
        //     key: "Action",
        //     text: "Action",
        //     className: "actionbtn",
        //     align: "left",
        //     cell: record => {
        //         return (
        //             <>
        //                 <button className='delete' style={{ marginRight: '5px' }}>
        //                     <i className="fa fa-trash"></i> Export
        //                 </button>
        //             </>
        //         );
        //     }
        // },
    ];
    const data1 = [
        {
            "IP Adress": "55f14312c7447c3da7051b26",
        },
        {
            "IP Adress": "55f14312c7447c3da7051b27",
        }
    ]

    const columns2 = [

        {
            key: "orderid",
            text: "Order Id",
            className: "address",
            align: "left",

        },

        // {
        //     // key: "symbol",
        //     text: "RoomId",
        //     className: "address w-100px",
        //     align: "left",
        //     cell: record => {
        //         return (
        //             <>
        //                 {record.symbolimg} <span>{record.symbol}</span>
        //             </>
        //         )
        //     }
        // },
        {
            key: "roomid",
            text: "Room Id",
            className: "address w-100px",
            align: "left",
        },
        {
            key: "chatstatus",
            text: "Status",
            className: "address",
            align: "left",
            sortable: true
        },
        // {
        //     key: "preferred",
        //     text: "Preffered Crypto",
        //     className: "address",
        //     align: "left",
        //     sortable: true,
        //     cell: record => {
        //         return (
        //             <>
        //                 {record.symbolimg} <span>{record.preffered}</span>
        //             </>
        //         )
        //     }
        // },
        // {
        //     // key: "offer",
        //     text: "Offer Views",
        //     className: "yelloweye",
        //     align: "left",
        //     sortable: true,
        //     cell: record => {
        //         return (
        //             <>
        //                 <span className='fa fa-eye'></span> <span>{record.offer}</span>
        //             </>
        //         )
        //     }
        // },
        {
            key: "option",
            text: "Option",
            className: "actionbtn w-175",
            align: "left",
            cell: record => {
                // console.log('record------', record)
                return (
                    <>
                        <button className='export' style={{ marginRight: '5px' }} onClick={() => {
                            navigate.push(`/trade/${record?.roomid}`)
                        }}>
                            <i className="fa fa-eye"></i> View
                        </button>
                        {/* <button className='copy'>
                            <i className="fa fa-copy"></i> Edit
                        </button> */}
                    </>
                );
            }
        },
    ];
    const data2 = [
        {
            "date": "12/2023",
            "symbol": "BTC",
            "amount": "200BTC",
            "minmax": "20 - 50BTC",
            "preffered": "BTC",
            "offer": "0 Nos",
            "symbolimg": btc
        },
        {
            "date": "12/2023",
            "symbol": "BTC",
            "amount": "200BTC",
            "minmax": "20 - 50BTC",
            "preffered": "BTC",
            "offer": "0 Nos",
        }
    ]

    const columns3 = [

        {
            key: "orderid",
            text: "Order Id",
            className: "address",
            align: "left",

        },

        // {
        //     // key: "symbol",
        //     text: "RoomId",
        //     className: "address w-100px",
        //     align: "left",
        //     cell: record => {
        //         return (
        //             <>
        //                 {record.symbolimg} <span>{record.symbol}</span>
        //             </>
        //         )
        //     }
        // },
        {
            key: "roomid",
            text: "Room Id",
            className: "address w-100px",
            align: "left",
        },
        {
            key: "chatstatus",
            text: "Status",
            className: "address",
            align: "left",
            sortable: true
        },
        // {
        //     key: "preferred",
        //     text: "Preffered Crypto",
        //     className: "address",
        //     align: "left",
        //     sortable: true,
        //     cell: record => {
        //         return (
        //             <>
        //                 {record.symbolimg} <span>{record.preffered}</span>
        //             </>
        //         )
        //     }
        // },
        // {
        //     // key: "offer",
        //     text: "Offer Views",
        //     className: "yelloweye",
        //     align: "left",
        //     sortable: true,
        //     cell: record => {
        //         return (
        //             <>
        //                 <span className='fa fa-eye'></span> <span>{record.offer}</span>
        //             </>
        //         )
        //     }
        // },
        {
            key: "option",
            text: "Option",
            className: "actionbtn w-175",
            align: "left",
            cell: record => {
                return (
                    <>
                        <button className='export' style={{ marginRight: '5px' }} onClick={() => {
                            navigate.push(`/trade/${record?.roomid}`)
                        }}>
                            <i className="fa fa-eye"></i> View
                        </button>
                        {/* <button className='copy'>
                            <i className="fa fa-copy"></i> Edit
                        </button> */}
                    </>
                );
            }
        },
    ];


    const config = {
        page_size: 10,
        length_menu: [10, 20, 50],
        button: {
            // excel: true,
            // print: true,
        },
        language: {
            length_menu: "Show _MENU_ as per page",
            filter: false,
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            pagination: {
                first: "<<",
                previous: "<",
                next: ">",
                last: ">>"
            }
        },
    }


    return (
        <div className='page_wrap home_page_header_banner'>

            {/* <Header className="header"
                color="transparent"
                routes={dashboardRoutes}
                brand={<img src={require("../../../../assets/images/logo.png")} alt="logo" className="img-fluid" />}
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 20,
                    color: "dark",
                }}
                {...rest} /> */}
            <Header className="header"
                color="transparent"
                routes={dashboardRoutes}
                brand={<img src={require("../../../images/logo.png")} alt="logo" className="img-fluid" />}
                rightLinks={<HeaderLinksAfterlogin />}
                fixed
                changeColorOnScroll={{
                    height: 20,
                    color: "dark",
                }}
                {...rest} />

            <div className='container-fluid themecontainer'>
                <div className='login_container login_box userdash'>
                    <div className='text-center mb-5'>
                        <h3 className='blackandwhite text-left'>User Dashboard</h3>
                    </div>
                    <hr className='themehr' />
                    <div className='row'>
                        <div className='col-xl-4 col-lg-6 mb-lg-0 mt-4'>
                            <div className='gradbox bordbox br-20 h-100 mb-3'>
                                <h5 className='blackandwhite test-left mt-0'>My Profile</h5>
                                <hr className='themehr' />
                                <p className='blackandwhite d-flex jc-between align-items-center f-14'>
                                    <div>User Name:<span className='aqua light_aqua roboto ml-2'>{user?.firstName && user?.lastName ? (user?.firstName + " " + user?.lastName) : "Update Username"} </span></div>
                                    {/* //<i className='fa fa-times red ml-1'></i> */}
                                    <img src={Images.user} className='img' />
                                </p>
                                <p className='blackandwhite f-14 mb-0'>KYC:
                                    <span className='aqua light_aqua roboto ml-2'> {kyc?.idProof?.status == "approved" ? "Verification Approved" : kyc?.idProof?.type ? "Verification Pending" : "Update Kyc"}
                                        {kyc?.idProof?.status == "approved" && <i className='fa fa-check aqua ml-1'></i>}
                                    </span>
                                </p>
                                <p className='blackandwhite f-14 d-flex align-items-center jc-between mb-0 pinkshade'>
                                    {/* <div>2 Factor Authentication:
                                        <span className='red roboto ml-2'>{user?.google2Fa?.secret ? "2FA Enabled" :"[Enable now]"}
                                            {user?.google2Fa?.secret ? <i className='fa fa-check aqua ml-1'></i> :<i className='fa fa-times red ml-1'></i>}
                                        </span></div> */}
                                    <button className='btn btn-bordered white' onClick={() => { navigate.push("/profile") }}>Edit</button>
                                </p>
                            </div>

                        </div>
                        <div className='col-xl-4 col-lg-6 mb-lg-0 mt-4'>
                            <div className='gradbox bordbox br-20 h-100 mb-3'>
                                <h5 className='blackandwhite test-left mt-0'>My Account</h5>
                                <hr className='themehr' />
                                <p className='blackandwhite d-flex jc-between align-items-center f-14'>
                                    <div>Mobile:<span className='aqua light_aqua roboto ml-2'>{user?.phoneStatus == "verified" ? "Verified" : "[Not Verified]"}
                                        {user?.phoneStatus == "verified" ? <i className='fa fa-check aqua ml-1'></i> : <i className='fa fa-times red ml-1'></i>}
                                    </span></div>

                                    <img src={Images.cog} className='img' />
                                </p>
                                <p className='blackandwhite f-14 mb-0'>Login password:
                                    <span className='aqua light_aqua roboto ml-2'>Update
                                        {/* <i className='fa fa-check aqua ml-1'></i> */}
                                    </span>
                                </p>
                                <p className='blackandwhite f-14 d-flex align-items-center jc-between mb-0 pinkshade mt-2'>

                                    <button className='btn btn-bordered white' onClick={() => { navigate.push("/profile") }}>Edit</button>
                                </p>
                            </div>

                        </div>
                        <div className='col-xl-4 col-lg-6 mb-lg-0 mt-4'>
                            <div className='gradbox bordbox br-20 h-100 mb-3'>
                                <h5 className='blackandwhite test-left mt-0'>Authentication</h5>
                                <hr className='themehr' />
                                {/* <p className='blackandwhite d-flex jc-between align-items-center f-14'>
                                    <div>Push Notification:<span className='aqua roboto ml-2'> Enable <i className='fa fa-check aqua ml-1'></i></span></div>
                                    <label class="switch">
                                        <input type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                </p>
                                <p className='blackandwhite d-flex jc-between align-items-center f-14'>
                                    <div> SMS:
                                        <span className='red roboto ml-2'>Disabled
                                            <i className='fa fa-times red ml-1'></i>
                                        </span></div>
                                    <label class="switch">
                                        <input type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                </p>
                                <p className='blackandwhite d-flex jc-between align-items-center f-14'>
                                    <div>Site Updates: <span className=''>Disabled
                                        <i className='fa fa-times red ml-1'></i>
                                    </span></div>
                                    <label class="switch">
                                        <input type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                </p> */}
                                <p className='blackandwhite f-14 d-flex align-items-center jc-between mb-0 pinkshade'>
                                    <div>2 Factor Authentication:
                                        <span className='aqua light_aqua roboto ml-2'>{user?.google2Fa?.secret ? "2FA Enabled" : "[Enable now]"}
                                            {user?.google2Fa?.secret ? <i className='fa fa-check aqua ml-1'></i> : <i className='fa fa-times red ml-1'></i>}
                                        </span></div>

                                </p>
                                <p className='blackandwhite f-14 d-flex align-items-center jc-between mb-0 pinkshade'>


                                </p> <button className='btn btn-bordered white mt-3' onClick={() => { navigate.push("/security") }}>Edit</button>
                            </div>

                        </div>
                    </div>

                    <section id='tablesec'>
                        <div className=''>

                            <div className='row jc-center mb-4'>
                                <div className='col-md-6'>
                                    <h1 className="mb-4 title1 heads mt-5">TRADE LIKE A PRO</h1>
                                    <p className='roboto subhead'> In publishing and graphic design, Lorem ipsum is a placeholder text commonly</p>
                                </div>
                            </div>
                            <div className='tradetab'>
                                <div className='tablebg'>
                                    <img src={Images.bannerbg} className='bannerbg' /></div>
                                <img src={Images.connect} className='bannerconnect' />
                                <img src={Images.connect} className='connectrigth' />
                                <div className="themetable contrent_farpom_input">
                                    <Tabs defaultActiveKey={activekey} id="uncontrolled-tab-example" onSelect={(e) => { setActivekey(e); localStorage.setItem("tab", e) }} >
                                        <Tab eventKey="history" title="Offer history" className='px-3 py-3'>

                                            <div className='d-flex tabrightbtn'>
                                                {/* <Dropdown>
                                                    <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
                                                        Complete Trades
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Buy</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown> */}

                                                <Dropdown className="headerdropdown m-left iner_drop_versiotwo">
                                                    <Dropdown.Toggle variant="success" className='btcc btcc_mn_wodt_set' id="dropdown-basic">
                                                        <span>{buyorsell ? buyorsell : "Select Type"}</span>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="iner_dropmenu_versiotwo btcc_mn_wodt_set_menu">






                                                        <Dropdown.Item
                                                        >
                                                            <span>Select Type</span></Dropdown.Item>

                                                        <Dropdown.Item
                                                        >
                                                            <p onClick={() => {
                                                                handleSelect("Buy")
                                                            }}><span>Buy</span></p></Dropdown.Item>

                                                        <Dropdown.Item
                                                        >
                                                            <p onClick={() => {
                                                                handleSelect("Sell")
                                                            }}><span>Sell</span></p></Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>


                                                {/* <select className='btcc' name="buyorsell" onChange={(e) => handleSelect(e)}>
                                                    <option hidden> Select Type</option>
                                                    <option value="Buy">Buy</option>
                                                    <option value="Sell">Sell</option>
                                                </select> */}
                                                {/* <button className='btn btn-bordered white'>Filter <i class="fa-solid fa-sliders"></i></button> */}
                                            </div>
                                            <div className='table_yser_das'>
                                                <ReactDatatable className="table table-bordered table-striped"
                                                    config={config}
                                                    records={records}
                                                    columns={columns}
                                                    dynamic={true}
                                                    total_record={count}
                                                    onChange={handlePagination}
                                                />
                                            </div>
                                        </Tab>
                                        <Tab eventKey="tradehistory" title="Trade history" className='px-3 py-3'>
                                            {/* <div className='d-flex tabrightbtn'>
                                            <Dropdown>
                                                    <Dropdown.Toggle variant="success" className='btcc' id="dropdown-basic">
                                                        Sell
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Buy</Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div> */}
                                            <div className='table_yser_das'>
                                                <ReactDatatable className="table table-bordered table-striped"
                                                    config={config}
                                                    records={tradehistory}
                                                    columns={columns1}
                                                    dynamic={true}
                                                    total_record={count}
                                                    onChange={handletradehistoryPagination}
                                                />
                                            </div>
                                        </Tab>
                                        <Tab eventKey="viewoffer" title="View offer request" className='px-3 py-3'>
                                            {/* <div className='d-flex tabrightbtn'>
                                            <select className='btcc' name="buyorsell" onChange={(e) => handleSelect1(e)}>
                                                    <option hidden> Select Type</option>
                                                    <option value="Buy">Buy</option>
                                                    <option value="Sell">Sell</option>
                                                </select> */}
                                            {/* <button className='btn btn-bordered white'>Create Offer</button> */}
                                            {/* </div> */}
                                            <div className='table_yser_das'>
                                                <ReactDatatable className="table table-bordered table-striped"
                                                    config={config}
                                                    records={offerrecords}
                                                    columns={columns2}
                                                    dynamic={true}
                                                    total_record={offercount}
                                                    onChange={handlePaginationview}
                                                />
                                            </div>
                                        </Tab>

                                        <Tab eventKey="yourrequest" title="Your request" className='px-3 py-3'>
                                            {/* <div className='d-flex tabrightbtn'>
                                            <select className='btcc' name="buyorsell" onChange={(e) => handleSelect1(e)}>
                                                    <option hidden> Select Type</option>
                                                    <option value="Buy">Buy</option>
                                                    <option value="Sell">Sell</option>
                                                </select> */}
                                            {/* <button className='btn btn-bordered white'>Create Offer</button> */}
                                            {/* </div> */}
                                            <div className='table_yser_das'>
                                                <ReactDatatable className="table table-bordered table-striped"
                                                    config={config}
                                                    records={yourrequest}
                                                    columns={columns3}
                                                    dynamic={true}
                                                    total_record={yourrequestcount}
                                                    onChange={handleyourrequestPagination}
                                                />
                                            </div>
                                        </Tab>

                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default UserDashboard;