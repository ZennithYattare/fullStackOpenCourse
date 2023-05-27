/** @format */

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGO_URI;

console.log("connecting to", url);

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: "phonebook",
	})
	.then(() => {
		console.log("Connected to MongoDB.");
	})
	.catch((err) => console.log("error connecting to MongoDB:", err.message));

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return /^\d{2,3}-\d{6,}$/.test(v);
			},
			message: (props) =>
				`${props.value} is not a valid phone number. Please use the format XX-XXXXXXX or XXX-XXXXXXX.`,
		},
	},
});

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", personSchema);
