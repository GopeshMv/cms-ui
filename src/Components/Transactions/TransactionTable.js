import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './TransactionTable.css'
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import xml2js from 'xml-js';


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


function TransactionTable() {

    const [data, setData] = useState([]);
    const [invoiceData, setInvoiceData] = useState(null);
    const [open, setOpen] = useState(false);
    const [processedInvoiceData, setProcessedInvoiceData] = useState(null);

    useEffect(() => {
        if (processedInvoiceData) {
            generatePDF();
        }
    }, [processedInvoiceData]);

    useEffect(() => {
        const fetchdata = async () => {
            const apiUrl = `http://localhost:8090/transaction/user/all`;
            const apiParams = localStorage.getItem("id");
            const response = await fetch(`${apiUrl}?userId=${apiParams}`);
            const responseData = await response.json();
            console.log(responseData);
            if (response.ok)
                setData(responseData);
        };
        fetchdata();
    }, []);

    const fetchInvoice = async (transId) => {
        const apiUrl = `http://localhost:8090/user/customer/requestInvoice`;
        const payload = {
            transactionID: transId,
        };
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        const result = xml2js.xml2js(responseData.invoiceBody, { compact: true, spaces: 4 });
        setInvoiceData(result.invoice);

        if (result.invoice) {
            const invoiceDataResult = {
                customerName: result.invoice.customer.name._text,
                customerAddress: result.invoice.customer.address._text,
                transactionAmount: result.invoice.transaction.amount._text,
                transactionDate: result.invoice.transaction.date._text,
                transactionMerchant: result.invoice.transaction.merchant._text,
            };
            setProcessedInvoiceData(invoiceDataResult);
        }
    };


    function generatePDF() {
        // Create a new jsPDF instance
        if (processedInvoiceData) {
            const doc = new jsPDF();

            // Set the document title
            doc.setFontSize(20);
            doc.text("Invoice", 20, 20);

            // Reset the font size for the rest of the document
            doc.setFontSize(12);

            // Add the invoice data
            doc.text(`Customer Name: ${processedInvoiceData.customerName}`, 20, 40);
            doc.text(`Address: ${processedInvoiceData.customerAddress}`, 20, 50);
            doc.text(`Amount: ${processedInvoiceData.transactionAmount}`, 20, 60);
            doc.text(`Date: ${processedInvoiceData.transactionDate}`, 20, 70);
            doc.text(`Merchant: ${processedInvoiceData.transactionMerchant}`, 20, 80);

            // Save the PDF
            doc.save("invoice.pdf");
        } else {
            console.log("WAITING");
        }

    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to close the dialog
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Transaction_ID</StyledTableCell>
                            <StyledTableCell align="left">Transaction_Date</StyledTableCell>
                            <StyledTableCell align="left">Merchant</StyledTableCell>
                            <StyledTableCell align="left">Topic</StyledTableCell>
                            <StyledTableCell align="left">Amount</StyledTableCell>
                            <StyledTableCell align="left">Invoice</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.transactionID}>
                                <StyledTableCell component="th" scope="row">
                                    {row.transactionID}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.transactionDateTime}</StyledTableCell>
                                <StyledTableCell align="left">{row.merchant}</StyledTableCell>
                                <StyledTableCell align="left">{row.topic}</StyledTableCell>
                                <StyledTableCell align="left">{row.amount}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <Button onClick={async () => {fetchInvoice(row.transactionID)}}>Generate Invoice</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TransactionTable;