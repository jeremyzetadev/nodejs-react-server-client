// import {apikey} from '../apiData.js'
import userAuthData from '../model/userAuth.json' with { type: 'json' };
const MAX = process.env.API_MAX || 25

const data = {
    userAuth: userAuthData,
    setuserAuth: function(data) {this.userAuth = data}
}

const getAllUserAuth = (req, res) => {
    console.log("Server is calling getAlluserAuth function");
    res.json(data.userAuth);
}

const createNewUserAuth = (req, res) => {
    const newUserAuth = {
        id: data.userAuth?.length ? data.userAuth[data.userAuth.length-1].id +1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if(!newUserAuth.firstname || !newUserAuth.lastname)
        return res.status(400).json({'messsage': 'First and last names are required'})

    data.setuserAuth([...data.userAuth, newUserAuth]);
    res.status(201).json(data.userAuth);
}

const updateUserAuth = (req, res) => {
    const userAuth = data.userAuth.find(emp=>emp.id === parseInt(req.body.id));
    if(!userAuth)
        res.status(400).json({'message':`The userAuth id ${req.body.id} cannot be found`});

    const filterdArray = data.userAuth.filter(emp=>emp.id !== parseInt(req.body.id));
    data.setuserAuth([...filterdArray, userAuth])
    res.json(data.userAuth);
}

const deleteUserAuth = (req, res) => {
    const userAuth = data.userAuth.find(emp=>emp.id === parseInt(req.body.id));
    if(!userAuth)
        res.status(400).json({'message':`The userAuth id ${req.body.id} cannot be found`});

    const filteredArray = data.userAuth.filter(emp=>emp.id !== parseInt(req.body.id));
    data.setuserAuth([...filteredArray]);
    res.json(data.userAuth);
}

const getUserAuth = (req, res) => {
    const userAuth = data.userAuth.find(emp=>emp.id === parseInt(req.body.id));
    if(!userAuth)
        res.status(400).json({'message':`The userAuth id ${req.body.id} cannot be found`});
    res.json(userAuth);
}

export default {
    getAllUserAuth,
    createNewUserAuth,
    updateUserAuth,
    deleteUserAuth,
    getUserAuth
}
