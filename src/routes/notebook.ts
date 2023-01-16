import { Router } from "express";
import {
  createNotebook,
  getNotebook,
  updateNotebook,
  deleteNotebook,
  getNotebookSorted,
} from "../controller/notebook";
import { multerConfig } from "../config/multer";
import multer from "multer";

const router = Router();

router.post("/", multer(multerConfig).single("image"), createNotebook);

router.get("/", getNotebook);
router.get("/sorted/:id", getNotebookSorted);

router.patch("/:id", updateNotebook);

router.delete("/:id", deleteNotebook);

export default router;
