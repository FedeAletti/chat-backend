const express = require("express")
const response = require("../../network/response")
const controller = require("./controller")

const router = express.Router()

router.get("/", (req, res) => {
	controller
		.getMessages()
		.then((messageList) => {
			response.success(req, res, messageList, 200)
		})
		.catch((err) => {
			response.error(req, res, "Unexpected Error", 500, err)
		})
})

router.post("/", (req, res) => {
	controller
		.addMessage(req.body.user, req.body.message)
		.then((fullMessage) => response.success(req, res, fullMessage, 201))
		.catch((e) =>
			response.error(
				req,
				res,
				"Información inválida",
				400,
				"Error en el controlador"
			)
		)

	if (req.query.error == "ok") {
		response.error(req, res, "Error al enviar el mensaje", 400)
	}
	response.success(req, res, "Creado correctamente", 201)
})

router.patch("/:id", (req, res) => {
	controller
		.updateMessage(req.params.id, req.body.message)
		.then((data) => {
			response.success(req, res, data, 200)
		})
		.catch((err) => {
			response.error(req, res, "Error al actualizar el mensaje", 500, err)
		})
})

module.exports = router
