import BlogData from "@models/blog_model";
import { connectToDB } from "@utils/db";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const getBlogData = await BlogData.find({ creator: params.userblog });

    return new Response(JSON.stringify(getBlogData), { status: 200 });
  } catch (error) {
    return new Response("Failed", {
      status: 500,
    });
  }
};
