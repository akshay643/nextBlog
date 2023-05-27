import mongoose from "mongoose";

const BlogsSchemas = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  creator: String,
});
module.exports =
  mongoose.models.BlogData || mongoose.model("BlogData", BlogsSchemas);
