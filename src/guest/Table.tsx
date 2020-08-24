import { IconButton } from '@material-ui/core';
import Eye from "@material-ui/icons/RemoveRedEyeOutlined";
import MaterialTable, { Column } from 'material-table';
import React from 'react';
import { Product } from '../types/Types';
import tableIcons from '../utils/TableIcons';
import { isFullHD } from '../utils/Responsiveness';

interface TableState {
    columns: Array<Column<Product>>;
    data: Product[];
}


type TableProps = {
    selectedProduct: (idProduct?: Product) => void
    productAdd: (product: Product) => void
    products: Product[]
}

export default function Table(props: TableProps) {
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Produto', field: 'description' },
            { title: 'Peso', field: 'weight', type: 'numeric', render: rowData => <span>{rowData.weight} Kg</span> },
            {
                title: 'Visualizar Orçamentos', headerStyle: { justifyContent: "center" }, field: 'distance', type: 'numeric', render: rowData =>
                    <IconButton
                        title="Visualizar"
                        edge="end"
                        style={{
                            padding: "0px",
                            marginRight: "50px"
                        }}
                        onClick={() => {
                            props.selectedProduct(rowData)
                        }}
                    >
                        <Eye fontSize="default" />
                    </IconButton>
            },
        ],
        data: props.products
    });

    return (
        <MaterialTable
            options={{ pageSize: isFullHD() ? 7 : 6 }}
            style={{ width: "50%" }}
            title="Lista de Produtos"
            columns={state.columns}
            data={state.data}
            icons={tableIcons as any}
            isLoading={state.data.length == 0}
            localization={{
                header: {
                    actions: "Ações"
                },
                toolbar: {
                    searchPlaceholder: "Pesquisar"
                },
                body: {
                    emptyDataSourceMessage: "Nenhum elemento encontrado!"
                }
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            props.productAdd(newData)
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}