import CodeSnippet from "@models/code_snippets_Model";
import { connectToDB } from "@utils/db";

export const POST = async (req, res) => {
  try {
    await connectToDB();

    const { title, description, code, creator, likedBy } = await req.json();
    console.log(description);

    const newCode = new CodeSnippet({
      title,
      description,
      code,
      creator,
      likedBy,
    });
    await newCode.save();

    return new Response("Created", { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 400 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const allCodeSnippet = await CodeSnippet.find({});
    return new Response(JSON.stringify(allCodeSnippet), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 400 });
  }
};
