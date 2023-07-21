import React from "react";
import Table from "./table/table";

const Overview = (props) => {
    return <React.Fragment>
        <br />
        <Table page={props.page}/>
        <br />
    </React.Fragment>
}

export default Overview;

