import React from "react";

const Dashboard = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Save your{" "}
            <strong className="font-extrabold  text-red-700 sm:block">
              Snippets
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            A useful design element featuring bold and highlighted text, perfect
            for saving and organizing important code snippets or text fragments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
