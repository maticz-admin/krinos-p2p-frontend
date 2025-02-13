// import package
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode.react";

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import lib
import { toastAlert } from "../../lib/toastAlert";
import isEmpty from "../../lib/isEmpty";
import {createNotification} from '../../actions/notificationAction'
import { createcryptoaddressshook } from "actions/P2PorderAction";
import { useSelector } from "react-redux";

const CryptoDeposit = (props) => {
  const { t, i18n } = useTranslation();
  const [result , setResult] = useState("");

  // props
  const { show, assetData, currency, onHide } = props;
  const userdata = useSelector(state => state);
  useEffect(() => {
    // async function fetchdata(){
    //   if(!assetData.address){
    //     var payload = {
    //       symbol : assetData.coin,
    //       userid : userdata?.account?.userId,
    //       email : userdata?.account?.email
    //     }
    //     var result = await createcryptoaddressshook(payload);
    //     setResult(result?.data?.data);
    //   }
    //   fetchdata();
    // }
  })

  // function
  const handleClose = () => {
    onHide();
  };


  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="pb-3 pt-3">
        <Modal.Title>Crypto Deposit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <div className="form-group floatinglabel">
              <label>{t("DEPOSIT_CURRENCY")}</label>
              <div className="form-group ">
                <div class="seacr_box_s">
                  <input
                    type="text"
                    placeholder=""
                    value={assetData && assetData.coin == "BNB.BSC" ? "BNB(Binance Coin)" : assetData?.coin}
                  />
                </div>
              </div>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12}>
          
            <div className="form-group floatinglabel">
            <label>
              {t("YOUR")} {assetData && assetData.coin == "BNB.BSC" ? "BNB(Binance Coin)" : assetData?.coin} {t("WALLET_ADDRESS")}
            </label>
              <div class="seacr_box_s right_qr_input">
                <input
                  type="text"
                  placeholder=""
                  value={assetData && assetData.address}
                />
                {assetData && !isEmpty(assetData.address) && (
                  <CopyToClipboard
                    text={assetData.address}
                    onCopy={() => {
                      toastAlert("success", "Copied", "wallet");
                    }}
                  >
                    <i class="far fa-copy"></i>
                  </CopyToClipboard>
                )}
              </div>
            </div>
          </GridItem>

          {assetData && !isEmpty(assetData.destTag) && (
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <label>{t("MEMO_TAG")}</label>
              <div className="form-group floatinglabel">
                <div class="seacr_box_s right_qr_input">
                  <input
                    type="text"
                    placeholder=""
                    value={assetData && assetData.destTag}
                  />
                  {assetData && !isEmpty(assetData.destTag) && (
                    <CopyToClipboard
                      text={assetData.destTag}
                      onCopy={() => {
                        toastAlert("success", "Copied", "wallet");
                      }}
                    >
                      <i class="far fa-copy"></i>
                    </CopyToClipboard>
                  )}
                </div>
              </div>
            </GridItem>
          )}

          <GridItem xs={12} sm={12} md={12} lg={12}>
          <label className="text-white white_tac_label mb-3">{t("SCAN_QR_CODE")}</label>
            <div className="qr_cenet new_qrcent">
              
              {!isEmpty(assetData.address) && (
                <div className="qrcode_align qrcode_alignfirst">
                <QRCode value={assetData.address} />
                </div>
              )}
              {!isEmpty(assetData.destTag) && (
                <div className="qrcode_align">
                <QRCode value={assetData.destTag} />
                </div>
              )}
              {/* <img src={require("../../assets/images/qr.png")} alt="logo" className="img-fluid" /> */}
            </div>
          </GridItem>

          <GridItem md={12}>
            <div className="notes_section px-0">
              <p>{t("NOTES")}</p>
              <ul>
                <li>
                  1. {t("MIN_DEPOSIT_LIMIT")}{" "}
                  {currency && currency.depositminlimit}
                </li>
                <li>
                  {" "}
                  2. Deposit minimum deposit limit or greater than deposit limit
                </li>
                <li>3. {t("DEPOSIT_TIME")}</li>
              </ul>
            </div>
          </GridItem>
        </GridContainer>
      </Modal.Body>
    </Modal>
  );
};

export default CryptoDeposit;
