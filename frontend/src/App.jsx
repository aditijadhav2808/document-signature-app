import { useState } from "react";
import UploadPage from "./pages/UploadPage";
import PDFViewer from "./components/PDFViewer";
import DocumentView from "./pages/DocumentView";

export default function App() {
  const [pdfUrl, setPdfUrl] = useState("");

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
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

      {pdfUrl && (
        <>
          <h2>PDF Preview</h2>

          <PDFViewer pdfUrl={pdfUrl} />

          <hr />

          <DocumentView
            position={{
              x: 100,
              y: 100,
            }}
          />
        </>
      )}
    </div>
  );
}