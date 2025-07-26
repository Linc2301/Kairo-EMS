import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading({ style, open }) {
  if (!open) return null;
  const flexStyle = style?.height ? null : { flex: 1 };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 600,
        ...flexStyle,
        ...style,
      }}
    >
      <CircularProgress />
    </div>
  );
}
