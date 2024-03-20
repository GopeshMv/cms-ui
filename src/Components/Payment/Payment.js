import React, { useState } from "react";
import BillingForm from "./BillingForm/BillingForm";
import PaymentForm from "./PaymentForm/PaymentForm";

function Payment() {
    const [billingCompleted, setBillingCompleted] = useState(false);
    
    return (
        <>
            { !billingCompleted ?
                <BillingForm billingCompleted={setBillingCompleted}/> :
                <PaymentForm billingCompleted={setBillingCompleted} /> 
            }
        </>
    );
}

export default Payment;