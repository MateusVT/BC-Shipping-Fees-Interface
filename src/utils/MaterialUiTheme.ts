import { createMuiTheme } from "@material-ui/core"
import { deepPurple, pink } from "@material-ui/core/colors"

const placeholder = createMuiTheme()

const MainTheme = createMuiTheme({
	spacing: 5,
	palette: {
		primary: {
			main: "#1d6960"
		}
	},
	typography: {
		fontFamily: 'Montserrat, sans-serif',
	},

})



export { MainTheme }
