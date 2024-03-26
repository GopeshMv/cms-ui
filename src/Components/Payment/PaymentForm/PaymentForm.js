import React, { useContext, useEffect, useState } from "react";
import "./PaymentForm.css";
import CreditCardSlideshow from "../../Card/CreditCardSlideshow/CreditCardSlideshow";
import CreditCard from "../../Card/CreditCard/CreditCard";
import leftArrow from "../../../utils/svg/left_arrow.svg";
import verifiedIcon from "../../../utils/svg/verified.svg";
import './PinDialog.js';
import PinDialog from "./PinDialog.js";
import { useMyContext } from "../ContextProvider.js";

const formatDate = (dateString, minusYears = 0) => {
    const date = new Date(dateString);
    date.setFullYear(date.getFullYear() - minusYears);
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${String(month).padStart(2, "0")}/${year}`;
};

function PaymentForm({ billingCompleted, paymentCompleted, amount, merchant }) {
    const [currentCard, setCurrentCard] = useState({});
    const [formattedCardholder, setformattedCardholder] = useState("");
    const [formattedExpiry, setformattedExpiry] = useState("");
    const [formattedCardnumber, setformattedCardnumber] = useState("");
    const [formattedCvv, setformattedCvv] = useState("");
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(0);
    const [creditCardData, setCreditCardData] = useState([]);
    const { paymentId } = useMyContext();

    const paymentRequestId = paymentId;

    //console.log(paymentId);
    // console.log(currentCard);   
    // useEffect(() => {}, [currentCard]);


    const handleOpen = () => {
        const elements = document.querySelectorAll(".verified-icon, .verified-icon-small");
        let formValid = true;
        // console.log(elements);
        elements.forEach(element => {
            // console.log(element.style.display);
            formValid = formValid && (element.style.display == "block");
        });
        if (formValid) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `http://localhost:8090/creditcard/creditCard/user?userId=${localStorage.getItem("id")}`;
            const response = await fetch(`${apiUrl}`);
            const data = await response.json();
            setCreditCardData(data);
        };
        fetchData();
    }, []);

    // console.log(creditCardData);

    const postPayment = async (inputPin) => {
        try {
            const requestBody = {
                inputPin: inputPin,
                paymentRequestId: paymentRequestId
            };
            const requestParam = currentCard.cardnumber;

            const response = await fetch(`http://localhost:8090/transaction/initiate?cardNumber=${requestParam}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log(data);

            paymentCompleted(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCardinputBlur = (event, expectedValue) => {
        let currentValue = event.target.value;
        let amex = /\d{4} \d{6} \d{5}/
        let notamex = /(\d{4} ){3}\d{4}/
        if (amex.test(currentValue) || notamex.test(currentValue)) {
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
        if (currentCard.vendor == "AmEx") {
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
            event.nativeEvent.inputType == "deleteContentBackward" &&
            /^\d\d\/$/.test(formattedVal)
        ) {
            formattedVal = formattedVal.replace(/(\d\d)\//, "$1");
            setformattedExpiry(formattedVal);

            return;
        }

        if (
            event.nativeEvent.inputType == "deleteContentBackward" &&
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
            formattedVal = formattedVal.slice(0, 2) + "/" + formattedVal.slice(2, 4);
        }

        setformattedExpiry(formattedVal);
    };

    const handleCvvChange = (event) => {
        const inputVal = event.target.value;
        let formattedVal = inputVal;

        formattedVal = formattedVal.replace(/\D/g, "");
        formattedVal = formattedVal.replace(/^(\d{3}).*$/, "$1");

        setformattedCvv(formattedVal);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

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
    }, []);

    
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
                    { creditCardData.map(row => {
                        if (row.activationStatus == "ACTIVATED") {
                            return <CreditCard key={row.cardNumber} bank={row.bank} vendor={row.vendor} cardnumber={row.cardNumber} cardholder={localStorage.getItem("name")} validfrom={formatDate(row.expireDate, 5)} validthru={formatDate(row.expireDate)} cvv={row.cvv}/>;
                        }
                        return;
                    })}
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
                            <input type="password" id="cvv" name="cvv" className="BillingSmallTextBox" value={formattedCvv} onChange={handleCvvChange} onBlur={(event) => handleCardinputBlur(event, currentCard.cvv)}></input>
                            <img src={verifiedIcon} className="verified-icon"></img>
                        </div>
                    </div>

                    <button onClick={handleOpen} type="submit" className="BillingNextButton Paynow">
                        <span className="BillingNext">Pay Now</span>
                    </button>
                    <PinDialog open={open} onClose={handleClose} setInputValue={setInputValue} postPayment={postPayment} />

                    {amount && merchant ?
                        <div style={{ paddingTop: '5vh' }}>
                            <span><p>Paying to {merchant} the amount: {amount} </p></span>
                        </div> : <div style={{ paddingTop: '5vh' }}>
                            <span><p>Select the respective payment request!</p></span>
                        </div>
                    }
                </div>
            </div>

        </form>
    );
}

export default PaymentForm;

