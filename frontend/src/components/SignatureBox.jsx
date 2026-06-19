import { useRef } from "react";
import Draggable from "react-draggable";

export default function SignatureBox({ position, setPosition }) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStop={(e, data) => {
        setPosition({
          x: data.x,
          y: data.y,
        });
      }}
    >
      <div
        ref={nodeRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "160px",
          height: "50px",
          backgroundColor: "yellow",
          border: "2px solid black",
          cursor: "move",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          fontWeight: "bold",
        }}
      >
        Sign Here
      </div>
    </Draggable>
  );
}