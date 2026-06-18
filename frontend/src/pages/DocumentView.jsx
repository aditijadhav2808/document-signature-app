import { useEffect, useState } from "react";
import axios from "axios";

export default function DocumentView({ position }) {
  const [signatures, setSignatures] = useState([]);
  const [filter, setFilter] = useState("all");

  const [signatureText, setSignatureText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("black");
  const [fontFamily, setFontFamily] = useState("helv");

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

  useEffect(() => {
    loadSignatures();
  }, []);

  const saveSignature = () => {
    if (!signatureText.trim()) {
      alert("Please enter your name");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/signatures",
        {},
        {
          params: {
            document_id: 20,
            user_id: 1,
            x: position.x,
            y: position.y,
            page: 1,
            signature_text: signatureText,
            font_size: fontSize,
            color: color,
          },
        }
      )
      .then(() => {
        alert("Signature Saved!");
        loadSignatures();
      })
      .catch((err) => {
        console.log(err);
        alert("Save failed");
      });
  };

  const updateStatus = (id, status) => {
    let rejectionReason = "";

    if (status === "rejected") {
      rejectionReason = prompt("Enter rejection reason");

      if (!rejectionReason) return;
    }

    axios
      .put(
        `http://127.0.0.1:8000/signatures/${id}`,
        {},
        {
          params: {
            status,
            rejection_reason: rejectionReason,
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
        "http://127.0.0.1:8000/generate-pdf/20"
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
      });
  };

  const filteredSignatures =
    filter === "all"
      ? signatures
      : signatures.filter(
          (sig) => sig.status === filter
        );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "red" }}>
        SIGNATURE DASHBOARD
      </h2>

      <label>Enter Name</label>

      <br />

      <input
        type="text"
        value={signatureText}
        onChange={(e) =>
          setSignatureText(e.target.value)
        }
        placeholder="Enter your name"
        style={{
          width: "250px",
          padding: "8px",
        }}
      />

      <br />
      <br />

      <label>Font Size</label>

      <select
        value={fontSize}
        onChange={(e) =>
          setFontSize(Number(e.target.value))
        }
      >
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>
        <option value="36">36</option>
        <option value="48">48</option>
      </select>

      <br />
      <br />

      <label>Font Style</label>

      <select
        value={fontFamily}
        onChange={(e) =>
          setFontFamily(e.target.value)
        }
      >
        <option value="helv">Normal</option>
        <option value="cour">Courier</option>
        <option value="times">Times</option>
      </select>

      <br />
      <br />

      <label>Font Color</label>

      <select
        value={color}
        onChange={(e) =>
          setColor(e.target.value)
        }
      >
        <option value="black">Black</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
      </select>

      <br />
      <br />

      <p>
        Current Position:
        X = {position.x},
        Y = {position.y}
      </p>

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

      <h3>
        Total Signatures:
        {filteredSignatures.length}
      </h3>

      <hr />

      {filteredSignatures.slice(-3).map((sig) => (
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

          <p>Name: {sig.signature_text}</p>

          <p>X: {sig.x}</p>

          <p>Y: {sig.y}</p>

          <p>
            Status:
            <b> {sig.status}</b>
          </p>

          {sig.rejection_reason && (
            <p>
              Reason:
              {sig.rejection_reason}
            </p>
          )}

          <button
            onClick={() =>
              updateStatus(sig.id, "approved")
            }
          >
            Approve
          </button>

          <button
            onClick={() =>
              updateStatus(sig.id, "rejected")
            }
            style={{ marginLeft: "10px" }}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}