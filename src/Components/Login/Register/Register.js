import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./Register.css";

function Register({ handleLoginToggle, isRegisterActive }) {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    return (
        <form className="RegisterForm">
            <fieldset disabled={!isRegisterActive} className="registerFieldset" >
                <div className="BillingFormHeader">
                    <span className="FormTitle">Registration</span>
                    <span className="FormDetail">Please enter your details</span>
                </div>
                <div className="BillingBody">
                    <div >
                        <span className="BillingLabel">Registering as </span>
                        <ToggleButtonGroup className="Paynow"
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="Customer">Customer</ToggleButton>
                            <ToggleButton value="Merchant">Merchant</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="CardChoice"></div>
                    <div className="CardSlideshow"></div>
                    <div className="CardDetails">
                        <label for="email" className="BillingLabel">Email ID</label>
                        <input name="email" className="BillingTextBox" type="email" required></input>
                        <label for="name" classph noName="BillingLabel">Name</label>
                        <input name="name" className="BillingTextBox" required></input>
                        <label for="phone no" className="BillingLabel">Ph No</label>
                        <input name="phone no" className="BillingTextBox" required></input>
                        <label for="address" className="BillingLabel">Address</label>
                        <input name="address" className="BillingTextBox" required></input>
                        <label for="password" className="BillingLabel">Password</label>
                        <input name="password" className="BillingTextBox" type="password" required></input>
                        <label for="confirm password" className="BillingLabel">Confirm Password</label>
                        <input name="confirm password" className="BillingTextBox" type="password" required></input>
                        <p>Existing User? <button onClick={handleLoginToggle} className="smolLogin">Login</button></p>
                        <button onClick={handleLoginToggle} className="SignIn">Register</button>

                        {/* <div className="" */}
                    </div>
                </div>
            </fieldset>
        </form>
    );
}


export default Register;