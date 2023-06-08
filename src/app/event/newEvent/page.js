"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import randomString from "random-string";

const NewBlog = () => {
  const router = useRouter();

  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
  }, []);
  const [eventData, setEventData] = useState({
    event_id: randomString({ length: 5 }),
    event_title: "",
    event_description: "",
    event_date: "",
    event_location: "",
    event_lastdate_booking: "",
    created_by: session?.user?.email,
  });

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    //
    console.log(eventData);
    // const res = await axios.post("http://localhost:3000/api/blogs", {
    //   ...blogData,
    //   description: descriptionHTML,
    // });
    // if (res?.data === "Created") {
    //   setBlogData({
    //     title: "",
    //     subtitle: "",
    //     description: "",
    //   });
    //   router.push("/profile");
    //   alert(
    //     "Congratulations! Your Masterpiece is Born: A Journey into the Realm of Creation"
    //   );
    // }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  console.log("value", value);
  return (
    <section>
      <div className="text-center head_text">
        Craft Your Narrative: Unleash the Power of Words
      </div>
      <div className="d-flex flex-column align-items-center bg-transparent">
        <form className="form w-75  border-0" onSubmit={handleBlogSubmit}>
          <label className="form-control bg-transparent border-0">
            Event Title:
            <input
              value={eventData?.title}
              onChange={handleInputChange}
              name="event_title"
              required
              className="form-control bg-transparent"
            />
          </label>
          <label className="form-control bg-transparent border-0">
            Description:
            <input
              required
              value={eventData?.subtitle}
              onChange={handleInputChange}
              name="event_description"
              className="form-control bg-transparent"
            />
          </label>
          <label className="form-control bg-transparent border-0">
            Event Date:
            <input
              required
              type="date"
              value={eventData?.subtitle}
              onChange={handleInputChange}
              name="event_date"
              className="form-control bg-transparent"
            />
          </label>
          <label className="form-control bg-transparent border-0">
            Event Location:
            <input
              required
              type="date"
              value={eventData?.subtitle}
              onChange={handleInputChange}
              name="event_location"
              className="form-control bg-transparent"
            />
          </label>
          <label className="form-control bg-transparent border-0">
            Booking Last Date:
            <input
              required
              type="date"
              value={eventData?.subtitle}
              onChange={handleInputChange}
              name="event_lastdate_booking"
              className="form-control bg-transparent"
            />
          </label>

          <div className="text-center mt-3">
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
