const fs = require('fs')

const userString = fs.readFileSync('./db/users.json').toString()
const userArray = JSON.parse(userString)
console.log(userArray)

let newUser = {
    "id":2,
    "Name": "frank",
    "Password": "asss"
}
userArray.push(newUser)
let string = JSON.stringify(userArray)
fs.writeFileSync('./db/users.json', string)