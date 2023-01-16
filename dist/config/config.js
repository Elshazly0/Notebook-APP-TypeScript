"use strict";
require("dotenv").config();
module.exports = {
    PORT: process.env.PORT,
    connectionString: process.env.CONNECTION_STRING,
};
