import BlogData from "@models/blog_model";
import { connectToDB } from "@utils/db";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const getBlogData = await BlogData.find({ _id: params.id });

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

    const getBlogData = await BlogData.findByIdAndDelete({ _id: params.id });

    return new Response("Deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed", {
      status: 500,
    });
  }
};
