function isMobile() {
	return window.matchMedia("(max-width: 997.98px)").matches
}

function isFullHD() {
	return window.matchMedia("(min-width: 1600px)").matches
}

function isHD() {
	return window.matchMedia("(min-width: 1200px)").matches
}

function isWebpCompatible() {
	const element = document.createElement("canvas")

	if (!!(element.getContext && element.getContext("2d"))) {
		return element.toDataURL("image/webp").indexOf("data:image/webp") == 0
	}

	return false
}

export { isMobile, isWebpCompatible, isHD, isFullHD }
