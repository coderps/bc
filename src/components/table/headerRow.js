import React from "react";

import '../../static/css/table.scss';

const HeaderRow = (props) => {
    return <tr className="flexer" style={{letterSpacing: 3}}>
        <td className="table-actions">
            <div className="fontBig editBtn" onClick={props.onEdit}>{props.editMode ? 'SAVE' : 'EDIT'}</div>
            <div className="editBtn" onClick={props.cancelFunc}>CANCEL</div>
            <div className="flexer">
                <div className="pointerBtn" onClick={props.onReduce}>{"<-"}</div>
                <div>week({props.week})</div>
                <div className="pointerBtn" onClick={props.onIncrease}>{"->"}</div>
            </div>
        </td>
        {props.dates.map(d => {
            const classNames="borderNormal rounded borderBottomThick " + (d[2] ? "fontColorWhite" : "fontColorDisabled");
            return <td key={d[1]} className={classNames}>
                <div className="fontBig">{d[0]}</div>
                <div className="borderBottomNormal">{d[1]}</div>
                <div className="flexer">
                    <div className={d[2] ? 'iheaderClass' : 'disablediHeader'}>I</div>
                    <div className={d[2] ? 'pheaderClass' : 'disabledpHeader'}>P</div>
                </div>
            </td>
        })}
        <td className="borderNormal rounded borderBottomThick borderRightThick">
            <div className="fontBig">TOTAL</div>
            <div className="borderBottomNormal">WEEK</div>
            <div className="flexer">
                <div className='iheaderClass'>I</div>
                <div className='pheaderClass'>P</div>
            </div>
        </td>
    </tr>
}

export default HeaderRow;