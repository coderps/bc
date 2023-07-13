import React from "react";
import '../../static/css/table.scss';

const TableCells = (props) => {
    const Field = (props) => {
        const [v1, setV1] = React.useState(props.p[0]);
        const [v2, setV2] = React.useState(props.p[1]);

        const onChange = (v1v2, val) => {
            if (v1v2 === "v1") {
                props.saveValsFunc("airin", [props.pid, props.date, val]);
                setV1(val);
                return
            }
            props.saveValsFunc("prax", [props.pid, props.date, val]);
            setV2(val);            
        }

        if (!props.editModeOn || !props.isValidForEdit) {
            return <div className="flexer">
                <div className={v1 ? "fontColorIrene" : "fontColorBlack"}>{v1}</div>
                <div className={v2 ? "fontColorPrax" : "fontColorBlack"}>{v2}</div>
            </div>
        }
        return <div className="flexer">
            <div>
                <input 
                    type="number" 
                    step="0.1" 
                    id={"TCI:ID:"+props.pid+"DATE:"+props.date} 
                    value={v1} 
                    onChange={e => onChange("v1", e.target.value)} 
                    className={v1 ? "fontColorIrene" : "fontColorWhite" }
                />
            </div>
            <div>
                <input 
                    type="number" 
                    step="0.1" 
                    id={"TCP:ID:"+props.pid+"DATE:"+props.date} 
                    value={v2} 
                    onChange={e => onChange("v2", e.target.value)} 
                    className={v2 ? "fontColorPrax" : "fontColorBlack" }
                />
            </div>
        </div>
    }

    return props.points.map((p, id) => 
        <td key={id} className="borderLeftNormal">
            <Field 
                p={p}
                editModeOn={props.editModeOn}
                isValidForEdit={props.dates[id][2]}
                pid={props.id}
                date={props.dates[id][3]}
                saveValsFunc={props.saveValsFunc}
            />
        </td>
    )
}

export default TableCells;