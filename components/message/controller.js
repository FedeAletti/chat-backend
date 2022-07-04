const store = require("./store")

const addMessage = (chat, user, message, file) => {
	return new Promise((res, rej) => {
		if (!chat || !user || !message) {
			console.error("[messageController] No hay usuario o mensaje")
			return rej("Datos incorrectos")
		}

		let fileUrl = ""
		if (file) {
			fileUrl = `http://localhost:3000/app/files/${file.filename}`
		}

		const fullMessage = {
			chat: chat,
			user: user,
			message: message,
			date: new Date(),
			file: fileUrl,
		}
		store.add(fullMessage)
		res(fullMessage)
	})
}

const getMessages = (filterChat) => {
	return new Promise((res, rej) => {
		res(store.list(filterChat))
	})
}

const updateMessage = (id, message) => {
	return new Promise(async (res, rej) => {
		if (!id || !message) {
			rej("Datos incorrectos")
			return false
		}
		const result = await store.updateText(id, message)

		res(result)
	})
}

const deleteMessage = (id) => {
	return new Promise((res, rej) => {
		if (!id) {
			rej("ID invalid")
			return false
		}
		store
			.remove(id)
			.then(() => res())
			.catch((err) => {
				rej(err)
			})
	})
}

module.exports = {
	addMessage,
	getMessages,
	updateMessage,
	deleteMessage,
}
