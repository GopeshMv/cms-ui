import React from "react";
import './PaymentStatus.css';

const iconContainerStyle = {
    width: '20%',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
};

const PaymentStatus = () => {
    return (
        <div className="main">
            <div className="card">
                <div style={iconContainerStyle}>
                    <svg viewBox="0 0 16 16" width="32" height="32" fill="green">
                        <path d="M13.5 3.5L6 11.086L2.5 7.586L1.086 9L6 13.914L15 5" />
                    </svg>
                </div>
                <h2>Success</h2>
                <p>Your payment is done; we'll be in touch shortly!</p>
            </div>
        </div>
    );
};

export default PaymentStatus;