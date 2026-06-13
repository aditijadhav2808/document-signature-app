export default function PDFViewer({ pdfUrl }) {
  if (!pdfUrl) {
    return (
      <div>
        <h3>No PDF Selected</h3>
      </div>
    );
  }

  return (
    <div style={{ width: "800px" }}>
      <iframe
        src={pdfUrl}
        width="800"
        height="1000"
        style={{ border: "1px solid black" }}
        title="PDF"
      />
    </div>
  );
}