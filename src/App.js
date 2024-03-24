import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from './Components/SideNav/SideNav';
import TopNav from './Components/TopNav/TopNav';
import Home from './Components/Home/Home';
import Payment from './Components/Payment/Payment';
import Transactions from './Components/Transactions/Transactions';
import Account from './Components/Account/Account';
import Login from './Components/Login/SignIn/Login.js';
import Register from './Components/Login/Register/Register.js';
import { useState } from 'react';


function App() {
    const [isLoginActive,setIsLoginActive]=useState(true)
    const [isRegisterActive,setIsRegisterActive]=useState(false)

    const handleLoginToggle = (e) =>{
        e.preventDefault();
        setIsLoginActive(!isLoginActive);
        setIsRegisterActive(!isRegisterActive);
    }
    // console.log(isLoginActive,isRegisterActive);
    return (
        <div className="App">
            {/* <div className="Login">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
            <div className="Register">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </div> */}
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
            </BrowserRouter>
        </div >
        // <div className="App"></div>
        /* <div>
        <SideNav />
        <div className="Main">
            <TopNav />
            <div className="Body">
                <BrowserRouter>
                    <Routes>

                        <Route path="/home" element={<Home />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/transactions" element={<Transactions />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
        </div> */
        // </div>       
    );
}

export default App;
