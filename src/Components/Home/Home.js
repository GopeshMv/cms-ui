import React from "react";
import "./Home.css";
import InfoCard from "./InfoCard/InfoCard";
import CreditCard from "../Card/CreditCard/CreditCard";
import Plus from "../../utils/svg/plus_square.svg";

function Home() {
    return (
        <>
            <div className="card-section">
                <div className="card-section-header">
                    <span className="card-section-title">Cards Available</span>
                </div>
                <div className="cards-available">
                    <div className="cards">
                        <InfoCard>
                            <CreditCard bank="boa" vendor="AmEx" cardnumber="438965210748592" cardholder="John Doe" validfrom="02/24" validthru="02/29" status="ACTIVATED" />
                        </InfoCard>
                        <InfoCard>
                            <CreditCard bank="sbi" vendor="MasterCard" cardnumber="5724130964873218" cardholder="John Doe" validfrom="02/24" validthru="02/29" status="REQUESTED" />
                        </InfoCard>
                        <InfoCard>
                            <CreditCard bank="sbi" vendor="MasterCard" cardnumber="5724130964873218" cardholder="John Doe" validfrom="02/24" validthru="02/29" status="ACTIVATED" />
                        </InfoCard>
                        <InfoCard>
                            <CreditCard bank="sbi" vendor="MasterCard" cardnumber="5724130964873218" cardholder="John Doe" validfrom="02/24" validthru="02/29" status="REQUESTED" />
                        </InfoCard>
                        <InfoCard>
                            <CreditCard bank="sbi" vendor="MasterCard" cardnumber="5724130964873218" cardholder="John Doe" validfrom="02/24" validthru="02/29" status="REQUESTED" />
                        </InfoCard>
                    </div>
                </div>
                
            </div>

            
        </>
        
    );
}

export default Home;