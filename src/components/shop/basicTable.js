import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const BasicTable = (props) => {
  return (
    <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper} sx={{ maxWidth: "80%", margin: "0 auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell><b>Item</b></TableCell>
                    <TableCell align="right"><b>Cost</b></TableCell>
                    <TableCell align="center"><b>Purchase</b></TableCell>
                    <TableCell align="center"><b>Redeem</b></TableCell>
                    <TableCell align="right"><b>Airin</b></TableCell>
                    <TableCell align="right"><b>Prax</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {props.items.map((row) => (
                <TableRow key={row.id}>
                    <TableCell sx={{color: "wheat"}}>{row.item}</TableCell>
                    <TableCell align="right">{row.cost}</TableCell>
                    <TableCell align="center">
                        <input id={"ap"+row.id} type="number" style={{width: "30px"}} step="0.1"/>
                        <input id={"pp"+row.id} type="number" style={{width: "30px"}} step="0.1"/>
                    </TableCell>
                    <TableCell align="center">
                        <input id={"ar"+row.id} type="number" style={{width: "30px"}} step="0.1"/>
                        <input id={"pr"+row.id} type="number" style={{width: "30px"}} step="0.1"/>
                    </TableCell>
                    <TableCell align="right">0</TableCell>
                    <TableCell align="right">0</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </ThemeProvider>
  );
}

export default BasicTable;