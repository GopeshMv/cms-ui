import React, { useEffect, useState } from "react";
import "./Merchant.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import '../Transactions/TransactionTable.css'
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import xml2js from 'xml-js';
import Logout from "../Login/Logout";


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

function Merchant() {
    const [data, setData] = useState([]);
    const [invoiceData, setInvoiceData] = useState(null);
    const [open, setOpen] = useState(false);
    const [processedInvoiceData, setProcessedInvoiceData] = useState(null);
    const [formData, setFormData] = useState([])


    // useEffect(() => {
    //     const fetchdata = async () => {
    //         const apiUrl = `http://localhost:8090/transaction/all`;
    //         const apiParams = '2';
    //         const response = await fetch(`${apiUrl}`);
    //         const responseData = await response.json();
    //         console.log(responseData);
    //         setData(responseData);
    //     };
    //     fetchdata();
    // }, []);

    useEffect(() => {
        const paymentRequestData = async () => {
            const apiParams = localStorage.getItem("id");
            const apiUrl = `http://localhost:8090/user/merchant/paymentRequests?userId=${apiParams}`;
            const response = await fetch(`${apiUrl}`);
            const responseData = await response.json();
            console.log(responseData);
            setData(responseData);
        };
        paymentRequestData();
    }, []);

    const [isDisabled, setIsDisabled] = useState(true);
    const invoiceButton = (e) => {
        if (data.status === "COMPLETED") {
            setIsDisabled(!isDisabled);
        };
    }

    function createPaymentRequest() {
        const postPaymentRequest = async () => {
            const apiUrl = `http://localhost:8090/user/merchant/newPaymentRequest`;
            const payload = {
                paymentRequestId: '0',
                merchantId: localStorage.getItem("id"),
                customerId: requestForm.customerId,
                paymentRequestDate: "2024-03-26T07:19:53.482Z",
                topic: requestForm.topic,
                status: "string",
                requestAmount: requestForm.amount
            };
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            const responseData = await response.json();
            alert("Payment Request Initiated")
        };
        postPaymentRequest();
    };

    // useEffect(() => {
    //     const fetchInvoice = async () => {
    //         const apiUrl = `http://localhost:8090/user/merchant/requestInvoice`;
    //         const payload = {
    //             transactionID: '1'
    //         };
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'content-type': 'application/json',
    //             },
    //             body: JSON.stringify(payload),
    //         });
    //         const responseData = await response.json();
    //         const result = xml2js.xml2js(responseData.invoiceBody, { compact: true, spaces: 4 });
    //         setInvoiceData(result.invoice);

    //         if (result.invoice) {
    //             const invoiceDataResult = {
    //                 customerName: result.invoice.customer.name._text,
    //                 customerAddress: result.invoice.customer.address._text,
    //                 transactionAmount: result.invoice.transaction.amount._text,
    //                 transactionDate: result.invoice.transaction.date._text,
    //                 transactionMerchant: result.invoice.transaction.merchant._text,
    //             };
    //             setProcessedInvoiceData(invoiceDataResult);
    //         }
    //     };
    //     fetchInvoice();
    // }, []);

    function generatePDF() {
        // Create a new jsPDF instance
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
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to close the dialog
    const handleClose = () => {
        setOpen(false);
    };

    const [formattedAmount, setFormattedAmount] = useState("");
    const [requestForm, setrequestForm] = useState({
        name: '',
        customerId: '',
        customerName: '',
        topic: '',
        amount: 0,
    });

    const handleCustomerIdBlur = (event) => {
        let customerId = event.target.value;

        setrequestForm({
            ...requestForm,
            // customerName: "dummyName"
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        let formattedVal = value;

        if (name == "name") {
            formattedVal = formattedVal.replace(/[^A-Za-z ]/g, "");
        } else if (name == "customerId") {
            formattedVal = formattedVal.replace(/\D/g, "");
        } else if (name == "amount") {
            formattedVal = formattedVal.replace(/Rs\./g, "");

            if (formattedVal[formattedVal.length - 4] == ".") {
                formattedVal = formattedVal.replace(/^(.*)\d$/, "$1");
            }
            formattedVal = formattedVal.replace(/[^0-9\.]/g, "");
            formattedVal = formattedVal.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");


            setFormattedAmount(formattedVal);

            setrequestForm({
                ...requestForm,
                [name]: parseFloat(formattedVal.replace(/[^0-9\.]/g, "")),
            });
            return;
        }
        setrequestForm({
            ...requestForm,
            [name]: formattedVal
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const elements = document.querySelectorAll(".BillingTextBox");

        let formValid = true;
        elements.forEach(element => {
            formValid = formValid && (element.value != "");
        });

        console.log(formValid);

        if (formValid) {
            const warning = document.querySelectorAll(".fill-form-warning");

            warning.forEach(e => e.style.display = "none");

            // requestCompleted(true);
        } else {
            const warning = document.querySelectorAll(".fill-form-warning");

            warning.forEach(e => e.style.display = "block");
        }

        createPaymentRequest();

    };



    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    useEffect(() => {
        console.log(requestForm);
    }, [requestForm]);

    return (
        <div className="container">
            <div className="paymentReqForm">
                <form className="payForm" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                    <div className="payFormHeader">
                        <span className="FormTitle">Payment</span>
                        <span className="FormDetail">Billing Information</span>
                    </div>
                    <div className="BillingBody">
                        <div className="BillingDetails">
                            {/* <label for="requestName" className="BillingLabel">Name</label> */}
                            {/* <input type="text" id="requestName" name="name" className="BillingTextBox" value={requestForm.name} onChange={handleChange}></input> */}

                            <label for="requestCustomerId" className="BillingLabel">Customer's Id</label>
                            <input type="text" id="requestCustomerId" name="customerId" className="BillingTextBox" value={requestForm.customerId} onChange={handleChange} onBlur={handleCustomerIdBlur}></input>

                            {/* <label for="requestCustomerName" className="BillingLabel">Customer's Name</label> */}
                            {/* <input type="text" id="requestCustomerName" name="customerName" className="BillingTextBox" value={requestForm.customerName} onChange={handleChange}></input> */}

                            <label for="requestTopic" className="BillingLabel">Payment Regarding</label>
                            <input type="text" id="requestTopic" name="topic" className="BillingTextBox" value={requestForm.topic} onChange={handleChange}></input>

                            <label for="requestAmount" className="BillingLabel">Amount</label>
                            <input type="text" id="requestAmount" name="amount" className="BillingTextBox" value={(formattedAmount != "") ? "Rs. " + formattedAmount : ""} onChange={handleChange}></input>


                            <div className="BillingLastSection">
                                <span>*Please fill all the fields</span>
                                <button type="submit" className="BillingNextButton">
                                    <span className="BillingNext">Initiate</span>
                                </button>
                            </div>
                            <div>
                                <Button onClick={Logout}>
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="paymentReqTable">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>PaymentRequest_ID</StyledTableCell>
                                <StyledTableCell align="left">PaymentRequest_Date</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                                <StyledTableCell align="left">Topic</StyledTableCell>
                                <StyledTableCell align="left">Amount</StyledTableCell>
                                <StyledTableCell align="left">Invoice</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <StyledTableRow key={row.paymentRequestID}>
                                    <StyledTableCell component="th" scope="row">{row.paymentRequestId}</StyledTableCell>
                                    <StyledTableCell align="left">{row.paymentRequestDate}</StyledTableCell>
                                    <StyledTableCell align="left">{row.status}</StyledTableCell>
                                    <StyledTableCell align="left">{row.topic}</StyledTableCell>
                                    <StyledTableCell align="left">Rs.{row.requestAmount}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Button disabled={invoiceButton}>Generate Invoice</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );

}

export default Merchant;