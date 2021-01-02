// setting connection and requiring mongoose
let mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGO_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// creating person schema
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: [
    {
      type: String,
    },
  ],
});

// creating & saving record of model
const persons = mongoose.model("person", personSchema);
const person = new persons({
  name: "Mehrez",
  age: 48,
  favoriteFoods: ["hargma", "mhamas bil karnit", "shakshouka bil kadid"],
});

person.save((err, data) => (err ? console.log(err) : console.log(data)));

// creating many persons
const personList = [
  {
    name: "Mariem",
    age: 23,
    favoriteFoods: ["pain au chocolat", "lasagne", "cheeseburger"],
  },
  {
    name: "Amira",
    age: 25,
    favoriteFoods: ["cheeseburger", "escalope panné", "pathé", "burrito"],
  },
  {
    name: "Marwen",
    age: 20,
    favoriteFoods: ["salade césar", "crispy baked falafel", "burrito"],
  },
  {
    name: "Lahbib",
    age: 69,
    favoriteFoods: ["kosksi bil osben", "marka bil osben", "osben"],
  },
  {
    name: "Dhawi",
    age: 19,
    favoriteFoods: ["frikase"],
  },
];

persons.create(personList);

// seaching database with name
persons.find({ name: "Mariem" }, (err, data) =>
  err ? console.log(err) : console.log(data)
);

// single match search
persons.findOne({ favoriteFoods: ["frikase"] }, (err, data) =>
  err ? console.log(err) : console.log(data)
);

// searching person by id
persons.findById("5ff06a9929226b2bc4d7ab44", (err, data) =>
  err ? console.log(err) : console.log(data)
);

// searching person by id
persons.findById("5ff06a9929226b2bc4d7ab44", (err, data) => {
  if (err) console.log(err);
  else data.favoriteFoods.push("hamburger");
  data.save();
  console.log(data);
});

// finding and updating person's age
persons.findOneAndUpdate(
  { name: "Dhawi" },
  { age: 20 },
  { new: true },
  (err, data) => (err ? console.log(err) : console.log(data))
);

// finding by id and removing person
persons.findByIdAndRemove("5ff06a0d0e96372eac83ab80", (err, data) =>
  err ? console.log(err) : console.log(data)
);

// deleting many documents
persons.remove({ name: "Amira" }, (err, data) =>
  err ? console.log(err) : console.log(data)
);

// searching with query helprs
persons
  .find({ favoriteFoods: "burrito" })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
