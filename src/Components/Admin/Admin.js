import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './Admin.css'

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
    const [queueNumber, setQueueNumber] = useState(0);
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [data, setData] = useState([]);
    const [invoiceData, setInvoiceData] = useState(null);
    const [open, setOpen] = useState(false);
    const [processedInvoiceData, setProcessedInvoiceData] = useState(null);


    useEffect(() => {
        const fetchdata = async () => {
            const apiUrl = `http://localhost:8090/admin/all`;
            //const apiParams = '2';
            const response = await fetch(`${apiUrl}`);
            const responseData = await response.json();
            console.log(responseData);
            if (response.ok) {
                setData(responseData);
            } else {
                console.log("Couldn't fetch data from credit card queue!");
            }
        };
        fetchdata();
    }, []);

    const handleCheckboxChange = (row) => {
        setData(data.map(item => {
            if (item === row) {
                return { ...item, checked: !item.checked };
            }
            return item;
        }));
    };

    const handleApprove = (row) => {

        const fetchData = async () => {
            const apiUrl = `http://localhost:8090/admin/${row.creditCardNumber}/putActivationStatus`;
            console.log(apiUrl);
            try {
                const response = await fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(),
                });
                if (response) {
                    console.log(response);
                }
                const data = await response.text();
                console.log(data);
                if (data === "ACTIVATION COMPLETED") {
                    console.log("ACTIVATION COMPLETED");
                }

            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    };

    const handleApproveAll = () => {
        const fetchData = async () => {
            const apiUrl = `http://localhost:8090/admin/UpdateAllStatus`;
            console.log(apiUrl);
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(),
                });
                if (response) {
                    console.log(response);
                }
                const data = await response.text();
                console.log(data);
                if (data === "ACTIVATION COMPLETED") {
                    console.log("ACTIVATION COMPLETED");
                }

            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }

    return (
        <>
            <h3>Admin Page</h3>
            <br></br>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Queue Number</StyledTableCell>
                            <StyledTableCell align="left">Credit Card Number</StyledTableCell>
                            <StyledTableCell>Approve <Button onClick={() => handleApproveAll()}>Approve All</Button></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.transactionID}>
                                <StyledTableCell component="th" scope="row">
                                    {row.queueNumber}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.creditCardNumber}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <input type="checkbox" onChange={() => handleCheckboxChange(row)} />
                                    {row.checked && <Button onClick={() => handleApprove(row)}>Approve</Button>
                                    }
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