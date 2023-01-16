"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notebook_1 = require("../controller/notebook");
const multer_1 = require("../config/multer");
const multer_2 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
router.post("/", (0, multer_2.default)(multer_1.multerConfig).single("image"), notebook_1.createNotebook);
router.get("/", notebook_1.getNotebook);
router.patch("/:id", notebook_1.updateNotebook);
router.delete("/:id", notebook_1.deleteNotebook);
exports.default = router;
