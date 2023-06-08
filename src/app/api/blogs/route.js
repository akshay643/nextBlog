import BlogsData from "@models/blog_model";
import { connectToDB } from "@utils/db";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const { title, subtitle, description, creator, likedBy } = await req.json();
    console.log("title", title);
    const newBlog = new BlogsData({
      title,
      subtitle,
      description,
      creator,
      likedBy,
    });
    await newBlog.save();

    return new Response("Created", { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 400 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const allBlogsData = await BlogsData.find({});
    return new Response(JSON.stringify(allBlogsData), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 400 });
  }
};
