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


function QuickView() {
    return (
        <>
            <Card sx={{ minWidth: 530, minHeight: 400, margin: 1, backgroundColor: "#E1E2F7" }}>
                <CardContent className="Card">
                    <IconButton aria-label="EditIcon" size="small" sx={{marginLeft:"93%"}}>
                    <EditIcon className="icon" />
                    </IconButton>
                        <Typography>
                            <img src={profile_logo} alt=""></img>
                        </Typography>
                        <Typography variant="body" component="h2">
                            John Doe
                        </Typography>
                        <Typography variant="body" component="h2">
                            ICICI
                        </Typography>
                        <Typography variant="body" component="h2">
                            Customer
                        </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default QuickView;

