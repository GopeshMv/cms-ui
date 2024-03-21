import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from './Components/SideNav/SideNav';
import TopNav from './Components/TopNav/TopNav';
import Home from './Components/Home/Home';
import Payment from './Components/Payment/Payment';
import Transactions from './Components/Transactions/Transactions';
import Account from './Components/Account/Account';
import Login from './Components/Login/Login';


function App() {
    return (
        <div className="App">
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
            {/* <div>
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
            </div> */}
        </div>       
        );
    }
    
    export default App;
    