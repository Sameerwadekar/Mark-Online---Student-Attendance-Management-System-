import React, { useState } from "react";
import CreateStudent from "./CreateStudent";

function Home() {
  return (
    <div className="flex flex-col  h-full bg-gradient-to-br from-purple-800 to-black text-white">
      <CreateStudent />
    </div>
  );
}

export default Home;
