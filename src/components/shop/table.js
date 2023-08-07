import React from "react";

const ShopTable = (props) => {
    return <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Cost</th>
                <th>Airin</th>
                <th>Prax</th>
            </tr>
        </thead>
        <tbody>
            {props.items.map((item, idx) => <tr key={idx}>
                <td>{item.item}</td>
                <td>{item.cost}</td>
            </tr>)}
        </tbody>
    </table>
}

export default ShopTable;