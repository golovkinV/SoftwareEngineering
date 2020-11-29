const dbConfig = require("./config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.tutorials = require("./models/tutorial.js")(mongoose);
db.user = require("./models/user.js")(mongoose);
db.role = require("./models/role.js")(mongoose);

module.exports = db;