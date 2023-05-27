import BlogData from "@models/blog_model";
import { connectToDB } from "@utils/db";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const { title, subtitle, description, creator } = await req.json();

    const newBlog = new BlogData({ title, subtitle, description, creator });
    await newBlog.save();

    return new Response("Created", { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 400 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const allBlogs = await BlogData.find({});

    return new Response(JSON.stringify(allBlogs), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 400 });
  }
};
