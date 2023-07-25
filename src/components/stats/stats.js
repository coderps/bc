import React from "react";
import axios from "axios";
import { person1, person2 } from "../../api/getWinningPerson";
import DN from "../../charts/doughnut";
import LC from "../../charts/linechart";

const Stats = () => {
    const currentDate = new Date();
    const [ready, setReady] = React.useState(false);
    // const [month, setMonth] = React.useState(currentDate.getMonth());
    const [onVac, setOnVac] = React.useState([
        [false, false],
        [false, false],
        [false, false],
    ]);
    const [labels, setLabels] = React.useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]);
    const [stats, setStats] = React.useState({
        airin: [],
        prax: [],
        avg: [],
        cc: [],
        vp: [],
        last_vp: [0, 0],
        vacations: [[], []],
        total: [50, 50]
    });
    
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    React.useEffect(()=> {
        if (!ready) {
            axios.get('https://praxtheslayer.pythonanywhere.com/api/stats/')
            .then(response => {
                console.log('stats:', response.data);
                setReady(true);
                setStats(response.data);
                setLabels(Array.from(
                        { length: Math.max(response.data.airin.length, response.data.prax.length)}, 
                        (_, index) => index + 1
                    ).map(day => {
                        const date = new Date(currentYear, currentMonth, day);
                        const dayOfWeek = date.toLocaleDateString(undefined, { weekday: 'short' });
                        const monthDay = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                        return `${dayOfWeek} ${monthDay}`;
                    })
                );
            })
            .catch(error => console.log(error))
        }
    })

    const DoughnutChart = () => {
        return <div style={{height: '300px'}}>
            <DN title="Who did more?" data={{
                labels: ['Airin', 'Prax'],
                datasets: [{
                    label: 'points',
                    data: stats.total,
                    backgroundColor: [person1.color, person2.color],
                    borderColor: [person1.color, person2.color],
                    borderWidth: 1,
                }]
            }}/>
        </div>
    }

    const LineChart = () => {
        return <div>
            <LC 
                title={currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear()} 
                data={{
                    labels: labels,
                    datasets: [{
                        label: 'Airin',
                        data: stats.airin,
                        borderColor: person1.color,
                        backgroundColor: person1.color,
                    }, {
                        label: 'Prax',
                        data: stats.prax,
                        borderColor: person2.color,
                        backgroundColor: person2.color,
                    }]
                }}
            />
        </div>
    }

    const CC = () => {
        return <div style={{padding: '10px'}}>
            <h1 style={{color: 'lightgreen'}}>Chutiya Coins</h1>
            <div style={{color: person1.color}}><b>Airin:</b> {stats.cc.length && stats.cc[0] > 0 ? stats.cc[0] : 0}</div>
            <div style={{color: person2.color}}><b>Prax:</b> {stats.cc.length && stats.cc[1] > 0 ? stats.cc[1] : 0}</div>
        </div>
    }

    const AVG = () => {
        return <div style={{padding: '10px'}}>
            <h1 style={{color: 'yellow'}}>Average</h1>
            <div style={{color: person1.color}}><b>Airin:</b> {stats.avg.length ? stats.avg[0] : 0}</div>
            <div style={{color: person2.color}}><b>Prax:</b> {stats.avg.length ? stats.avg[1] : 0}</div>
        </div>
    }

    const VP = () => {
        return <div style={{padding: '10px'}}>
            <h1 style={{color: 'aquamarine'}}>Vacation Points</h1>
            <div style={{color: person1.color}}><b>Airin:</b> {stats.vp.length ? stats.vp[0] : 0}</div>
            <div style={{color: person2.color}}><b>Prax:</b> {stats.vp.length ? stats.vp[1] : 0}</div>
        </div>
    }

    const TakeVacation = () => {
        const handleOnClick = (p, idx) => {
            var vac = onVac;
            if (p === 'prax') {
                vac[idx][1] = !vac[idx][1];
            } else {
                vac[idx][0] = !vac[idx][0];
            }
            setOnVac(vac);
            console.log("vac", vac);
        }

        return <div>
            <h1 style={{color: 'orange'}}>Take vacation?</h1>
            <table>
                <tbody>
                    {[0,1,2].map(idx => {
                        return <tr key={idx}>
                            <td>
                                <button onClick={() => handleOnClick('airin', idx)} style={{
                                    color: 'white', 
                                    backgroundColor: onVac[idx][0] ? 'green' : person1.color, 
                                    border: '0px solid black', 
                                    padding: '15px',
                                    fontFamily: 'monospace'
                                }}>
                                    <b>{onVac[idx][0] ? 'REVOKE FOR AIRIN [-' : 'AIRIN ['}{stats.last_vp[0] + ']'}</b>
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleOnClick('prax', idx)} style={{
                                    color: 'white', 
                                    backgroundColor: onVac[idx][1] ? 'green' : person2.color, 
                                    border: '0px solid black', 
                                    padding: '15px',
                                    fontFamily: 'monospace',
                                    marginLeft: '10px'
                                }}>
                                    <b>{onVac[idx][1] ? 'REVOKE FOR PRAX [-' : 'PRAX ['}{stats.last_vp[1] + ']'}</b>
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }

    const VacationRecords = () => {
        const getMonthName = (month) => {
            return [
                'January', 
                'February', 
                'March', 
                'April', 
                'May', 
                'June', 
                'July', 
                'August', 
                'September', 
                'October', 
                'November', 
                'December',
            ][month];
        }

        const getFormattedDay = (day) => {
            if (day >= 11 && day <= 13) {
                return day + 'th';
            }
            switch (day % 10) {
                case 1:
                    return day + 'st';
                case 2:
                    return day + 'nd';
                case 3:
                    return day + 'rd';
                default:
                    return day + 'th';
            }
        }

        const formatDate = (day) => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth(); // Months are 0-indexed, so January is 0, February is 1, etc.
            const formattedDay = getFormattedDay(day);
            const monthName = getMonthName(month);
            return `${formattedDay} ${monthName} ${year}`;
        }

        return <div style={{fontFamily: 'monospace'}}>
            <h1 style={{color: 'pink'}}>Vacation Records: </h1>
            <div style={{color: person1.color}}><b>Airin:</b> {stats.vacations[0].map(d => formatDate(d)).join(", ")}</div>
            <div style={{color: person2.color}}><b>Prax:</b> {stats.vacations[1].map(d => formatDate(d)).join(", ")}</div>
        </div>
    }

    return <div style={{width: '80%', margin: '0 auto'}}>
        <div style={{display: 'flex', color: 'white'}}>
            <DoughnutChart />
            <table style={{width: '100%'}}>
                <tbody>
                    <tr>
                        <td><AVG /></td>
                        <td><CC /></td>
                        <td><VP /></td>
                        <td><TakeVacation /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <LineChart />
        <VacationRecords />
    </div>
}

export default Stats;