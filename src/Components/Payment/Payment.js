import React, { useState } from "react";
import BillingForm from "./BillingForm/BillingForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import PaymentStatus from "./PaymentStatus/PaymentStatus";
import PaymentQueue from "./PaymentQueue/PaymentQueue";
import { ContextProvider } from "./ContextProvider";

function Payment() {
    const [billingCompleted, setBillingCompleted] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [amount, setAmount] = useState(null);
    const [merchant, setMerchant] = useState(null);

    return (
        <>
            <ContextProvider>
                {!paymentCompleted ?
                    (
                        !billingCompleted ?
                            <BillingForm billingCompleted={setBillingCompleted} /> :
                            <PaymentForm billingCompleted={setBillingCompleted} paymentCompleted={setPaymentCompleted} amount={amount} merchant={merchant} />
                    ) :
                    <PaymentStatus />
                }
                <PaymentQueue setAmount={setAmount} setMerchant={setMerchant} />
            </ContextProvider>
        </>
    );
}

export default Payment;