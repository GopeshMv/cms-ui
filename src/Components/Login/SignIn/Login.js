import React, { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./Login.css";


function Login({ handleLoginToggle, isLoginActive }) {
    const [alignment, setAlignment] = React.useState('web');

    const handleChangeToggle = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}
        if(!formData.email.trim()) {
            validationErrors.email = "Email ID is required!"
        } else if(!/\S+@\S+\.com/.test(formData.email)){
            validationErrors.email = "Entered email ID is invalid!"
        }

        if(!formData.password.trim()) {
            validationErrors.password = "Password is required!"
        }

        setErrors(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            alert("Logged in Successfully")
        }

    }
    return (
        <form onSubmit={handleSubmit} className="LoginForm">
            <fieldset disabled={!isLoginActive} className="loginFieldset" >
                <div className="BillingFormHeader">
                    <span className="FormTitle">Login</span>
                    <span className="FormDetail">Please enter your credentials</span>

                </div>
                <div className="BillingBody">
                    <div>
                        <span>Logging in as </span>
                        <ToggleButtonGroup className="Paynow"
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChangeToggle}
                            aria-label="Platform"
                        >
                            <ToggleButton value="Admin">Admin</ToggleButton>
                            <ToggleButton value="User">User</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                
                    <div className="CardDetails">
                        <label for="email" className="BillingLabel">Email ID</label>
                        <input name="email" className="BillingTextBox" onChange={handleChange}></input>
                        {errors.email && <span>{errors.email}</span>} <div></div>

                        <label for="password" className="BillingLabel">Password</label>
                        <input name="password" className="BillingTextBox" type="password" onChange={handleChange}></input>
                        {errors.password && <span>{errors.password}</span>} <div></div>

                        <p>Not an Existing User? <button onClick={handleLoginToggle} className="smolRegister">Register</button></p>
                        <button type="submit" className="SignIn">Sign In</button>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}


export default Login;