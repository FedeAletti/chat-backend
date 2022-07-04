const store = require("./store")

const addUser = (name) => {
	if (!name) {
		return Promise.reject("Invalid name")
	}

	const user = {
		name: name,
	}

	return store.add(user)
}

const listUsers = (filterUser) => {
	return store.list(filterUser)
}

module.exports = {
	addUser,
	listUsers,
}
