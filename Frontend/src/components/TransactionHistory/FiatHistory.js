// import package
import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import DataTable from 'react-data-table-component';
import { Select, MenuItem ,FormControl} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
// import action
import { getTrnxHistory } from '../../actions/walletAction'
import {Dropdown} from 'react-bootstrap'

// import lib
import isEmpty from '../../lib/isEmpty';
import { transactionStatus } from '../../lib/displayStatus';
import { dateTimeFormat } from '../../lib/dateTimeHelper'

const columns = [
    {
        name: 'Date',
        selector: 'date',
        sortable: false,
    },
    {
        name: 'Type',
        selector: 'type',
        sortable: false,
    },
    {
        name: 'Currency',
        selector: 'currency',
        sortable: false,
    },
    {
        name: 'Amount',
        selector: 'amount',
        sortable: false,
    },
    {
        name: 'Transaction Ref.',
        selector: 'transRef',
        sortable: false,
    },
    {
        name: 'Bank & Account',
        selector: 'bankAccount',
        sortable: false,
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: false,
    },
];

const FiatHistory = (props) => {
    // props
    const { currencyOption } = props;
    const { t, i18n } = useTranslation();
    // state
    const [loader, setLoader] = useState(false)
    const [record, setRecord] = useState({
        'data': [],
        'count': 0
    })
    const [filter, setFilter] = useState({
        'coin': 'all',
        'type': 'all',
        'search': '',
        'page': 1,
        'limit': 10
    })
    const [typingTimeout, setTypingTimeout] = useState(0)

    const { coin, type, search } = filter

    const [filterText, setFilterText] = useState('');
    const [isSearch,setSearch]=useState(false)
    const [filteredItems,setFilterItems]=useState([])

    // function
    const fetchHistory = async (reqQuery) => {
        try {
            setLoader(true)
            const { status, loading, result } = await getTrnxHistory('fiat', reqQuery)
            setLoader(loading)
            if (status == 'success') {
                if (result && result.data && result.data.length > 0) {
                    let resultArr = []
                    result.data.map((item) => {
                        resultArr.push({
                            'date': dateTimeFormat(item.createdAt, 'YYYY-MM-DD HH:mm'),
                            'type': transactionStatus(item.paymentType),
                            'currency': item.coin,
                            'amount': item.amount,
                            'transRef': item._id,
                            'bankAccount': isEmpty(item.bankDetail) ? '-' : `${item.bankDetail.bankName}-${item.bankDetail.accountNo}`,
                            'status': <div className="textStatusGreen">{item.status}</div>
                        })

                        //textStatusOrange,textStatusGreen
                    })
                    setRecord({
                        'data': resultArr,
                        count: result.count
                    })
                } else {
                    setRecord({
                        'data': result.data,
                        'count': result.count
                    })
                }
            }
        } catch (err) { }
    }

    const handlePageChange = page => {
        let filterData = { ...filter, ...{ 'page': page } }
        setFilter(filterData)
        fetchHistory(filterData)
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        let filterData = { ...filter, ...{ 'page': page, 'limit': newPerPage } }
        setFilter(filterData)
        fetchHistory(filterData)
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let filterData = {
            ...filter,
            [name]: value
        }
        setFilter(filterData)
        if (name == 'search') {
            // if (typingTimeout) {
            //     clearTimeout(typingTimeout);
            // }
            // setTypingTimeout(setTimeout(function () {
            //     fetchHistory(filterData)
            // }, 1000))
            setSearch(true)
            searchedValue(record.data,value)

        } else {
            fetchHistory(filterData)
        }
    }
    const searchedValue = async(data,searchSymbol) => {
        const filteredData  = await data.filter(value => ((value.bankAccount ).toUpperCase()).includes(searchSymbol.toUpperCase()) || ((value.transRef ).toUpperCase()).includes(searchSymbol.toUpperCase()));
        setFilterItems(filteredData) ;
    }


    useEffect(() => {
        fetchHistory(filter)
    }, [])

    return (
        <div className="dashboard_box stakingHistoryTable">
            <div className="newUsersFilter contact_form settingsSelect mb-0 historyPageFilter">
                <div className="newsSelectGroup input_minw_selc">
                    <label>{t('FILTER_BY')}</label>

                    {/* <Dropdown className="themeselect min_height_select_dropdwn">
      <Dropdown.Toggle variant="link" id="dropdown-basic1" className="marginSpace min_height_select"
                        value={type}
                        name="coin"
                        onChange={handleChange}>
                             {!filtertype?t('ALL'):filtertype}
      </Dropdown.Toggle>

      <Dropdown.Menu className='menu_not_scroll_dd'>
        <Dropdown.Item onClick={(e) => setFiltertype('All')}> {t('ALL')} </Dropdown.Item>
        <Dropdown.Item onClick={(e) => setFiltertype('Withdraw')}> {t('WITHDRAW')} </Dropdown.Item>
        <Dropdown.Item onClick={(e) => setFiltertype('Deposit')}> {t('DEPOSIT')} </Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
                   */}
                     <Select className='bg_unset_blk'
                            value={type}
                            name="type"
                            onChange={handleChange} >
                            <MenuItem value={'all'}>{t('ALL')}</MenuItem>
                            <MenuItem value={'fiat_withdraw'}>{t('WITHDRAW')}</MenuItem>
                            <MenuItem value={'fiat_deposit'}>{t('DEPOSIT')}</MenuItem>
                        </Select> 
                    
                    <Select
                        className="marginSpace bg_unset_blk"
                        value={coin}
                        name="coin"
                        onChange={handleChange}
                    >
                        <MenuItem value={'all'}>{t('ALL')}</MenuItem>
                        {
                            currencyOption && currencyOption.length > 0 && currencyOption.map((item, key) => {
                                if (item.type == 'fiat') {
                                    return (
                                        <MenuItem value={item.coin} key={key}>
                                            {item.coin}
                                        </MenuItem>
                                    )
                                }
                            })
                        }
                    </Select>

                    {/* <Dropdown className="themeselect min_height_select_dropdwn">
      <Dropdown.Toggle variant="link" id="dropdown-basic" className="marginSpace min_height_select"
                        value={filtercoin}
                        name="coin"
                        onChange={handleChange}>
       {!filtercoin?t('ALL'):filtercoin}
      </Dropdown.Toggle>

      <Dropdown.Menu className='small menu_not_scroll_dd'>

      {
                            currencyOption && currencyOption.length > 0 && currencyOption.map((item, key) => {
                                if (item.type == 'fiat') {
                                    return (
                                        

<Dropdown.Item  value={item.coin} key={key} onClick={(e) => setFiltercoin(e.target.getAttribute("value"))}> {item.coin} </Dropdown.Item>
                                    )
                                }
                            })
                        }


   
      
 
      </Dropdown.Menu>
    </Dropdown> */}


                    <div className="tableSearchBox">
                        <div class="input-group">
                            <input
                                type="text"
                                name="search"
                                value={search}
                                onChange={handleChange}
                                class="form-control"
                                placeholder="Search by Trans.Ref / Bank"
                            />
                            <div class="input-group-append">
                                <span class="btnType1"><i class="fas fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="newsSelectGroup">
                    <button className="btn btn-outline text-uppercase py-1 m-0">Download PDF</button>
                </div> */}
            </div>
            {isSearch ? (<DataTable
                columns={columns}
                data={filteredItems}
                paginationTotalRows={record.count}
                noHeader
                progressPending={loader}
                pagination
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />):(
             <DataTable
                columns={columns}
                data={record.data}
                paginationTotalRows={record.count}
                noHeader
                progressPending={loader}
                pagination
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
            )}
            
        </div>
    )
}

FiatHistory.propTypes = {
    currencyOption: PropTypes.array.isRequired
};

FiatHistory.defaultProps = {
    currencyOption: [],
};

export default FiatHistory;