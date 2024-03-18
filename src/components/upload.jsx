"use client";
import React, { useState, useRef } from "react";
import icon from "./assets/icon.png";

export default function Upload() {
  const fileInputRef = useRef(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Do something with the selected file, such as displaying its name
    console.log("Selected file:", selectedFile.name);
    setFileName(selectedFile.name); // Set the file name in state
    setFileSelected(true); // Set fileSelected to true when a file is selected
  };

  const handleUpload = () => {
    // Perform upload logic here
    console.log("File upload logic goes here");
    // Reset fileSelected state after upload
    setFileSelected(false);
    setFileName(""); // Clear the file name after upload
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[#D87555] font-poppins">
      <img className="m-4" src={icon}></img>
      <div className="flex flex-col items-center w-[80rem] h-[32rem] bg-white mb-8 rounded-3xl">
        <div className="text-5xl m-6 mt-12 font-semibold text-gray-700">
          Upload files to snakcloud
        </div>
        <div className="text-2xl text-gray-700">
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
        <button
          type="submit"
          className="w-1/5 border text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-xl p-3 mt-16 text-lg font-medium shadow-md"
          onClick={fileSelected ? handleUpload : handleFileSelect}
        >
          {fileSelected ? "Upload" : "Select file"}
        </button>
      </div>
    </div>
  );
}
