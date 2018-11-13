// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Goal = require("../models/Goal");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/goals-project', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// let users = [
//   {
//     email: "alice",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     email: "bob",
//     password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
//   }
// ]

let goals = [
  {
    title: "Goal 1",
    history: [
      {date: "2018-11-08", value: 0},
      {date: "2018-11-09", value: 1},
      {date: "2018-11-10", value: 0},
      {date: "2018-11-11", value: 1},
      {date: "2018-11-12", value: 0}
    ],
    nextWeekUpdate: "2018-11-18"
  }
]

Goal.deleteMany()
.then(() => {
  return Goal.create(goals)
})
.then(goalsCreated => {
  console.log(`${goalsCreated.length} goals created with the following id:`);
  console.log(goalsCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})




