"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import dynamic from "next/dist/shared/lib/dynamic";
import axios from "axios";
import { BaseURL } from "@utils/axiosRoute";
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
const Snippets = () => {
  const [sidebar, setSideBar] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [getCode, setGetCode] = useState([]);
  const [flag, setFlag] = useState(false);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [open, setOpen] = useState(false);

  const onOpenModal = (e) => {
    setOpen(true);
    setViewCode(e);
  };
  const onCloseModal = () => setOpen(false);
  const { data: session } = useSession();
  const [viewCode, setViewCode] = useState(getCode[0]);
  const router = useRouter();
  const ColorPicker = () => {
    const ColorAttributor = Quill.import("attributors/class/color");
    ColorAttributor.whitelist = colors;
    Quill.register(ColorAttributor, true);

    return null;
  };
  const fetchCodeSnippets = async () => {
    const res = await axios.get(`${BaseURL}/api/code_snippets`);
    console.log("res.data", res);
    setGetCode(res?.data);
    setOriginalData(res?.data);
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
  const [searchValue, setSearchValue] = useState("");

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

  const handleSearch = (initials) => {
    if (initials === undefined) {
      setGetCode(getCode);
    }
    const filtered = getCode?.filter((snippet) => {
      const values = Object.values(snippet).join("").toLowerCase();
      return values.includes(initials.toLowerCase());
    });

    setGetCode(filtered);
  };

  const clearSearch = () => {
    setGetCode(originalData);
    setSearchValue("");
  };
  return (
    <>
      {/* ==========Heading== */}
      <div
        className="d-flex w-100 justify-content-between position-relative align-items-center bg-dark"
        style={{ height: "5rem" }}
      >
        <h5 className="text-white mx-4">Getting started with snippets</h5>
        {session?.user && (
          <button
            className="btn mx-4 btn-outline-secondary"
            onClick={() => setSideBar(!sidebar)}
          >
            {" "}
            Create Snippet
          </button>
        )}
      </div>

      {/* ==========Snippets */}
      <div className="">
        <div className="d-flex justify-content-center my-3">
          <input
            type="text"
            className="form-control w-25"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Search by initials..."
          />
          <button
            className="btn btn-sm btn-outline-success mx-2"
            onClick={() => handleSearch(searchValue)}
          >
            Search
          </button>
          <button
            className="btn btn-sm btn-outline-success mx-2"
            onClick={clearSearch}
          >
            Clear Search
          </button>
        </div>
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((snippet, index) => (
            <div key={index}>
              {Object.entries(snippet).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}: </strong>
                  {value}
                </p>
              ))}
            </div>
          ))
        ) : (
          <div className=" container-fluid">
            <div className="d-flex flex-wrap w-100 snippet-list">
              {getCode?.map((code, key) => {
                return (
                  <div
                    style={{
                      cursor: "pointer",
                      padding: "10px",
                      border: " 1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "10px",
                    }}
                    className="border m-0 p-3 w-25 rounded snippet-item "
                    key={key}
                    onClick={() => onOpenModal(code)}
                  >
                    {code.title}
                    {/* <small className="card-text">{code.code}</small> */}
                  </div>
                );
              })}
            </div>
            <Modal open={open} onClose={onCloseModal} center>
              <div className="col-lg-12 bg-dark ">
                <div className="snippet-details bg-white">
                  {viewCode ? (
                    <div className="bg-white text-white">
                      <h2>{viewCode?.title}</h2>
                      <div className="d-flex justify-content-end text-white ">
                        <CopyToClipboard
                          onCopy={onCopy}
                          text={viewCode?.code || viewCode?.__html}
                        >
                          <button className="btn btn-sm btn-outline-info text-dark">
                            Copy to clipboard
                          </button>
                        </CopyToClipboard>
                      </div>
                      <pre
                        style={{
                          color: "white",
                          border: "1px solid lightgray",
                          borderRadius: "10px",
                          marginTop: 10,
                        }} // This will override any other text color
                        dangerouslySetInnerHTML={renderContent()} // Render the content with line breaks and lists
                        className="text-white fw-bolder fs-6 bg-red"
                      ></pre>
                    </div>
                  ) : (
                    <div className="">Select a snippet to view details</div>
                  )}
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>

      {/* 
    

      {/* ========Sidebar=== */}

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
                modules={{
                  toolbar: toolbarOptions,
                }}
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
    </>
  );
};

export default Snippets;
