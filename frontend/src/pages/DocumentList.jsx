import { useEffect, useState } from "react";
import axios from "axios";

export default function DocumentList() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/documents")
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Documents</h1>

      {documents.map((doc) => (
        <div
          key={doc.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p><b>ID:</b> {doc.id}</p>
          <p><b>Filename:</b> {doc.filename}</p>
          <p><b>User ID:</b> {doc.user_id}</p>
        </div>
      ))}
    </div>
  );
}