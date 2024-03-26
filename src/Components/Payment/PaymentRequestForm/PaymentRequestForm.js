import React, { useEffect, useState } from "react";
import "./PaymentRequestForm.css";

function PaymentRequestForm ({ requestCompleted }) {
    const [formattedAmount, setFormattedAmount] = useState("");
    const [requestForm, setrequestForm] = useState({
        name: '',
        customerId: '',
        customerName: '',
        topic: '',
        amount: 0,
    });

    const handleCustomerIdBlur = (event) => {
        let customerId = event.target.value;

        setrequestForm({
            ...requestForm,
            customerName: "dummyName"
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        let formattedVal = value;

        if (name == "name") {
            formattedVal = formattedVal.replace(/[^A-Za-z ]/g,"");
        } else if (name == "customerId") {
            formattedVal = formattedVal.replace(/\D/g, "");
        } else if (name == "amount") {
            formattedVal = formattedVal.replace(/Rs\./g, "");

            if (formattedVal[formattedVal.length-4] == ".") {
                formattedVal = formattedVal.replace(/^(.*)\d$/, "$1");
            }
            formattedVal = formattedVal.replace(/[^0-9\.]/g, "");
            formattedVal = formattedVal.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
            

            setFormattedAmount(formattedVal);

            setrequestForm({
                ...requestForm,
                [name]: parseFloat(formattedVal.replace(/[^0-9\.]/g, "")),
            });
            return;
        }
        setrequestForm({
            ...requestForm,
            [name]: formattedVal
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const elements = document.querySelectorAll(".BillingTextBox");
        
        let formValid = true;
        elements.forEach(element => {
            formValid = formValid && (element.value != "");
        });

        console.log(formValid);

        if (formValid) {
            const warning = document.querySelectorAll(".fill-form-warning");

            warning.forEach(e => e.style.display = "none");

            requestCompleted(true);
        } else {
            const warning = document.querySelectorAll(".fill-form-warning");

            warning.forEach(e => e.style.display = "block");
        }

    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    useEffect(() => {
        console.log(requestForm);
    }, [requestForm]);

    return (
        <form className="BillingForm" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <div className="BillingFormHeader">
                <span className="FormTitle">Payment</span>
                <span className="FormDetail">Billing Information</span>
            </div>
            <div className="BillingBody">
                <div className="BillingDetails">
                    <label for="requestName" className="BillingLabel">Name</label>
                    <input type="text" id="requestName" name="name" className="BillingTextBox" value={requestForm.name} onChange={handleChange}></input>

                    <label for="requestCustomerId" className="BillingLabel">Customer's Id</label>
                    <input type="text" id="requestCustomerId" name="customerId" className="BillingTextBox" value={requestForm.customerId} onChange={handleChange} onBlur={handleCustomerIdBlur}></input>

                    <label for="requestCustomerName" className="BillingLabel">Customer's Name</label>
                    <input type="text" id="requestCustomerName" name="customerName" className="BillingTextBox" value={requestForm.customerName} onChange={handleChange} disabled></input>

                    <label for="requestTopic" className="BillingLabel">Payment Regarding</label>
                    <input type="text" id="requesTopic" name="topic" className="BillingTextBox" value={requestForm.topic} onChange={handleChange}></input>

                    <label for="requestAmount" className="BillingLabel">Amount</label>
                    <input type="text" id="requestAmount" name="amount" className="BillingTextBox" value={(formattedAmount != "")? "Rs. " + formattedAmount: ""} onChange={handleChange}></input>


                    <div className="BillingLastSection">
                        <span className="fill-form-warning">*Please fill all the fields</span>
                        <button type="submit" className="BillingNextButton">
                            <span className="BillingNext">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );

}

export default PaymentRequestForm;