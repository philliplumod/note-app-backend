import mongoose, { Schema, Document } from "mongoose";
import { INote } from "../interfaces/note.interface";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INote>("Note", noteSchema);
