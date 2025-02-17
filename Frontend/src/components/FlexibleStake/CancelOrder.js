// import package
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Cancelmodal from './CancelOrderModal'
// import action
import {
    orderCancel
} from '../../actions/stakingAction';

// import action
import { updateStakeOrder } from '../../actions/stakingAction'

// import lib
import { toastAlert } from '../../lib/toastAlert';

const CancelOrder = (props) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    // props
    const { orderData } = props;
    // state
    const [loader, setLoader] = useState(false)
    const [showModal,setShow]=useState(false)

    // function
    const cancelOrder = async (stakeId) => {
        try {
            setLoader(true)
            
            const { status, loading, message, result } = await orderCancel(stakeId);
            setLoader(false)
            if (status == 'success') {
                toastAlert('success', message, 'cancelOrder')
                updateStakeOrder(dispatch, result, 'cancelOrder')
            } else {
                toastAlert('error', message, 'cancelOrder')
            }
        } catch (err) { }
    }

    return (
        <>
        {showModal && <Cancelmodal  stakeId={orderData._id} onSumbit={cancelOrder} onDismiss={()=>setShow(false)}/>}
        <button
            className="btn btn-outline text-uppercase py-1 ml-2"
            onClick={() => setShow(true)}
            disabled={loader}
        >
            {loader && <i class="fas fa-spinner fa-spin"></i>}
            {t('CANCEL')}
        </button >
        </>
    )
}

export default CancelOrder;