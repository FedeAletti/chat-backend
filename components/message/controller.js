const store = require("./store")

const addMessage = (user, message) => {
	return new Promise((res, rej) => {
		if (!user || !message) {
			console.error("[messageController] No hay usuario o mensaje")
			return rej("Datos incorrectos")
		}
		const fullMessage = {
			user: user,
			message: message,
			date: new Date(),
		}
		store.add(fullMessage)
		res(fullMessage)
	})
}

const getMessages = () => {
	return new Promise((res, rej) => {
		res(store.list())
	})
}

const updateMessage = (id, message) => {
	return new Promise(async (res, rej) => {
		if (!id || !message) {
			console.error("[messageController] No hay usuario o mensaje")
			return rej("Datos incorrectos")
		}
		const result = await store.updateText(id, message)

		res(result)
	})
}

module.exports = {
	addMessage,
	getMessages,
	updateMessage,
}
