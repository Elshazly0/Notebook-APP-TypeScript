"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config = require("./config/config");
const notebook_1 = __importDefault(require("./routes/notebook"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/notebooks", notebook_1.default);
app.use(express_1.default.static("uploads"));
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
mongoose_1.default
    .connect(config.connectionString)
    .then(() => {
    console.log("connected to the database");
    app.listen(config.PORT, () => {
        console.log(`app is listening on port ${config.PORT}`);
    });
})
    .catch(() => {
    console.log("error connecting to the db");
});
