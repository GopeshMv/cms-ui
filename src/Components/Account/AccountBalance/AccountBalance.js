import React from "react";
import "./AccountBalance.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function AccountBalance() {
    return (
        <>
            <Card sx={{ minWidth: 530, minHeight: 400, margin: 1, backgroundColor: "#E1E2F7" }}>
                <CardContent sx={{margin:7}}>
                    <Typography variant="body" component="h1">
                        Balance:
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{margin:2, marginLeft:10,fontSize:"20px"}}>
                        <CurrencyRupeeIcon sx={{fontSize:"17px"}}/>1000.00
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