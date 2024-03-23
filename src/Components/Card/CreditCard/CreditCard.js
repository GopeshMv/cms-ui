import React from 'react';
import "./CreditCard.css";
import amex_logo from "../../../utils/logo/vendor/amex.svg";
import discover_logo from "../../../utils/logo/vendor/discover.svg";
import mastercard_logo from "../../../utils/logo/vendor/mastercard.svg";
import visa_logo from "../../../utils/logo/vendor/visa.svg";
import wifi_logo from "../../../utils/svg/cardwifi.svg";
import chip_logo from "../../../utils/svg/cardchip.svg";
import boa_logo from "../../../utils/logo/bank/boa.svg";
import citi_logo from "../../../utils/logo/bank/citi.svg";
import hdfc_logo from  "../../../utils/logo/bank/hdfc.svg";
import icici_logo from "../../../utils/logo/bank/icici.svg";
import sbi_logo from "../../../utils/logo/bank/sbi.svg";

function BankLogo({ bank }) {
    switch (bank) {
        case "boa":
            return <img className="bank-boa" src={boa_logo}></img>;
        case "citi":
            return <img className="bank-citi" src={citi_logo}></img>;
        case "hdfc":
            return <img className="bank-hdfc" src={hdfc_logo}></img>;
        case "icici":
            return <img className="bank-icici" src={icici_logo}></img>;
        case "sbi":
            return <img className="bank-sbi" src={sbi_logo}></img>;
        default:
            break;
    }

    return;
}

function VendorLogo({ vendor }) {
    switch (vendor) {
        case "AmEx":
            return <img className="vendor-amex" src={amex_logo}></img>;
        case "Discover":
            return <img className="vendor-discover" src={discover_logo}></img>;
        case "MasterCard":
            return <img className="vendor-mastercard" src={mastercard_logo}></img>;
        case "Visa":
            return <img className="vendor-visa" src={visa_logo}></img>
        default:
            break;
    }

    return;
}

function CardNumber({ vendor, cardnumber }) {
    if (vendor != "AmEx") {
        return (
            <>
                <span className="card-number-part">{cardnumber.slice(0,4)}</span>
                <span className="card-number-part">{cardnumber.slice(4,8)}</span>
                <span className="card-number-part">{cardnumber.slice(8,12)}</span>
                <span className="card-number-part">{cardnumber.slice(12,)}</span>
            </>
        );
    } else {
        return (
            <>
                <span className="card-number-part">{cardnumber.slice(0,4)}</span>
                <span className="card-number-part">{cardnumber.slice(4,10)}</span>
                <span className="card-number-part">{cardnumber.slice(10,)}</span>
            </>
        );
    }
}

function CreditCard({ cardnumber, validfrom, validthru, cardholder, bank, vendor }) {
    return (
        <div className="custom-card">
            <div className="card-bank">
                <BankLogo bank={bank} />
            </div>
            <div className="card-wifi">
                <img src={wifi_logo}></img>
            </div>
            <div className="card-chip">
                <img src={chip_logo}></img>
            </div>
            <div className="card-vendor">
                <VendorLogo vendor={vendor} />
            </div>
            <div className={"card-number " + ((vendor == "AmEx") ? "card-number-amex": "")}> 
                <CardNumber vendor={vendor} cardnumber={cardnumber} />
            </div>
            <div className="card-details">
                <div className="card-expiry">
                    <div className="card-expiry-thru">
                        <span className="valid-thru-title">VALID THRU</span>
                        <span className="valid-thru-value">{validthru}</span>
                    </div>
                    <div className="card-expiry-from">
                        <span className="valid-from-title">VALID FROM</span>
                        <span className="valid-from-value">{validfrom}</span>
                    </div>
                </div>
                <span className="card-holder">{cardholder}</span>
            </div>
        </div>
        );
}
    
export default CreditCard;
    