const express = require("express")
const multer = require("multer")
const path = require("path")

const response = require("../../network/response")
const controller = require("./controller")
const router = express.Router()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads")
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage: storage })

router.get("/", (req, res) => {
	const filterMessage = req.query.chat || null
	controller
		.getMessages(filterMessage)
		.then((messageList) => {
			response.success(req, res, messageList, 200)
		})
		.catch((err) => {
			response.error(req, res, "Unexpected Error", 500, err)
		})
})

router.post("/", upload.single("file"), (req, res) => {
	controller
		.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
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

router.delete("/:id", (req, res) => {
	controller
		.deleteMessage(req.params.id)
		.then((data) => {
			response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200)
		})
		.catch((err) => {
			response.error(req, res, "Error al eliminar el mensaje", 500, err)
		})
})

module.exports = router
