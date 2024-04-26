"use client";
import PrintableMap from "@/components/PrintableMap";
import { useState } from "react";

export default function Map() {
  const [hideButton, setHideButton] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <PrintableMap />
      <div className={hideButton ? "hidden" : ""}></div>
    </div>
  );
}
