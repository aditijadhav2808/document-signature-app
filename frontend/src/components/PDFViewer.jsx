export default function PDFViewer({
  pdfUrl,
}) {
  return (
    <iframe
      src={pdfUrl}
      width="100%"
      height="700"
      title="PDF"
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    />
  );
}