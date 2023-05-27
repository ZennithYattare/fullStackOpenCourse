/** @format */

require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const errorHandler = require("./error-handler");

const requestLogger = (request, response, next) => {
	console.log("Method:", request.method);
	console.log("Path:  ", request.path);
	console.log("Body:  ", request.body);
	console.log("---");
	next();
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

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => {
			next(error);
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
app.put("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	const newPhoneNumber = req.body.number;

	Person.findOneAndUpdate(
		{ _id: id },
		{ number: newPhoneNumber },
		{ new: true }
	)
		.then((updatedPerson) => {
			res.json(updatedPerson);
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then((result) => {
			res.status(204).end();
		})
		.catch((error) => {
			next(error);
		});
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.get("/info", (req, res) => {
	const date = new Date();
	const message = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
	res.send(message);
});