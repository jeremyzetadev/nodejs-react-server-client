import employeesData from '../model/employees.json' with { type: 'json' };

// before-ES6
// const data = {
//     employees: require('../model/employees.json'),
//     setEmployees: function(data) {this.employees = data}
// }

const data = {
    employees: employeesData,
    setEmployees: function(data) {this.employees = data}
}

const getAllEmployees = (req, res) => {
    console.log("Server is calling getAllEmployees function");
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length-1].id +1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname)
        return res.status(400).json({'messsage': 'First and last names are required'})

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp=>emp.id === parseInt(req.body.id));
    if(!employee)
        res.status(400).json({'message':`The employee id ${req.body.id} cannot be found`});

    const filterdArray = data.employees.filter(emp=>emp.id !== parseInt(req.body.id));
    data.setEmployees([...filterdArray, employee])
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp=>emp.id === parseInt(req.body.id));
    if(!employee)
        res.status(400).json({'message':`The employee id ${req.body.id} cannot be found`});

    const filteredArray = data.employees.filter(emp=>emp.id !== parseInt(req.body.id));
    data.setEmployees([...filterdArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp=>emp.id === parseInt(req.body.id));
    if(!employee)
        res.status(400).json({'message':`The employee id ${req.body.id} cannot be found`});
    res.json(employee);
}

export default {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
// before-ES6
// module.exports = {
//     getAllEmployees,
//     createNewEmployee,
//     updateEmployee,
//     deleteEmployee,
//     getEmployee
// }
