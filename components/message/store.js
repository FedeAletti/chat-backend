const db = require("mongoose")
const Model = require("./model")

//Connection to Mongo Atlas
const uri =
	"mongodb+srv://fedeUser:Fede.0303@cluster0.tq8yywo.mongodb.net/?retryWrites=true&w=majority"

db.Promise = global.Promise
db.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log("[db] Conectada con éxito")
	})
	.catch((err) => console.error("[db]", err))

const addMessage = (message) => {
	const myMessage = new Model(message)
	myMessage.save()
}

const getMessages = async () => {
	const messages = await Model.find()
	return messages
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
	//get(mensaje especifico)
	//delete(mensaje especifico)
}
