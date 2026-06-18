export default function SignatureBox({
  position,
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,

        color: "black",
        fontSize: "28px",
        fontFamily: "cursive",
        fontStyle: "italic",
        fontWeight: "bold",

        cursor: "move",
        zIndex: 9999,
        userSelect: "none",
      }}
    >
      𝓐𝓭𝓲𝓽𝓲 𝓙𝓪𝓭𝓱𝓪𝓿
    </div>
  );
}