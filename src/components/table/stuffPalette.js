import React from "react";
import '../../static/css/frequencies.scss';
import '../../static/css/table.scss';

function getClassName(f, ld) {
    var className = '';
    if (f) {
        const difference = f - ld;
        switch (difference) {
            case 0: // DUE DATE
                className = "due";
                break;
            case -7:
            case -6:
            case -5:
            case -4:
            case -3:
            case -2:
            case -1: // AFTER
                className = `after${Math.abs(difference)}`;
                break;
            default:
                if (difference < -7) {
                    className = "after7plus";
                } else if (difference > 0 && difference <= 7) {
                    className = `before${difference}`;
                }
            break;
        }
    }
    return className;
}

const StuffWithColor = (props) => {
    const className = getClassName(props.frequency, props.lastDone);
    return <div className="nameAndPoints">
        <div className={className}>{props.name}</div>
        <div className={className}>{parseFloat(props.points).toFixed(2)}</div>
    </div>
}

export default StuffWithColor;