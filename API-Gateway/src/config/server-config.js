const dotenv = require("dotenv"); // config funct loads .env mapping into process.env
// ../ --> src
// ../../ -> root folder 

// find-config recurrs to parent dirs till it find the file
// const res = dotenv.config({path: require('find-config')('.env')}) ; 

// need to give rel path to curr dir as index.js from src is going to run
// give rel path to that
const res = dotenv.config({path: "./.env"}) ;

if(res.error) console.log(res.error)
// console.log(res.parsed)
// console.log(process.cwd());

module.exports = {
  PORT: process.env.PORT,
};
