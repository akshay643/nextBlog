import mongoose from "mongoose";

const CodeSnippetsSchemas = new mongoose.Schema(
  {
    title: String,
    description: String,
    code: String,
    creator: String,
    likedBy: [
      {
        user_email: String,
        user_name: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports =
  mongoose.models["CodeSnippet"] ||
  mongoose.model("CodeSnippet", CodeSnippetsSchemas);
