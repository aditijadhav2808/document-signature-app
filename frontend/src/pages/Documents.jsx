import { useEffect, useState } from "react";
import axios from "axios";

export default function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/documents")
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generatePDF = async (id) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/generate-pdf/${id}`
      );

      alert("Signed PDF Generated!");

      window.open(
        `http://127.0.0.1:8000/${res.data.file}`,
        "_blank"
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Documents Dashboard</h2>

      {documents.map((doc) => (
        <div
          key={doc.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{doc.filename}</h3>

          <button
            onClick={() => generatePDF(doc.id)}
          >
            Generate Signed PDF
          </button>
        </div>
      ))}
    </div>
  );
}