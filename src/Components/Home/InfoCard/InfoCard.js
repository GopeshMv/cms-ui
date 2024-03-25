import React from "react";
import "./InfoCard.css";
import CreditCard from "../../Card/CreditCard/CreditCard";
import CardActiveSvg from "../../../utils/svg/card_active.svg";
import CardInactiveSvg from "../../../utils/svg/card_inactive.svg";
import CardCvvEyeSvg from "../../../utils/svg/eye.svg";


function InfoCard ({ children }) {
    // console.log(children.props);
    return (
        <div className="info-card">
            {children}
            <div className="card-ops">
                <div className="credit-balance-section">
                    <div className="credit-balance-container">
                        <span className="credit-balance">Rs. 52,101.80</span>
                    </div>
                    <div className="credit-balance-footer">
                        <span className="credit-balance-footer-title">Credit Balance</span>
                        <div className="credit-balance-pay">Pay</div>
                    </div>
                </div>
                <div className="action-section">
                    <img src={CardCvvEyeSvg}></img>
                    { children.props.status == "ACTIVATED" ?
                        <img src={CardActiveSvg}></img> :
                        <img src={CardInactiveSvg}></img> 
                    }
                </div>
            </div>
        </div>
    );
};

export default InfoCard;