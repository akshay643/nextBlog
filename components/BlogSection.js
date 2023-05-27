"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogSection = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        const blogs = response.data;

        // Fetch the creator's name for each blog
        const blogsWithCreator = await Promise.all(
          blogs.map(async (blog) => {
            const creatorResponse = await axios.get(
              `/api/user/${blog.creator}`
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
  }, []);

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
                  <Image
                    src={blogs.creatorImage}
                    width={20}
                    height={20}
                    style={{ borderRadius: "50%" }}
                    alt="profile"
                  />{" "}
                  <small>{blogs?.creatorName}</small>
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
