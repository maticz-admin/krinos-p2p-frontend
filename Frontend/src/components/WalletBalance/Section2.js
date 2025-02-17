// import package
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import Images  from 'Images';
// import lib
import { toFixed } from '../../lib/roundOf';
import { currencySymbol } from '../../lib/pairHelper'
import { getuserbalancehook } from '../../actions/P2PorderAction';

const Section2 = (props) => {
    const { t, i18n } = useTranslation();
    // const userdata = (setTimeout(useSelector(state => state) , 5000));

    const userdata = useSelector(state => state);

    // props
    const { firstCoin, secondCoin, walletType } = props;

    // state
    const [balData, setBalData] = useState({
        estBal: 0,
        bal: 0,
    })

    const [balances , setBalances] = useState(0);

    // redux
    const walletData = useSelector(state => state.wallet)
    const priceConversion = useSelector(state => state.priceConversion)
    const userSetting = useSelector(state => state.userSetting)
    const currencyData = useSelector(state => state.currency)



    // function
    useEffect(() => {
        if (userSetting && priceConversion && priceConversion.length > 0 && walletData && walletData.length > 0 && currencyData && currencyData.length > 0) {
            let estBal = 0;

            walletData.map(item => {
                let currency = currencyData.find(el => el.coin == item.coin && el.type == 'fiat')
                let walletBal = 0;
                if (walletType == 'spot') walletBal = item.spotBal
                if (walletType == 'derivative') walletBal = item.derivativeBal
                if (walletType == 'p2p') walletBal = item.p2pBal

                if (currency) {
                    if (item.coin == userSetting.currencySymbol) {
                        estBal = estBal + walletBal;
                    } else {
                        let CNVPriceData = priceConversion.find(el => el.baseSymbol == firstCoin && el.convertSymbol == item.coin)
                        if (CNVPriceData) {
                            let CNVPrice = priceConversion.find(el => el.baseSymbol == firstCoin && el.convertSymbol == userSetting.currencySymbol)
                            if (CNVPrice) {
                                estBal = estBal + ((walletBal / CNVPriceData.convertPrice) * CNVPrice.convertPrice)
                            }
                        }
                    }
                } else {
                    let CNVPriceData = priceConversion.find(el => el.baseSymbol == item.coin && el.convertSymbol == userSetting.currencySymbol)
                    if (CNVPriceData) {
                        estBal = estBal + (walletBal * CNVPriceData.convertPrice)
                    }
                }
            })

            let firPriceCNV = priceConversion.find(el => el.baseSymbol == firstCoin && el.convertSymbol == userSetting.currencySymbol)
            if (firPriceCNV) {
                setBalData({
                    estBal,
                    bal: estBal / firPriceCNV.convertPrice,
                })
            }
        }
    }, [userSetting, priceConversion, walletData, currencyData])

    useEffect(() => {
        async function fetchdata(){
            var payload = {
                userid : userdata?.account?.userId,
            }
            var result = await getuserbalancehook(payload);
            
            if(result?.data?.type == "success"){
                setBalances(result?.data?.data);
            }
        }
        fetchdata() ;
    }, [])

    // setreduxdata = () => {
    //      walletData = useSelector(state => state.wallet)
    //      priceConversion = useSelector(state => state.priceConversion)
    //      userSetting = useSelector(state => state.userSetting)
    //      currencyData = useSelector(state => state.currency)
    // }

    return (
        <div className="bor_bottom_s gk">
             <img src={Images.connect} className='bannerconnect'/>
            <div className="wallwet_balance_section">
                {/* {
                    walletType == 'spot' && <small>{t("SPOT_BALANCE")}</small>
                }

                {
                    walletType == 'derivative' && <small>{t("DERIVATIVE_BAL")}</small>
                }

                <h3>{toFixed(balData.bal, 8)}<span>{firstCoin}</span></h3> */}
                <span> {balances?.toFixed(6) + "BTC"}</span>
                {/* currencySymbol(userSetting.currencySymbol)}{toFixed(balData.estBal, 2) */}
            </div>

            {/* <div className="button_clas_wallert">
                <div className="data_inside">
                    <span>24H P&L</span>
                    <div><span> $2.25</span><span>+1.25%</span></div>

                </div>
                <div className="data_inside">
                    <span>Total P&L</span>
                    <div><span>$100.50</span><span> +2.5%</span></div>

                </div>
            </div> */}
        </div>
    )
}

export default Section2;