import Globals from "./Globals"
import { HAL } from "../types/Types"

type RequestOptions<E> = {
	body?: any
	external?: boolean
	api?: string
	isHAL?: boolean
	onError?: (error: any) => void
	onFinish?: () => void
	onSuccess?: (data: E) => void
	path: string
}

class Http {
	static call<E>(method: string, options: RequestOptions<E>) {
		const callbacks = {
			onError: options.onError || console.error,
			onFinish: options.onFinish || (() => { }),
			onSuccess: options.onSuccess || (() => { })
		}

		const url = options.external ? options.path : `${Globals.apiUrl}${options.path}`

		fetch(url, {
			body: options.body && JSON.stringify(options.body),
			headers: this.mountHeaders(),
			method: method
		})
			.then(response => {
				const status = response.status

				response
					.text()
					.then(text => {
						let json: any

						try {
							json = JSON.parse(text)
						} catch (error) {
							callbacks.onError(`${error} (body: ${text})`)

							return
						}

						if (status == 200) {
							callbacks.onSuccess(json as E)
						} else {
							callbacks.onError(json.message !== undefined ? json.message : json)
						}
					})
					.catch(reason => {
						callbacks.onError(reason)
					})
			})
			.catch(reason => {
				callbacks.onError(reason)
			})
			.finally(() => {
				callbacks.onFinish()
				console.debug(`${method} ${options.path} FINISHED`)
			})
	}

	static delete<E>(options: RequestOptions<E>) {
		return this.call("DELETE", options)
	}

	static get<E>(options: RequestOptions<E>) {
		return this.call("GET", options)
	}

	static post<E>(options: RequestOptions<E>) {
		return this.call("POST", options)
	}

	static put<E>(options: RequestOptions<E>) {
		return this.call("PUT", options)
	}

	private static mountHeaders(): Record<string, string> {

		return {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		}
	}

	static getHALContent(response: HAL, contentAttr) {
		return response._embedded[contentAttr]
	}
}

export default Http
