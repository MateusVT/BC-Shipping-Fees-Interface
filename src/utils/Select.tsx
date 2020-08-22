import { SingleSelect, SelectOption } from "react-select-material-ui";
import React from "react";

export type SelectProps = {
    items: SelectOption[]

}

export function convertToSelectProps(items: any[], labelField: string, valueField: string) {

    const converted = items.map(item => ({
        label: `${item[labelField]}`,
        value: `${item[valueField]}`,
    }))

    return converted

}

function Select(props: SelectProps) {
    const { items } = props


    return <SingleSelect
        // id="company"
        value={0}
        options={items}
        onChange={() => { }}
        SelectProps={{
            menuPortalTarget: document.body,
            styles: { menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) },
            defaultValue: "",
            msgNoOptionsAvailable: "Nenhuma opção disponível.",
            msgNoOptionsMatchFilter: "Nenhum elemento encontrado.",
            msgNoValidValue: "Nenhum valor válido.",
            MenuProps: {
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                },
                getContentAnchorEl: null
            }
        }}

        style={{ width: "100%" }}
    >

    </SingleSelect>
}


export default Select