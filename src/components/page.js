import React from 'react';
import { Typography } from '@mui/material';
import Overview from './overview';

const Page = (props) => {
    return <Typography
        sx={{
            mr: 2,
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            width: '80%',
            margin: '0 auto',
        }}>
        <Overview page={props.room} />
    </Typography>
}

export default Page;