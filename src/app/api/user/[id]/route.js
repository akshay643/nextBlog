import User from "@models/user_model";
import { connectToDB } from "@utils/db";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const getUser = await User.find({ _id: params.id });

    return new Response(JSON.stringify(getUser), { status: 200 });
  } catch (error) {
    return new Response("Failed", {
      status: 500,
    });
  }
};
