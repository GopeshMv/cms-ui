import React from "react";
import "./QuickView.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import profile_logo from "../../../utils/svg/profile.svg";
import { IconButton } from "@mui/material";
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useState, useEffect } from "react";
import axios from "axios";
//import { async } from "q";

function QuickView() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [DetailList, setDetailList] = useState({});
    const [DetailBalance, setDetailBalance] = useState({});

    const [userName, setUserName] = useState('');

    const handleInputChange = (event) => {
        setUserName(event.target.value);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        fetchDetail();
    }, []);

    const fetchDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8090/account/1`);
            console.log('Response:', response); // Log the full response
            const name = response.data.user.name;
            const balance = response.data.balance;
            const openDate = response.data.openDate;
            const password = response.data.password;
            const type = response.data.user.type;
            const bankType = response.data.bankType;
            const address = response.data.user.address;
            const email = response.data.user.email;
            const phone = response.data.user.phone;
            console.log(address, email, phone);
            setDetailList({ name: name, balance: balance, openDate: openDate, password: password, type: type, bankType: bankType, phone: phone, email: email, address: address })

            const response2 = await axios.get(`http://localhost:8090/account/LastDate/1`);
            console.log('Response:', response2); // Log the full response
            const amount = response2.data.amount;
            const date = response2.data.date;
            setDetailBalance({ amount: amount, date: date })
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };


    const handleSubmit = async () => {
        console.log('New UserName:', DetailList.email);
        try {
            const nameChange = await axios.put('http://localhost:8090/user/update', {
                userId: localStorage.getItem("id"),
                name: userName,
                address: DetailList.address,
                email: DetailList.email,
                phone: DetailList.phone
            });
        }
        catch {
            console.log("fetch error");
        }
        handleClose();
        fetchDetail();
    };

    return (
        <>
            <Card sx={{ width: 1000, height: 750, marginLeft: 8, backgroundColor: "#E1E2F7" }}>
                <CardContent className="Card">
                    <IconButton aria-label="EditIcon" aria-describedby={id} size="small" sx={{ marginLeft: "93%" }} onClick={handleClick}>
                        <EditIcon className="icon" />
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box>
                            <TextField id="outlined-basic" label="New UserName" variant="outlined" sx={{ margin: 1 }} onChange={handleInputChange} />
                            <Button variant="contained" sx={{ margin: 1, marginTop: 2 }} onClick={handleSubmit}>Submit</Button>
                        </Box>
                    </Popover>
                    <Typography>
                        <img src={profile_logo} alt=""></img>
                    </Typography>
                    <Typography variant="body" component="h2">
                        {DetailList.name}
                    </Typography>
                    <Typography variant="body" component="h2">
                        {DetailList.bankType}
                    </Typography>
                    <Typography variant="body" component="h2">
                        {DetailList.type}
                    </Typography>
                    <Typography variant="body" component="h1">
                        Open Date
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{ margin: 1, fontSize: "25px" }}>
                        {DetailList.openDate}
                    </Typography>
                    <Typography variant="body" component="h1">
                        Balance
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{ margin: 2, fontSize: "20px" }}>
                        <CurrencyRupeeIcon sx={{ fontSize: "17px" }} />{DetailList.balance}
                    </Typography>
                    <Typography variant="body" component="h1">
                        Last Payment
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{ margin: 2, fontSize: "20px" }}>
                        <CurrencyRupeeIcon sx={{ fontSize: "17px" }} />{DetailBalance.amount}
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{ fontSize: "20px" }}>
                        On {DetailBalance.date}
                    </Typography>
                </CardContent>
            </Card>

        </>
    );
}

export default QuickView;
