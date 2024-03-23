import React from "react";
import "./AccountBalance.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useState, useEffect } from "react";
import axios from "axios";

function AccountBalance() {
    const [DetailList, setDetailList] = useState({});

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/account/1`);
                console.log('Response:', response); // Log the full response
                const name = response.data.user.name;
                const balance = response.data.balance;
                const openDate = response.data.openDate;
                const password = response.data.password;
                const type = response.data.user.type;
                console.log(name);
                setDetailList({name:name,balance:balance,openDate:openDate,password:password,type:type})
               
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchDetail();
    }, []);
    return (
        <>
            <Card sx={{ minWidth: 530, minHeight: 400, margin: 1, backgroundColor: "#E1E2F7" }}>
                <CardContent sx={{margin:7}}>
                    <Typography variant="body" component="h1">
                        Balance:
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{margin:2, marginLeft:10,fontSize:"20px"}}>
                        <CurrencyRupeeIcon sx={{fontSize:"17px"}}/>{DetailList.balance}
                    </Typography>
                    <Typography variant="body" component="h1">
                        Last Payment:
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{margin:2, marginLeft:10,fontSize:"20px"}}>
                    <CurrencyRupeeIcon sx={{fontSize:"17px"}}/>1000.00
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{marginLeft:20,fontSize:"20px"}}>
                        On Feb 25,2024
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default AccountBalance;