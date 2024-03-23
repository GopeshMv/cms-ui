import React from "react";
import "./AccountDetails.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';

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
    return (
        <>
            <Card sx={{ minWidth: 530, minHeight: 400, margin: 1, backgroundColor: "#E1E2F7" }}>
                <CardContent sx={{ margin: 6.5 }}>
                    <Typography variant="body" component="h1">
                        Open Date:
                    </Typography>
                    <Typography variant="body1" component="h1" sx={{ margin: 3, marginLeft: 10, fontSize: "25px" }}>
                        25Feb,2524
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
                            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                        </Popover>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default AccountDetails;