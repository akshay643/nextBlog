"use client";
import React, { useState, useEffect } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import dynamic from "next/dist/shared/lib/dynamic";
import axios from "axios";
import { BaseURL } from "@utils/axiosRoute";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const code = [
  {
    id: 1,
    title: "Add two numbers",
    description:
      "Write a function that adds two numbers and returns the result.",
    code: `const num1 = 5; const num2 = 3; // add two numbers 
    const sum = num1 + num2; // display the sum 
    console.log('The sum of ' + num1  + ' and ' + num2 + ' is: ' + sssum)`,
  },
  {
    id: 1,
    title: "Add three numbers",
    description:
      "Write a function that adds two numbers and returns the result.",
    code: `const num1 = 5; const num2 = 3; // add two numbers const sum =
  num1 + num2; // display the sum console.log('The sum of ' + num1
  + ' and ' + num2 + ' is: ' + sum)`,
  },
  {
    id: 1,
    title: "Add Four numbers",
    description:
      "Write a function that adds two numbers and returns the result.",
    code: `const num1 = 5; const num2 = 3; // add two numbers const sum =
  num1 + num2; // display the sum console.log('The sum of ' + num1
  + ' and ' + num2 + ' is: ' + sum)`,
  },
];
const Snippets = () => {
  const [sidebar, setSideBar] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [getCode, setGetCode] = useState([]);
  const [flag, setFlag] = useState(false);
  const { data: session } = useSession();
  const [viewCode, setViewCode] = useState(code[0]);
  const router = useRouter();

  const fetchCodeSnippets = async () => {
    const res = await axios.get(`${BaseURL}/api/code_snippets`);
    console.log("res.data", res);
    setGetCode(res?.data);
  };
  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
    import("react-quill/dist/quill.snow.css");
  }, []);

  useEffect(() => {
    fetchCodeSnippets();
  }, [flag]);

  const [codeData, setCodeData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCodeData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const postCode = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BaseURL}/api/code_snippets`, {
      ...codeData,
      code: codeValue,
    });
    if (res?.data === "Created") {
      setFlag(!flag);
      // setGetCode({
      //   title: "",
      //   description: "",
      // });
      setCodeValue("");
      setSideBar(false);
    } else {
      alert("somethign went wrong");
    }
  };
  const renderContent = () => {
    return { __html: viewCode?.code }; // Pass the blogData.description as HTML content
  };

  return (
    <section>
      <div className="row m-2">
        <div className="col-6">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Getting started with snippets</h5>
            {session?.user && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSideBar(!sidebar)}
              >
                {" "}
                Create Snippet
              </button>
            )}
          </div>
          {getCode?.map((code, key) => {
            return (
              <div
                className="snippet_card m-1 card p-1"
                key={key}
                onClick={() => setViewCode(code)}
              >
                <div className="card-body" style={{ overflow: "hidden" }}>
                  <h5 className="card-title">{code.title}</h5>
                  <h6 className="card-subtitle text-muted">
                    {code.description}
                  </h6>
                  {/* <small className="card-text">{code.code}</small> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-6 ">
          <h5>{viewCode?.title}</h5>
          <div
            className="p-4"
            style={{
              height: "100%",
              width: "100%",
              border: "1px solid lightgrey",
            }}
          >
            <h6 className="text-muted"> {viewCode?.description}</h6>
            <h6
              dangerouslySetInnerHTML={renderContent()} // Render the content with line breaks and lists
              className=""
            ></h6>
          </div>
        </div>
      </div>

      <div className={sidebar ? "sidenav_visible p-4" : "sidenav p-4"}>
        <div className="text-end">
          <button className="btn btn-rounded" onClick={() => setSideBar(false)}>
            x
          </button>
        </div>
        <form className="form" onSubmit={postCode}>
          <div className="row">
            <label>Title</label>
            <div className="col-12">
              {" "}
              <input
                onChange={handleInputChange}
                className="form-control"
                type="text"
                name="title"
              />
            </div>
            <div className="col-12">
              <label>Description</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                type="text"
                name="description"
              />
            </div>
            <div className="col-12">
              <label>Code</label>
              <ReactQuill
                style={{ backgroundColor: "white" }}
                theme="snow"
                value={codeValue}
                onChange={(e) => setCodeValue(e)}
              />
            </div>
          </div>
          <button className="btn btn-outline-secondary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Snippets;
