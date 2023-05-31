import allBlogs from "@models/blog_model";
import { connectToDB } from "@utils/db";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const getBlogData = await allBlogs.find({ _id: params.id });

    return new Response(JSON.stringify(getBlogData), { status: 200 });
  } catch (error) {
    return new Response("Failed", {
      status: 500,
    });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const getBlogData = await allBlogs.findByIdAndDelete({ _id: params.id });

    return new Response("Deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed", {
      status: 500,
    });
  }
};

export const PUT = async (request, { params }) => {
  try {
    await connectToDB();
    const { user_email, user_name } = await request.json();
    console.log(user_name);

    const getUser = await allBlogs.findById({ _id: params.id });
    console.log(getUser);
    getUser.likedBy.push({
      user_email: user_email,
      user_name: user_name,
    });
    await getUser.save();
    return new Response(getUser, { status: 200 });
  } catch (error) {
    return new Response("Failed", {
      status: 500,
    });
  }
};
