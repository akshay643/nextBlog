import mongoose from "mongoose";

const BlogsSchemas = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  creator: String,
  timesOpened: String,
  image: String,
  likedBy: [
    {
      user_email: String,
      user_name: String,
    },
  ],
});
module.exports =
  mongoose.models["allBlogs"] || mongoose.model("allBlogs", BlogsSchemas);
