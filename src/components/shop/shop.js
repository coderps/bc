import React from "react";
import axios from "axios";
import ShopTable from "./table";
import { person1, person2 } from "../../api/getWinningPerson";

const Shop = () => {
    const [ready, setReady] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [cc, setCC] = React.useState([0, 0]);

    const ChutiyaCoins = () => {
        return <div style={{fontFamily: 'monospace'}}>
            <h1 style={{color: 'violet'}}>Chutiya Coins: </h1>
            <div style={{color: person1.color}}><b>Airin:</b> {cc[0]}</div>
            <div style={{color: person2.color}}><b>Prax:</b> {cc[1]}</div>
        </div>
    }

    React.useEffect(() => {
        if (!ready) {
            axios.get('https://praxtheslayer.pythonanywhere.com/api/shop/')
            .then(response => {
                console.log('shop items:', response.data);
                setReady(true);
                setItems(response.data.records);
                setCC(response.data.cc);
            })
            .catch(error => console.log(error))
        }
    })

    return <div>
        <ChutiyaCoins />
        <ShopTable items={items} />
    </div>
}

export default Shop;