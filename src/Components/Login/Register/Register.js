import React, { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./Register.css";

function Register({ handleLoginToggle, isRegisterActive }) {
    const [alignment, setAlignment] = React.useState('customer');
    const [email, setEmail] = useState('');
    const [accountPassword, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [bankType, setBankType] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const apiUrl = (alignment === "customer") ? `http://localhost:8090/user/customer` : `http://localhost:8090/user/merchant`;
        const postData = {
            userId: 0,
            name: formData.name,
            address: formData.address,
            email: formData.email,
            phone: formData.phone,
            type: "string",
            status: "string",
            accountPassword: formData.password,
            bankType: formData.bankType
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response from backend:', data);
                console.log("Registration successful");
                alert("Registeration successful");
            } else {
                console.log("Error: Failed to register. Please check your input data.");
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const handleChangeToggle = (event, newAlignment) => {
        setAlignment(newAlignment);
    }


    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        bankType: '',
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleCombinedSubmit = (e) => {
        e.preventDefault();

        handleSubmit(e);
        handleRegister(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}

        if (!formData.email || !formData.email.trim()) {
            validationErrors.email = "Email ID is required!";
        } else if (!/\S+@\S+\.com/.test(formData.email)) {
            validationErrors.email = "Entered email ID is invalid!";
        }

        if (!formData.name || !formData.name.trim()) {
            validationErrors.name = "Name is required!";
        }

        if (!formData.phone || !formData.phone.trim()) {
            validationErrors.phone = "Ph no is required!";
        }

        if (!formData.address || !formData.address.trim()) {
            validationErrors.address = "Address is required!";
        }

        if (!formData.password || !formData.password.trim()) {
            validationErrors.password = "Password is required!";
        } else if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/.test(formData.password)) {
            validationErrors.password = "Password format is invalid!";
            console.log("Enter password satisfying the conditions");
        }

        if (formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = "Does not match the password!";
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            console.log("Registeration format is correct");
        }


    }
    return (
        <form onSubmit={(formData.password === formData.confirmPassword) && handleCombinedSubmit} className="RegisterForm">
            <fieldset disabled={!isRegisterActive} className="registerFieldset" >
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
                            <ToggleButton value="customer">Customer</ToggleButton>
                            <ToggleButton value="merchant">Merchant</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="CardDetails">
                        <label for="email" className="BillingLabel">Email ID</label>
                        <input name="email" className="BillingTextBox" type="email" onChange={(e) => { handleChange(e); setEmail(e.target.value); }} />
                        <div className="error-message">{errors.email && <div><span>{errors.email}</span><br /></div>} </div>

                        <label for="name" className="BillingLabel">Name</label>
                        <input name="name" className="BillingTextBox" type="text" onChange={(e) => { handleChange(e); setName(e.target.value); }} />
                        <div className="error-message">{errors.name && <div><span>{errors.name}</span><br /></div>} </div>

                        <label for="phone" className="BillingLabel">Phone No</label>
                        <input name="phone" className="BillingTextBox" type="text" onChange={(e) => { handleChange(e); setPhone(e.target.value); }} />
                        <div className="error-message">{errors.phone && <div><span>{errors.phone}</span><br /></div>} </div>

                        <label for="address" className="BillingLabel">Address</label>
                        <input name="address" className="BillingTextBox" type="text" onChange={(e) => { handleChange(e); setAddress(e.target.value); }} />
                        <div className="error-message">{errors.address && <div><span>{errors.address}</span><br /></div>} </div>

                        <label for="bankType" className="BillingLabel">Bank Type</label>
                        <select name="bankType" id="bankType" className="BillingTextBox" onClick={(e) => { handleChange(e); setBankType(e.target.value); }} required>
                            <option value="sbi">State Bank of India</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="boa">Bank of America</option>
                            <option value="citi">Citibank</option>
                        </select>
                        <label for="password" className="BillingLabel">Password</label>
                        <input name="password" className="BillingTextBox" type="password" onChange={(e) => { handleChange(e); setPassword(e.target.value); }} />
                        <div className="error-message">{errors.password && <div><span>{errors.password}</span><br /></div>} </div>

                        <label for="confirmPassword" className="BillingLabel">Confirm Password</label>
                        <input name="confirmPassword" className="BillingTextBox" type="password" />
                        <div className="error-message">{errors.confirmPassword && <div><span>{errors.confirmPassword}</span><br /></div>} </div>

                        <p>Existing User? <button onClick={handleLoginToggle} className="smolLogin">Login</button></p>
                        <button type="submit" className="SignIn" disabled={formData.password !== formData.confirmPassword}>
                            Register
                        </button>
                        {/* <button type="submit" className="SignIn">Register</button> */}
                    </div>
                </div>
            </fieldset>
        </form>
    );
}


export default Register;