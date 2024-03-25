import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from './Components/SideNav/SideNav';
import TopNav from './Components/TopNav/TopNav';
import Home from './Components/Home/Home';
import Payment from './Components/Payment/Payment';
import Account from './Components/Account/Account';
import TransactionTable from './Components/Transactions/TransactionTable';


function App() {
    return (
        <div className="App">
            <SideNav />
            <div className="Main">
                <TopNav />
                <div className="Body">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route index element={<Home />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/transactions" element={<TransactionTable />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>

        </div>
    );
}

export default App;
