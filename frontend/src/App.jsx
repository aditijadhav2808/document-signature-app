import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadPage from "./pages/UploadPage";
import PDFViewer from "./components/PDFViewer";
import DocumentView from "./pages/DocumentView";
import Documents from "./pages/Documents";

export default function App() {
  const [pdfUrl, setPdfUrl] = useState("");

  return (
    <div>
      <Register />

      <hr />

      <Login />

      <hr />

      <UploadPage setPdfUrl={setPdfUrl} />

      <hr />

      <PDFViewer pdfUrl={pdfUrl} />

      <hr />

      <DocumentView />

      <hr />

      <Documents />
    </div>
  );
}