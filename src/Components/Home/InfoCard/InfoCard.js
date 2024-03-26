import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import CreditCard from "../../Card/CreditCard/CreditCard";
import CardActiveSvg from "../../../utils/svg/card_active.svg";
import CardInactiveSvg from "../../../utils/svg/card_inactive.svg";
import CardCvvEyeSvg from "../../../utils/svg/eye.svg";
import PayBalance from "./PayBalance";


const formatINRAmount = (amount) => {
    const parts = amount.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
    parts[1] = parts[1] ? parts[1].padEnd(2, '0').substring(0, 2) : '00'; 

    return `Rs. ${parts.join('.')}`;
};

function InfoCard ({ children, balance, cardNumber, update, showCvv }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        update(true);
    };

    const handleShowCvv = () => {
        showCvv(cardNumber);
        
    };
    setTimeout(() => showCvv(""), 10000);



    // console.log(children.props);
    return (
        <div className="info-card">
            {children}
            <div className="card-ops">
                <div className="credit-balance-section">
                    <div className="credit-balance-container">
                        <span className="credit-balance">{formatINRAmount(balance)}</span>
                    </div>
                    <div className="credit-balance-footer">
                        <span className="credit-balance-footer-title">Credit Balance</span>
                        <div className="credit-balance-pay" onClick={handleOpenDialog}>Pay</div>
                        <PayBalance isOpen={isDialogOpen} onClose={handleCloseDialog} balance={formatINRAmount(balance)} card={cardNumber} />

                    </div>
                </div>
                <div className="action-section">
                    <img src={CardCvvEyeSvg} onClick={handleShowCvv}></img>
                    { children.props.status == "ACTIVATED" ?
                        <img src={CardActiveSvg} title="Card is Active"></img> :
                        <img src={CardInactiveSvg} title="Card is Inactive"></img> 
                    }
                </div>
            </div>
        </div>
    );
};

export default InfoCard;