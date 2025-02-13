import React, { useEffect } from "react";
import Checkbox from 'rc-checkbox';
import { useTranslation } from 'react-i18next';
// import component
import OrderHistory from '../components/OrderHistory';
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "../components/Footer"
import Header from "components/Header/Header.js";
import Announcement from '../components/Announcement'


const dashboardRoutes = [];

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title="TOSSVTOSS"
  }, []);
  return null;
}

export default function StakingPage(props) {

  const { t, i18n } = useTranslation();
  const { ...rest } = props;

  return (
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
          <div className="dashboardContent userPages px-3">

            <div className="p2p_card p2p_card1 border-none min-h-auto">
              <div className="container-fluid">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5} lg={5}>
                    <h3 className="dash_title login_title_8">{t('ORDERS')}</h3>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={7} lg={7}>
                    <Announcement />
                  </GridItem>
                </GridContainer>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <OrderHistory />
                  </GridItem>
                </GridContainer>




                {/* <Staking /> */}
                {/*  */}



              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* model */}


      <div class="modal fade" id="lockedSubscribeETH" tabindex="-1" role="dialog" aria-labelledby="lockedSubscribeETHCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="SubscribeETHLongTitle">{t('SUBSCRIBE_ETH')}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="modedl_subscribe_content">
                <div className="duration_slecys">
                  <label>Duration (Days)</label>
                  <div className="duration margin_conten mt-2">
                    <ul class="nav nav-tabs pl-0">
                      <li class="active"><a data-toggle="tab" class="active" href="">30</a></li>
                      <li><a data-toggle="tab" class="" href="">60</a></li>
                      <li><a data-toggle="tab" class="" href="">90</a></li>
                    </ul>
                  </div>
                </div>

                <div className="entaer_amount">
                  <label>{t('LOT_AMOUNT')}<span>{t('AVAILABLE_LOTS')}<a href="" className="ml-2">{t('ALL')}</a></span></label>
                  <div className="seacr_box_s d-flex">
                    <input type="text" value="1.23659878" className="w-100" />
                    <span>ETH</span>
                  </div>
                  <p>{t('STAKE_LIMIT')}:<span>{t('MINIMUM_LOT')}</span></p>
                </div>
                <div className="contsnt_cls_model">
                  <div>
                    <span>{t('LOT_SIZE')}</span>
                    <span>0.1 BTC</span>
                  </div>
                  <div>
                    <span>{t('INTEREST_PER_LOT')}</span>
                    <span>0.00015068 BTC</span>
                  </div>
                  <div>
                    <span>{t('INDIVIDUAL_MAX')}</span>
                    <span>200 Lots</span>
                  </div>
                  <div>
                    <span>{t('VALUE_DATE')}</span>
                    <span>2021-11-18 05:30</span>
                  </div>
                  <div>
                    <span>{t('REDEMPTION_DATE')}</span>
                    <span>2022-05-18 05:30</span>
                  </div>
                  <div>
                    <span>{t('EXPECT_INTEREST')}</span>
                    <span className="color_green">0.00254 BTC</span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <Checkbox
                      name="isTerms"

                    />
                    <label className="form-check-label" for="flexCheckDefault">
                  {t('HAVE_READ_AND_AGREE')} <a href=""> {t('STAKING_TERMS')}</a>
                    </label>
                  </div>

                  <button type="button" class="btn btn-primary w-100 mt-3" >
                    {t('CONFIRM')}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="modal fade" id="SubscribeETH" tabindex="-1" role="dialog" aria-labelledby="SubscribeETHCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="SubscribeETHLongTitle">{t('SUBSCRIBE_ETH')}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="modedl_subscribe_content">
                <div className="duration_slecys">
                  <label>{t('DURATION_DAYS')}</label>
                  <div className="duratin-a">
                    <p>{t('FLEXIBLE')}</p>
                  </div>
                </div>
                <div className="wlleet_ballece">
                  <h3>{t('WALLET_BALANCE')}<span>2.23569878 ETH</span></h3>
                </div>
                <div className="entaer_amount">
                  <label>{t('SUBSCRIPTION_AMOUNT')}<a href="">{t('ALL')}</a></label>
                  <div className="seacr_box_s d-flex">
                    <input type="text" value="1.23659878" className="w-100" />
                    <span>ETH</span>
                  </div>
                  <p>Stake Limit:<span>Minimum 0.01 ETH</span></p>
                </div>
                <div className="contsnt_cls_model">
                  <div>
                    <span>{t('SUBSCRIPTION_DATE')}</span>
                    <span>2021-11-17 10:47</span>
                  </div>
                  <div>
                    <span>{t('VALUE_DATE')}</span>
                    <span>2021-11-18 05:30</span>
                  </div>
                  <div>
                    <span>{t('INTEREST_RATE')}</span>
                    <span className="color_green">25.50%</span>
                  </div>
                  <div>
                    <span>{t('INT_DURATION_TIME')}</span>
                    <span>2021-11-19 05:30</span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <Checkbox
                      name="isTerms"

                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      {t('HAVE_READ_AND_AGREE')} <a href=""> {t('STAKING_TERMS')}</a>
                    </label>
                  </div>

                  <button type="button" class="btn btn-primary w-100 mt-3" >
                    {t('CONFIRM')}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
