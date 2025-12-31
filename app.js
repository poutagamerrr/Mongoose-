require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Connected to MongoDB'));
// Your application code here

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);
//Person Schema & Model

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John',
    age: 25,
    favoriteFoods: ['pizza', 'burger']
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
//Create and Save ONE Person

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
//Create Many People

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
//Find People by Name

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
//Find One Person by Food

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
//Find Person by ID

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push('hamburger');

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};
//Find, Edit, then Save

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, data) => {
      if (err) return done(err);
      done(null, data);
    }
  );
};
//Find and Update

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
//Remove by ID

const removeManyPeople = (done) => {
  Person.remove({ name: 'Mary' }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};
//Remove Many People

const queryChain = (done) => {
  Person.find({ favoriteFoods: 'burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};
//Query Chain

