import React, { useContext, useEffect } from 'react';
import { Grid, Toolbar, Avatar, Typography, IconButton } from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import Globals from './Globals';


export type PropsInternalPageHeader = {
    logout: () => void
};

function InternalPageHeader(props: PropsInternalPageHeader) {

    useEffect(() => {

    }, [])
    return (
        <div style={{ width: "100%", height: "10%", background: Globals.defaultBackgroundColor, display: "flex" }}>
            <div style={{
                background: "url(src/assets/img/viptech-smart-solutions-logo.png) no-repeat center", backgroundSize: "60%",
                width: "15%", height: "100%", backgroundPositionX: "50%"
            }} />
            <div style={{ width: "85%", display: "flex", alignItems: "center" }}>
                <Grid container style={{ width: "100%" }}>
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={3} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end" }} >
                        <AccountCircle style={{ color: "white", marginRight: "5px" }} />
                        {/* <Typography style={{ color: "white" }} variant="subtitle1">{context.userInfos.representante
                         && context.userInfos.representante.dsEmail || context.userInfos.nmLogin}</Typography> */}
                    </Grid>
                    <Grid item xs={1} style={{ width: "100%", display: "flex", alignItems: "center" }} >
                        <IconButton
                            title="Sair"
                            onClick={() => {
                                props.logout()
                            }}
                        >
                            <Typography style={{ color: "white", marginRight: "5px" }} variant="subtitle1">Sair</Typography>
                            <ExitToApp style={{ color: "white" }} />

                        </IconButton>

                    </Grid>
                </Grid>
            </div>
        </div >
    );
}

export default InternalPageHeader