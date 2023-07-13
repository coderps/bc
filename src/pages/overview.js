// import { Button, CardActions } from "@mui/material";
import React from "react";
// import { stats } from "../api/getStats";
// import OutlinedCard from "../components/card";
// import DN from "../charts/doughnut";
import Table from "../components/table/table";

const Overview = (props) => {
    // const total = <OutlinedCard 
    //     width={275} 
    //     element={<DN data={stats} title="Overall Stats"/>} 
    //     additional={
    //         <CardActions>
    //             <Button size="small">add points</Button>
    //         </CardActions>
    //     }
    // />
    return <React.Fragment>
        <br />
        <Table page={props.page.id}/>
        <br />
    </React.Fragment>
}

export default Overview;

