import React, { useEffect } from "react";
import Navbar from "./Navbar.jsx";

export default function Home() {

  return (
    <div>
      <Navbar />
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="bg-sky-200 h-96 w-96">
          <p>CONTENT</p>
        </div>
      </div>
    </div>
  );
}
