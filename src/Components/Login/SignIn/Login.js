import React, { useState } from "react";
import "./Login.css";


function Login({ handleLoginToggle, isLoginActive }) {
    const [email, setEmail] = useState("");
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
                        <label for="email" className="BillingLabel">Email ID</label>
                        <input name="email" className="BillingTextBox" required type = "email"></input>
                        <label for="password" className="BillingLabel">Password</label>
                        <input name="password" className="BillingTextBox" required type = "password"></input>
                        <p>Not an Existing User? <button onClick={handleLoginToggle} className="smolRegister">Register</button></p>
                        <button className="SignIn">Sign In</button>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}


export default Login;