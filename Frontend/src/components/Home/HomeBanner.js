// import package
import React from 'react';
import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

const HomeBanner = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();

    return (
        <div className='container'>
            {/* <div className='row jc-center text-center'>
                <div className='col-md-6'>
                    <div className='banner_ad_wrapper'>
                        <div>
                            <h1>Welcome to Toss Toss</h1>
                            <p className=''>Anonymous P2P deals on your teams. Trade globaly using for any payment system for any currency. </p>
                            <button className='mt-3'>Available offer</button>
                        </div>
                    </div> 
                </div>
            </div> */}
        </div>
              
    )
}

export default HomeBanner;