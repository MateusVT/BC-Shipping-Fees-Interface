import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { Business } from "@material-ui/icons";
import React, { useEffect, useState } from 'react';
import { Budget, Company, Product } from "../types/Types";
import CustomInputForm from "../utils/CustomInputForm";
import Globals from '../utils/Globals';
import Http from "../utils/Http";
import Table from "./Table";


const Guest = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [openDialogUnregistred, setOpenDialogUnregistred] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<number>();
    const [selectedUnregisteredProduct, setSelectedUnregisteredProduct] = useState<Product>();

    function handleLoadProducts() {
        Http.get({
            path: "/products",
            onError: () => {
                console.log("erro")
            },
            onSuccess: (products: Product[]) => {
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
                    <Grid item xs={12} >
                        <Typography style={{ textAlign: "center", marginTop: "3%", lineHeight: "3vw", fontSize: "2.0vw", fontWeight: "bold", color: "#1d6960", fontFamily: 'Montserrat, sans-serif' }}>
                            Seja Bem-Vindo!
                    </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography style={{ textAlign: "center", marginTop: "1%", fontSize: "1.0vw", color: "#262626" }}>
                            {"Vamos te ajudar a encontrar a forma mais barata de envio para seus produtos."}<br />
                        </Typography>

                    </Grid>
                </Grid>
            </div>
        );
    }



    function BudgetPanel() {
        return (
            <Table selectedProduct={(product) => {
                if (product.idProduct) {
                    setSelectedProduct(product.idProduct)
                } else {
                    setSelectedUnregisteredProduct(product)
                    setOpenDialogUnregistred(true)
                }
            }} productAdd={(product) => { setProducts([...products, product]) }} products={products} />
        );
    }



    function BudgetDialog() {

        const [inputDistance, setInputDistance] = useState<string>()
        const [companiesBudget, setCompaniesBudget] = useState<Budget[]>()

        function handleCalculateRegisteredBudget() {
            Http.get({
                path: `/shipping-costs/by-registered-product?idProduct=${selectedProduct}&distance=${inputDistance}`,
                onError: () => {
                    console.log("erro")
                },
                onSuccess: (companies: Budget[]) => {
                    setCompaniesBudget(companies)
                }
            })
        }

        function handleCalculateUnregisteredBudget() {
            console.log({
                "product": selectedUnregisteredProduct as Product,
                "distance": inputDistance
            })
            Http.post({
                path: `/shipping-costs/by-unregistered-product`,
                body: {
                    "product": selectedUnregisteredProduct as Product,
                    "distance": inputDistance
                },
                onError: () => {
                    console.log("erro")
                },
                onSuccess: (companies: Budget[]) => {
                    setCompaniesBudget(companies)
                }
            })
        }

        return <Dialog onClose={() => {
            setSelectedProduct(null)
            setSelectedUnregisteredProduct(null)
            setOpenDialogUnregistred(false)
        }} aria-labelledby="simple-dialog-title" open={selectedProduct != null || openDialogUnregistred}>
            <DialogTitle id="simple-dialog-title">
                Orçamentos por empresa</DialogTitle>
            <DialogContent>
                <CustomInputForm
                    id={"distance"}
                    label="Informe a distância em Km(s)"
                    required
                    value={inputDistance}
                    name={"distance"}
                    onChange={(_, value) => { setInputDistance(value) }}
                    maxLength={50}
                    inputType={"number"}
                />
            </DialogContent>

            <List>
                {companiesBudget && companiesBudget.map((company, index) => (
                    <ListItem button style={index == 0 ? { backgroundColor: "#87d855bd" } : {}} onClick={() => { }} key={company.companyName}>
                        <ListItemAvatar>
                            <Business />
                        </ListItemAvatar>
                        <ListItemText primary={company.companyName} secondary={company.budget + " R$"} />
                    </ListItem>

                ))}
            </List>
            <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={selectedUnregisteredProduct ? handleCalculateUnregisteredBudget : handleCalculateRegisteredBudget} color="primary" variant={"contained"}>
                    Calcular Orçamento
                    </Button>
            </DialogActions>
        </Dialog >
    }

    function GuestHome() {

        return (
            <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>

                <div style={{
                    background: "url(public/img/uol-background.jpg) no-repeat center ",
                    backgroundSize: "100% 100%", width: "100%", height: "97%"
                }}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "1%" }}>
                        <TopLetter />
                    </div>
                    <div style={{ width: "100%", height: "70%", display: "flex", justifyContent: "center", padding: "1%" }}>
                        <BudgetPanel />
                        <BudgetDialog />
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
            <GuestHome />
        </>
    );
}



export default React.memo(Guest);
