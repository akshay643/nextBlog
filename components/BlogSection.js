"use client";
import axios from "axios";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BaseURL } from "@utils/axiosRoute";
const BlogSection = () => {
  const { data: session } = useSession();

  const [allBlogs, setAllBlogs] = useState([]);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BaseURL}/api/blogs`);
        const blogs = response.data;
        const likedData = blogs[0].likedBy;
        // const foundObject = likedData.find(
        //   (obj) => obj.user_email === session?.user?.email
        // );

        // Fetch the creator's name for each blog
        const blogsWithCreator = await Promise.all(
          blogs.map(async (blog) => {
            const creatorResponse = await axios.get(
              `${BaseURL}/api/user/${blog.creator}`
            );
            const creator = creatorResponse.data;

            console.log("all", creator);

            return {
              ...blog,
              creatorName: creator[0].username,
              creatorImage: creator[0].image,
            };
          })
        );

        setAllBlogs(blogsWithCreator);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, [liked]);

  const handlelike = async (id) => {
    const res = await axios.put(`${BaseURL}/api/blogs/${id}`, {
      user_email: session?.user?.email,
      user_name: session?.user?.name,
    });
    console.log(res?.data);
    if (res?.data === "updated") {
      alert("Your Liked the post");
      setLiked(true);
    }
  };

  console.log("dad", allBlogs);
  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className="row container g-2 m-3 ">
        {allBlogs?.map((blogs, key) => {
          return (
            <div className="col-12 col-md-4 col-lg-4 " key={key}>
              <div className="card bg-transparent">
                <div className="card-body">
                  <div className="card-title fw-bold">{blogs?.title}</div>
                  <div className="card-title fw-light">{blogs?.subtitle}</div>

                  <div className="d-flex justify-content-between align-items-baseline">
                    <div>
                      <Image
                        src={blogs.creatorImage}
                        width={20}
                        height={20}
                        style={{ borderRadius: "50%" }}
                        alt="profile"
                      />{" "}
                      <small>{blogs?.creatorName}</small>
                    </div>
                    <Link
                      href={`/blog/${blogs._id}`}
                      className="text-decoration-none btn btn-dark text-white text-dark"
                    >
                      Read
                    </Link>
                    <div>
                      {blogs.likedBy.find(
                        (obj) => obj.user_email === session?.user?.email
                      ) ? (
                        <>
                          <FcLike /> <small>{blogs.likedBy.length}</small>
                        </>
                      ) : (
                        <FcLikePlaceholder
                          onClick={() => handlelike(blogs._id)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BlogSection;
