import React from "react";

import '../../static/css/table.scss';

const TotalWeekValues = (props) => {
    return <td style={{borderLeft: '2px solid white', borderRight: '2px solid white'}}>
        <div className="flexer">
            <div style={{backgroundColor: '#53415e'}}>{parseFloat(props.vals[0]).toFixed(1)}</div>
            <div style={{backgroundColor: '#695339'}}>{parseFloat(props.vals[1]).toFixed(1)}</div>
        </div>
    </td>
}

export default TotalWeekValues;