require('dotenv').config();
const mongoose = require('mongoose')
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: false } };
mongoose.connect(process.env.MONGO_URI, clientOptions )


const { Schema } = mongoose;

let Person;

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]

})

Person = mongoose.model('Person', personSchema)

const arrayOfPeople = [
  {
    name: "Alice",
    age: 28,
    favoriteFoods: ["Pizza", "Sushi", "Chocolate"]
  },
  {
    name: "Bob",
    age: 35,
    favoriteFoods: ["Burgers", "Pasta", "Ice Cream"]
  },
  {
    name: "Charlie",
    age: 22,
    favoriteFoods: ["Tacos", "Salad", "Fries"]
  },
  {
    name: "Diana",
    age: 30,
    favoriteFoods: ["Steak", "Curry", "Fruit"]
  },
  {
    name: "Ethan",
    age: 27,
    favoriteFoods: ["Pancakes", "Sandwiches", "Brownies"]
  }
];

const createAndSavePerson = (done) => {
  let person = new Person({name: "John Doe", age: 42, favoriteFoods: ["Donuts", "Pasta", "Doritos"]})
  
  person.save((err, data)=> {
    if(err) return console.log(err)
    done(null, data);
})
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if(err) return console.log(err)
    done(null, people);

  })
 
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.log(err)
    done(null, personFound)
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.log(err)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err)
    done(null, data)

  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err)
      
      person.favoriteFoods.push(foodToAdd)
      // Save() from within find callback!
      person.save((err, updatedPerson)=> {
        console.log(updatedPerson)
        if(err) return console.log(err)
          done(null, updatedPerson);
      })
    })
  };
  
  const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate({name: personName}, {age: ageToSet} ,{new: true}, (err, data)=> {
      if (err) return console.log(err)
      done(null, data);
    })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data)=> {
    if (err) return console.log(err)
      done(null , data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err, removed) => {
    if (err) return console.log(err)
      
      done(null, removed);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let query = Person.find({favoriteFoods: foodToSearch})
  query.sort({name: 1}).limit(2).select('-age')
  .exec((err, data) => {
    console.log(data)
    done(null, data );
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
