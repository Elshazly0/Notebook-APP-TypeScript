import * as mongoose from "mongoose";
import { Model } from "mongoose";

type NotebookType = NotebookModel & mongoose.Document;
export interface NotebookModel {
  [key: string]: any;

  Id: {
    type: String;
  };
  Title: {
    type: String;
    required: true;
  };
  Description: {
    type: String;
    required: true;
  };
  Date: {
    type: Date;
    required: true;
  };
  Priority: {
    type: Number;
    unique: true;
    required: true;
  };
  Image: {
    type: String;
  };
}
const NotebooSchema = new mongoose.Schema({
  Id: {
    type: String,
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Priority: {
    type: Number,
    unique: true,
    required: true,
  },
  Image: {
    type: String,
  },
});
const Notebook: Model<NotebookType> = mongoose.model<NotebookType>(
  "Notebook",
  NotebooSchema
);
export default Notebook;
