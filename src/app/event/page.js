import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <section>
      <div
        className="text-center d-flex justify-content-center align-items-center flex-column"
        style={{ height: "50vh" }}
      >
        <h1 className="head_text text-center">
          Welcome To!
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center gradient_color">
            Eventify
          </span>
        </h1>
        <p className="desc text-center">
          Unlock the Power of Events with Eventify: Where Every Moment Becomes
          Memorable!
        </p>
        <Link href="/event/newEvent">
          <button className="btn btn-outline-dark" title="create event">
            Eventify?
          </button>
        </Link>
      </div>
    </section>
  );
};

export default page;
