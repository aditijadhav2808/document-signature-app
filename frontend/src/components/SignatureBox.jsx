export default function SignatureBox({ position, setPosition }) {
  const moveRight = () => {
    setPosition({
      x: position.x + 20,
      y: position.y,
    });
  };

  const moveDown = () => {
    setPosition({
      x: position.x,
      y: position.y + 20,
    });
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: "200px",
          height: "60px",
          backgroundColor: "yellow",
          border: "2px solid black",
          textAlign: "center",
          lineHeight: "60px",
          fontWeight: "bold",
          zIndex: 9999,
        }}
      >
        SIGN HERE
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={moveRight}>Move Right</button>

        <button
          onClick={moveDown}
          style={{ marginLeft: "10px" }}
        >
          Move Down
        </button>
      </div>
    </>
  );
}