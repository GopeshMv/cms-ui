import React, { useEffect, useState } from "react";
import "./PaymentForm.css";
import CreditCardSlideshow from "../../Card/CreditCardSlideshow/CreditCardSlideshow";
import CreditCard from "../../Card/CreditCard/CreditCard";
import leftArrow from "../../../utils/svg/left_arrow.svg";
import verifiedIcon from "../../../utils/svg/verified.svg";

function PaymentForm({ billingCompleted, paymentCompleted }) {
    const [currentCard, setCurrentCard] = useState({});
    const [formattedCardholder, setformattedCardholder] = useState("");
    const [formattedExpiry, setformattedExpiry] = useState("");
    const [formattedCardnumber, setformattedCardnumber] = useState("");
    const [formattedCvv, setformattedCvv] = useState("");


    const handleCardinputBlur = (event, expectedValue) => {
        let currentValue = event.target.value;
        let amex = /\d{4} \d{6} \d{5}/
        let notamex = /(\d{4} ){3}\d{4}/
        if (amex.test(currentValue) || notamex.test(currentValue)){
            currentValue = currentValue.replace(/\D/g, "");
        }
        // console.log(currentValue + "\n" + expectedValue);
        if (currentValue != "" && currentValue != expectedValue) {
            event.target.style.border = "2px solid #dc3545";
            event.target.previousElementSibling.style.display = "block";
            event.target.nextElementSibling.style.display = "none";
        } else {
            event.target.style.border = "1px solid #000000";
            event.target.previousElementSibling.style.display = "none";
            event.target.nextElementSibling.style.display = "block";

            if (currentValue == "") {
                event.target.nextElementSibling.style.display = "none";
            }
        }
    }

    const handleCardholderChange = (event) => {
        const inputVal = event.target.value;
        let formattedVal = inputVal;

        formattedVal = formattedVal.replace(/\d/g, "");

        setformattedCardholder(formattedVal);
    }

    const handleCardnumberChange = (event) => {
        const inputVal = event.target.value;
        let formattedVal = inputVal;

        formattedVal = formattedVal.replace(/\D/g, "");
        if (currentCard.vendor == "AmEx"){
            formattedVal = formattedVal.replace(/(\d{4})(\d{0,6})(\d{0,5})(\d)*/, "$1 $2 $3").trim();
        } else {
            formattedVal = formattedVal.replace(/(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})(\d)*/, "$1 $2 $3 $4").trim();
        }

        setformattedCardnumber(formattedVal);
    };

    const handleExpiryChange = (event) => {
        const inputVal = event.target.value;
        let formattedVal = inputVal;


        if (
            event.nativeEvent.inputType == "deleteContentBackward"  && 
            /^\d\d\/$/.test(formattedVal)
        ) {
            formattedVal = formattedVal.replace(/(\d\d)\//, "$1");
            setformattedExpiry(formattedVal);

            return;
        }

        if (
            event.nativeEvent.inputType == "deleteContentBackward"  && 
            /^\d\d$/.test(formattedVal)
        ) {
            formattedVal = formattedVal.replace(/(\d)\d\//, "$1");
            setformattedExpiry(formattedVal);

            return;
        }

        formattedVal = formattedVal.replace(/\D/g, "");
        formattedVal = formattedVal.replace(/^[2-9]/, "");
        formattedVal = formattedVal.replace(/^1[3-9]/, "1");
        

        if (formattedVal.length >= 2) {
            formattedVal = formattedVal.slice(0, 2) + "/" + formattedVal.slice(2,4);
        }

        setformattedExpiry(formattedVal);
    };  

    const handleCvvChange = (event) => {
        const inputVal = event.target.value;
        let formattedVal = inputVal;

        formattedVal = formattedVal.replace(/\D/g,"");
        formattedVal = formattedVal.replace(/^(\d{3}).*$/, "$1");

        setformattedCvv(formattedVal);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const elements = document.querySelectorAll(".verified-icon, .verified-icon-small");
        let formValid = true;
        console.log(elements);
        elements.forEach(element => {
            console.log(element.style.display);
            formValid = formValid && (element.style.display == "block");
        });

        // console.log(formValid);

        if (formValid) {
            paymentCompleted(true);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    useEffect(() => {
        setformattedCardholder("");
        setformattedCardnumber("");
        setformattedExpiry("");

        const elements = document.querySelectorAll(".invalid-warning, .invalid-warning-small, .verified-icon, .verified-icon-small");
        elements.forEach(element => {
            element.style.display = "none";
        });
    }, [currentCard]);
    
    return (
        <form className="PaymentForm" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <div className="backArrowContainer" onClick={(event) => billingCompleted(false)}>
                <img src={leftArrow} alt="" className="PaymentBackArrow"></img>
            </div>
            {JSON.stringify(currentCard)}
            <div className="BillingFormHeader">
                <span className="FormTitle">Payment</span>
                <span className="FormDetail">Add your card details</span>
            </div>
            <div className="BillingBody">
                <div className="CardChoice"></div>
                <CreditCardSlideshow passCardToParent={setCurrentCard}>
                    <CreditCard bank="boa" vendor="AmEx" cardnumber="438965210748592" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="boa" vendor="Discover" cardnumber="5164028369514708" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="boa" vendor="MasterCard" cardnumber="5189753024698135" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="boa" vendor="Visa" cardnumber="5146238097458362" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="citi" vendor="AmEx" cardnumber="456210948756321" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="citi" vendor="Discover" cardnumber="5142073985624703" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="citi" vendor="MasterCard" cardnumber="5801346928570139" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="citi" vendor="Visa" cardnumber="5236748190362475" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="hdfc" vendor="AmEx" cardnumber="467821059463207" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="hdfc" vendor="Discover" cardnumber="5213496078351264" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="hdfc" vendor="MasterCard" cardnumber="5548320194762308" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="hdfc" vendor="Visa" cardnumber="5581436927045362" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="icici" vendor="AmEx" cardnumber="487321059674302" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="icici" vendor="Discover" cardnumber="5553024768942130" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="icici" vendor="MasterCard" cardnumber="5932167401859372" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="icici" vendor="Visa" cardnumber="5210436978351426" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="sbi" vendor="AmEx" cardnumber="427819056304198" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="sbi" vendor="Discover" cardnumber="5391246087264315" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="sbi" vendor="MasterCard" cardnumber="5724130964873218" cardholder="John Doe" validfrom="02/24" validthru="02/29" />
                    <CreditCard bank="sbi" vendor="Visa" cardnumber="5341672980452361" cardholder="Jane Doe" validfrom="02/24" validthru="02/29" />
                </CreditCardSlideshow>
                <div className="CardDetails">
                    <label for="cardholder" className="BillingLabel">Cardholder's Name</label>
                    <div className="invalid-warning">*Name doesn't match the above card</div>
                    <input id="cardholder" name="cardholder" className="BillingTextBox" value={formattedCardholder} onChange={handleCardholderChange} onBlur={(event) => handleCardinputBlur(event, currentCard.cardholder)}></input>
                    <img src={verifiedIcon} className="verified-icon"></img>
                    <label for="cardnumber" className="BillingLabel">Card Number</label>
                    <div className="invalid-warning">*Card number doesn't match the above card</div>
                    <input id="cardnumber" name="cardnumber" className="BillingTextBox" value={formattedCardnumber} onChange={handleCardnumberChange} onBlur={(event) => handleCardinputBlur(event, currentCard.cardnumber)}></input>
                    <img src={verifiedIcon} className="verified-icon"></img>
                    <div className="BillingDualContainer">
                        <div className="BillingDualItem">
                            <label for="expiry" className="BillingLabel">Expiry</label>
                            <div className="invalid-warning-small">*Expiry doesn't match</div>
                            <input type="text" id="expiry" name="expiry" className="BillingSmallTextBox" value={formattedExpiry} onChange={handleExpiryChange} onBlur={(event) => handleCardinputBlur(event, currentCard.validthru)} placeholder="MM/YY"></input>
                            <img src={verifiedIcon} className="verified-icon-small"></img>
                        </div>
                        <div className="BillingDualItem">
                            <label for="cvv" className="BillingLabel">CVV</label>
                            <div className="invalid-warning">*CVV doesn't match</div>
                            <input type="password" id="cvv" name="cvv" className="BillingSmallTextBox" value={formattedCvv} onChange={handleCvvChange} onBlur={(event) => handleCardinputBlur(event, "123")}></input>
                            <img src={verifiedIcon} className="verified-icon"></img>
                        </div>
                    </div>

                    <button type="submit" className="BillingNextButton Paynow">
                        <span className="BillingNext">Pay Now</span>
                    </button>

                </div>
            </div>
        </form>
    );
}

export default PaymentForm;