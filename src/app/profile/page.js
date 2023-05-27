"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";
const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);
  const [renderComp, setRenderComp] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/blogs/usersblog/${session?.user.id}`); //get the posts related to the user
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id, renderComp]);
  if (!session?.user) {
    router.push("/");
  }

  const handleBlogDelete = async (blogId) => {
    const res = await axios.delete(`/api/blogs/${blogId}`);
    console.log(res);
    if (res.data === "Deleted") {
      alert("deleted");
      setRenderComp(!renderComp);
    } else {
      ("somethign went wrong");
    }
  };
  return (
    <section>
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <h1 className="head_text">
          Hey, <span className="gradient_color"> {session?.user?.name}</span>
        </h1>
        <p className="desc text-center">
          Welcome to your personalized profile page.
          <br /> Share your exceptional blogs, thoughts and inspire others with
          the power of your knowledge
        </p>
        <Link href="/blog/newblog">
          <button className="btn btn-outline-dark">Share Thought?</button>
        </Link>
      </div>
      <div className="m-4 head_text">Your Blogs</div>

      <div className="row g-3 m-4">
        {myPosts?.map((item, key) => {
          return (
            <div className="col-12 col-lg-4" key={key}>
              <div className="card">
                <div className="card-body  text-center" key={key}>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-title">{item.subtitle}</p>

                  <Link href={`/blog/${item?._id}`}>
                    <button className="btn border-0  mx-1">
                      <GrView />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleBlogDelete(item?._id)}
                    className="btn border-0  mx-1"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyProfile;
