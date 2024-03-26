import React, { useState, useEffect } from "react";
import "./Home.css";
import InfoCard from "./InfoCard/InfoCard";
import CreditCard from "../Card/CreditCard/CreditCard";
import Plus from "../../utils/svg/plus_square.svg";
import CreateCard from "./CreateCard/CreateCard";

const formatDate = (dateString, minusYears = 0) => {
    const date = new Date(dateString);
    date.setFullYear(date.getFullYear() - minusYears);
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${String(month).padStart(2, "0")}/${year}`;
};

function Home() {
    const [creditCardData, setCreditCardData] = useState([]);
    const [updateCards, setUpdateCards] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const fetchData = async () => {
        const apiUrl = `http://localhost:8090/creditcard/creditCard/user?userId=${localStorage.getItem("id")}`;
        const response = await fetch(`${apiUrl}`);
        const data = await response.json();
        if (response.ok) {
            setCreditCardData(data);
        }
    };
    useEffect(() => fetchData, []);

    useEffect(() => {
        const intervalCall = setInterval(() => {
            const d = new Date();
            let seconds = d.getSeconds();
            if (seconds > 6) return;
            fetchData();
        }, 5000);
        return () => {
          // clean up
          clearInterval(intervalCall);
        };
    }, []);

    useEffect(() => {fetchData(); setUpdateCards(false)}, [updateCards]);

    const [showCvvCardNum, setShowCvvCardNum] = useState("");


    return (
        <div className="card-section">
                <div className="card-section-header">
                    <span className="card-section-title">Cards Available</span>
                    <img src={Plus} className="plus-card" onClick={handleOpenDialog}></img>
                    <CreateCard isOpen={isDialogOpen} onClose={handleCloseDialog} update={setUpdateCards} />
                </div>
                <div className="cards-available">
                    <div className="cards">
                        {creditCardData.map((row) => (
                            <InfoCard key={row.cardNumber} balance={row.creditBalance} cardNumber={row.cardNumber} update={setUpdateCards} showCvv={setShowCvvCardNum}>
                                <CreditCard key={row.cardNumber} status={row.activationStatus} bank={row.bank} vendor={row.vendor} cardnumber={row.cardNumber} cardholder={localStorage.getItem("name")} validfrom={formatDate(row.expireDate, 5)} validthru={formatDate(row.expireDate)} cvv={row.cvv} showCvv={showCvvCardNum == row.cardNumber} />
                            </InfoCard>
                        )).reverse()}
                    </div>
                </div>
                
            </div>
        
    );
}

export default Home;