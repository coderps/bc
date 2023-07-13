import React from "react";
import TotalWeekValues from "./totalWeekValues";
import TableCells from "./tableCells";
import StuffWithColor from "./stuffPalette";

import '../../static/css/table.scss';

const DataRows = (props) => {
    const skipKeys = ["total_day", "total", "last_done", "frequency"];
    return Object.keys(props.data).sort().map((stuff, idx) => {
        const batch5Classname = (idx + 1) % 5 ? '' : 'borderBottomNormal';
        if (!skipKeys.includes(stuff)) {
            return <tr key={idx} className={"flexer visibility " + batch5Classname}>
                <td className="flex-exception borderLeftThick borderRightThick">
                    <StuffWithColor 
                        name={stuff}
                        points={props.data[stuff].points}
                        frequency={props.data[stuff].frequency}
                        lastDone={props.data[stuff].last_done}
                    />
                </td>
                <TableCells 
                    points={props.data[stuff].efforts.points} 
                    editModeOn={props.editMode} 
                    dates={props.dates} 
                    id={props.data[stuff].id}
                    saveValsFunc={props.saveValsFunc}
                />
                <TotalWeekValues vals={props.data[stuff].efforts.total_week} />
            </tr>
        }
        return '';
    });
}

export default DataRows;