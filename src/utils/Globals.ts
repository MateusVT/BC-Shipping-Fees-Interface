
class Globals {
	static readonly defaultBackgroundColor = "rgba(235,188,78,0.8)"
	static readonly defaultFontColor = "#1d6960"
	private static readonly port = 9090
	private static readonly prodApiUrl = `http://localhost:${Globals.port}`

	static get apiUrl() {
		// const useProdApi = process.env.USE_PROD_API == "true" || process.env.NODE_ENV == "production"

		return this.prodApiUrl
		// return useProdApi ? this.prodApiUrl : this.devApiUrl //TODO
	}


}

export default Globals
