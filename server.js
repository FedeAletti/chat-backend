const express = require("express")
const bodyParser = require("body-parser")

const db = require("./db")

const router = require("./network/routes")

db(
	"mongodb+srv://fedeUser:Fede.0303@cluster0.tq8yywo.mongodb.net/?retryWrites=true&w=majority"
)

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
router(app)

app.use("/app", express.static("public"))

app.listen(3000)
console.log("Servidor corriendo en el puerto 3000")
