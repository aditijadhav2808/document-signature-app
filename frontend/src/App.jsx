import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";

import UploadPage from "./pages/UploadPage";
import PDFViewer from "./components/PDFViewer";
import SignatureBox from "./components/SignatureBox";
import DocumentView from "./pages/DocumentView";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [pdfUrl, setPdfUrl] = useState("");

  const [position, setPosition] = useState({
    x: 100,
    y: 100,
  });

  if (!loggedIn) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f3f4f6",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            width: "450px",
            textAlign: "center",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h1>Document Signature App</h1>

          {showRegister ? <Register /> : <Login />}

          <div style={{ marginTop: "15px" }}>
            {showRegister ? (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setShowRegister(false)}
                  style={{
                    border: "none",
                    background: "none",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setShowRegister(true)}
                  style={{
                    border: "none",
                    background: "none",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Register
                </button>
              </p>
            )}
          </div>

          <button
            onClick={() => setLoggedIn(true)}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Enter Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
        }}
      >
        Document Signature App
      </h1>

      <UploadPage setPdfUrl={setPdfUrl} />

      <hr />

      <DocumentView position={position} />

      <hr />

      {pdfUrl ? (
        <div
          style={{
            position: "relative",
            width: "800px",
            margin: "auto",
          }}
        >
          <PDFViewer pdfUrl={pdfUrl} />

          <SignatureBox
            position={position}
            setPosition={setPosition}
          />
        </div>
      ) : (
        <h3>No PDF Selected</h3>
      )}
    </div>
  );
}