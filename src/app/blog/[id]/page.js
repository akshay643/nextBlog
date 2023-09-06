import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
// import { getProviders } from "next-auth/react";
import Image from "next/image";
import { BaseURL } from "@utils/axiosRoute";

async function getData(id) {
  const res = await fetch(`${BaseURL}/api/blogs/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const SinglePost = async ({ params }) => {
  const data = await getData(params?.id);
  const blogData = data[0];

  // const { data: session } = useSession();
  // useEffect(() => {
  //   const fetchBlogData = async () => {
  //     const res = await axios.get(`${BaseURL}/api/blogs/${params?.id}`);
  //     setBlogData(res.data[0]);
  //   };
  //   fetchBlogData();
  // }, [params]);

  const renderContent = () => {
    return { __html: blogData?.description }; // Pass the blogData.description as HTML content
  };

  return (
    <section className="container">
      <div className=" text-center">
        <h1 className="head_text">{blogData?.title}</h1>
        <span>{blogData?.subtitle}</span>
      </div>
      <div className="d-flex justify-content-center align-items-center p-4 mt-4">
        {/* <Image
          src={session?.user.image}
          width={37}
          height={37}
          style={{ borderRadius: "50%" }}
          alt="profile"
        /> */}
        {/* <p className="head_text mx-2">{session?.user?.name}</p> */}
      </div>
      <div className="bg-light">
        <div
          className=" p-4 mt-4"
          dangerouslySetInnerHTML={renderContent()} // Render the content with line breaks and lists
        />
      </div>
    </section>
  );
};

export default SinglePost;
