const Model = require("./model")

const addMessage = (message) => {
	const myMessage = new Model(message)
	myMessage.save()
}

const getMessages = (filterMessage) => {
	return new Promise((res, rej) => {
		let filter = {}
		if (filterMessage !== null) {
			filter = { user: filterMessage }
		}
		Model.find(filter)
			.populate("user")
			.exec((error, populatedData) => {
				if (error) {
					rej(error)
					return false
				}
				res(populatedData)
			})
	})
}

const removeMessage = (id) => {
	return Model.deleteOne({ _id: id })
}

const updateText = async (id, message) => {
	const foundMessage = await Model.findOne({ _id: id })

	foundMessage.message = message

	const newMessage = await foundMessage.save()
	return newMessage
}

module.exports = {
	add: addMessage,
	list: getMessages,
	updateText: updateText,
	remove: removeMessage,
}
