import React from "react";
import "./Login.css";


function Login({ handleLoginToggle, isLoginActive }) {
    return (
        <form className="LoginForm">
            <fieldset disabled={!isLoginActive} className="loginFieldset" >
                <div className="BillingFormHeader">
                    <span className="FormTitle">Login</span>
                    <span className="FormDetail">Please enter your credentials</span>
                </div>
                <div className="BillingBody">
                    <div className="CardChoice"></div>
                    <div className="CardSlideshow"></div>
                    <div className="CardDetails">
                        <label for="cardholder" className="BillingLabel">Email ID</label>
                        <input id="cardholder" name="cardholder" className="BillingTextBox"></input>
                        <label for="cardnumber" className="BillingLabel">Password</label>
                        <input id="cardnumber" name="cardnumber" className="BillingTextBox"></input>
                        <p>Not an Existing User? <button onClick={handleLoginToggle} className="smolRegister">Register</button></p>
                        <button className="SignIn">Sign In</button>

                        {/* <div className="" */}
                    </div>
                </div>
            </fieldset>
        </form>
    );
}


export default Login;