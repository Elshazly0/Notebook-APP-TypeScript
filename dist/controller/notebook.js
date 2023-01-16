"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotebook = exports.updateNotebook = exports.getNotebookSorted = exports.getNotebook = exports.createNotebook = void 0;
const notebook_1 = __importDefault(require("../model/notebook"));
const createNotebook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var notebook = req.body;
        if (req.file) {
            notebook["Image"] = req.file.path;
            console.log(notebook["Image"]);
        }
        console.log("Data", notebook);
        var notebooks = yield notebook_1.default.create(notebook);
        return res
            .status(200)
            .json({ message: "notebook created successfully", data: notebooks });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createNotebook = createNotebook;
const getNotebook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var notebooks = yield notebook_1.default.find({});
        return res.status(200).json({ message: "All notebooks!", data: notebooks });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getNotebook = getNotebook;
const getNotebookSorted = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var notebooks = yield notebook_1.default.find({});
        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return x < y ? -1 : x > y ? 1 : 0;
            });
        }
        var values = sortByKey(notebooks, id);
        console.log(values);
        return res.status(200).json({ message: "All notebooks!", data: values });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getNotebookSorted = getNotebookSorted;
const updateNotebook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var notebook = yield notebook_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res
            .status(200)
            .json({ message: "notebook updated successfully!", data: notebook });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateNotebook = updateNotebook;
const deleteNotebook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var isDeleted = yield notebook_1.default.findByIdAndDelete(id);
        if (!isDeleted)
            throw new Error("Failed to delete Notebook");
        return res.status(200).json({ message: "notebook deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteNotebook = deleteNotebook;
