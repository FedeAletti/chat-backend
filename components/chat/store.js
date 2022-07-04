const Model = require("./model")

const addChat = (chat) => {
	const myChat = new Model(chat)
	return myChat.save()
}

const listChats = (userId) => {
	return new Promise((res, rej) => {
		let filter = {}
		if (userId) {
			filter = { users: userId }
		}

		Model.find(filter)
			.populate("users")
			.exec((error, populatedData) => {
				if (error) {
					rej(error)
					return false
				}
				res(populatedData)
			})
	})
}

module.exports = {
	add: addChat,
	list: listChats,
}
