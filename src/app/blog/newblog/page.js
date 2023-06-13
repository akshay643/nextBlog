"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import { BaseURL } from "@utils/axiosRoute";
import dynamic from "next/dist/shared/lib/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Quill = dynamic(() => import("react-quill"), { ssr: false });
import { CopyToClipboard } from "react-copy-to-clipboard";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const colors = [
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
];

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: colors }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];
// import "react-quill/dist/quill.snow.css";
const NewBlog = () => {
  const { data: session } = useSession();
  const [value, setValue] = useState("");

  const router = useRouter();
  const ColorPicker = () => {
    const ColorAttributor = Quill.import("attributors/class/color");
    ColorAttributor.whitelist = colors;
    Quill.register(ColorAttributor, true);

    return null;
  };
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
            modules={{
              toolbar: toolbarOptions,
            }}
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
