import { Button, Grid, IconButton, Paper, Typography, MenuItem, InputLabel } from "@material-ui/core";
import { Facebook, HeadsetMic, Instagram, LinkedIn } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from 'react';
import CustomInputForm from "../utils/CustomInputForm";
import Globals from '../utils/Globals';
import Http from "../utils/Http";
import { SingleSelect } from "react-select-material-ui"
import { Product, Company } from "../types/Types";
import Select, { convertToSelectProps } from "../utils/Select";
import Geosuggest from 'react-geosuggest';
import GoogleMaps from "../utils/AutoCompleteLocation";
import SelectLocation from "../utils/AutoCompleteLocation";



export const PageHeader = () => {
    return (
        <div style={{ height: "100%", width: "100%", background: "white" }}>
            {/* <div className="container">
                <h1 className="logo">
                    <a href="https://boacompra.com">BoaCompra</a>
                </h1>
            </div> */}
        </div>
    );
}


const Guest = () => {

    const [screen, setScreen] = useState<"guest-home" | "guest-cad">("guest-home");
    const [products, setProducts] = useState<Product[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);

    function handleLoadProducts() {
        Http.get({
            path: "/products",
            onError: () => {
                console.log("erro")
            },
            onSuccess: (products: Product[]) => {
                console.log(products)
                setProducts(products)
            }
        })

    }

    function handleLoadCompanies() {
        Http.get({
            path: "/companies",
            onError: () => {
                console.log("erro")
            },
            onSuccess: (companies: Company[]) => {
                console.log(companies)
                setCompanies(companies)
            }
        })

    }
    useEffect(() => {
        handleLoadProducts()
        handleLoadCompanies()
    }, [])

    function TopLetter() {

        return (
            <div style={{ height: "30%", width: "40%", display: "flex", alignItems: "center", backgroundColor: Globals.defaultBackgroundColor }}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography style={{ textAlign: "center", marginTop: "3%", lineHeight: "3vw", fontSize: "2.0vw", fontWeight: "bold", color: "#1d6960", fontFamily: 'Montserrat, sans-serif' }}>
                            <br />
                        Seja Bem-Vindo!
                    </Typography>
                        <Typography style={{ textAlign: "center", marginTop: "1%", fontSize: "1.0vw", color: "#262626" }}>
                            {"Vamos te ajudar a encontrar a forma mais barata de envio para seus produtos."}<br />
                        </Typography>

                    </Grid>
                </Grid>
            </div>
        );
    }

    function InfoCard() {




        return (
            <Paper elevation={0} style={{ width: "50%", height: "70%", borderRadius: "2px", marginRight: "5%", padding: 15 }}>
                <div style={{ height: "10%" }}>
                    <Typography style={{
                        textAlign: "center", fontSize: "1.7vw", fontWeight: "bold", color: Globals.defaultFontColor,
                        fontFamily: 'Montserrat, sans-serif'
                    }}>{
                            "Quero ser parceiro"}
                    </Typography>
                </div>
                <div style={{ height: "70%" }}>
                    <div style={{ height: "100%", display: "flex" }}>
                        <Grid style={{ width: "100%" }} container>
                            <Grid item xs={6} style={{ padding: "1%", marginBottom: "5%" }}>
                                <InputLabel>Produto</InputLabel>
                                <Select items={convertToSelectProps(products, "description", "idProduct")}></Select>
                                <SelectLocation label={"Selecione a Origem"} />
                            </Grid>
                            <Grid item xs={6} style={{ padding: "1%", marginBottom: "5%" }}>
                                <InputLabel>Empresa</InputLabel>
                                <Select items={convertToSelectProps(products, "description", "idProduct")} />
                                <SelectLocation label={"Selecione o Destino"} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div style={{ height: "20%" }}>
                    <Button color="primary"
                        onClick={() => { setScreen("guest-cad") }}
                        style={{
                            fontFamily: 'Montserrat, sans-serif', borderRadius: "5px"
                            // width: "80%", height: "90%", fontSize: "1.2vw"
                        }} variant="contained">Calcular</Button>
                </div>
            </Paper>
        );
    }

    function GuestHome() {

        return (
            <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>
                <div style={{ width: "100%", height: "10%" }}>
                    <PageHeader />
                </div>
                <div style={{
                    background: "url(public/img/uol-background.jpg) no-repeat center ",
                    backgroundSize: "100% 100%", width: "100%", height: "87%"
                }}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "1%" }}>
                        <TopLetter />
                    </div>
                    <div style={{ width: "100%", height: "70%", display: "flex", justifyContent: "center", padding: "1%" }}>
                        <InfoCard />
                    </div>

                </div>
                <div style={{ height: "3%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: Globals.defaultBackgroundColor }}>
                    <Typography style={{ color: Globals.defaultFontColor, margin: "0", fontWeight: "bold" }}>
                        ©2020 Mateus Torres - mtsvtorres@gmail.com
                </Typography>
                </div>

            </div>
        );
    }

    return (
        <>
            {screen == "guest-home" && <GuestHome />}
        </>
    );
}



export default React.memo(Guest);
