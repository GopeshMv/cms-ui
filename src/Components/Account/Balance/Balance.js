import React from "react";
import "./Balance.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function QuickView() {
    return (
        <>
            <Card sx={{ minWidth:530,minHeight:400, margin:1, backgroundColor:"#E1E2F7" }}>
                <CardContent  className="Card">
                    <Typography>
                        Balance
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    );
}

export default QuickView;

