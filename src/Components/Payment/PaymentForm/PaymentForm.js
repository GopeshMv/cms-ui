import React from "react";
import "./PaymentForm.css";

function PaymentForm() {
    return (
        <form className="PaymentForm">
            <div className="BillingFormHeader">
                <span className="FormTitle">Payment</span>
                <span className="FormDetail">Add your card details</span>
            </div>
            <div className="BillingBody">
                <div className="CardChoice"></div>
                <div className="CardSlideshow"></div>
                <div className="CardDetails">
                    <label for="cardholder" className="BillingLabel">Cardholder's Name</label>
                    <input id="cardholder" name="cardholder" className="BillingTextBox"></input>
                    <label for="cardnumber" className="BillingLabel">Card Number</label>
                    <input id="cardnumber" name="cardnumber" className="BillingTextBox"></input>

                    <div className="BillingDualContainer">
                        <div className="BillingDualItem">
                            <label for="expiry" className="BillingLabel">Expiry</label>
                            <input type="text" id="expiry" name="expiry" className="BillingSmallTextBox"></input>
                        </div>
                        <div className="BillingDualItem">
                            <label for="cvv" className="BillingLabel">CVV</label>
                            <input type="text" id="cvv" name="cvv" className="BillingSmallTextBox"></input>
                        </div>
                    </div>

                    <div className="BillingNextButton Paynow">
                        <span className="BillingNext">Next</span>
                    </div>

                </div>
            </div>
        </form>
    );
}

export default PaymentForm;