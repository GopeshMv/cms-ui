import React, { useState, useEffect } from "react";
import { Route } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./Login.css";


function Login({ handleLoginToggle, isLoginActive }) {
    const [alignment, setAlignment] = React.useState('user');
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const fetchData = async () => {
            const apiUrl = `http://localhost:8090/user/Login`;

            const params = new URLSearchParams({
                email: email,
                password: password
            });
            try {
                const response = await fetch(`${apiUrl}?${params}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),  
                  });
                  if(response){
                    console.log(response);
                  }
                  var data = await response.text();
                  if (response.ok && data.includes("Login Successful")) {
                      console.log("Logging successful");
                      data = data.replace(/Login Successful\n/g, "");
                      console.log(data)
                      localStorage.setItem("id", data.split(",")[0]);
                      localStorage.setItem("type", data.split(",")[1]);
                      window.location.href = "/";
                  } else{ 
                      console.log("Enter valid email and password!");
                  }
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    };


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})

    const handleChangeToggle = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    
    const handleChange = (e) => {
        console.log(email,password);
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}
        if (!formData.email.trim()) {
            validationErrors.email = "Email ID is required!";
            console.log("Email ID is required!");
        } else if (!/\S+@\S+\.com/.test(formData.email)) {
            validationErrors.email = "Entered email ID is invalid!";
            console.log("Entered email ID is invalid!");
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Password is required!";
        } else if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$/.test(formData.password)) {
            validationErrors.password = "Password format is invalid!";
            console.log("Enter password satisfying the conditions");
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            console.log("Format is fine");
            ;
        }
    }

    const handleCombinedSubmit = (e) => {
        e.preventDefault();

        handleSubmit(e);
        handleLogin(e);
    };

    return (
        <form className="LoginForm" onSubmit={handleCombinedSubmit}>
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
                            <ToggleButton value="admin">Admin</ToggleButton>
                            <ToggleButton value="user">User</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <div className="CardDetails">
                        <label for="email" className="BillingLabel">Email ID</label>
                        <input name="email" className="BillingTextBox" onChange={(e) => { handleChange(e); setEmail(e.target.value); }}></input>
                        <div className="error-message">{errors.email && <div><span>{errors.email}</span><br/><br/></div>} </div>

                        <label for="password" className="BillingLabel">Password</label>
                        <input name="password" className="BillingTextBox" type="password" onChange={(e) => { handleChange(e); setPassword(e.target.value); }}></input>
                        <div className="error-message">{errors.password && <div><span>{errors.password}</span><br/><br/></div>} </div>

                        <p>Not an Existing User? <button onClick={handleLoginToggle} className="smolRegister">Register</button></p>
                        <button type="submit" className="SignIn">Sign In</button>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}


export default Login;