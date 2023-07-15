import React from 'react';
import { Typography } from '@mui/material';
import Overview from '../pages/overview';
import { useSearchParams } from 'react-router-dom';

const Page = (props) => {
    const [searchParams] = useSearchParams();
    const [room, setRoom] = React.useState('');

    React.useEffect(() => {
        try {
            console.log([...searchParams]);
            setRoom(searchParams.get('room'));
        } catch (error) {
            setRoom('');
        }
    }, [searchParams]);

    return <React.Fragment>
        <Typography
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
            {room ? <Overview page={room} /> : <div>index</div> }
        </Typography>
    </React.Fragment>
}

export default Page;