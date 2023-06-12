"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import dynamic from "next/dist/shared/lib/dynamic";
import axios from "axios";
import { BaseURL } from "@utils/axiosRoute";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { CopyToClipboard } from "react-copy-to-clipboard";

const Snippets = () => {
  const [sidebar, setSideBar] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [getCode, setGetCode] = useState([]);
  const [flag, setFlag] = useState(false);
  const { data: session } = useSession();
  const [viewCode, setViewCode] = useState(getCode[0]);
  const router = useRouter();

  const fetchCodeSnippets = async () => {
    const res = await axios.get(`${BaseURL}/api/code_snippets`);
    console.log("res.data", res);
    setGetCode(res?.data);
  };
  useEffect(() => {
    // if (!session?.user) {
    //   router.push("/");
    // }
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

  const [copied, setCopied] = React.useState(false);

  const onCopy = useCallback(() => {
    const codeToCopy = viewCode?.code || viewCode?.__html;
    if (codeToCopy) {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = codeToCopy;
      const plainText = tempElement.innerText;
      navigator.clipboard
        .writeText(plainText)
        .then(() => {
          setCopied(true);
        })
        .catch((error) => {
          console.error("Failed to copy code:", error);
        });
    }
  }, [viewCode]);

  return (
    <section>
      <div className="row m-2 overflow-auto">
        <div className="col-4">
          <div className="row">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              {" "}
              <h5>Getting started with snippets</h5>
            </div>
            <div className="col-12 col-lg-6 text-center text-lg-end">
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
        <div className="col-8 ">
          {getCode ? (
            <>
              <div>
                <h5>{viewCode?.title}</h5>
              </div>

              <div
                className="p-4 card"
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid lightgrey",
                }}
              >
                <div className="row">
                  <div className="col-12 col-lg-6 text-center text-lg-start">
                    {" "}
                    <h6 className="text-muted"> {viewCode?.description}</h6>
                  </div>
                  <div className="col-12 col-lg-6 text-center text-lg-end">
                    {" "}
                    <CopyToClipboard
                      onCopy={onCopy}
                      text={viewCode?.code || viewCode?.__html}
                    >
                      <button className="btn btn-sm btn-info">
                        Copy to clipboard
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>

                <code
                  dangerouslySetInnerHTML={renderContent()} // Render the content with line breaks and lists
                  className=""
                ></code>
              </div>
            </>
          ) : (
            "Not Selected Anyone"
          )}
        </div>
      </div>

      <div className={sidebar ? "sidenav_visible p-4" : "sidenav p-4"}>
        <div className="text-end">
          <button className="btn btn-rounded" onClick={() => setSideBar(false)}>
            x
          </button>
        </div>
        <form className="form" onSubmit={postCode}>
          <div className="row g-2 ">
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
            <div className="col-12 ">
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

          <div className="text-center">
            <button className="btn btn-success my-3" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Snippets;
