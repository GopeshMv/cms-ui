import React, { useState } from "react";
import BillingForm from "./BillingForm/BillingForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import PaymentStatus from "./PaymentStatus/PaymentStatus";

function Payment() {
    const [billingCompleted, setBillingCompleted] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    
    return (
        <>
            { !paymentCompleted ?
                (
                    !billingCompleted ?
                    <BillingForm billingCompleted={setBillingCompleted}/> :
                    <PaymentForm billingCompleted={setBillingCompleted} paymentCompleted={setPaymentCompleted}/> 
                ) :
                <PaymentStatus />
            }
        </>
    );
}

export default Payment;