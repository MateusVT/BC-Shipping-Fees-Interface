
class Globals {
	static readonly defaultBackgroundColor = "rgba(235,188,78,0.8)"
	static readonly defaultFontColor = "#1d6960"
	private static readonly port = 8080
	private static readonly devApiUrl = `http://localhost:${Globals.port}`
	private static readonly prodApiUrl = `https://shipping-fees-api.herokuapp.com`

	static get apiUrl() {
		return this.prodApiUrl
	}


}

export default Globals
