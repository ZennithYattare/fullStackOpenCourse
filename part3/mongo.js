/** @format */

const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Had2049:${password}@sandbox.qvozf.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to the Database.");
	})
	.catch((err) => console.error(err));

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
	console.log("phonebook:");
	Person.find({}).then((persons) => {
		persons
			.forEach((person) => {
				console.log(person.name, person.number);
			})
			.catch((error) => {
				console.log(error);
			});
		mongoose.connection.close();
	});
} else if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	});

	person
		.save()
		.then((result) => {
			console.log(
				`added ${process.argv[3]} number ${process.argv[4]} to phonebook`
			);
			mongoose.connection.close();
		})
		.catch((error) => {
			console.log(error);
		});
}
