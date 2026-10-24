import express from 'express'
import cors from 'cors'
const port = process.env.API_PORT || 4000;
const app = express();
import * as API from './middleware/apikeys.js';
import {users} from './data.js';

app.use(cors());

const usersTest = [
    {
        name: 'Name',
        age: 31,
    },
    {
        name: 'Name2',
        age: 40,
    },
]

const itemsTest = [
    {
      id: 1,
      checked: false,
      item: "iced tea",
    },
    {
      id: 2,
      checked: false,
      item: "salt",
    },
    {
      id: 3,
      checked: true,
      item: "pepper",
    },
    {
      id: 4,
      checked: true,
      item: "testitem_fromserver",
    },
]

const dataActivity = [
    {
        name: 'walk',
        calories: 200
    },
    {
        name: 'run',
        calories: 400
    },
]

app.get('/dataWithMsg',(req, res)=> {
    res.json({
        message: "from API dataWithMsg",
        data: dataActivity
    })
})

app.get('/usersTest', (req, res) => {
    res.json(usersTest);
})

app.get('/itemsTest', (req, res) => {
    res.json(itemsTest);
})

app.get('/dataTest', (req, res) => {
    res.json(users);
})

import employeesRouter from './routes/api/employees.js'; // Note: include the .js extension
app.use('/employees', employeesRouter);
// before-ES6
// app.use('/employees', require('./routes/api/employees.js'));

app.get('/', (req, res) => {
    res.status(200).send({data: {message: 'Testing nodejs-react'}});
})

app.listen(port, ()=> {
    console.log("Server is running on port 4000");
})
