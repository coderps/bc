import React from "react";
import TotalWeekValues from "./totalWeekValues";
import TableCells from "./tableCells";
import StuffWithColor from "./stuffPalette";

import '../../static/css/table.scss';

const DataRows = (props) => {
    const skipKeys = ["total_day", "total", "last_done", "frequency"];
    const parentRef = React.useRef(null);
    const [maxChildWidth, setMaxChildWidth] = React.useState(0);

    React.useEffect(() => {
        if (parentRef.current) {
            const children = Array.from(parentRef.current.children);
            const maxWidth = Math.max(...children.map(child => child.getBoundingClientRect().width));
            setMaxChildWidth(maxWidth);
        }
    }, [maxChildWidth]);

    return Object.keys(props.data).sort().map((stuff, idx) => {
        const batch5Classname = (idx + 1) % 5 ? '' : 'borderBottomNormal';
        if (!skipKeys.includes(stuff)) {
            return <tr key={idx} className={"flexer visibility " + batch5Classname} ref={parentRef}>
                <td className="flex-exception borderLeftThick borderRightThick" style={{width: `${maxChildWidth}px`}}>
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