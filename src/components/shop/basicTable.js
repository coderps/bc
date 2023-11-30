import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import NormalMassageIcon from '../../static/images/NormalMassage.png';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const BasicCard = (props) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Card} sx={{ maxWidth: 250 }}>
      <Card>
        <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
          <div style={{margin: '0 auto', textAlign: 'center'}}>
            <img src={props.img} alt="normal massage" style={{maxWidth: '100px'}}/>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Cost: {props.cost} cc
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">Claim</Button>
        </CardActions>
      </Card>
    </TableContainer>
    </ThemeProvider>
  );
}

export const ShopCards = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {props.items.map((row) => {
        let title = String(row.item).split('(')
        return <Grid item xs={1} sm={2} md={3} key={row.id}>
          <BasicCard img={NormalMassageIcon} cost={row.cost} title={title.map(
            (line, idx) => idx ? <div style={{fontSize: 12}}>{'('+line}</div> : <div>{line}</div>
          )} />
        </Grid>
      })}
      </Grid>
    </React.Fragment>
  )
}

const BasicTable = (props) => {
  return (
    <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell><b>Item</b></TableCell>
                    <TableCell align="right"><b>Cost</b></TableCell>
                    <TableCell align="right"><b>Airin</b></TableCell>
                    <TableCell align="right"><b>Prax</b></TableCell>
                    <TableCell align="center"><b>Redeem</b></TableCell>
                    <TableCell align="center"><b>Purchase</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {props.items.map((row) => (
                <TableRow key={row.id}>
                    <TableCell sx={{color: "wheat"}}>{row.item}</TableCell>
                    <TableCell align="right">{row.cost}</TableCell>
                    <TableCell align="right">0</TableCell>
                    <TableCell align="right">0</TableCell>
                    <TableCell align="center">
                        <input id={"ar"+row.id} type="number" style={{width: "30px"}} step="0.1"/>
                        <input id={"pr"+row.id} type="number" style={{width: "30px"}} step="0.1"/>
                    </TableCell>
                    <TableCell align="center">
                        <input id={"ap"+row.id} type="number" style={{width: "30px"}} step="0.1"/>
                        <input id={"pp"+row.id} type="number" style={{width: "30px"}} step="0.1"/>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </ThemeProvider>
  );
}

export default BasicTable;