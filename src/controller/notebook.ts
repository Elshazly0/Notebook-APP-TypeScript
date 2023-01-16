import { RequestHandler } from "express";

import Notebook, { NotebookModel } from "../model/notebook";

export const createNotebook: RequestHandler = async (req, res, next) => {
  try {
    var notebook: NotebookModel = req.body;

    if (req.file) {
      notebook["Image"] = req.file.path as any;
      console.log(notebook["Image"]);
    }
    console.log("Data", notebook);
    var notebooks = await Notebook.create(notebook);
    return res
      .status(200)
      .json({ message: "notebook created successfully", data: notebooks });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNotebook: RequestHandler = async (req, res, next) => {
  try {
    var notebooks = await Notebook.find({});
    return res.status(200).json({ message: "All notebooks!", data: notebooks });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNotebookSorted: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var notebooks = await Notebook.find({});

    function sortByKey(array: any[], key: string | number) {
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
    var values = sortByKey(notebooks, id);
    console.log(values);
    return res.status(200).json({ message: "All notebooks!", data: values });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNotebook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var notebook = await Notebook.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "notebook updated successfully!", data: notebook });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteNotebook: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var isDeleted = await Notebook.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete Notebook");
    return res.status(200).json({ message: "notebook deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
