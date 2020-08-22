import React, { useContext, useEffect, useState } from 'react';
import Http from '../utils/Http';
import InternalPageHeader from '../utils/InternalPageHeader';


export type PropsMain = {
    logout: () => void
};

function Main(props: PropsMain) {

    // const [user, setUser] = useState<User>();
    const [selectedMenu, setSelectedMenu] = useState("inicio");
    const [renderedItems, setRenderedItems] = useState<{ [screen: string]: React.ReactElement }>();
    // const context = useContext(ComponentContext)

    useEffect(() => {
        // Http.post({
        //     path: "/auth/tokensignin",
        //     onError: (error: string) => {
        //     },
        //     onSuccess: (user: User) => {
        //         if (user) {
        //             context.userInfos = user
        //             setUser(user)
        //         }
        //     }
        // })

    }, [])

    function handleScreenChange(key: string) {
        setSelectedMenu(key)
    }

    return (
        <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>

            <>
                <InternalPageHeader logout={() => { props.logout() }} />
                <div style={{ width: "100%", height: "90%" }}>
                    <div className={"page-wrapper"}>
                        <div style={{ display: "flex", height: "100%", width: "18%" }}>
                            {/* <SideBar handleItemSelected={handleScreenChange} /> */}
                        </div>
                        <div className="page-content" style={{}}>
                            {/* {selectedMenu == "inicio" &&
                                    <PartnerDashBoard
                                        partnerStatus={{
                                            representante: user.representante,
                                            ultimasVendas: [
                                                {
                                                    dsCliente: 'Michael Gomes',
                                                    dtTransacao: '2020-08-19T09:00:00.000',
                                                    dtVenda: '2020-08-19T09:00:00.000',
                                                    inAtivo: 'A',
                                                    vlComissao: 5.70,
                                                    vlVenda: 57.70
                                                },
                                                {
                                                    dsCliente: 'Mateus Vieira',
                                                    dtTransacao: '2020-08-19T09:00:00.000',
                                                    dtVenda: '2020-08-19T09:00:00.000',
                                                    inAtivo: 'A',
                                                    vlComissao: 22.80,
                                                    vlVenda: 2.80
                                                },
                                                {
                                                    dsCliente: 'Rebeca Hernandez',
                                                    dtTransacao: '2020-08-19T09:00:00.000',
                                                    dtVenda: '2020-08-19T09:00:00.000',
                                                    inAtivo: 'A',
                                                    vlComissao: 10.70,
                                                    vlVenda: 170.00
                                                },
                                                {
                                                    dsCliente: 'Steven Louback',
                                                    dtTransacao: '2020-08-19T09:00:00.000',
                                                    dtVenda: '2020-08-19T09:00:00.000',
                                                    inAtivo: 'A',
                                                    vlComissao: 200,
                                                    vlVenda: 2000.00
                                                },
                                            ],
                                            vlComissao: 5.88,
                                            vlPontuacao: 2300,
                                            vlSaldo: 8.80
                                        }}
                                    />}
                                {selectedMenu == "cadastros-pendentes" && <PartnersApproval />}
                                {selectedMenu == "minha-conta" && <UnderDevelopment />}
                                {selectedMenu == "comissao-vendas" && <UnderDevelopment />}
                                {selectedMenu == "treinamentos" && <UnderDevelopment />}
                                {selectedMenu == "relatorios" && <UnderDevelopment />}
                                {selectedMenu == "notificacoes" && <UnderDevelopment />}
 */}

                        </div>
                        {/* {this.renderContent(definedData)} */}
                    </div>
                </div>
            </>

        </div>
    );
}

export default React.memo(Main);
