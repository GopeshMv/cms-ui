import React from "react";
import "./SideNav.css";
import profile_logo from "../../utils/svg/profile.svg";
import home_logo from "../../utils/svg/home.svg";
import account_logo from "../../utils/svg/account.svg";
import payment_logo from "../../utils/svg/payment.svg";
import transactions_logo from "../../utils/svg/transactions.svg";
import logout_logo from "../../utils/svg/logout.svg";

function SideNav() {
    return (
        <div className="SideNav">
            <div className="Logo">
            </div>
            <div className="UserCard">
                <div className="UserCard-icon">
                    <img src={profile_logo} alt=""></img>
                </div>
                <div className="UserDetails">
                    <span className="UserName">John Doe</span>
                    <span className="UserUUID">2341****</span>
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
                    <div className="Link">
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