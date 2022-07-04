const Model = require("./model")

const addUser = (user) => {
	const myUser = new Model(user)
	return myUser.save()
}

const listUsers = async (filterUser) => {
	let filter = {}
	if (filterUser !== null) {
		filter = { user: filterUser }
	}
	const users = await Model.find(filter)
	return users
}

module.exports = {
	add: addUser,
	list: listUsers,
}
