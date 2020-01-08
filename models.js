const bcrypt = require('bcryptjs');

const userDB = [];
function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function createUser(username, password) {
    const hash = createHash(password);
    const newUser = {
        username, 
        hash
    };
    userDB.push(newUser);
}

const db = [];

function all() {
    return [
        ...db
    ];
}

function create(name, joyVal) {
    // turnary! 
    // define givesJoy as true if it is "truthy", or false if it is "falsey"
    let givesJoy = joyVal ? true: false;

    const newItem = {
        name, 
        givesJoy
    };
    db.push(newItem);
}

const stuff = {
    all,
    create
};

const users = {
    create: createUser
}

module.exports = {
    stuff,
    users
}