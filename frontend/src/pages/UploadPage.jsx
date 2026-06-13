import { useState } from "react";
import API from "../api";

export default function UploadPage({ setPdfUrl }) {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post(
        "/upload?user_id=1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const pdfPath =
        "http://127.0.0.1:8000/uploads/" +
        file.name;

      setPdfUrl(pdfPath);

      alert("PDF Uploaded Successfully");
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br />
      <br />

      <button onClick={uploadFile}>
        Upload PDF
      </button>
    </div>
  );
}