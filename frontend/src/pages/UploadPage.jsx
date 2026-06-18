import { useState } from "react";
import axios from "axios";

export default function UploadPage({
  setPdfUrl,
}) {
  const [file, setFile] = useState(null);

  const uploadPDF = () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    axios
      .post(
        "http://127.0.0.1:8000/upload?user_id=1",
        formData
      )
      .then((res) => {
        alert("PDF Uploaded!");

        const pdfPath =
          "http://127.0.0.1:8000/uploads/" +
          file.name;

        setPdfUrl(pdfPath);

        console.log(pdfPath);
      })
      .catch((err) => {
        console.log(err);
        alert("Upload Failed");
      });
  };

  return (
    <div>
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

      <button onClick={uploadPDF}>
        Upload PDF
      </button>
    </div>
  );
}