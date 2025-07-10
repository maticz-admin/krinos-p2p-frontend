// import package
import React, { useState, useEffect, useRef } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toastAlert } from '../../lib/toastAlert';

// import config
import config from '../../config'

// import component
import ReplyConversation from './ReplyConversation';
import IconButton from './IconButton';
import { useTranslation } from 'react-i18next';

// import action
import { supportIcon } from '../../actions/iconBtnAction'
import { closeTicket } from '../../actions/supportAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { capitalize } from '../../lib/stringCase'
import { momentFormat } from '../../lib/dateTimeHelper';


const ChatList = (props) => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation();
    // props
    const { ticketRecord, eventKey, sender } = props

    // state
    const [ticketData, setTicketData] = useState({})
    // function
    const replyChatFun = (replyMsg) => {
        setTicketData({ ...ticketData, ...{ 'reply': replyMsg } })
    }

    const closeTicketFun = (status) => {
        setTicketData((prev) => {
            return { ...prev, 'status': status }
        })
        window.location.reload()
    }

    useEffect(() => {
        if (ticketRecord) {
            setTicketData(ticketRecord)
        }
    }, [ticketRecord])

    const handleCloseTicket = async (e) => {
        e.preventDefault()
        let reqData = {
            'ticketId': ticketRecord._id
        }
        try {
            const { status, loading, error, message, result } = await closeTicket(reqData);
            if (status == 'success') {
                toastAlert('success', t(message), 'supportTicket');
                setTimeout(() => {
                    closeTicketFun(result.status)
                }, 1000)

            }
        } catch (err) { }
    }

    return (
        <Card>
            <Card.Header className='support_header_new' onClick={() => supportIcon(dispatch, eventKey)}>
                <h5 className="mb-0 gtt">
                        <div className="stHeadText subjectWidth"><small>{t('SUBJECT')}</small>{
                        t(ticketRecord.categoryName)
                        }</div>
                        <div className="stHeadText ticketIdWidth"><small>{t('TICKET_ID')}</small>#{ticketRecord.tickerId}</div>
                        <div className="stHeadText statusWidth"><small>{t('STATUS')}</small><small className="yellowText">{t(ticketRecord.status?.toUpperCase())}</small></div>
                        { ticketRecord.status == "open" ? <div className='support_ticket_emty stHeadText'> <button className='themebtn btn-sm-close' onClick={handleCloseTicket}>{t("CLOSE")}</button></div> : <div className='support_ticket_emty stHeadText emp_txt'>-</div>}
                </h5>
            </Card.Header>
         
        </Card>
    )
}

export default ChatList;