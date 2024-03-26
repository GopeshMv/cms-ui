import React, { useState, useEffect } from "react";
import "./CreateCard.css";
import CreditCard from "../../Card/CreditCard/CreditCard";

const formatDate = (minusYears = 0) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - minusYears);
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${String(month).padStart(2, "0")}/${year}`;
};

function CreateCard ({ isOpen, onClose, update}) {
    const [formData, setFormData] = useState({
        cardnumber: "",
        bank: localStorage.getItem("bank"),
        vendor: "AmEx",
        cardholder: localStorage.getItem("name"),
        validthru: formatDate(-5),
        validfrom: formatDate(),
        pin: ""
    });
    const [showSuccess, setShowSuccess] = useState(false);


    const handleChange = (e) => {
        console.log(e.target.name,e.target.value);

        setFormData({ ...formData, 
            [e.target.name]: e.target.value,
            cardnumber: "",
            pin: ""
        });
        console.log(formData);

    };

    const postCard = async () => {
        try {
            const requestBody = {
                    pinNumber: 0,
                    vendor: formData.vendor
                };
            const requestParam = localStorage.getItem("accountId");

            const response = await fetch(`http://localhost:8090/creditcard/accountId?accountId=${requestParam}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();

            if (response.ok){
                setFormData({
                    ...formData,
                    cardnumber: data.cardNumber,
                    pin: data.pinNumber,
                });
                setShowSuccess(true);
            }


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        postCard();
        
        update(true);
    };



    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>Create Card</h2>
                <form onSubmit={handleSubmit}>
                    <CreditCard bank={formData.bank} vendor={formData.vendor} cardholder={formData.cardholder} cardnumber={formData.cardnumber} validfrom={formData.validfrom} validthru={formData.validthru}/>
                    <label>Vendor:</label>
                    <select name="vendor" id="vendor" className="custom-select-dropdown" value={formData.vendor} onChange={handleChange}>
                        <option value="AmEx">American Express</option>
                        <option value="Discover">Discover</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="Visa">Visa</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={onClose} className="dialog-close">Close</button>
                {showSuccess && <span className="success-message">Card Created! (Pin: {formData.pin})</span>}
            </div>
        </div>
    );
}

export default CreateCard;