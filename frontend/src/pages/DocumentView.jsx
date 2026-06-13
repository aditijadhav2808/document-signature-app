import { useEffect, useState } from "react";
import axios from "axios";

export default function DocumentView() {
  const [signatures, setSignatures] = useState([]);
  const [filter, setFilter] = useState("all");

  const loadSignatures = () => {
    axios
      .get("http://127.0.0.1:8000/signatures")
      .then((res) => {
        setSignatures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveSignature = () => {
    axios
      .post(
        "http://127.0.0.1:8000/signatures",
        {},
        {
          params: {
            document_id: 1,
            user_id: 1,
            x: 100,
            y: 100,
            page: 1,
          },
        }
      )
      .then(() => {
        alert("Signature Saved!");
        loadSignatures();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateStatus = (id, status) => {
    axios
      .put(
        `http://127.0.0.1:8000/signatures/${id}`,
        {},
        {
          params: {
            status,
          },
        }
      )
      .then(() => {
        alert(`Signature ${status}`);
        loadSignatures();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generatePDF = () => {
    axios
      .post(
        "http://127.0.0.1:8000/generate-pdf/1"
      )
      .then((res) => {
        alert("Signed PDF Generated!");

        window.open(
          "http://127.0.0.1:8000/" +
            res.data.file,
          "_blank"
        );
      })
      .catch((err) => {
        console.log(err);
        alert("PDF Generation Failed");
      });
  };

  const filteredSignatures =
    filter === "all"
      ? signatures
      : signatures.filter(
          (sig) => sig.status === filter
        );

  useEffect(() => {
    loadSignatures();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signature Dashboard</h2>

      <button onClick={saveSignature}>
        Save Signature
      </button>

      <button
        onClick={generatePDF}
        style={{ marginLeft: "10px" }}
      >
        Generate Signed PDF
      </button>

      <hr />

      <button onClick={() => setFilter("all")}>
        All
      </button>

      <button
        onClick={() => setFilter("pending")}
        style={{ marginLeft: "10px" }}
      >
        Pending
      </button>

      <button
        onClick={() => setFilter("approved")}
        style={{ marginLeft: "10px" }}
      >
        Approved
      </button>

      <button
        onClick={() => setFilter("rejected")}
        style={{ marginLeft: "10px" }}
      >
        Rejected
      </button>

      <hr />

      {filteredSignatures.map((sig) => (
        <div
          key={sig.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <b>Signature #{sig.id}</b>
          </p>

          <p>X: {sig.x}</p>
          <p>Y: {sig.y}</p>

          <p>
            Status:
            <b> {sig.status}</b>
          </p>

          <button
            onClick={() =>
              updateStatus(sig.id, "approved")
            }
          >
            Approve
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() =>
              updateStatus(sig.id, "rejected")
            }
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}