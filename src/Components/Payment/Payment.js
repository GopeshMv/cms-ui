import React from "react";
import BillingForm from "./BillingForm/BillingForm";
import PaymentForm from "./PaymentForm/PaymentForm";

function Payment() {
    return (
        <>
            <BillingForm />
            <PaymentForm />
        </>
    );
}

export default Payment;