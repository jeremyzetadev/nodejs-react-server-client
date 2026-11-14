import express from 'express'
import cors from 'cors'
const port = process.env.API_PORT || 4000;
const app = express();
import * as API from './middleware/apikeys.js';
import {users} from './apiData.js';
import jwt from 'jsonwebtoken'

app.use(express.json());
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


//if whole program-> should be use/init from database if server reruns
let refreshTokens = []
const userAuths = []
app.post('/AuthGetAccessToken', (req,res)=>{
    const refreshToken = req.body.token;
    if(refreshToken==null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({accessToken: accessToken})
    })
});

app.post('/Authlogin',async (req,res)=>{
    //Authenticate user

    //jwt assignment
    // const username = req.body.username
    const body = req.body ?? {};
    const username = body.username;
    const password = body.password;
    // if username is not unique get from db unique userID
    // const user_uniqueid = 1
    // const user = {name:username, user_uniqueid:user_uniqueid}
    const user = {name:username};
    try {
        console.log('Login attempt:', { username, password });
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userAuth = { username: req.body.name, password: hashedPassword };
        userAuths.push(userAuth);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
    if (!refreshTokens.includes(refreshToken)) refreshTokens.push(refreshToken);
    res.json({
        accessToken:accessToken,
        refreshToken:refreshToken
    });
})

app.delete('/logout', (req,res)=>{
    //if whole program-> should be in db delete token 
    refreshTokens = refreshTokens.filter((token)=>token!==req.body.token)
    res.statusCode(204);
})

import {authenticateToken} from './middleware/jwtUserAuth.js'
import userAuthRouter from './routes/api/userAuth.js';
app.use('/userAuth',authenticateToken, userAuthRouter);



app.get('/', (req, res) => {
    res.status(200).send({data: {message: 'Testing nodejs-react'}});
})

app.listen(port, ()=> {
    console.log("Server is running on port 4000");
})
