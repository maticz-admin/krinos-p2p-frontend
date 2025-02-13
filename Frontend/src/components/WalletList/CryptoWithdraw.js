// import package
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Button, Select, MenuItem } from "@material-ui/core";

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import action
import { withdrawRequestCoin } from "../../actions/walletAction";

// import lib
import isEmpty from "../../lib/isEmpty";
import { coinValidation } from "./validation";
import { toastAlert } from "../../lib/toastAlert";
import { precentConvetPrice } from "../../lib/calculation";
import { encryptObject } from "../../lib/cryptoJS";
import { toFixed } from "lib/roundOf";

const initialFormValue = {
  currencyId: "",
  amount: "",
  receiverAddress: "",
  password: "",
  twoFACode: "",
  finalAmount: "",
};

const CryptoWithdraw = (props) => {
  const { t, i18n } = useTranslation();

  // props
  const { show, assetData, currency, onHide } = props;

  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});
  const [loader, setLoader] = useState(false);
  const [amterr , setAmterr] = useState("")

  const {
    currencyId,
    amount,
    receiverAddress,
    password,
    twoFACode,
    finalAmount,
  } = formValue;

  // function
  const handleClose = () => {
    setFormValue(initialFormValue);
    setValidateError({});
    onHide();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (!isEmpty(validateError)) {
      setValidateError({});
    }

    if (name == "amount") {
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }
      
      let calculated = (parseFloat(value)/100)*parseFloat(currency.withdrawFee)
      let finalAmountBal = parseFloat(value) + parseFloat(calculated);
      let formData = {
        ...formValue,
        ...{ [name]: value, finalAmount: finalAmountBal},
      };
      if(parseFloat(finalAmountBal) > parseFloat(assetData.p2pBal)){
        setAmterr("Insufficient Balance")
      }
      else{
        setAmterr("")
      }
      setFormValue(formData);
      return;
    }

    if (name == "twoFACode") {
      if (!(value == "" || (/^[0-9\b]+$/.test(value) && value.length <= 6))) {
        return;
      }
    }
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
  };

  const handlepaste = async () => {
    // Clipboard.setString('0x4faFe7ac73be383226BF2');
    const text =   await navigator.clipboard.readText()
    // .then((data) => {
    // }) //window.clipboardData.getString();
    let formData = {
      ...formValue,
      ...{ receiverAddress: text},
    };
    setFormValue(formData);
    // setRecepient(text);
    // if(text){
    // }
  };

  const handleSubmit = async () => {
    setLoader(true);
    let reqData = {
      currencyId: currency._id,
      coin: currency.coin,
      tokenType: currency.tokenType,
      minimumWithdraw: currency.minimumWithdraw,
      amount,
      receiverAddress,
      twoFACode,
      finalAmount,
      spotBal: assetData.spotBal,
    };
 let newDoc ={
    "title" : "withdraw request",
    "description" : "withdraw request send Successfully",
    "isRead" : false,
    "trxId" : "",
    "currencySymbol" : "",
    "amount" : 0,
    "paymentType" : "coin_deposit",
    "status" : "new",
 }
    let validationError = coinValidation(reqData, t);
    if (!isEmpty(validationError)) {
      setValidateError(validationError);
      setLoader(false);
      return;
    }

    let encryptToken = {
      token: encryptObject(reqData),
    };

    try {
      const { status, loading, error, message } = await withdrawRequestCoin(
        encryptToken
      );
      setLoader(loading);
      if (status == "success") {
        setFormValue(initialFormValue);
        handleClose();
        // toastAlert("success", t(message), "withdraw");
        toastAlert("success", "Your withdraw request sent to admin", "withdraw");
      } else {
        if (error) {
          setValidateError(error);
          return;
        }
        toastAlert("error", t(message), "withdraw");
      }
    } catch (err) {}
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="pb-3 pt-3">
        <Modal.Title>Withdraw Crypto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={6}>
          
            <div className="form-group floatinglabel">
            <label>{t("AMOUNT")}</label>
              <div class="seacr_box_s padd_right_input">
                <input
                  type="text"
                  placeholder=""
                  name="amount"
                  value={amount}
                  onChange={handleChange}
                />
                <i class="">{assetData && assetData.coin == "BNB.BSC" ? "BNB(Binance Coin)" : assetData?.coin}</i>
              </div>
            </div>
            {validateError.amount && (
              <p className="error-message">{t(validateError.amount)}</p>
            )}
            {amterr && (
              <p className="error-message">{amterr}</p>
            )}
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6} >
          
            <div class="form-group floatinglabel">
            <label>{t("WITHDRAW_ADDRESS")}</label>
              <div class="seacr_box_s">
                <input
                className="receiverAddress_padd_spa"
                  type="text"
                  // name=""
                  name="receiverAddress"
                  value={receiverAddress}
                  onChange={handleChange}
                />
                {/* <i class="fa-regular fa-paste clipboard_ic" onClick={() => handlepaste()}></i> */}
              </div>
              {validateError.receiverAddress && (
                <p className="error-message">
                  {t(validateError.receiverAddress)}
                </p>
              )}
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <div className="wallwt_balance">
              <p>
                {t("WALLET_BALANCE")}
                <span>
                  {assetData && toFixed(assetData.p2pBal , 8)} {assetData.coin == "BNB.BSC" ? "BNB(Binance Coin)" : assetData?.coin}
                </span>
              </p>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6}>
           
            <div className="form-group floatinglabel">
            <label>{t("FINAL_WITHDRAW_AMOUNT_WITH_FEE")}</label>
              <div class="seacr_box_s padd_right_input">
                <input
                  type="text"
                  placeholder=""
                  value={toFixed(finalAmount,8)}
                  disabled
                />
                <i class="">{assetData.coin == "BNB.BSC" ? "BNB(Binance Coin)" : assetData?.coin}</i>
              </div>
            </div>
         
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6}>
           
            <div className="form-group floatinglabel">
            <label>{t("ENTER2FA_CODE")}</label>
              <div class="seacr_box_s">
                <input
                  type="text"
                  placeholder=""
                  name="twoFACode"
                  value={twoFACode}
                  onChange={handleChange}
                />
              </div>
            </div>
            {validateError.twoFACode && (
              <p className="error-message">{t(validateError.twoFACode)}</p>
            )}
          </GridItem>

          <GridItem xs={12} sm={12} md={12} lg={12}>
            <div className="wallwt_balance">
              <p>
                <span>Withdraw Amount with Fee + escrow fee</span>
              </p>
            </div>
          </GridItem>
          <GridItem md={12}>
            <div className="submit_btn w-100">
              <Button
                className="w-100"
                onClick={handleSubmit}
                disabled={loader}
              >
                {loader && <i className="fas fa-spinner fa-spin"></i>}
                {t("WITHDRAW")}
              </Button>
            </div>
          </GridItem>
          <GridItem md={12}>
            <div className="notes_section px-0">
              <p>{t("NOTES")}</p>
              <ul>
                <li>
                  1. {t("MIN_WITHDRAW_LIMIT")}
                  {currency && toFixed(currency.minimumWithdraw,8)}
                </li>
                <li>2. {t("WITHDRAW_PROCESS")}</li>
                <li>3. {t("WITHDRAW_TIME")}</li>
                <li>4. {t("WITHDRAW_PROCESS2")}</li>
              </ul>
            </div>
          </GridItem>
        </GridContainer>
      </Modal.Body>
    </Modal>
  );
};

export default CryptoWithdraw;
