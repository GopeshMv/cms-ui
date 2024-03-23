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
import { useState, useEffect } from "react";
import axios from "axios";

function QuickView() {
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
                <CardContent className="Card">
                    <IconButton aria-label="EditIcon" size="small" sx={{ marginLeft: "93%" }} onClick={handleClick}>
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
                                <TextField id="outlined-basic" label="New UserName" variant="outlined" sx={{ margin: 1 }} />
                                <Button variant="contained" sx={{ margin: 1, marginTop: 2 }}>Submit</Button>
                            </Box>
                        </Popover>
                        <EditIcon className="icon" />
                    </IconButton>
                    <Typography>
                        <img src={profile_logo} alt=""></img>
                    </Typography>
                    <Typography variant="body" component="h2">
                        {DetailList.name}
                    </Typography>
                    <Typography variant="body" component="h2">
                        ICICI
                    </Typography>
                    <Typography variant="body" component="h2">
                        {DetailList.type}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default QuickView;

