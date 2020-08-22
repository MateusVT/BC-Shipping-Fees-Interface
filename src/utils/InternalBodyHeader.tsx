import React from "react";
import { Button, Grid, IconButton, Paper, TextField, Typography } from "@material-ui/core";
import Globals from './Globals';

type InternalBodyProp = {
	title: string
}

function InternalBodyHeader(props: InternalBodyProp) {
    const { title } = props

    return (
        <div style={{ height: "15%", display: "flex" }}>
            <Typography variant="h4" style={{ fontFamily: "'Montserrat', sans-serif", margin: "auto" }}>{title}</Typography>               
        </div>
    );
}

export default InternalBodyHeader