import React from 'react';
import MaterialTable, { Column } from 'material-table';
import tableIcons from '../utils/TableIcons';
import { Product } from '../types/Types';
import { IconButton } from '@material-ui/core';
import Eye from "@material-ui/icons/RemoveRedEyeOutlined"

interface ProductRow extends Product {
    distance?: number
}

interface TableState {
    columns: Array<Column<ProductRow>>;
    data: ProductRow[];
}

export default function Table() {
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Produto', field: 'description' },
            { title: 'Peso', field: 'weight', type: 'numeric' },
            { title: 'Distância', field: 'distance', type: 'numeric' },
            {
                title: 'Visualizar Orçamentos', field: 'distance', type: 'numeric', render: rowData => <IconButton
                    title="Visualizar"
                    edge="end"
                    style={{
                        padding: "0px",
                        marginRight: "10px"
                    }}
                    onClick={() => {
                    }}
                >
                    <Eye fontSize="default" />
                </IconButton>
            },
        ],
        data: [
            { idProduct: 0, description: "Fone Ouvido", weight: 1, distance: 1 },
            { idProduct: 1, description: "Controle Xbox", weight: 3, distance: 1 },
            { idProduct: 2, description: "Pc Gamer", weight: 35, distance: 1 },
            { idProduct: 3, description: "Fone Ouvido", weight: 1, distance: 430 },
            { idProduct: 4, description: "Fone Ouvido", weight: 1, distance: 33 },
            { idProduct: 5, description: "Fone Ouvido", weight: 1, distance: 50 },
            { idProduct: 6, description: "Controle Xbox", weight: 1, distance: 100 },
            { idProduct: 7, description: "Kit Gamer", weight: 3, distance: 1000 },
            { idProduct: 8, description: "Teclado + Fone", weight: 5, distance: 5 },
            { idProduct: 9, description: "PC Gamer", weight: 6, distance: 1000 },
            { idProduct: 10, description: "Fone Ouvido gamer", weight: 35, distance: 65 }
        ],
    });

    return (
        <MaterialTable
            title="Lista de Produtos"
            columns={state.columns}
            data={state.data}
            icons={tableIcons as any}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
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