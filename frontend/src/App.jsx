import React from "react";
import ARPreview from "./components/ARPreview";

export default function App() {
  return (
    <div>
      <h3 style={{position:'absolute', zIndex:10, color:'#fff', padding:'12px'}}>HoloHome — Web AR Preview (MVP)</h3>
      <ARPreview />
    </div>
  );
}
