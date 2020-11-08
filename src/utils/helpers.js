export function setWithExpiry(key, value, ttl) {
	const now = new Date()
	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	window.localStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key) {
    const itemStr = window.localStorage.getItem(key)
    // console.log(itemStr)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
    const now = new Date()
    const date = new Date(item.expiry)
    // console.log(`TODATE: ${item.expiry}  ${date.toString()}`)
    // console.log(`TODAY: ${now.getTime()}  ${now.toString()}`)
    // console.log(now.toString())
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
        console.log(key)
		// If the item is expired, delete the item from storage
		// and return null
		window.localStorage.removeItem(key)
		return null
	}
	return item.value
}