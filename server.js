const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',  /* 127.0.0.1 means home or localhost */
      user : 'abretzer',
      password : '',
      database : 'smart-brain'
    }
  });

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(bodyParser.json());

app.use(cors())

app.get('/', (req, res) =>{
    res.send(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) =>  { register.handleRegister(req, res, db, bcrypt, saltRounds) }) 
app.get('/profile/:id', (req, res) =>  { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) =>  { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) =>  { image.handleApiCall(req, res) })

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

// bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
//     // Store hash in your password DB.
// });

/*
/ --> res = this is working
/signin --> POST = succes/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0, 
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }