import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Page from './page';
import { person2 } from '../api/getWinningPerson';

const Nav = () => {
    const [value, setValue] = React.useState(0);
    //const [rooms, setRooms] = React.useState([]);
    const [tabs, setTabs] = React.useState([]);
    const [tabPanels, setTabPanels] = React.useState([]);
    const [roomsReady, setRoomsReady] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const makeRoomsData = (data) => {
        var tp = [];
        //setRooms(data);
        setTabs(data.map((d, idx) => {
            tp = [...tp, <TabPanel key={idx} value={d.id}><Page room={d.id} /></TabPanel>];
            return <Tab key={idx} label={d.name.toUpperCase()} value={d.id} sx={{color: 'white'}} />;
        }));
        setTabPanels(tp);
    }

    React.useEffect(() => {
        if (!roomsReady) {
            console.log('updating rooms...');
            axios.get('https://praxtheslayer.pythonanywhere.com/api/rooms/') //192.168.1.143
            .then(response => {
                console.log('rooms:', response.data);
                makeRoomsData(response.data);
                setRoomsReady(true);
            })
            .catch(error => console.log(error))
        }
    });

    return <Box sx={{ width: '100%', typography: 'body1'}}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: person2.color }}>
                <TabList 
                    centered={true}
                    onChange={handleChange}
                    indicatorColor="secondary"
                >
                    <Tab label="Stats" value={0} sx={{color: 'white'}}/>
                    {tabs}
                    <Tab label="Shop" value={tabs.length+1} sx={{color: 'white'}}/>
                </TabList>
            </Box>
            <TabPanel value={0}>Stats</TabPanel>
            {tabPanels}
            <TabPanel value={tabs.length+1}>Shop</TabPanel>
        </TabContext>
    </Box>
}

export default Nav;