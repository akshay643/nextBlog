import allBlogs from "@models/blog_model";
import { connectToDB } from "@utils/db";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const { title, subtitle, description, creator, timesOpened, image } =
      await req.json();

    const newBlog = new allBlogs({
      title,
      subtitle,
      description,
      creator,
      timesOpened,
      image,
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

    const all = await allBlogs.find({});

    return new Response(JSON.stringify(all), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 400 });
  }
};
