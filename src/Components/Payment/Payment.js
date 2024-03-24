import React, { useState } from "react";
import BillingForm from "./BillingForm/BillingForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import PaymentStatus from "./PaymentStatus/PaymentStatus";
import PaymentRequestForm from "./PaymentRequestForm/PaymentRequestForm";

function Payment() {
    const [billingCompleted, setBillingCompleted] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [requestCompleted, setRequestCompleted] = useState(false);

    let user = "customer" ; // customer or merchant

    return (
        <>
            { user == "customer" ?
                ( !paymentCompleted ?
                    (
                        !billingCompleted ?
                        <BillingForm billingCompleted={setBillingCompleted}/> :
                        <PaymentForm billingCompleted={setBillingCompleted} paymentCompleted={setPaymentCompleted}/> 
                    ) :
                    <PaymentStatus />
                ) :
                <PaymentRequestForm requestCompleted={setRequestCompleted} />
    
            }
        </>
    );
}

export default Payment;