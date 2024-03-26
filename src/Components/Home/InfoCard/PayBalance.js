import React, { useState } from 'react';
import "./PayBalance.css"

function PayBalance ({ isOpen, onClose, balance, card }) {
    const [formData, setFormData] = useState({
        accountId: localStorage.getItem("accountId"),
        password: '',
        amount: undefined,
    });


    const handleChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const postCreditPayment = async () => {
        try {
            let requestBody;
            if (formData.amount == undefined) {
                requestBody = {
                    accountId: localStorage.getItem("accountId"),
                    password: formData.password
                };
            } else {
                requestBody = {
                    accountId: localStorage.getItem("accountId"),
                    password: formData.password,
                    amount: formData.amount
                }
            }
            const requestParam = card;

            const response = await fetch(`http://localhost:8090/transaction/creditBalancePayment?cardNumber=${requestParam}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log(data);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        postCreditPayment();
        setFormData({
            ...formData,
            password: "",
            amount: undefined
        })
        onClose();
    };



    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>Credit Balance Payment</h2>
                <form onSubmit={handleSubmit}>
                    <label>Account Id:</label>
                    <input type="text" name="accountId" value={formData.accountId} onChange={handleChange} />
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    <div>
                        <label>Amount:</label>
                        <input type="text" name="amount" value={formData.amount} onChange={handleChange} placeholder={balance + " (full balance)"}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={onClose} className="dialog-close">Close</button>
            </div>
        </div>
    );
}

export default PayBalance;
