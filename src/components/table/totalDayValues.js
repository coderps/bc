import React from "react";

import '../../static/css/table.scss';

const TotalDayValues = (props) => {
    const tf1 = props.val1 >= props.val2 ? 24 : 16;
    const tf2 = props.val2 >= props.val1 ? 24 : 16;
    return <tr className="flexer borderThick">
        <td className="flex-exception borderRightThick">
            <div style={{fontSize: '2vw'}}>TOTAL</div>
            <div style={{fontSize: '1vw'}}>DAY</div>
        </td>
        {props.vals.map((p, idx) => {
            const f1 = p[0] >= p[1] ? 24 : 16;
            const f2 = p[1] >= p[0] ? 24 : 16;
            return <td key={idx} className="borderLeftNormal">
                <div className="flexer">
                    <div style={{backgroundColor: '#53415e', lineHeight: f1 >= f2 ? 4 : 6, fontSize: f1}}>{parseFloat(p[0]).toFixed(1)}</div>
                    <div style={{backgroundColor: '#695339', lineHeight: f1 > f2 ? 6 : 4, fontSize: f2}}>{parseFloat(p[1]).toFixed(1)}</div>
                </div>
            </td>
        })}
        <td className="borderLeftThick">
            <div className="flexer fontColorBlack">
                <div style={{color: '#ad7bcc', lineHeight: tf1 >= tf2 ? 4 : 6, fontSize: tf1}}>{parseFloat(props.val1).toFixed(1)}</div>
                <div style={{color: '#d5a367', lineHeight: tf1 > tf2 ? 6 : 4, fontSize: tf2}}>{parseFloat(props.val2).toFixed(1)}</div>
            </div>
        </td>
    </tr>;
}

export default TotalDayValues;