import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from './Components/SideNav/SideNav';
import TopNav from './Components/TopNav/TopNav';
import Home from './Components/Home/Home';
import Payment from './Components/Payment/Payment';
import Account from './Components/Account/Account';
import Login from './Components/Login/SignIn/Login.js';
import Register from './Components/Login/Register/Register.js';
import Admin from './Components/Admin/Admin.js'
import { useState } from 'react';
import TransactionTable from './Components/Transactions/TransactionTable';
import Merchant from './Components/Merchant/Merchant.js';


function App() {
    const [isLoginActive, setIsLoginActive] = useState(true)
    const [isRegisterActive, setIsRegisterActive] = useState(false)

    const handleLoginToggle = (e) =>{
        e.preventDefault();
        setIsLoginActive(!isLoginActive);
        setIsRegisterActive(!isRegisterActive);
    }
    // console.log(isLoginActive,isRegisterActive);
    // console.log(getCookieValue("userId"));
    return (
        <div className="App">
                { localStorage.getItem("id") == null ? 
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <div className="container">
                                    <div className="Login">
                                        <Login handleLoginToggle={handleLoginToggle} isLoginActive={isLoginActive} />
                                    </div>
                                    <div className="Register">
                                        <Register handleLoginToggle={handleLoginToggle} isRegisterActive={isRegisterActive} />
                                    </div>
                                </div>
                            } /> 
                        </Routes>
                    </BrowserRouter> :
                    ( localStorage.getItem("type") == "Customer" ? 
                        <>
                            <SideNav />
                            <div className="Main">
                                <TopNav />
                                <div className="Body">
                                    <BrowserRouter>
                                        <Routes>
                                            <Route path="/" element={<Home />} />
                                            <Route path="/home" element={<Home />} />
                                            <Route path="/account" element={<Account />} />
                                            <Route path="/payment" element={<Payment />} />
                                            <Route path="/transactions" element={<TransactionTable />} />
                                        </Routes>
                                    </BrowserRouter>
                                </div>
                            </div>
                        </> :
                        <>
                            <Merchant />
                        </>
                    )
                } 
        </div >
        
    );
}

export default App;
