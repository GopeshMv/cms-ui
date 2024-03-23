import React from "react";
import "./AccountDetails.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";


function AccountDetails() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                <CardContent sx={{ margin: 6.5 }}>
                    <Typography variant="body" component="h1">
                        Open Date:
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{ margin: 3, marginLeft: 10, fontSize: "25px" }}>
                        {DetailList.openDate}
                    </Typography>
                    <Typography variant="body" component="h1">
                        Account Settings:
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{ margin: 3, marginLeft: 10, fontSize: "20px" }}>
                        <Button variant="contained" onClick={handleClick}>Change Password</Button>
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
                            <TextField id="outlined-basic" label="New Password" variant="outlined" sx={{margin:1}} />
                            <Button variant="contained" sx={{margin:1, marginTop:2}}>Submit</Button>
                            </Box>
                        </Popover>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default AccountDetails;