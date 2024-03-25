import React, { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./Register.css";

function Register({ handleLoginToggle, isRegisterActive }) {
    const [alignment, setAlignment] = React.useState('web');

    const handleChangeToggle = (event, newAlignment) => {
        setAlignment(newAlignment);
    }


    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phoneNo: '',
        address: '',
        password: '',
        confirmPassword: ''
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

        if(!formData.name.trim()){
            validationErrors.name = "Name is required!"
        }

        if(!formData.phoneNo.trim()){
            validationErrors.phoneNo = "Ph no is required!"
        }

        if(!formData.address.trim()){
            validationErrors.address = "Address is required!"
        }

        if(!formData.password.trim()) {
            validationErrors.password = "Password is required!"
        } else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(formData.password)){
            validationErrors.password = "Password format is invalid!"
        }

        if(formData.confirmPassword !== formData.password){
            validationErrors.confirmPassword = "Does not match the password!"
        }

        setErrors(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            alert("Registered Successfully")
        }

    }
    return (
        <form onSubmit = {handleSubmit} className="RegisterForm">
            <fieldset disabled={!isRegisterActive} className ="registerFieldset" >
                <div className="BillingFormHeader">
                    <span className="FormTitle">Registration</span>
                    <span className="FormDetail">Please enter your details</span>
                </div>
                <div className="BillingBody">
                    <div >
                        <span >Registering as </span>
                        <ToggleButtonGroup className="Paynow"
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChangeToggle}
                            aria-label="Platform"
                        >
                            <ToggleButton value="Customer">Customer</ToggleButton>
                            <ToggleButton value="Merchant">Merchant</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="CardDetails">
                        <label for="email" className="BillingLabel">Email ID</label>
                        <input name="email" className="BillingTextBox" type = "email" onChange={handleChange}></input>
                        {errors.email && <span>{errors.email}</span>} <div></div>

                        <label for="name" className="BillingLabel">Name</label>
                        <input name="name" className="BillingTextBox" type="text" onChange={handleChange}></input>
                        {errors.name && <span>{errors.name}</span>} <div></div>

                        <label for="phoneNo" className="BillingLabel">Ph No</label>
                        <input name="phoneNo" className="BillingTextBox" type="text" onChange={handleChange}></input>
                        {errors.phoneNo && <span>{errors.phoneNo}</span>} <div></div>

                        <label for="address" className="BillingLabel">Address</label>
                        <input name="address" className="BillingTextBox" type="text" onChange={handleChange}></input>
                        {errors.address && <span>{errors.address}</span>} <div></div>

                        <label for="password" className="BillingLabel">Password</label>
                        <input name="password" className="BillingTextBox" type="password" onChange={handleChange}></input>
                        {errors.password && <span>{errors.password}</span>} <div></div>

                        <label for="confirmPassword" className="BillingLabel">Confirm Password</label>
                        <input name="confirmPassword" className="BillingTextBox" type="password" onChange={handleChange}></input>
                        {errors.confirmPassword && <span>{errors.confirmPassword}</span>} <div></div>

                        <p>Existing User? <button onClick={handleLoginToggle} className="smolLogin">Login</button></p>
                        <button type="submit" className="SignIn">Register</button>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}


export default Register;