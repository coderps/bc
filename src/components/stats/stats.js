import React from "react";
import axios from "axios";
import { person1, person2 } from "../../api/getWinningPerson";
import DN from "../../charts/doughnut";
import LC from "../../charts/linechart";

const Stats = () => {
    const [ready, setReady] = React.useState(false);
    const [labels, setLabels] = React.useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]);
    const [stats, setStats] = React.useState({
        airin: [],
        prax: [],
        avg: [],
        cc: [],
        vp: [],
        total: [50, 50]
    });

    const currentDate = new Date();
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
                ));
                console.log("array:", Array.from(
                    { length: Math.max(response.data.airin.length, response.data.prax.length) }, 
                    (_, index) => index + 1
                ))
            })
            .catch(error => console.log(error))
        }
    })

    const DoughnutChart = () => {
        return <div style={{height: '300px'}}>
            <DN data={{
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

    return <div>
        <DoughnutChart />
        <LC data={{
            labels: labels.map(day => {
                const date = new Date(currentYear, currentMonth, day);
                const dayOfWeek = date.toLocaleDateString(undefined, { weekday: 'short' });
                const monthDay = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                return `${dayOfWeek} ${monthDay}`;
            }),
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
        }}/>
    </div>
}

export default Stats;