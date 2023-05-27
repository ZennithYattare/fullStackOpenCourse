/** @format */

require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const requestLogger = (request, response, next) => {
	console.log("Method:", request.method);
	console.log("Path:  ", request.path);
	console.log("Body:  ", request.body);
	console.log("---");
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static("dist"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body"
	)
);

app.get("/api/persons", async (req, res) => {
	await Person.find({})
		.then((persons) => {
			res.json(persons);
		})
		.catch((error) => {
			console.log(error);
		});
});

app.post("/api/persons", async (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: "content missing",
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	await person
		.save()
		.then((savedPerson) => {
			res.json(savedPerson);
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get("/api/persons/:id", (req, res) => {
	Person.findById(req.params.id)
		.then((person) => {
			res.json(person);
		})
		.catch((error) => {
			console.log(error);
			res.status(404).end();
		});
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// app.get("/info", (req, res) => {
// 	const date = new Date();
// 	const message = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
// 	res.send(message);
// });

// app.delete("/api/persons/:id", (req, res) => {
// 	const id = Number(req.params.id);
// 	persons = persons.filter((person) => person.id !== id);

// 	res.status(204).end();
// });
