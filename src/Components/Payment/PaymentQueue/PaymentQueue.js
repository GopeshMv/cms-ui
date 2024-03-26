import { useState, useEffect } from 'react';
import './PaymentQueue.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { useMyContext } from '../ContextProvider';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function PaymentQueue({ setAmount, setMerchant }) {

    const { paymentId, setPaymentId } = useMyContext();
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `http://localhost:8090/user/paymentRequests?userId`;
            const apiParams = localStorage.getItem("id");
            const response = await fetch(`${apiUrl}=${apiParams}`);
            const responseData = await response.json();
            if (response.ok) {
                setData(responseData);
            }
        }
        fetchData();
    }, []);

    const handleClick = (row) => {
        if (selectedRow === row.paymentRequestId) {
            setSelectedRow(null);
            setMerchant(null);
            setAmount(null);
        } else {
            setSelectedRow(row.paymentRequestId);
            setMerchant(row.merchantName);
            setAmount(row.requestAmount);
            setPaymentId(row.paymentRequestId);
        }
    };

    console.log(data);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Merchant</StyledTableCell>
                        <StyledTableCell align="left">PaymentRequestDate</StyledTableCell>
                        <StyledTableCell align="left">Topic</StyledTableCell>
                        <StyledTableCell align="left">RequestAmount</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => {
                        if (row.status != "PENDING") return;
                        return  <StyledTableRow key={row.paymentRequestId}>
                                    <StyledTableCell><Checkbox checked={row.paymentRequestId === selectedRow} onChange={() => handleClick(row)} /></StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.merchantName}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.paymentRequestDate}</StyledTableCell>
                                    <StyledTableCell align="left">{row.topic}</StyledTableCell>
                                    <StyledTableCell align="left">{row.requestAmount}</StyledTableCell>
                                </StyledTableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PaymentQueue;
