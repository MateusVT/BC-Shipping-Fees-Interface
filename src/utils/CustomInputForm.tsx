import { TextField, Input } from "@material-ui/core"
import Popper from "popper.js"
import * as React from "react"
import { type } from "os"
import { useRef } from "react";

type Props = {
	id: string
	label: string
	disabled?: boolean
	validParent?: boolean
	upperCase?: boolean
	validator?: (valor: any) => Promise<boolean>
	name: string
	required?: boolean
	style?: any
	inputType: string
	minYear?: number
	maxYear?: number
	regularExpression?: string
	placeholder?: string
	parentProperties?: any
	onChange: (attribute: string, value: string, invalid?: boolean, valid?: boolean) => void
	onBlur?: (ev: React.ChangeEvent<HTMLInputElement>) => void
	value?: any
	inputProps?: any
	visibleParent?: boolean
	type?: any
	toolTipText?: string
	variant?: "standard" | "filled" | "outlined"
	toolTipPosition?: Popper.Placement
	mask?: (string | RegExp)[]
	maxLength: number
}

type State = {
	valid?: boolean
	invalid?: boolean
	visible?: boolean
}


type TextMaskCustomProps = {
	inputRef: (ref: HTMLInputElement | null) => void;
}
class CustomInputForm extends React.PureComponent<Props, State> {

	state: State = {
		valid: false,
		visible: true
	}

	applyMask = (val: string) => {
		const { inputType, minYear, maxYear } = this.props

		switch (inputType) {
			case "all":
				return val.replace(/\s\s+/gi, " ")
			case "letter":
				return val.replace(/[^a-zA-Z\u00C0-\u00FF ]/gi, "").replace(/\s\s+/gi, " ")
			case "number":
				return val.replace(/[^0-9]/gi, "").replace(/\s\s+/gi, " ")
			case "hours":
				val = val.replace(/[^0-9|:]/gi, "").replace(/\s+/gi, "")

				if (val.length == 1) {
					val = val.replace(/[^0-2]/gi, "")
				}
				if (val.length == 2) {
					if (val.charAt(0) == "2") {
						if (!["0", "1", "2", "3"].includes(val.charAt(1))) {
							val = val.substring(0, 1)
						}
					} else {
						val = val.replace(/[^0-9|:/]/gi, "")
					}
				}
				if (val.length == 3) {
					val = val.replace(/(\d{2})(\d{1})/, "$1:$2")
				}
				if (val.length == 4) {
					if (!["0", "1", "2", "3", "4", "5"].includes(val.charAt(3))) {
						val = val.substring(0, 3)
					}
				}
				if (val.length == 5) {
					val = val.replace(/[^0-9|:/]/gi, "")
				}

				return val
			case "date":
				val = val.replace(/[^0-9|\/]/gi, "").replace(/\s+/gi, "")

				if (val.length == 1) {
					val = val.replace(/[^0-3]/gi, "")
				}
				if (val.length == 2) {
					if (val.charAt(0) == "3") {
						if (!["0", "1"].includes(val.charAt(1))) {
							val = val.substring(0, 1)
						}
					} else {
						val = val.replace(/[^0-9|\/]/gi, "")
					}
				}
				if (val.length == 3) {
					val = val.replace(/(\d{2})(\d{1})/, "$1/$2")
				}
				if (val.length == 4) {
					if (!["0", "1"].includes(val.charAt(3))) {
						val = val.substring(0, 3)
					}
				}
				if (val.length == 5) {
					if (val.charAt(3) == "0") {
						if (val.charAt(4) == "0") {
							val = val.substring(0, 4)
						} else {
							val = val.replace(/[^0-9|\/]/gi, "")
						}
					} else {
						if (!["0", "1", "2"].includes(val.charAt(4))) {
							val = val.substring(0, 4)
						}
					}
				}
				if (val.length == 6) {
					val = val.replace(/(\d{2})\/(\d{2})(\d{1})/, "$1/$2/$3")
				}

				if (val.length == 10) {
					if (minYear) {
						if (Number(val.split("/")[2]) < minYear) {
							val = val.substring(0, 6)
							this.setState({ invalid: true })
						} else {
							this.setState({ invalid: false })
						}
					}
					if (maxYear) {
						if (Number(val.split("/")[2]) > maxYear) {
							val = val.substring(0, 6)
							this.setState({ invalid: true })
						} else {
							this.setState({ invalid: false })
						}
					}
				}

				return val

			case "numberFormated":
				return val.replace(/^a-zA-Z\s\s+/gi, " ")

			default:
				return val.replace(/\s\s+/gi, " ")
		}
	}

	onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {

		const { maxLength, validator, upperCase } = this.props
		const { valid, invalid } = this.state
		const val = upperCase && upperCase ? ev.target.value.toUpperCase() : ev.target.value
		const attribute = ev.target.name
		if (maxLength) {
			if (val.length <= maxLength) {
				const mask = this.applyMask(val)
				if (validator) {
					validator(mask)
						.then(result => {
							this.setState({
								valid: result
							})

							this.props.onChange(attribute, mask, this.state.valid)
						})
						.catch(error => console.error("erro"))
				} else {
					this.props.onChange(attribute, mask, invalid)
				}
			}
		}
	}



	render() {
		const {
			id,
			label,
			disabled,
			name,
			placeholder,
			onChange,
			onBlur,
			value,
			type,
			toolTipText,
			toolTipPosition,
			mask,
			validParent,
			inputProps,
			visibleParent,
			required,
			variant,
			style
		} = this.props
		const { valid, invalid, visible } = this.state

		return (
			<>

				<TextField
					style={
						style ? { width: "97%", textAlign: "center", ...style } : { width: "97%", textAlign: "center" }
					}
					onChange={this.onChange}
					InputProps={{ inputProps }}
					InputLabelProps={{ shrink: true }}
					label={invalid ? `${label} Inválido(a)` : label}
					disabled={disabled}
					required={required}
					margin="normal"
					id={id}
					name={name}
					value={value || ""}
					variant={variant || "standard"}
					type={type}
					fullWidth
					placeholder={placeholder}
					error={invalid}
				/>
			</>
		)
	}
}

export default CustomInputForm
