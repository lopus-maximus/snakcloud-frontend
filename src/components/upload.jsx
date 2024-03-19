import React, { useState, useRef } from "react";
import axios from "axios";
import icon from "./assets/icon.png";

export default function Upload() {
  const fileInputRef = useRef(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState("");

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile.name);
    setFileName(selectedFile.name);
    setFileSelected(true);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async function () {
        const base64Data = reader.result.split(",")[1]; // Extract Base64 data
        const requestData = {
          fileName: file.name,
          fileData: base64Data,
        };

        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token not found. Please log in.");
          return;
        }

        const response = await axios.post(
          "https://snakcloud.onrender.com/uploadfile",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const responseData = response.data;
          console.log(responseData.link);
          setFileLink(responseData.link); // Set the file link
          setFileSelected(true); // Ensure file selection state is updated
          setFileName(file.name); // Set the file name
          console.log("File uploaded to your API successfully");
        } else {
          console.error("Failed to upload file to your API");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownload = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please log in.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(fileLink, { headers, responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to download file.");
      });
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-[#D87555] font-poppins">
      <img className="m-4" src={icon} alt="Icon" />
      <div className="flex flex-col items-center h-5/6 w-5/6 bg-white rounded-3xl">
        <div className="text-5xl m-6 mt-12 font-semibold text-black text-center">
          Upload files to snakcloud
        </div>
        <div className="text-2xl text-gray-700 text-center">
          Where storage knows no bounds
        </div>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {fileSelected && (
          <p className="mt-4 text-gray-700">Selected file: {fileName}</p>
        )}
        {fileLink && (
          <p className="mt-4 text-gray-700">
            File uploaded:{" "}
            <a href={fileLink} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          </p>
        )}
        <button
          type="submit"
          className="w-5/6 lg:w-1/5 border text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-xl p-3 mt-16 text-lg font-medium shadow-md"
          onClick={fileSelected ? handleUpload : handleFileSelect}
        >
          {fileSelected ? "Upload" : "Select file"}
        </button>
        {fileLink && (
          <button
            type="button"
            className="w-5/6 lg:w-1/5 border text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-xl p-3 mt-4 text-lg font-medium shadow-md"
            onClick={handleDownload}
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
}
