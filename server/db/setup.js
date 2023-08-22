const fs = require('fs');
require("dotenv").config();
const db = require("./");

const sql = fs.readFileSync(__dirname + '/data.sql').toString();

db.query(sql)
  .then(data => console.log("Set-up complete."))
  .catch(error => console.log(error));
