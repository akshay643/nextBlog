"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SinglePost = ({ params }) => {
  const [blogData, setBlogData] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchBlogData = async () => {
      const res = await axios.get(`/api/blogs/${params?.id}`);
      setBlogData(res.data[0]);
    };
    fetchBlogData();
  }, [params]);

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
        <Image
          src={session?.user.image}
          width={37}
          height={37}
          style={{ borderRadius: "50%" }}
          alt="profile"
        />
        <p className="head_text mx-2">{session?.user?.name}</p>
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
