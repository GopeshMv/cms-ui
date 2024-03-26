import React, { useEffect, useState } from "react";
import "./SideNav.css";
import profile_logo from "../../utils/svg/profile.svg";
import home_logo from "../../utils/svg/home.svg";
import account_logo from "../../utils/svg/account.svg";
import payment_logo from "../../utils/svg/payment.svg";
import transactions_logo from "../../utils/svg/transactions.svg";
import logout_logo from "../../utils/svg/logout.svg";
import Logout from "../Login/Logout";

function SideNav() {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `http://localhost:8090/user/`;
            const apiPath = localStorage.getItem("id");
            const response = await fetch(`${apiUrl}${apiPath}`);
            const responseData = await response.json();
            if (response.ok) {
                setUserData(responseData);
                localStorage.setItem("name", responseData["name"]);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `http://localhost:8090/user/account`;
            const apiPath = localStorage.getItem("id");
            const response = await fetch(`${apiUrl}?userId=${apiPath}`);
            const responseData = await response.json();
            if (response.ok) {
                localStorage.setItem("bank", responseData["bankType"]);
                localStorage.setItem("accountId", responseData["accountId"]);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="SideNav">
            <div className="Logo">
            </div>
            <div className="UserCard">
                <div className="UserCard-icon">
                    <img src={profile_logo} alt=""></img>
                </div>
                <div className="UserDetails">
                    <span className="UserName">{userData["name"]}</span>
                    <span className="UserUUID">{userData["email"]}</span>
                </div>
            </div>
            <div className="Links">
                <div className="TopLinks">
                    <a href="/" className="Link">
                        <div className="Link-icon">
                            <img src={home_logo} alt=""></img>
                        </div>
                        <span className="Link-text">Home</span>
                    </a>
                    <a href="account" className="Link">
                        <div className="Link-icon">
                            <img src={account_logo} alt=""></img>
                        </div>
                        <span className="Link-text">Account</span>
                    </a>
                    <a href="payment" className="Link">
                        <div className="Link-icon">
                            <img src={payment_logo} alt=""></img>
                        </div>
                        <span className="Link-text">Payment</span>
                    </a>
                    <a href="transactions" className="Link">
                        <div className="Link-icon">
                           <img src={transactions_logo} alt=""></img>
                        </div>
                        <span className="Link-text">Transactions</span>
                    </a>
                    
                </div>
                <div className="BottomLinks">
                    <div className="Link" onClick={Logout}>
                        <div className="Link-icon">
                            <img src={logout_logo} alt=""></img>
                        </div>
                        <span className="Link-text">Logout</span>
                    </div>
                </div>
            </div>
            <div className="Copyright">
                Ⓒ CMS Inc. All Rights Reserved.
            </div>
        </div>
    );
}

export default SideNav;