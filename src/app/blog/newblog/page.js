"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import { BaseURL } from "@utils/axiosRoute";
// import "react-quill/dist/quill.snow.css";
const NewBlog = () => {
  const { data: session } = useSession();
  const [value, setValue] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
    import("react-quill/dist/quill.snow.css");
  }, []);
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    description: "",
    creator: session?.user?.id,
  });

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BaseURL}/api/blogs`, {
      ...blogData,
      description: value,
    });
    if (res?.data === "Created") {
      setBlogData({
        title: "",
        subtitle: "",
        description: "",
      });
      router.push("/profile");
      alert(
        "Congratulations! Your Masterpiece is Born: A Journey into the Realm of Creation"
      );
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBlogData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <section>
      <div className="text-center head_text">
        Craft Your Narrative: Unleash the Power of Words
      </div>
      <div className="d-flex flex-column align-items-center bg-transparent">
        <form className="form w-75  border-0" onSubmit={handleBlogSubmit}>
          <label className="form-control bg-transparent border-0">
            Title:
            <input
              value={blogData?.title}
              onChange={handleInputChange}
              name="title"
              required
              className="form-control bg-transparent"
            />
          </label>
          <label className="form-control bg-transparent border-0">
            Subtitle:
            <input
              required
              value={blogData?.subtitle}
              onChange={handleInputChange}
              name="subtitle"
              className="form-control bg-transparent"
            />
          </label>
          {/* <label className="form-control bg-transparent border-0">
            Your Thoughts:
            <textarea
              required
              value={blogData?.description}
              onChange={handleInputChange}
              name="description"
              rows={10}
              style={{ whiteSpace: "pre-wrap" }}
              placeholder="max. 500 characters allowed"
              className="form-control bg-transparent"
            />
          </label> */}
          <ReactQuill
            style={{ margin: "1rem" }}
            theme="snow"
            value={value}
            onChange={(e) => setValue(e)}
          />
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-outline-dark">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewBlog;
