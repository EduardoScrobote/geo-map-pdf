"use client";
import PrintableMap from "@/components/PrintableMap";
import { useEffect, useState } from "react";

export default function Home() {
  const [hideButton, setHideButton] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const handlePrint = () => {
    setHideButton(true);
    setFullscreen((prevFullscreen) => !prevFullscreen);
    console.log(fullscreen);
    setTimeout(() => {
      window.print();
      setHideButton(false);
      setFullscreen((prevFullscreen) => !prevFullscreen);
      window.location.reload();
    }, 300);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <PrintableMap fullscreen={fullscreen} />
      <div className={hideButton ? "hidden" : ""}>
        <button onClick={handlePrint}>TESTE</button>
      </div>
    </div>
  );
}
